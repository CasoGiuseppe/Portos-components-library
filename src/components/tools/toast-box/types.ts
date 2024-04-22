export type UniqueId = string

export enum UIToastType {
    SUCCESS = "success",
    WARNING = "warning",
    INFO = "info",
    ERROR = "error"
}

export type UIToastTag = "dialog" | "aside"
export type UIToastVisibility = "visible" | "hidden"

export interface UIToastTimer {
    active: boolean
    duration: number
}
