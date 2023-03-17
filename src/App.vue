<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/Layout/Header.vue';

</script>

<template>
  <Header></Header>
  <div class="container">
    <RouterView />
  </div>

</template>

<script lang="ts">


</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}

.container {
  padding: 20px;
  max-height: calc(100vh - 59px);
  max-width: calc(100vw - 1px);
  overflow-y: auto;
}

@media (min-width: 1024px) {}
</style>
