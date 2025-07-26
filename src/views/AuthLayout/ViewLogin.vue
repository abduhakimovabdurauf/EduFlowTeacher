<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 transition-all duration-300">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">🔐 Kirish</h2>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">📱 Telefon raqam</label>
          <input
            type="text"
            id="phone"
            v-model="phoneNumber"
            class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            :class="{ 'border-red-500': phoneError }"
            placeholder="+998xxxxxxxxx"
            autocomplete="off"
            @blur="phoneBlur"
          />
          <p v-if="phoneError" class="text-xs text-red-600 mt-1">{{ phoneError }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">🔑 Parol</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              :class="{ 'border-red-500': passwordError }"
              placeholder="Parolingizni kiriting"
              autocomplete="off"
              @blur="passwordBlur"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
          <p v-if="passwordError" class="text-xs text-red-600 mt-1">{{ passwordError }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isSubmitting || tryCount"
        >
          <span v-if="!isSubmitting">🚀 Kirish</span>
          <svg
            v-else
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </button>

        <p v-if="isSubmitting" class="text-sm text-gray-500 text-center">Kirilmoqda...</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginForm } from '../../use/login-form'

const {
  phoneNumber,
  phoneError,
  phoneBlur,
  password,
  passwordError,
  passwordBlur,
  submit,
  isSubmitting,
  tryCount,
} = useLoginForm()

const showPassword = ref(false)
</script>
