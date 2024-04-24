export type UniqueId = string

export enum Type {
    SUCCESS = "success",
    WARNING = "warning",
    INFO = "info",
    ERROR = "error"
}

export enum Tags {
    DIALOG = 'dialog',
    ASIDE = 'aside',
}

export interface IContdown {
    active: boolean
    duration: number
}
