<template>
    <section>
        <NavigationItemContextual>
            ciccio
        </NavigationItemContextual>
    </section>
    <BaseDropdown
        :list="List"
        :placeholder="placeholder"
        :current="current"
        @send="updateCurrent"
    >
        <template #header>
            <label>Label</label>
            <BaseIcon
                name="IconFeedbackAnswer"
                :type="Types.FEEDBACK"
            />
        </template>
        <template #error v-if="error">{{ error }}</template>
    </BaseDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import NavigationItemContextual from './components/navigation/contextual/navigation-item/NavigationItemContextual.vue';
import BaseDropdown from '@/components/base/base-dropdown/BaseDropdown.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types } from '@/components/base/base-icon/types';
import type { IList } from './components/base/base-list/types';

const error = ref<string>('');
const current = ref<string>('');
const placeholder = ref<string>('Select any option, please');

const BaseIconComponent = {
  type: BaseIcon,
  props: {
    type: 'placeholder',
    name: 'IconPlaceholderBase',
    size: 'M'
  },
};

const List: IList[] = [
    {
      id: '1',
      label: 'Option 1',
      option: 'option1',
      component: BaseIconComponent
    },
    {
      id: '2',
      label: 'Option 2',
      option: 'option2',
      component: BaseIconComponent
    },
    {
      id: '3',
      label: 'Option 3',
      option: 'option3',
      component: BaseIconComponent
    },
    {
      id: '4',
      label: 'Option 4',
      option: 'option4',
      component: BaseIconComponent
    },
    {
      id: '5',
      label: 'Option 5',
      option: 'option5',
      component: BaseIconComponent
    }
];

const updateCurrent = (option: string): void => {
    current.value = option;
}
</script>
