import type { Names, Types } from "@/components/base/base-icon/types";

export type UniqueId = string

interface IIconProps {
    type: Types
    name: Names
}

export interface IFileIcons {
    [key: string]: IIconProps;
}