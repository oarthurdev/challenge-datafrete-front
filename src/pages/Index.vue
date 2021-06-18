<template>
  <q-page class="flex flex-center">
    
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      registeredLounges: 0,
      registeredProducts: 0,
      productRating: 0,
      token: null,
      haveLounge: false
    }
  },
  created () {
    let vm = this
    vm.token = localStorage.getItem('token')

    this.$axios.post('dashboard', {token: vm.token}).then(function (result) {
      if (result.data) {
        vm.registeredLounges = result.data.countLounge.count
        vm.registeredProducts = result.data.countProduct.count
        vm.productRating = result.data.countReview
        if(vm.registeredLounges > 0) {
          vm.haveLounge = true
        } else {
          vm.haveLounge = false
        }
      } else {
        return false
      }
    })
  }
}
</script>
