
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: phoneNumber, errorMessage: phoneError, handleBlur: phoneBlur } = useField(
    'phoneNumber',
    yup
      .string()
      .required('telefon raqam kiritilishi shart')
      .matches(/^\+998\d{2}\d{3}\d{2}\d{2}$/, 'Telefon raqami formati noto‘g‘ri'),
    {
      initialValue: '+998'
    }
  )


  const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
    'password',
    yup
      .string()
      .required('Parol kiritilishi shart')
      .min(4, 'Parol kamida 4 ta belgidan iborat bo\'lishi kerak')
  )

  


  const router = useRouter()
  const submit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      await router.push('/')
      
    } catch (e) {
      console.error(e)
    }
  })

  const tryCount = computed(() => submitCount.value > 3)

  watch(tryCount, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 3000)
    }
  })

  return {
    phoneNumber,
    phoneError,
    phoneBlur,
    password,
    passwordError,
    passwordBlur,
    submit,
    isSubmitting,
    tryCount,
  }
}
