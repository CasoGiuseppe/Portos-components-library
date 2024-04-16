<template>
      <section
        :style="{
          'display' : 'flex',
          'gap' : '10px',
          'padding' : '10px',
        }"
      >
        <BaseList v-bind="args">
          <template #row="{ label }">{{ label }}</template>
          <template #component="{ component }">
            <component
              v-if="component"
              :is="component.type"
              v-bind="component.props"
            />
          </template>
        </BaseList>
      </section>
</template>

<script setup lang="ts">
import BaseList from './components/base/base-list/BaseList.vue';
import BaseIcon from './components/base/base-icon/BaseIcon.vue';

const Component = {
  type: BaseIcon,
  props: {
    type: 'arrow',
    name: 'IconArrowCircleRight',
    size: 'M'
  },
};

const List = [
  {
    id: '1',
    label: 'option 1',
    option: 'option1',
    component: Component
  },
  {
    id: '2',
    label: 'option 2',
    option: 'option2',
    component: Component
  },
  {
    id: '3',
    label: 'option 3',
    option: 'option3',
    component: Component
  },
  {
    id: '4',
    label: 'option 4',
    option: 'option4',
    component: Component
  },
  {
    id: '5',
    label: 'option 5',
    option: 'option5',
    component: Component
  }
];

const args = {
    id: 'linkId',
    list: List,
    current: 'option3',
    mode: 'dropdown',
    visibleOptions: 5
  }
</script>
