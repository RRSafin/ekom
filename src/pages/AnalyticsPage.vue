<template>
  <Navbar>
    <MyButton @click="logout">Выйти</MyButton>
  </Navbar>
  <div class="app">
    <h1>Аналитика</h1>
    <MyChart/>
  </div>
</template>

<script>
import MyChart from "@/components/UI/MyChart";
import Navbar from "@/pages/Navbar";
import MyButton from "@/components/UI/MyButton";

export default {
  name: 'AnalyticsPage',
  components: {
    MyChart,
    Navbar,
    MyButton,
  },
  methods: {
    logout() {
      localStorage.removeItem('leadhit-site-id')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>