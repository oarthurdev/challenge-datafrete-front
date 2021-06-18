<template>
    <center>
        <h5>Dashboard</h5>
    </center>
</template>
<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      user: {
        email: null,
        token: null
      }
    }
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('email')
    vm.user.token = localStorage.getItem('token')
    vm.$axios
        .get('/api/user/get-photo')
        .then(function (result) {
          if (result.data) {
            vm.user.photo = result.data.profile_picture
            console.log(vm.fullPath)
          } else {
            console.log('Error')
          }
        })
    vm.$axios
        .get('/api/user/get-role')
        .then(function (result) {
          if (result.data) {
            vm.user.role = result.data.role_name
          } else {
            console.log('Error')
          }
        })
  }
}
</script>
