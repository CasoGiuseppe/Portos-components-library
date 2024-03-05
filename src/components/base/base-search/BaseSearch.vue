<template>
  <div class="base-search" ref="baseSearch">
    <input type="text" v-model="searchTerm" @keydown.enter="handleEnter" @input="handleInput" />
    <ul v-if="showDropdown && filteredSuggestions.length > 0" class="dropdown">
      <li
        v-for="suggestion in filteredSuggestions"
        :key="suggestion.id"
        @click="handleSuggestionClick(suggestion)"
      >
        {{ suggestion.id }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
//cuando el searchterm esta vacio hacer return
// sino esta vacio lanzar el emit con el value
// me lo devuelve a traves de un slot
// no olvidar el debounce
// meter una prop para inicializar con un valor o v-model /
// slot-scope para las recomendaciones
// debounce en el componente

import { ref, watch } from 'vue'
import type { Suggestion } from './interfaces' // Importar la interfaz Suggestion

// Define prop types
const props = defineProps<{
  suggestions: Suggestion[]
  // liveSearch: boolean
}>()

// Define emit function
const emit = defineEmits(['search', 'select'])

// Reactive data
const searchTerm = ref('')
const showDropdown = ref(false)

// Filter suggestions based on input value
const filteredSuggestions = ref<Suggestion[]>([])

watch(searchTerm, (newValue) => {
  if (newValue.trim() === '') {
    filteredSuggestions.value = []
  } else {
    filteredSuggestions.value = props.suggestions.filter((suggestion) =>
      suggestion.id.toLowerCase().includes(newValue.toLowerCase())
    )
  }
})

// Search handler on Enter key
function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('search', searchTerm.value)
    if (filteredSuggestions.value.length > 0) {
      emit('select', filteredSuggestions.value[0])
    }
  }
}

// Input handler
function handleInput() {
  showDropdown.value = true
}

// Suggestion click handler
function handleSuggestionClick(suggestion: Suggestion) {
  searchTerm.value = suggestion.id
  showDropdown.value = false
}
</script>

<style lang="scss" src="./BaseSearch.scss" />
