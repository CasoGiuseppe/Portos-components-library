import type { Meta, StoryObj } from "@storybook/vue3";
import { vueRouter } from 'storybook-vue3-router';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import SliderShow from "@ui/tools/slider-tool/SliderTool.vue";
import NavigationItemContextual from "@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue";
import {shallowRef, type Component } from "vue";

const NavigationItemContextualRef = shallowRef<Component>(NavigationItemContextual);
const Body = [
    {
        id: 1,
        label: "Label 1",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID1',
            }
        }
    },
    {
        id: 2,
        label: "Label 2",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID2',
            }
        }
    },
    {
        id: 3,
        label: "Label 3",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID3',
            }
        }
    },
    {
        id: 4,
        label: "Label 4",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID4',
                selected: true
            }
        }
    },
    {
        id: 5,
        label: "Label 5",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID5',
            }
        }
    },
    {
        id: 6,
        label: "Label 6",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID6',
            }
        }
    },
    {
        id: 7,
        label: "Label 7",
        component: {
            type: NavigationItemContextualRef,
            props: {
                id: 'navigationID7',
            }
        }
    }
]
const meta: Meta<typeof SliderShow> = {
    title: "Tools/Slider",
    component: SliderShow,
    tags: ["autodocs"],
    argTypes: {
        body: { control: 'object', options: Body },
    },
    args: {
        body: Body
    },
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
        <section style="width: 30vw; padding: 10px">
          <SliderShow :body="args.body">
            <template #item="{ property: { label, id, component: { type, props } } }">
                <Component
                    v-if="type"
                    :is="type"
                    :id="id"
                    v-bind="props"
                >{{ label }}</Component>
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

Default.decorators = [
    vueRouter()
  ]
