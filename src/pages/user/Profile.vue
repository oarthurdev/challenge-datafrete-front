<template>
<div class="q-pa-md row items-start q-gutter-md">
  <q-card flat bordered class="my-card">
    <center>
      <q-card-section>
        <div class="text-h6">{{user.email}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <img v-bind:src="'http://localhost:8080/' + user.photo" class="img-profile" alt="User Image">
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        {{user.role}}
      </q-card-section>
    </center>
  </q-card>
 <q-card flat bordered class="card-update-profile">
    <center>
      <q-card-section>
        <div class="text-h6" style="margin-bottom: 20px;">Update your data</div>
        <q-form
        @submit="submit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.email"
        label="Your email"
        disable
      />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="Your password"
      />

      <q-input
        filled
        type="password"
        v-model="user.passwordR"
        label="Your new password"
      />

      <q-input
        filled
        type="password"
        v-model="user.passwordRR"
        label="Repeat password"
        style="margin-bottom: 35px;"
      />
      <picture-input 
        ref="pictureInput" 
        @change="onChange" 
        width="200" 
        height="200" 
        margin="16" 
        accept="image/jpeg,image/png" 
        size="10" 
        buttonClass="btn"
        :customStrings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Upload a profile picture'
        }">
      </picture-input>
      <div>
        <q-btn class="float-right" style="margin-bottom: 10px;" v-on:click="submit" label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
      </q-card-section>
    </center>
  </q-card> 
</div>
</template>
<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'Profile',
  data () {
    return {
      user: {
        email: null,
        photo: null,
        role: null,
        name: null,
        password: null,
        passwordR: null,
        passwordRR: null,
        name_file: null
      },
      updtImg: [],
      image: null
    }
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('email')
    vm.token = localStorage.getItem('token')
    vm.$axios
        .get('/api/user/get-photo')
        .then(function (result) {
          if (result.data) {
            vm.user.photo = result.data.profile_picture
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
  },
  methods: {
    submit (e) {
      let vm = this
      e.preventDefault()
      this.$axios.post('/api/user/upload-image', {image: vm.image, email: vm.user.email}
          ).then(function (result) {
            if (result.data) {
              vm.user.name_file = result.data.name_file
              vm.updtImg.push({'nome': vm.user.name_file})
            }
          })
      let promise = this.$axios
        .post('/api/user/profile', {email: vm.user.email, password: vm.user.password, passwordR: vm.user.passwordR, passwordRR: vm.user.passwordRR, name_file: vm.user.name_file})
        .then(function (result) {
          vm.updtImg.forEach(element => {
            vm.user.photo = element.nome
            console.log(vm.user.photo)
          })
          if (result.data.diffPass) {
            vm.$q.notify({
              color: 'negative',
              message: 'Your current password is wrong.'
            })
          } else if (result.data.diffPass2) {
            vm.$q.notify({
              color: 'negative',
              message: 'Passwords entered do not match'
            })
          } else if (result.data) {
            vm.$q.notify({
              color: 'positive',
              message: 'Profile updated successfully.'
            })
            setTimeout(() => {
              location.reload()
            }, 5000)
          } else {
            vm.$q.notify({
              color: 'negative',
              message: 'Oops, something went wrong, try again later.'
            })
          }
        })
    },
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  },
  components: {
    PictureInput
  }
}
</script>
<style scoped>
.img-profile {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.q-card {
  max-width: 600px;
  width: 500px;
  margin-left: 10px;
}

.card-update-profile {
  min-width: 900px;
}
</style>