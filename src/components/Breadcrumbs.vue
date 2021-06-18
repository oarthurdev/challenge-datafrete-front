<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el label="Dashboard" icon="home" to="/dashboard" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/profile'" label="Profile" icon="people" to="/profile" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/store/register'" label="Store" icon="shop" to="/store" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/store/register'" label="Register" icon="add" to="/store/register" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/store/manage'" label="Store" icon="shop" to="/store" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/store/manage'" label="Manage" icon="settings" to="/store/register" />
    </q-breadcrumbs>
  </div>
</template>
<script>
export default {
  name: 'Breadcumbs'
}
</script>