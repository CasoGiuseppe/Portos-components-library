import * as custom from '@ui/icons';

export type UniqueId = string;
export enum Sizes {
    M = 'M',
    L = 'L',
    S = 'S',
    XS = 'XS',
}

export enum Types {
    ARROW = 'arrow',
    CALENDAR =  'calendar',
    CHEVRON = 'chevron',
    COMMUNICATION = 'communication',
    EDIT = 'edit',
    FEEDBACK = 'feedback',
    FILE = 'file',
    LOCATION = 'location',
    MISCELLANEA = 'miscellanea',
    NAVIGATION = 'navigation',
    SYSTEM = 'system',
    USER = 'user',
    PLACEHOLDER = 'placeholder'
}

export type Names = keyof typeof custom