import type { INavigationItem } from "../types";
import { Types } from "@/components/base/base-icon/types";

const items: INavigationItem[] = [
    {
        label: 'Mi Panel',
        type: Types.LOCATION,
        icon: 'IconLocationHouse'
    },
    {
        label: 'Unidades',
        type: Types.LOCATION,
        icon: 'IconLocationUnit',
        children: [
            {
                label: 'Ficha de unidad',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            },
            {
                label: 'Stock Search',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            },
            {
                label: 'Bolsa de unidades',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            }
        ]
    },
    {
        label: 'Granel',
        type: Types.MISCELLANEA,
        icon: 'IconMiscellaneaLeaf'
    },
    {
        label: 'Operaciones',
        type: Types.LOCATION,
        icon: 'IconLocationBuilding'
    },
    {
        label: 'Puerta',
        type: Types.ARROW,
        icon: 'IconArrowLeftRight'
    },
    {
        label: 'Custom',
        type: Types.PLACEHOLDER,
        icon: 'IconPlaceholderBase'
    },
    {
        label: 'Maestros',
        type: Types.USER,
        icon: 'IconUserUserCardId'
    },
    {
        label: 'Facturación',
        type: Types.FILE,
        icon: 'IconFileBilling'
    },
    {
        label: 'Configuración',
        type: Types.SYSTEM,
        icon: 'IconSystemConfiguration',
        children: [
            {
                label: 'Ficha de unidad',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            },
            {
                label: 'Stock Search',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            },
            {
                label: 'Bolsa de unidades',
                type: Types.LOCATION,
                icon: 'IconLocationUnit',
            }
        ]
    }
];

export default items;