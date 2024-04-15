import type { Meta, StoryObj } from '@storybook/vue3'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import SliderShow from '@ui/slider/SliderShow.vue'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

const meta: Meta<typeof SliderShow> = {
  title: 'Tools/Slider',
  component: SliderShow,
  tags: ['autodocs'],
  args: {
    body: [
      {
        id: 1,
        label: 'This is a Label'
      },
      {
        id: 2,
        label: 'This is a Label'
      },
      {
        id: 3,
        label: 'This is a Label'
      },
      {
        id: 4,
        label: 'This is a Label'
      },
      {
        id: 5,
        label: 'This is a Label'
      },
      {
        id: 6,
        label: 'This is a Label'
      },
      {
        id: 7,
        label: 'This is a Label'
      },
      {
        id: 8,
        label: 'This is a Label'
      },
      {
        id: 9,
        label: 'This is a Label'
      },
      {
        id: 10,
        label: 'This is a Label'
      },
      {
        id: 11,
        label: 'This is a Label'
      }
    ]
  },

  subcomponents: { NavigationItemContextual, BaseIcon }
}

export default meta

type Story = StoryObj<typeof SliderShow>

export const Default: Story = {
  args: {},
  render: (args: any) => ({
    components: { SliderShow, NavigationItemContextual, BaseIcon },
    setup() {
      return { args }
    },
    template: `
        <section style="width: 70vw; padding: 10px">
          <SliderShow :body="args.body">
            <template #item="{ property: { label, id } }">
              <div
                :id="id"
                class="slider-item"
              >{{ label }}{{ id }}</div>
            </template>
          </SliderShow>
        </section>
    `,
    methods: {
      handleSend: (id: string) => {
        args.items = args.items!.map((item: any) => ({
          ...item,
          selected: item.id === id
        }))
      }
    }
  })
}
