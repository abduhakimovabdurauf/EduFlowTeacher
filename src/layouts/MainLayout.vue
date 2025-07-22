<template>
  <div class="min-h-screen bg-white">
    <Sidebar />
    <main class="pt-16 px-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>
