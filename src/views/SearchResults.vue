<template>
  <div class="search-results">
    <div class="filters">
      <div class="time-filter">
        <h3>Время вылета</h3>
        <input type="time" v-model="filters.timeFrom">
        <input type="time" v-model="filters.timeTo">
      </div>
      
      <div class="sort-options">
        <button @click="sortBy('duration')">Самый быстрый</button>
        <button @click="sortBy('price')">Самый дешевый</button>
      </div>
    </div>

    <div class="flights-list">
      <template v-if="searchResults.flights_to.length">
        <h2>Рейсы туда</h2>
        <FlightCard
          v-for="flight in filteredFlightsTo"
          :key="flight.flight_id"
          :flight="flight"
          @select="selectFlight('from', flight)"
        />
      </template>

      <template v-if="searchResults.flights_back.length">
        <h2>Обратные рейсы</h2>
        <FlightCard
          v-for="flight in filteredFlightsBack"
          :key="flight.flight_id"
          :flight="flight"
          @select="selectFlight('back', flight)"
        />
      </template>
    </div>

    <button 
      class="booking-button"
      :disabled="!canProceedToBooking"
      @click="proceedToBooking"
    >
      Go to booking
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFlightStore } from '@/stores/flights'
import FlightCard from '@/components/FlightCard.vue'

const router = useRouter()
const flightStore = useFlightStore()
const filters = ref({
  timeFrom: '',
  timeTo: '',
  sortBy: null
})

const searchResults = computed(() => flightStore.searchResults)

const filteredFlightsTo = computed(() => {
  let flights = [...searchResults.value.flights_to]
  return applyFilters(flights)
})

const filteredFlightsBack = computed(() => {
  let flights = [...searchResults.value.flights_back]
  return applyFilters(flights)
})

const applyFilters = (flights) => {
  if (filters.value.timeFrom && filters.value.timeTo) {
    flights = flights.filter(flight => {
      const flightTime = flight.from.time
      return flightTime >= filters.value.timeFrom && 
             flightTime <= filters.value.timeTo
    })
  }

  if (filters.value.sortBy === 'duration') {
    flights.sort((a, b) => {
      // Расчет длительности полета
      return getDuration(a) - getDuration(b)
    })
  } else if (filters.value.sortBy === 'price') {
    flights.sort((a, b) => a.cost - b.cost)
  }

  return flights
}

const getDuration = (flight) => {
  const departure = new Date(`2000-01-01T${flight.from.time}`)
  const arrival = new Date(`2000-01-01T${flight.to.time}`)
  return arrival - departure
}

const canProceedToBooking = computed(() => {
  const { from, back } = flightStore.selectedFlights
  if (searchResults.value.flights_back.length) {
    return from && back
  }
  return from
})

const proceedToBooking = () => {
  router.push('/booking')
}
</script> 