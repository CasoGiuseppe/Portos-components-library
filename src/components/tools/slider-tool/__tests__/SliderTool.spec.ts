// core
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { type ComponentPublicInstance } from "vue"
// components
import SliderShow from "@ui/tools/slider-tool/SliderTool.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
// utils
import {
    $providedSlot,
    $providedSlotContent,
    $providedBody,
    $uiDOMSliderItem,
    $uiDOMSliderNextButton,
    $uiDOMSliderPrevButton
} from "./utilities"

class IntersectionObserverMock {
    root: Element | null = null
    rootMargin: string = ""
    thresholds: ReadonlyArray<number> = []
    takeRecords(): IntersectionObserverEntry[] {
        return []
    }

    constructor(
        public callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit
    ) {}

    observe(target: Element): void {}

    unobserve(target: Element): void {}

    disconnect(): void {}
}

// mocked instance of component to use refs
interface SliderShowInstance extends ComponentPublicInstance {
    isDisabled: boolean
    moveTo: (options: { type?: string }) => void
    //setNewPositionVariable: (params: { position: number }) => void
}

describe("Slider Component", () => {
    beforeAll(() => {
        // @ts-ignore
        global.IntersectionObserver = IntersectionObserverMock
    })

    describe("When component loads", () => {
        it("it should render component", () => {
            const body = $providedBody

            const wrapper = mount(SliderShow, {
                props: { body },
                global: {
                    components: {
                        BaseIcon
                    },
                    stubs: {
                        Suspense: true
                    }
                }
            })

            expect(wrapper.exists()).toBe(true)
            expect(wrapper.findAll($uiDOMSliderItem).length).toBe(body.length)
            expect(wrapper.find($uiDOMSliderPrevButton).exists()).toBe(true)
            expect(wrapper.find($uiDOMSliderNextButton).exists()).toBe(true)
        })
        it("should render slot content within each slider item", () => {
            const slotContent = $providedSlotContent
            const wrapper = mount(SliderShow, {
                props: { body: $providedBody },
                slots: {
                    item: slotContent
                },
                global: {
                    components: { BaseIcon },
                    stubs: { Suspense: true }
                }
            })

            expect(wrapper.html()).toContain(slotContent)
        })
    })

    describe("Interaction with navigation buttons", () => {
        let wrapper: any
        beforeEach(() => {
            window.HTMLElement.prototype.scrollIntoView = vi.fn()
            const body = $providedBody

            wrapper = mount(SliderShow, {
                props: { body },
                slots: {
                    item: $providedSlot
                },
                global: {
                    components: { BaseIcon },
                    stubs: { Suspense: true }
                }
            })

            // Stubbing internal methods to monitor calls and behavior.
            vi.spyOn(wrapper.vm, "moveTo")
        })

        it("should call moveTo with prev when previous button is clicked", async () => {
            await wrapper.find($uiDOMSliderPrevButton).trigger("click")
            await wrapper.vm.$nextTick()

            expect(wrapper.vm.moveTo).toHaveBeenCalledWith({ type: "prev" })
        })

        it("should call moveTo with next when next button is clicked", async () => {
            await wrapper.find($uiDOMSliderNextButton).trigger("click")
            await wrapper.vm.$nextTick()

            expect(wrapper.vm.moveTo).toHaveBeenCalledWith({})
        })
    })
})
