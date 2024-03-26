import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTextarea from '@/components/base/base-textarea/BaseTextarea.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { action } from '@storybook/addon-actions'

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
    optional: { control: 'text' }
  },
  args: {
    id: 'textareaId',
    placeholder: 'Add here your text',
    required: false,
    disabled: false,
    label: 'Textarea title',
    message: 'Fill this text area with your words'
  }
} satisfies Meta<typeof BaseTextarea>

export default meta

type Story = StoryObj<typeof BaseTextarea>

const Templates: Story = {
  render: (args ) => ({
    components: { BaseTextarea, BaseIcon },
    setup() {
      return { args }
    },
    template: `
            <section style="display: flex; padding: 10px; background: #eee;">
            <BaseTextarea v-bind="args">
              <template #label> Slot label </template>
          
              <template #iconHelp>
                <Suspense>
                  <BaseIcon
                    id="'IconFeedbackError'"
                    name="'IconFeedbackError'"
                    type="feedback"
                    size="xs"
                  />
                </Suspense>
              </template>
              <template #clear>
                <BaseIcon id="IconEditCleanCircle" name="IconEditCleanCircle" type="edit" />
              </template>
              <template #error>
                ! mensaje error
              </template>
              <template #message>this is my message</template>
            </BaseTextarea>
            </section>
        `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
