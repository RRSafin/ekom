<template>
  <div class="chart" ref="chartdiv">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import vis from "@/pages/vis";

export default {
  name: 'MyChart',

  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          pinchZoomX:true
        })
    );

    // Add cursor
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    let colorSet = am5.ColorSet.new(root, {});

    // Define data
    let data = vis.map(el => {
      let elem = {};
      elem.date = new Date(Date.parse(el.date)).toLocaleDateString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      elem.visits = el.visits;
      elem.strokeSettings = {
        stroke: colorSet.getIndex(4)
      };
      elem.fillSettings = {
        fill: colorSet.getIndex(4),
      };
      elem.bulletSettings = {
        fill: colorSet.getIndex(4)
      }

      el = elem;
      return el;
    })


    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("location", 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5
    });

    // Create X-Axis
    let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "date",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
    );
    xAxis.data.setAll(data);

    // Create Y-axis
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxPrecision: 0,
          renderer: am5xy.AxisRendererY.new(root, {})
        })
    );

    // Create series
    let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "visits",
          categoryXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
            dy:-5
          })
        })
    );

    series.strokes.template.setAll({
      templateField: "strokeSettings",
      strokeWidth: 2
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.5,
      templateField: "fillSettings"
    });

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          templateField: "bulletSettings",
          radius: 5
        })
      });
    });

    series.data.setAll(data);
    series.appear(1000);


    // Add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal",
      marginBottom: 20
    }));

    // Make stuff animate on load
    chart.appear(1000, 100);

    this.root = root;

  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
</script>


<style scoped>

.chart {
  width: 1000px;
  height: 500px;
}

</style>