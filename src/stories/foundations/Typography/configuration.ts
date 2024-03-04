export default [
    {
        area: 'Display',
        items: [
            {
                token: 'Display L',
                class: 'typography--is-display-l',
                copy: '@include text-display-l'
            },
            {
                token: 'Display M',
                class: 'typography--is-display-m',
                copy: '@include text-display-m'
            },
            {
                token: 'Display S',
                class: 'typography--is-display-s',
                copy: '@include text-display-s'
            }
        ]
    },

    {
        area: 'Heading',
        items: [
            {
                token: 'Heading L',
                class: 'typography--is-heading-l',
                copy: '@include text-heading-l'
            },
            {
                token: 'Heading M',
                class: 'typography--is-heading-m',
                copy: '@include text-heading-m'
            }
        ]
    },

    {
        area: 'Body text',
        items: [
            {
                token: 'Body M (bold)',
                class: 'typography--is-body-m',
                copy: '@include text-body-m--bold'
            },
            {
                token: 'Body M (regular)',
                class: 'typography--is-body-m-regular',
                copy: '@include text-body-m--regular'
            },
            {
                token: 'Body S (bold)',
                class: 'typography--is-body-s',
                copy: '@include text-body-s--bold'
            },
            {
                token: 'Body S (regular)',
                class: 'typography--is-body-s-regular',
                copy: '@include text-body-s--regular'
            },
            {
                token: 'Body XS (bold)',
                class: 'typography--is-body-xs',
                copy: '@include text-body-xs--bold'
            },
            {
                token: 'Body XS (regular)',
                class: 'typography--is-body-xs-regular',
                copy: '@include text-body-xs--regular'
            }
        ]
    },

    {
        area: 'Text link',
        items: [
            {
                token: 'Link M (bold)',
                class: 'typography--is-link-m',
                copy: '@include text-link-m--bold'
            },
            {
                token: 'Link M (regular)',
                class: 'typography--is-link-m-regular',
                copy: '@include text-link-m--regular'
            },
            {
                token: 'Link S (bold)',
                class: 'typography--is-link-s',
                copy: '@include text-link-s--bold'
            },
            {
                token: 'Link S (regular)',
                class: 'typography--is-link-s-regular',
                copy: '@include text-link-s--regular'
            }
        ]
    }
];
