<template>
  <div>
    <h2>Live Search</h2>
    <BaseSearch
      @select="handleSelect"
      @debounce="handleSearch"
      :suggestions="filteredSuggestions"
    /><br />
    <div v-if="selectedResult">
      <p>Resultado seleccionado:</p>
      <p>ID: {{ selectedResult.id }}</p>
      <p>Ciudad: {{ selectedResult.city }}</p>
      <p>Cantidad de autos: {{ selectedResult.carCount }}</p>
      <p>Encargado: {{ selectedResult.manager }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSearch from './BaseSearch.vue'
import type { Suggestion } from './interfaces'

const suggestions = ref<Suggestion[]>([
  { id: 'A1B2C3', city: 'New York', carCount: 100, manager: 'John Doe' },
  { id: 'B4E5F6', city: 'Los Angeles', carCount: 80, manager: 'Jane Smith' },
  { id: 'C7H8I9', city: 'Chicago', carCount: 120, manager: 'Michael Johnson' }
])

const selectedResult = ref<Suggestion | null>(null)

const filteredSuggestions = ref<Suggestion[]>([])

const handleSearch = (searchTerm: string) => {
  filteredSuggestions.value = suggestions.value.filter((suggestion) =>
    suggestion.id.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

const handleSelect = (selected: Suggestion) => {
  selectedResult.value = selected
}
</script>
