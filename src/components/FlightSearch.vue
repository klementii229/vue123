<template>
  <form @submit.prevent="handleSearch" class="flight-search">
    <div class="form-group">
      <label>Откуда</label>
      <input 
        type="text" 
        v-model="search.from"
        @input="searchAirports('from')"
        class="test-0-from"
      >
      <div v-if="fromAirports.length" class="airports-list">
        <div 
          v-for="airport in fromAirports" 
          :key="airport.iata"
          @click="selectAirport('from', airport)"
        >
          {{ airport.name }} ({{ airport.iata }})
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Куда</label>
      <input 
        type="text" 
        v-model="search.to"
        @input="searchAirports('to')"
        class="test-0-to"
      >
      <!-- Аналогичный список аэропортов для поля "Куда" -->
    </div>

    <div class="form-group">
      <label>Туда</label>
      <input 
        type="date" 
        v-model="search.date1"
        class="test-0-date1"
      >
    </div>

    <div class="form-group">
      <label>Обратно</label>
      <input 
        type="date" 
        v-model="search.date2"
        class="test-0-date2"
      >
    </div>

    <div class="form-group">
      <label>Пассажиры</label>
      <input 
        type="number" 
        v-model.number="search.passengers"
        min="1"
        max="8"
        class="test-0-passengers"
      >
    </div>

    <button type="submit" class="test-0-search">Найти</button>
  </form>
</template>

<script>
import { ref, reactive } from 'vue'
import { airportAPI } from '@/services/api'
import debounce from 'lodash/debounce'

export default {
  name: 'FlightSearch',
  setup(props, { emit }) {
    const search = reactive({
      from: '',
      to: '',
      date1: '',
      date2: '',
      passengers: 1
    })

    const fromAirports = ref([])
    const toAirports = ref([])

    const searchAirports = debounce(async (type, query) => {
      if (query.length < 2
</script> 