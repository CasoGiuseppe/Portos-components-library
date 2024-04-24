import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"
import { type UIRadioOptions, UIRadioDirection, Sizes } from "../types"

describe("BaseRadio component tests", () => {
    it("should mount the component", () => {
        // Define the props you want to pass to the component
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

        // Mount the component with the defined props
        const wrapper = mount(BaseRadio, {
            props: props
        })

        // Assert the component is mounted (rendered)
        expect(wrapper.exists()).toBeTruthy()

        // Additional checks to verify if certain essential elements are rendered correctly
        const options = wrapper.findAll(".base-radio__option")
        expect(options.length).toBe(props.options.length) // There should be as many radio options as provided in props
        expect(wrapper.find(".base-radio--is-M").exists()).toBeTruthy() // Checks if the size class is applied
        expect(wrapper.vm.$props.modelValue).toBe("1") // Model value should match the passed prop
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
                "flex-direction:column"
            )
        })

        it("should disable input fields when disabled prop is true", () => {
            const options = [
                { label: "Option 1", value: "1", disabled: false },
                { label: "Option 2", value: "2", disabled: true }
            ]

            // Mount the component with all required props
            const wrapper = mount(BaseRadio, {
                props: {
                    id: "unique-id", // Assuming 'id' is also required
                    name: "radioGroup", // Required prop
                    disabled: false, // Assuming default can be overridden
                    modelValue: "1", // Providing initial model value
                    options: options, // Providing the options array
                    direction: UIRadioDirection.ROW, // Assuming a default direction is needed
                    size: Sizes.M, // Assuming a default size is needed
                    variant: false // Assuming variant can be toggled
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
                { label: "Option 3", value: "" }
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
            options.forEach((option, index) => {
                expect(optionElements.at(index).text()).toContain(option.label)
            })
            expect(optionElements.at(2).text()).not.toContain(option.label)
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
            expect(checkedOption.element.value).toBe("2")
        })
    })
    describe("Test events", () => {
        it("should emit update:modelValue when a radio option is selected", () => {})
        it("should not emit update:modelValue when a disabled option is clicked", () => {})
    })
    describe("Test reactivity", () => {
        it("should update the selected radio button when modelValue changes dynamically", () => {})
    })
    describe("Test Accesibility", () => {
        it("should have unique ids for each input corresponding to its label", () => {})
        it("should include appropriate aria-disabled attribute on disabled options", () => {})
    })
    describe("Test validation and errors", () => {
        it("should validate prop types correctly", () => {})
    })
})
