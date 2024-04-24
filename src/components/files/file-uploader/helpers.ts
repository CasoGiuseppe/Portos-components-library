import { type IFileIcons } from './types';
import { Types } from '@/components/base/base-icon/types';

export const fileIcons: IFileIcons = {
    'application/pdf': {
        type: Types.FILE,
        name: 'IconFilePdf'
    },
    'image/gif': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'image/jpeg': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'image/png': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        type: Types.FILE,
        name: 'IconFileExcel'
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        type: Types.FILE,
        name: 'IconFileWord'
    }
};