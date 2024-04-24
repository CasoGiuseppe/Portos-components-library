import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import ToastBox from "@/components/tools/toast-box/ToastBox.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import {
    $uiDOMToastClose,
    $uiDOMToastFooter,
    $uiDOMToastHeader,
    $uiDOMToastBody
} from "./utilities"
import type { Type } from "../types"

describe("ToastBox component tests", () => {
    it("should mount", () => {
        const wrapper = mount(ToastBox, {
            global: {
                components: {
                    BaseIcon
                },
                stubs: {
                    BaseIcon: true
                }
            },
            props: {
                id: "toastId",
                isOpen: false
            }
        })

        expect(wrapper.exists()).toBeTruthy()
    })

    describe("Props tests", () => {
        it("should correctly set default props", () => {
            const wrapper = mount(ToastBox)
            expect(wrapper.props().id).toBe("toastId")
            expect(wrapper.props().type).toBe("info")
            expect(wrapper.props().tag).toBe("dialog")
            expect(wrapper.props().countDown).toEqual({
                active: false,
                duration: 3000
            })
        })
    })
    describe("Event tests", () => {
        it("should emit close event on click of close icon", async () => {
            const wrapper = mount(ToastBox, {
                global: {
                    components: {
                        BaseIcon
                    },
                    stubs: {
                        BaseIcon: true
                    }
                },
                props: {
                    id: "toastId",
                    canClose: true,
                    countDown: { active: false, duration: 3000 }
                },
                slots: {
                    header: "this is a header",
                    descripion: "this is a description",
                    footer: "<button>hello</button>"
                }
            })
            await wrapper.find(".toast-box__actions-close").trigger("click")
            expect(wrapper.emitted()).toHaveProperty("close")
        })

        it("should reset countDown on mouseover if countDown is active", async () => {
            const clearTimeoutMock = vi.spyOn(global, "clearTimeout")
            const wrapper = mount(ToastBox, {
                props: {
                    countDown: { active: true, duration: 3000 }
                }
            })
            await wrapper.trigger("mouseover")
            expect(clearTimeoutMock).toHaveBeenCalled()
        })

        it("should restart countDown on mouseleave if countDown is active", async () => {
            const setTimeoutMock = vi.spyOn(global, "setTimeout")
            const wrapper = mount(ToastBox, {
                props: {
                    countDown: { active: true, duration: 3000 }
                }
            })
            await wrapper.trigger("mouseleave")
            expect(setTimeoutMock).toHaveBeenCalledWith(
                expect.any(Function),
                3000
            )
        })
    })

    describe("Timer tests", () => {
        it("should start countDown on mount if countDown is active", () => {
            const setTimeoutSpy = vi.spyOn(global, "setTimeout")
            mount(ToastBox, {
                props: {
                    countDown: { active: true, duration: 3000 }
                }
            })
            expect(setTimeoutSpy).toHaveBeenCalledWith(
                expect.any(Function),
                3000
            )
        })

        it("should not start countDown on mount if countDown is not active", () => {
            const setTimeoutSpy = vi.spyOn(global, "setTimeout")
            mount(ToastBox, {
                props: {
                    countDown: { active: false, duration: 3000 }
                }
            })
            expect(setTimeoutSpy).not.toHaveBeenCalled()
        })
    })

    describe("ToastBox component structure tests", () => {
        it("should correctly apply class based on type and variant", () => {
            const wrapper = mount(ToastBox, {
                props: {
                    type: "error" as Type.ERROR,
                    variant: "inline"
                }
            })
            const classList = wrapper.attributes("class")
            expect(classList).toContain("toast-box--is-error")
        })
    })
})
