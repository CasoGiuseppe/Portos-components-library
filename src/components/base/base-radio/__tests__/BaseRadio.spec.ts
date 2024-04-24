import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"
import { UIRadioDirection, Sizes } from "../types"

describe("BaseRadio component tests", () => {
    it("should mount the component", () => {
        const props = {
            id: "test-radio",
            name: "testRadioGroup",
            options: [
                { label: "Option 1", value: "1", disabled: false },
                { label: "Option 2", value: "2", disabled: true }
            ],
            modelValue: "1",
            direction: UIRadioDirection.ROW,
            size: Sizes.M,
            variant: false
        }

        const wrapper = mount(BaseRadio, {
            props: props
        })

        expect(wrapper.exists()).toBeTruthy()

        const options = wrapper.findAll(".base-radio__option")
        expect(options.length).toBe(props.options.length)
        expect(wrapper.find(".base-radio--is-M").exists()).toBeTruthy()
        expect(wrapper.vm.$props.modelValue).toBe("1")
    })

    describe("Test props", () => {
        it("should correctly apply size prop to class", () => {
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: [
                        { label: "Option 1", value: "1", disabled: false },
                        { label: "Option 2", value: "2", disabled: true }
                    ],
                    modelValue: "1",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })
            expect(wrapper.classes()).toContain("base-radio--is-M")
        })

        it("should handle different direction props", () => {
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: [
                        { label: "Option 1", value: "1", disabled: false },
                        { label: "Option 2", value: "2", disabled: true }
                    ],
                    modelValue: "1",
                    direction: UIRadioDirection.COLUMN,
                    size: Sizes.M,
                    variant: false
                }
            })
            expect(wrapper.attributes("style")).toContain(
                "flex-direction: column"
            )
        })

        it("should disable input fields when disabled prop is true", () => {
            const options = [{ label: "Option 2", value: "2", disabled: true }]

            const wrapper = mount(BaseRadio, {
                props: {
                    id: "unique-id",
                    name: "radioGroup",
                    disabled: false,
                    modelValue: "1",
                    options: options,
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })
            wrapper.findAll("input").forEach((input) => {
                expect(input.attributes("disabled")).toBeDefined()
            })
        })

        it("should only render options that are passed", () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    modelValue: "1",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })
            const optionElements = wrapper.findAll(".base-radio__option")
            expect(optionElements.length).toBe(options.length)

            if (optionElements && optionElements.length > 0) {
                expect(optionElements[0].text()).toContain(options[0].label)
                expect(optionElements[1].text()).toContain(options[1].label)
                expect(optionElements[2].text()).toContain(options[2].label)
            }
        })

        it("should reflect the initial modelValue", () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "" }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    modelValue: "2",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })

            const checkedOption = wrapper.find("input:checked")

            if (checkedOption.element instanceof HTMLInputElement) {
                expect(checkedOption.element.value).toBe("2")
            } else {
                throw new Error("Checked element is not an input element")
            }
        })
    })
    describe("Test events", () => {
        it("should emit update:modelValue when a radio option is selected", async () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    modelValue: "2",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })

            await wrapper
                .find('input[type="radio"][value="1"]')
                .trigger("change")

            expect(wrapper.emitted()).toHaveProperty("update:modelValue")

            expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["1"])
        })
        it("should not emit update:modelValue when a disabled option is clicked", async () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2", disabled: true }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    modelValue: "2",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })

            await wrapper
                .find('input[type="radio"][value="2"]')
                .trigger("change")

            expect(wrapper.emitted()["update:modelValue"]).toBeUndefined()
        })
    })
    describe("Test reactivity", () => {
        it("should update the selected radio button when modelValue changes dynamically", async () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    modelValue: "1",
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })

            let checkedInput = wrapper.find("input:checked")

            if (checkedInput.element instanceof HTMLInputElement) {
                expect(checkedInput.element.value).toBe("1")
            } else {
                throw new Error("Checked element is not an input element")
            }

            await wrapper.setProps({ modelValue: "3" })

            checkedInput = wrapper.find("input:checked")

            if (checkedInput.element instanceof HTMLInputElement) {
                expect(checkedInput.element.value).toBe("3")
            } else {
                throw new Error("Checked element is not an input element")
            }
        })
    })
    describe("Test Accesibility", () => {
        it("should have unique ids for each input corresponding to its label", () => {
            const options = [
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options
                }
            })

            options.forEach((option, index) => {
                const inputId = `test-radio-${index}`
                const input = wrapper.find(`input#${inputId}`)
                const label = wrapper.find(`label[for="${inputId}"]`)

                expect(input.exists()).toBe(true)
                expect(label.exists()).toBe(true)
                expect(label.text()).toBe(option.label)
            })
        })
        it("should include appropriate aria-disabled attribute on disabled options", () => {
            const options = [
                { label: "Option 1", value: "1", disabled: false },
                { label: "Option 2", value: "2", disabled: true },
                { label: "Option 3", value: "3", disabled: false }
            ]
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "test-radio",
                    name: "testRadioGroup",
                    options: options,
                    direction: UIRadioDirection.ROW,
                    size: Sizes.M,
                    variant: false
                }
            })

            options.forEach((option) => {
                const input = wrapper.find(
                    `input[type="radio"][value="${option.value}"]`
                )

                if (option.disabled) {
                    expect(input.attributes("aria-disabled")).toBe("true")
                } else {
                    expect(input.attributes("aria-disabled")).toBe("false")
                }
            })
        })
    })
})
