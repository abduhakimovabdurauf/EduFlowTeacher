<template>
  <header class="w-full bg-gray-800 text-white shadow-md z-50">
    <nav class="flex justify-between items-center px-4 h-16">
      <router-link to="/" class="text-sm font-bold text-white">
        EduFlow
      </router-link>

      <ul class="flex gap-6 text-2xl items-center">
        <li>
          <router-link
            to="/"
            class="hover:text-blue-400 transition"
            active-class="text-blue-500"
          >
            <i class='bx bxs-home-alt-2'></i>
          </router-link>
        </li>
        <li>
          <router-link
            to="/students"
            class="hover:text-blue-400 transition"
            active-class="text-blue-500"
          >
            <i class='bx bxs-user'></i>
          </router-link>
        </li>
        <li>
          <router-link
            to="/groups"
            class="hover:text-blue-400 transition"
            active-class="text-blue-500"
          >
            <i class='bx bxs-community'></i>
          </router-link>
        </li>
        <li>
          <button
            @click="logout"
            class="bg-blue-500 hover:bg-blue-600 text-white text-base px-3 py-1 rounded transition"
          >
            Chiqish
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('auth/LOGOUT');
    }
  }
};
</script>
