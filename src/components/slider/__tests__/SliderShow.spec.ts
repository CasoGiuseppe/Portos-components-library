// core
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { type ComponentPublicInstance } from 'vue'
// components
import SliderShow from '@ui/slider/SliderShow.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
// utils
import {
    $providedSlot,
    $providedSlotContent,
    $providedBody,
    $uiDOMSliderItem,
    $uiDOMSliderNextButton,
    $uiDOMSliderPrevButton
} from './utilities'

class IntersectionObserverMock {
    root: Element | null = null
    rootMargin: string = ''
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
    setNewPositionVariable: (params: { position: number }) => void
}

describe('Slider Component', () => {
    beforeAll(() => {
        // @ts-ignore
        global.IntersectionObserver = IntersectionObserverMock
    })

    describe('When component loads', () => {
        it('it should render component', () => {
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
        it('should render slot content within each slider item', () => {
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
        it('should apply correct classes to slider items based on their properties', () => {
            const wrapper = mount(SliderShow, {
                props: { body: [{ id: '1', label: 'Item 1', className: 'custom-class' }] },
                global: {
                    components: { BaseIcon },
                    stubs: { Suspense: true }
                }
            })

            const firstItem = wrapper.find($uiDOMSliderItem)
            expect(firstItem.classes()).toContain('custom-class')
        })
    })

    describe('Interaction with navigation buttons', () => {
        let wrapper: any
        beforeEach(() => {
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
            vi.spyOn(wrapper.vm, 'setNewPositionVariable')
            vi.spyOn(wrapper.vm, 'moveTo')
        })

        it('should call moveTo with prev when previous button is clicked', async () => {
            await wrapper.find($uiDOMSliderPrevButton).trigger('click')
            await wrapper.vm.$nextTick()

            expect(wrapper.vm.moveTo).toHaveBeenCalledWith({ type: 'prev' })
        })

        it('should call moveTo with next when next button is clicked', async () => {
            await wrapper.find($uiDOMSliderNextButton).trigger('click')
            expect(wrapper.vm.moveTo).toHaveBeenCalledWith({})
        })
    })

    describe('Transition Handling', () => {
        let wrapper: VueWrapper<ComponentPublicInstance>
        let vm: SliderShowInstance

        beforeEach(() => {
            wrapper = mount(SliderShow, {
                props: { body: $providedBody },
                global: {
                    components: { BaseIcon },
                    stubs: { Suspense: true }
                }
            })
            vm = wrapper.vm as SliderShowInstance
        })
        it('should re-enable the component after transition ends', async () => {
            await wrapper.find($uiDOMSliderNextButton).trigger('click')
            await wrapper.vm.$nextTick()
            wrapper.find('.slider__list').trigger('transitionend')

            expect(vm.isDisabled).toBe(false)
        })
    })
})
