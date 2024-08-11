<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-100 p-4">
    <div class="flex flex-col items-center justify-center mb-4">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="text-lg mt-2">v0.0.4</div>
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/exchange-form">Exchange Form</RouterLink>
        <RouterLink to="/exchange-history">Exchange History</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 2rem 0;
  margin-bottom: 50px;
  background-color: #f8fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  padding-top: 20px;
  text-align: center;
}

nav {
  width: 100%;
  font-size: 16px;
  margin-top: 1rem;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  color: #1f2937;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

nav a.router-link-exact-active {
  background-color: #3b82f6;
  color: #fff;
}

nav a:hover {
  background-color: #e5e7eb;
}
</style>
