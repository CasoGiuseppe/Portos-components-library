import type { Meta, StoryObj } from "@storybook/vue3"
import FieldSetList from "@/components/tools/fieldset-list/FieldSetList.vue"
import BaseCheckbox from "@/components/base/base-checkbox/BaseCheckbox.vue"
import { shallowRef, type Component } from "vue"
import { action } from '@storybook/addon-actions'

const component = shallowRef<Component>(BaseCheckbox);
const Fields = [
    {
        type: component,
        label: 'check1',
        props: {
            id: 'check1',
        }
    },
    {
        type: component,
        label: 'check2',
        props: {
            id: 'check2',
            active: true
        }
    },
    {
        type: component,
        label: 'check3',
        props: {
            id: 'check3',
        }
    }
]

const meta: Meta<typeof FieldSetList> = {
    title: "Tools/FiedlSetList",
    component: FieldSetList,
    tags: ["autodocs"],
    argTypes: {
        id: { control: 'text' },
        name: { control: 'text' },
        fields: { control: 'object', options: Fields },
        disabled: { control: 'radio', options: [true, false] },
        label: { control: 'text' },

    },

    args: {
        id: 'fieldSetId',
        name: 'checkboxTest',
        fields: Fields,
        disabled: false,
        label: 'Choose your select:'
      }
} as Meta<typeof FieldSetList>

export default meta

type Story = StoryObj<typeof FieldSetList>

export const Default: Story = {
    args: {},
    render: (args: any) => ({
        components: { FieldSetList },
        setup() {
            return { args }
        },
        template: `
        <section :style="{
                'display' : 'flex',
                'gap' : '10px',
                'padding' : '10px',
        }">
          <FieldSetList
            v-bind="args"
            @send="action"
          >
            <template #label>{{ args.label }}</template>
          </FieldSetList>
        </section>
    `,
        methods: { action: action('submitted') }
    })
}

