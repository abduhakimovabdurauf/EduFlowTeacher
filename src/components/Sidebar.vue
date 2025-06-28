<template>
  <header class="w-full bg-gray-800 text-white shadow-md z-50">
    <nav class="flex justify-between items-center px-4 h-16">
      <!-- Logo -->
      <router-link to="/" class="text-sm font-bold text-white">
        EduFlow
      </router-link>

      <!-- Navigation Links -->
      <ul class="flex gap-6 text-2xl">
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
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>
