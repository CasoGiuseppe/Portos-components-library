import { shallowRef, type Component } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

import BaseList from '@/components/base/base-list/BaseList.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Mode } from '@/components/base/base-list/types';

const BaseIconRef = shallowRef<Component>(BaseIcon);

const BaseIconComponent = {
  type: BaseIconRef,
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
    component: BaseIconComponent
  },
  {
    id: '2',
    label: 'option 2',
    option: 'option2',
    component: BaseIconComponent
  },
  {
    id: '3',
    label: 'option 3',
    option: 'option3',
    component: BaseIconComponent
  },
  {
    id: '4',
    label: 'option 4',
    option: 'option4',
    component: BaseIconComponent
  },
  {
    id: '5',
    label: 'option 5',
    option: 'option5',
    component: BaseIconComponent
  }
];

const meta: Meta = {
  title: 'Base/Base List',
  component: BaseList,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    list: { control: 'object', options: List },
    current: { control: 'select', options: ['option1', 'option2', 'option3'] },
    mode: { control: 'select', options: Object.values(Mode)},
    visibleOptions: { control: 'number' },
    row: { control: 'text' }
  },
  
  args: {
    id: 'linkId',
    list: List,
    current: 'option3',
    mode: Mode.DEFAULT,
    visibleOptions: 3
  }
} as Meta<typeof BaseList>;
  
export default meta;
  
type Story = StoryObj;

const Templates: Story = {
  render: (args) => ({
    components: { BaseList, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <section
        :style="{
          'display' : 'flex',
          'gap' : '10px',
          'padding' : '10px',
        }"
      >
        <BaseList
          v-bind="args"
          @send="action"
        >
          <template #row="{ label }">{{ label }}</template>
          <template #component="{ component }">
            <Component
                v-if="component"
                :is="component.type"
                v-bind="component.props"
            />
          </template>
        </BaseList>
      </section>
    `,
    methods: { action: action('submitted') }
  })
};
  
export const Default: Story = {
  ...Templates,
  args: {}
};