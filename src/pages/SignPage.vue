<template>
  <div class="app">
    <form @submit.prevent>
      <h1>LeadHit</h1>
      <MyInput
          v-model="Id"
          placeholder="Введите Id сайта"
      />
      <div v-if="areErrorsFilled" style="padding: 5px 15px; margin-top: 15px;">
        <div
            v-for="error in Object.entries(errors)"
            :key="error[0]"
            style="color: red; font-size: 13px;"
        >
          {{ error[1] }}
        </div>
      </div>
      <MyButton
        @click="validateAndAuth"
      >
        Войти
      </MyButton>
    </form>
    <div>5f8475902b0be670555f1bb3</div>
  </div>
</template>

<script>
  import MyButton from "@/components/UI/MyButton";
  import MyInput from "@/components/UI/MyInput";
  import router from "@/router/router";
  import axios from "axios";

export default {
  components: {
    MyInput,
    MyButton,
  },

  data() {
    return {
      Id: '',
      errors: {},
      isValidationActive: false,
    }
  },

  watch: {
    Id(value) {
      if (this.isValidationActive) {
        this.validateId(value);
      }
    },
  },

  computed: {
    areErrorsFilled() {
      return Object.values(this.errors).some(el => el);
    }
  },

  methods: {
    validateId() {
      const errors = {};

      if (this.Id === '') {
        errors.fill = 'id сайта не должен быть пустым'
      }
      if (this.Id.length !== 24) {
        errors.length = 'id сайта должен содержать 24 символа'
      }

      this.errors = { ...errors }
    },

    validateAndAuth() {
      this.isValidationActive = true
      this.validateId(this.Id)

      if (!this.areErrorsFilled) {
        this.fetchId()
      }
    },

    async fetchId() {
      try {
        const response = await axios.get('https://track-api.leadhit.io/client/test_auth',
          {
            headers: {
              'Api-key': `${this.Id}:eEZn8u05G3bzRpdL7RiHCvrYAYo`,
              'Leadhit-Site-Id': this.Id
            }
          })

        if (response.data.message === 'ok') {
          localStorage.setItem('leadhit-site-id', this.Id)

          await router.push('/analytics')
        }
      } catch (e) {
        alert('Неверный Id')
      }
    },

  },

}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 250px;
  border: 2px solid mediumpurple;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
}

</style>