<template>
  <div class="min-h-screen bg-white">
    <Sidebar />
    <main class="pt-16 px-4"> <!-- top padding to account for navbar height -->
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
