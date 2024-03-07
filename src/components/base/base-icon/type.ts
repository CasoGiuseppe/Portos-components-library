import * as custom from '@ui/icons';

export enum IconType {
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
}

export type IconName = keyof typeof custom