<template>
  <!-- <div class="my-3 fs-5 bg-light">
    <label for="" class="d-block">Categories:</label>
      <select v-model="category" @change="PrikaziProizvode()">
        <option :value="JSON.parse('{}')" disabled hidden>--Select a category--</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c.categoryName }}</option>
      </select>
  </div>
  <ProductTable :products="products" :category="category" :suppliers="suppliers" @products-add-event="refreshProducts($event)" @products-delete-event="refreshDelProducts($event)" @products-change-event="refreshChnProducts($event)"/>
 -->
 <Navigation/>
 <router-view />
 </template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
