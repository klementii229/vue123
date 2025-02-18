<template>
  <div class="home">
    <h1>ЛипецкАВИО</h1>
    <div class="search-container">
      <FlightSearch @search="handleSearch" />
    </div>
    
    <div class="features">
      <h2>Наши преимущества</h2>
      <!-- Статическая информация о компании -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFlightStore } from '@/stores/flights'
import FlightSearch from '@/components/FlightSearch.vue'

const router = useRouter()
const flightStore = useFlightStore()

const handleSearch = async (searchParams) => {
  try {
    await flightStore.searchFlights(searchParams)
    router.push('/search')
  } catch (error) {
    console.error('Ошибка при поиске:', error)
  }
}
</script> 