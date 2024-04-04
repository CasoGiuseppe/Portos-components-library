import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BaseCheckbox from "@/components/base/base-checkbox/BaseCheckbox.vue"
import { Types, Sizes } from "@/components/base/base-checkbox/types"

describe("BaseCheckbox component tests", () => {
    describe("On rendering component", () => {
        it("should render default status when no props are provided", () => {
            const wrapper = mount(BaseCheckbox, {
                slots: {
                    default: "DEFAULT"
                }
            })
            expect(wrapper.classes()).toContain("base-checkbox--is-default")
        })
        it("should render the disabled state correctly", async () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    disabled: true
                }
            })
            const checkbox = wrapper.find('[data-testID="ui-checkbox"]')
                .element as HTMLInputElement

            expect(checkbox.disabled).toBe(true)
        })
        it("should have the correct size class based on the size prop", () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    size: Sizes.S
                }
            })

            expect(wrapper.classes()).toContain("base-checkbox--is-S")
        })

        it("should render the active state correctly", async () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    active: true
                }
            })

            const checkbox = wrapper.find('[data-testID="ui-checkbox"]')
                .element as HTMLInputElement
            expect(checkbox.checked).toBe(true)
        })
        it("should have the correct status class based on the status prop", () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    status: Types.ERROR
                }
            })

            expect(wrapper.classes()).toContain("base-checkbox--is-error")
        })
    })

    describe("when state changes", () => {
        it('should emit "checked" event with correct payload ', async () => {
            const wrapper = mount(BaseCheckbox)
            await wrapper.find('input[type="checkbox"]').setValue(true)
            expect(wrapper.emitted()).toHaveProperty("checked")
        })
        it("should toggle state when clicked", async () => {
            const wrapper = mount(BaseCheckbox)
            const checkboxInput = wrapper.find('input[type="checkbox"]')
                .element as HTMLInputElement
            await wrapper.find('input[type="checkbox"]').setValue(true)
            expect(checkboxInput.checked).toBe(true)
        })
    })

    describe("when indeterminate prop is true", () => {
        it("should renders an indeterminate checkbox ", () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    indeterminate: true
                }
            })
            expect(wrapper.vm.indeterminate).toBe(true)
        })
    })

    describe("when variant prop is true", () => {
        it("should applies the --is-ALT class ", () => {
            const wrapper = mount(BaseCheckbox, {
                props: {
                    variant: true
                }
            })

            expect(wrapper.classes()).toContain("base-checkbox--is-ALT")
        })
    })
})
