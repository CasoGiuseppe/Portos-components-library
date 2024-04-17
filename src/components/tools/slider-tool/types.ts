import type { Component } from "vue"

export type UniqueId = string | number

type IComponent = {
    type: Component,
    props?: Record<string, any>
}

export type ISliderItems = {
    id: UniqueId,
    label: string,
    component?: IComponent
}