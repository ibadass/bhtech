<template>
    <div>
        <h1>Welcome</h1>
        <label>Type a username : </label>
        <input type="text" v-model="form.username" />
        &nbsp;<button @click="newUser">Valider</button>
    </div>
</template>
<script>
  export default {
    name: "HelloWorld",
    data () {
      return {
        url: 'http://localhost:9000/api/',
        form: {
          username: ''
        },
        username: localStorage.getItem('username')
      }
    },
    methods: {
      newUser() {
        this.username = this.form.username
        localStorage.setItem('username', this.form.username)
        this.$router.push('/stats')
      }
    }
  };
</script>
