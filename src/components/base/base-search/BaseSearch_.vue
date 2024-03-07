<template>
  <div class="base-search" ref="baseSearch">
    <div class="base-search" ref="baseSearch">
      <input type="text" v-model="searchTerm" @keydown.enter="handleEnter" @input="handleInput" />
      <ul v-if="showDropdown && filteredSuggestions.length > 0" class="dropdown">
        <slot
          :suggestions="filteredSuggestions"
          :handleSuggestionClick="handleSuggestionClick"
        ></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Suggestion } from './interfaces'

const props = defineProps<{
  suggestions: Suggestion[]
}>()

const emit = defineEmits(['debounce', 'select'])

const searchTerm = ref('')
const showDropdown = ref(false)
const filteredSuggestions = ref<Suggestion[]>([])
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(props, (newValue) => {
  filteredSuggestions.value = newValue.suggestions
})

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('select', filteredSuggestions.value[0])
  }
}

function handleInput() {
  showDropdown.value = true
  if (searchTerm.value.trim() === '') {
    filteredSuggestions.value = []
    showDropdown.value = false
    return
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    emit('debounce', searchTerm.value)
  }, 1000)
}

function handleSuggestionClick(suggestion: Suggestion) {
  searchTerm.value = suggestion.id
  filteredSuggestions.value = [suggestion]
  showDropdown.value = false
  setTimeout(() => {
    const inputElement = document.querySelector(
      '.base-search input[type="text"]'
    ) as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  })
}
</script>

<style lang="scss" src="./BaseSearch.scss" />
