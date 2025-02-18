import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),
  
  actions: {
    async login(credentials) {
      try {
        const { data } = await authAPI.login(credentials)
        this.token = data.data.token
        localStorage.setItem('token', data.data.token)
        await this.fetchUser()
        return true
      } catch (error) {
        console.error('Ошибка входа:', error)
        throw error
      }
    },

    async register(userData) {
      try {
        await authAPI.register(userData)
        return true
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        throw error
      }
    },

    async fetchUser() {
      try {
        const { data } = await authAPI.getProfile()
        this.user = data
      } catch (error) {
        console.error('Ошибка получения профиля:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
}) 