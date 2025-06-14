<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-100 shadow-md hidden md:block">
      <Sidebar />
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto bg-white p-4">
      <router-view />
    </div>
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
