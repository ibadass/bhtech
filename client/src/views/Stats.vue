<template>
    <div>
        <h1>Bienvenue
            <input class="big" v-model="form.username" v-if="edit === true" />
            &nbsp;<button class="big" @click="editUser" v-if="edit === true">Valider</button>
            <span v-if="edit === false" @click="editField">{{username}}</span>
        </h1>
    </div>
</template>
<script>
    export default {
      name: "Stats",
      data () {
        return {
          edit: false,
          username: localStorage.getItem('username'),
          form: {
            username: this.username
          }
        }
      },
      methods:{
        editField () {
          this.form.username = this.username
          this.edit = !this.edit
        },
        editUser () {
          this.username = this.form.username
          localStorage.setItem('username', this.form.username)
          this.edit = false
        }
      }
    }
</script>
<style>
.big {
    font-size: 20px;
}
</style>
