import { defineStore } from 'pinia'
import { flightAPI } from '@/services/api'

export const useFlightStore = defineStore('flights', {
  state: () => ({
    searchResults: {
      flights_to: [],
      flights_back: []
    },
    selectedFlights: {
      from: null,
      back: null
    }
  }),

  actions: {
    async searchFlights(params) {
      try {
        const { data } = await flightAPI.search(params)
        this.searchResults = data.data
      } catch (error) {
        console.error('Ошибка поиска рейсов:', error)
        throw error
      }
    },

    selectFlight(flight, direction) {
      this.selectedFlights[direction] = flight
    }
  }
}) 