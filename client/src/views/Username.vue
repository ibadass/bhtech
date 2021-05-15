<template>
  <div>
    <h1>Welcome</h1>
    <input type="hidden" v-model="form.oldUsername" />
    <label>
      Type a username :
      <input name="username" type="text" v-model="form.newUsername" />
    </label>
    &nbsp;<button @click="newUser">Valider</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "http://localhost:9000/api/",
      form: {
        username: ""
      },
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  created() {
    axios.get("http://localhost:9000/api/addfakeprobe").then(data => {
      console.log(data.data);
    });
  },
  methods: {
    newUser() {
      let user = {
        dateUpdate: new Date(),
        oldUsername: this.form.oldUsername,
        newUsername: this.form.newUsername
      };
      localStorage.setItem("user", JSON.stringify(user));
      this.$router.push("/stats");
    }
  }
};
</script>
