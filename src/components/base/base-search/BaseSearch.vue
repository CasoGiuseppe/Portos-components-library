<template>
  <section class="base-search" v-on-click-outside="resetResponse">
    <!-- @input="updateModel" -->
    <input
      ref="userSearchInput"
      type="text"
      v-model="userSearchBy"
      :placeholder="placeholder"
      tabindex="0"
      @input="updateModel"
    />
    <span
      v-if="$slots['alert']"
      class="base-search__user-message"
    >
      <!-- @slot Alert: Define user alert message -->
      <slot name="alert"></slot>
    </span>
    <ul
      v-if="searchResultHasResults"
      class="base-search__dropdown"
    >
      <li
        v-for="(result, index) in searchResults"
        :data-label="result.label"
        :key="result.label"
        :tabindex="index + 1"
        @click="selectListItem"
      >
        <!-- @slot List: Set a list of suggestion results -->
        <slot :property="result" name="list"></slot>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { debounce } from '@/shared/helpers';
import { vOnClickOutside } from '@vueuse/components';

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
    searchResults?: Results[] | undefined;

    /**
     * Set input search loading state
     */
    loading?: boolean;
}

const props = withDefaults(defineProps<ILiveSearch>(), {
  placeholder: 'put here your search text',
  searchResults: undefined,
  loading: false
})

// define v-model
const userSearchBy = ref<string>('')

// define HTML input element by ref
const userSearchInput = ref<HTMLInputElement | null>(null);

// define custom emits
const customEmits = defineEmits(['update:modelValue', 'onReset'])

const searchResultHasResults = computed(() => {
  if(!props.searchResults) return false;
  return props.searchResults.length > 0
})

// update input model
// check if value is !== empty
// launch update model to get suggestions
const updateModel = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  updateSearch(value)
}

const updateSearch = debounce((value: string) => {
  const valueExist = value !== ''
  valueExist ? customEmits('update:modelValue', value) : resetResponse() 
}, 850)


// handle user select item from list of results
const selectListItem = (payload: Event) => {
  const { dataset: { label } } = (payload.target as HTMLInputElement);
  if(!label) return ;
  userSearchBy.value = label;

  if(!userSearchInput.value) return
  userSearchInput.value.focus();

  resetResponse()
}

const resetResponse = () => customEmits('onReset')
</script>

<style lang="scss" src="./BaseSearch.scss" />
