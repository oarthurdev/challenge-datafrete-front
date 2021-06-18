<template>
   <div id="q-app" v-if="token == null">
    <login></login>
  </div>
  <div id="q-app" v-else>
    <main-layout />
  </div>
</template>
<script>
import MainLayout from 'layouts/MainLayout'
import Login from 'layouts/LoginLayout'
require('vue-awesome-notifications/dist/styles/style.css')

export default {
  name: 'App',
  data () {
    return {
      token: null
    }
  },
  created() {
    if (this.loggedIn) {
      // this.$router.push('/dashboard');
    } else {
      this.$router.push('/');
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted () {
    const self = this
    self.token = localStorage.getItem('token')
  },
  components: {
    'main-layout': MainLayout,
    'login': Login
  }
}
</script>
    MainLayout
<style lang="scss">
body, html{
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-weight: 400;
  overflow-x: hidden;
  overflow-y: auto;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

#app {
  margin: -1px;
  height: 100%;
}
a {
  text-decoration: none;
  color: whitesmoke;
}
</style>
