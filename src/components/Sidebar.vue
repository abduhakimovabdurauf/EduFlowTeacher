<template>
  <div class="min-h-screen w-64 bg-gray-800 shadow-md text-white flex flex-col p-4">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 mb-8">
      <span class="text-2xl font-bold text-blue-600">EduFlow</span>
    </a>

    <!-- Navigation Links -->
    <ul class="flex flex-col gap-3">
      <li>
        <router-link
          to="/"
          class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-gray-800 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <i class="bi bi-house-door-fill text-xl"></i>
          <span class="text-base">Home</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/students"
          class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-gray-800 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <i class="bi bi-table text-xl"></i>
          <span class="text-base">O'quvchilar</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/groups"
          class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-gray-800 transition-colors duration-200"
          active-class="bg-blue-600 text-white"
        >
          <i class="bi bi-speedometer2 text-xl"></i>
          <span class="text-base">Guruhlar</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>
