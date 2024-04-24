import type { Names, Types } from "@/components/base/base-icon/types";

export type UniqueId = string

interface IIconProps {
    type: Types
    name: Names
}

export interface IFileIcons {
    [key: string]: IIconProps;
}

export interface IFeedback {
    title?: string
    message: string
}

export enum AttachModes {
    DRAG = 'drag',
    BUTTON = 'button'
}