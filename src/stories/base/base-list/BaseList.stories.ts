import type { Meta, StoryObj } from '@storybook/vue3';
import BaseList from '@/components/base/base-list/BaseList.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Mode } from '@/components/base/base-list/types';
import { action } from '@storybook/addon-actions'
import { shallowRef, type Component } from 'vue';


const component = shallowRef<Component>(BaseIcon)
const Icon = {
    type: component,
    props: {
        type: 'arrow',
        name: 'IconArrowCircleRight',
        size: 'M'
    },
}

const List = [
    {
        id: '1',
        label: 'option 1',
        option: 'option1',
        icon: Icon
    },
    {
        id: '2',
        label: 'option 2',
        option: 'option2',
        icon: Icon
    },
    {
        id: '3',
        label: 'option 3',
        option: 'option3',
        icon: Icon
    },
    {
        id: '4',
        label: 'option 4',
        option: 'option4',
        icon: Icon
    },
    {
        id: '5',
        label: 'option 5',
        option: 'option5',
        icon: Icon
    }
]


const meta: Meta = {
    title: 'Base/Base List',
    component: BaseList,
    tags: ['autodocs'],
    argTypes: {
      id: { control: 'text' },
      list: { control: 'object', options: List },
      current: { control: 'select', options: ['option1', 'option2', 'option3'] },
      mode: { control: 'select', options: Object.values(Mode)},
      visibleOptions: { conttol: 'number' },
      row: { control: 'text' }
    },
    
    args: {
      id: 'linkId',
      list: List,
      current: 'option3',
      mode: Mode.DEFAULT,
      visibleOptions: 2
    }
  } as Meta<typeof BaseList>
  
  export default meta
  
  type Story = StoryObj

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
                <template #icon="{ icon }">
                  <component
                      v-if="icon"
                      :is="icon.type"
                      v-bind="icon.props"
                  />
                </template>
            </BaseList>
          </section>
      `,
      methods: { action: action('submitted') }
    })
  }
  
  export const Default: Story = {
    ...Templates,
    args: {}
  }