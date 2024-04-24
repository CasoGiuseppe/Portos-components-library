import { shallowRef, type Component } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';

import BaseDropdown from '@/components/base/base-dropdown/BaseDropdown.vue';
import BaseList from '@/components/base/base-list/BaseList.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";

const BaseIconRef = shallowRef<Component>(BaseIcon);

const BaseIconComponent = {
  type: BaseIconRef,
  props: {
    type: 'placeholder',
    name: 'IconPlaceholderBase',
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
    title: 'Base/Base Dropdown',
    component: BaseDropdown,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        value: { control: 'text' },
        current: { control: 'text' },
        disabled: { control: 'radio', options: [true, false] },
        required: { control: 'radio', options: [true, false] },
        error: { control: 'text' },
    },
    
    args: {
        id: 'dropdownId',
        current: 'option5',
        disabled: false,
        required: false,
        list: List,
    }
} as Meta<typeof BaseList>;

export default meta;
  
type Story = StoryObj;

const Templates: Story = {
    render: (args, { updateArgs }) => ({
      components: { BaseDropdown, BaseList, BaseIcon },
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
            <BaseDropdown v-bind="args">
                <template #header>
                    <label>Label</label>
                </template>
                <template #list>
                    <BaseList
                        :list="args.list"
                        mode="dropdown"
                        :current="args.current"
                        :visible-options="3"
                        @send="changeCurrentValue"
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
                </template>
                <template #error v-if="args.error">{{ args.error }}</template>
            </BaseDropdown>
        </section>
      `,
      methods: {
        changeCurrentValue({ label, option }: { label: string, option: string }): void {
          updateArgs({ value: label,  current: option })
        }
    }
    })
  };

  export const Default: Story = {
    ...Templates,
    args: {}
  };