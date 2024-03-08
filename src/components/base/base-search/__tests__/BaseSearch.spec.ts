import BaseSearch from '@ui/base/base-search/BaseSearch.vue';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

describe('BaseSearch', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    // Enable fake timers before each test
    vi.useFakeTimers();

    wrapper = mount(BaseSearch, {
      props: {
        placeholder: 'Search here...',
        searchResults: [],
        loading: false
      },
      global: {
        directives: {
          onClickOutside: vi.fn()
        }
      }
    });
  });

  afterEach(() => {
    // Restore the real timers after each test
    vi.useRealTimers();
  });
  it('renders the correct placeholder', () => {
    const inputElement = wrapper.find('input[type="text"]');
    expect(inputElement.element.placeholder).toBe('Search here...');
  });

  it('emits update:modelValue when input is typed', async () => {
    const inputElement = wrapper.find('input[type="text"]');
    await inputElement.setValue('test');

    // Run all timers, which should trigger the debounced function
    vi.runAllTimers();

    // Now we can check if the event was emitted
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test']);
  });
  it('emits onReset when resetResponse is called', async () => {
    // Llamamos al método resetResponse directamente
    await wrapper.vm.resetResponse();
    expect(wrapper.emitted()).toHaveProperty('onReset');
  });
});