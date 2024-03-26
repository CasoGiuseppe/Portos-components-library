import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTextarea from '@/components/base/base-textarea/BaseTextarea.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '@/components/base/base-icon/types'
import { action } from '@storybook/addon-actions'
import IconFeedbackInfo from '@ui/icons/feedback/IconFeedbackInfo.vue'

const meta = {
  title: 'Base/Base Textarea/Default',
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
    maxLength: 35,
    label: 'Textarea title',
    message: 'Fill this text area with your words'
  }
} satisfies Meta<typeof BaseTextarea>

export default meta

type Story = StoryObj<typeof BaseTextarea>

const Templates: Story = {
  render: (args, { Types, Sizes }) => ({
    components: { BaseTextarea, BaseIcon },
    setup() {
      return { args }
    },
    template: `
            <section style="display: flex; padding: 10px; background: #eee;">
            <BaseTextarea :id="'textarea-2'" :label="'label 2'" :maxLength="34" :placeholder="'Type your text'">
            <template #label> Slot label </template>
        
            <template #iconHelp>
              <Suspense>
                <base-icon
                  :id="'IconFeedbackError'"
                  :name="'IconFeedbackError'"
                  :type="args.Types.FEEDBACK"
                  :size="args.Sizes.XS"
                ></base-icon>
              </Suspense>
            </template>
            <template #iconClear>
              x
              
            </template>
            <template #error>
              ! mensaje error
            </template>
            <template #message>this is my message</template>
            <template #tooltip>this is my tooltip</template>
          </BaseTextarea>
            </section>
        `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
