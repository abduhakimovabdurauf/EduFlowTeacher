<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-md rounded-lg w-full max-w-md p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Kirish</h2>

      <form @submit.prevent="submit" class="space-y-5">
        <!-- Telefon -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Login</label>
          <input
            type="text"
            id="phone"
            v-model="phoneNumber"
            value="+998"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': phoneError }"
            placeholder="+998xxxxxxxxx"
            autocomplete="off"
            @blur="phoneBlur"
          />
          <p class="text-sm text-red-600 mt-1" v-if="phoneError">{{ phoneError }}</p>
        </div>

        <!-- Parol -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Parol</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': passwordError }"
            placeholder="Parolingizni kiriting"
            autocomplete="off"
            @blur="passwordBlur"
          />
          <p class="text-sm text-red-600 mt-1" v-if="passwordError">{{ passwordError }}</p>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 disabled:opacity-50"
          :disabled="isSubmitting || tryCount"
        >
          Kirish
        </button>

        <!-- Loading -->
        <p class="text-sm text-gray-500 text-center" v-if="isSubmitting">Kirilmoqda...</p>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoginForm } from '@/use/login-form.js'

export default {
  setup() {
    return {
      ...useLoginForm()
    }
  }
}
</script>
