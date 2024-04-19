import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import ModalDialog from "@/components/modal/ModalDialog.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"

describe("ModalDialog component tests", () => {
    it("should mount", () => {
        const wrapper = mount(ModalDialog, {
            global: {
                components: {
                    BaseIcon
                },
                stubs: {
                    BaseIcon: true
                }
            },
            props: {
                id: "testModal",
                isOpen: false,
                size: "narrow"
            }
        })

        expect(wrapper.exists()).toBeTruthy()
    })

    describe("When isOpen is modified,", () => {
        it("dialog should appear if is true", async () => {
            window.HTMLDialogElement.prototype.showModal = vi.fn()

            const wrapper = mount(ModalDialog, {
                global: {
                    components: {
                        BaseIcon
                    },
                    stubs: {
                        BaseIcon: true
                    }
                },
                props: {
                    id: "testModal",
                    isOpen: true,
                    size: "narrow"
                }
            })

            await wrapper.vm.$nextTick()

            expect(
                window.HTMLDialogElement.prototype.showModal
            ).toHaveBeenCalled()
        })
        it("dialog should hide if is false", async () => {
            window.HTMLDialogElement.prototype.showModal = vi.fn()

            const wrapper = mount(ModalDialog, {
                global: {
                    components: {
                        BaseIcon
                    },
                    stubs: {
                        BaseIcon: true
                    }
                },
                props: {
                    id: "testModal",
                    isOpen: false,
                    size: "narrow"
                }
            })

            await wrapper.vm.$nextTick()

            expect(
                window.HTMLDialogElement.prototype.showModal
            ).not.toHaveBeenCalled()
        })
    })

    describe("Event handling: when isOpen is true and dialog is opened", () => {
        it("should emit 'open' ", async () => {
            window.HTMLDialogElement.prototype.showModal = vi.fn()

            const wrapper = mount(ModalDialog, {
                global: {
                    components: { BaseIcon },
                    stubs: { BaseIcon: true }
                },
                props: {
                    isOpen: true,
                    size: "narrow"
                }
            })

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted()).toHaveProperty("open")
        })

        it("should emit 'close' when dialog is manually closed", async () => {
            window.HTMLDialogElement.prototype.close = vi.fn()

            const wrapper = mount(ModalDialog, {
                global: {
                    components: { BaseIcon },
                    stubs: { BaseIcon: true }
                },
                props: {
                    isOpen: true,
                    size: "narrow"
                }
            })

            wrapper.vm.close()
            await wrapper.vm.$nextTick()

            expect(window.HTMLDialogElement.prototype.close).toHaveBeenCalled()
            expect(wrapper.emitted()).toHaveProperty("close")
        })
    })

    describe("When slot is provided", () => {
        it("renders header and default slots ", () => {
            const wrapper = mount(ModalDialog, {
                global: {
                    components: { BaseIcon },
                    stubs: { BaseIcon: true }
                },
                props: {
                    id: "testModal",
                    isOpen: true,
                    size: "narrow"
                },
                slots: {
                    header: "<div>Test Header</div>",
                    default: "<div>Test Content</div>"
                }
            })

            expect(wrapper.html()).toContain("Test Header")
            expect(wrapper.html()).toContain("Test Content")
        })
    })
})
