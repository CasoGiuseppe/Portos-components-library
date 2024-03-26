import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTextarea from '@/components/base/base-textarea/BaseTextarea.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'

const meta = {
  title: 'Base/Base Textarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    proxyValue: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'radio', options: [true, false] },
    disabled: { control: 'radio', options: [true, false] },
    maxLength: { control: 'number' },
    label: { control: 'text' },
    message: { control: 'text' },
    error: { control: 'text' },
    optional: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    id: 'textareaId',
    placeholder: 'Add here your text',
    required: true,
    disabled: false,
    label: 'Textarea title',
    message: 'Fill this text area with your words',
    maxLength: 30,
    rows: 3
  }
} satisfies Meta<typeof BaseTextarea>

export default meta

type Story = StoryObj<typeof BaseTextarea>

const Templates: Story = {
  render: (args, { updateArgs } ) => ({
    components: { BaseTextarea, BaseIcon },
    setup() {
      return { args }
    },
    template: `
            <section style="display: flex; padding: 10px; background: #eee;">
            <BaseTextarea
              v-bind="args"
              @invalid="setInvalid"
            >
              <template #label> Slot label </template>
              <template #clear>
                <Suspense><BaseIcon id="IconEditCleanCircle" name="IconEditCleanCircle" type="edit" /></Suspense>
              </template>
              <template #error>
                {{args.error}}
              </template>
              <template #message>this is my message</template>
            </BaseTextarea>
            </section>
        `,
        methods: {
          setInvalid({value}: {value: string}) {
              updateArgs({ ...args, error: value
                  ? 'mensaje error'
                  : null })
          },
      }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
