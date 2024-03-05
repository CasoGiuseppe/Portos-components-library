<template>
  <div>
    <BaseSearch :suggestions="suggestions" @select="handleSelect" @search="handleSearch" />
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
// crear un template de filtrado si solo tiene valores en el slot

import { ref } from 'vue'
import BaseSearch from './BaseSearch.vue'
import type { Suggestion } from './interfaces'

const suggestions = ref<Suggestion[]>([
  { id: 'A1B2C3', city: 'New York', carCount: 100, manager: 'John Doe' },
  { id: 'B4E5F6', city: 'Los Angeles', carCount: 80, manager: 'Jane Smith' },
  { id: 'C7H8I9', city: 'Chicago', carCount: 120, manager: 'Michael Johnson' }
])

const selectedResult = ref<Suggestion | null>(null)

const handleSearch = (searchTerm: string) => {
  console.log('Search term:', searchTerm)
  // Realizar búsqueda y manejar resultados aquí
}

const handleSelect = (selected: Suggestion) => {
  selectedResult.value = selected
  // Realizar alguna acción cuando se selecciona una sugerencia
}
</script>
