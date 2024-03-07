<template>
  <section class="base-search">
    <input
      type="text"
      v-model="searchTerm"
      :placeholder="placeholder"
      @keydown.enter="handleEnter"
      @input="updateValue"
    />
    <ul v-if="showDropdown && filteredSuggestions.length > 0" class="dropdown">
      <slot
        :suggestions="filteredSuggestions"
        :handleSuggestionClick="handleSuggestionClick"
      ></slot>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

export interface Results {
  label: string;
}

export interface ILiveSearch {
    /**
     * Set input search placeholder text
     */
    placeholder?: string;

    /**
     * Set search results items array
     */
    searchResults?: Results[]
}

const {searchResults} = withDefaults(defineProps<ILiveSearch>(), {
  placeholder: 'put here your search text',
  searchResults: () => [],
})

const customEmits = defineEmits(['debounce', 'select', 'update:modelValue'])
const resultsSize = computed(() => searchResults.length);

const searchTerm = ref('')
const showDropdown = ref(false)
const filteredSuggestions = ref<Record<string, string>[]>([])
// let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(props, (newValue) => {
  filteredSuggestions.value = newValue.suggestions
})

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    customEmits('select', filteredSuggestions.value[0])
  }
}

const updateValue = (payload: Event) => {
  const { value } = (payload.target as HTMLInputElement)
  if (value === '') return ;

  customEmits('update:modelValue', value)
};

// function handleInput() {
//   showDropdown.value = true
//   if (searchTerm.value.trim() === '') {
//     filteredSuggestions.value = []
//     showDropdown.value = false
//     return
//   }

//   if (debounceTimer) {
//     clearTimeout(debounceTimer)
//   }
//   debounceTimer = setTimeout(() => {
//     emit('debounce', searchTerm.value)
//   }, 1000)
// }

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
