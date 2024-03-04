export default [
    {
        type: 'Negative',
        mode: 'negative',
        items: [
            {
                token: 'shadow-100',
                background: 'color-neutral-50',
                copy: 'var(--shadow-100)',
            },
            {
                token: 'shadow-200',
                background: 'color-neutral-40',
                copy: 'var(--shadow-200)'
            },
            {
                token: 'shadow-300',
                background: 'color-neutral-30',
                copy: 'var(--shadow-300)'
            },
            {
                token: 'shadow-400',
                background: 'color-neutral-20',
                copy: 'var(--shadow-400)'
            }
        ]
    },
    {
        type: 'Positive',
        background: 'var(--color-neutral-60, #000)',
        mode: 'positive',
        items: [
            {
                token: 'shadow-alt-100',
                background: 'color-neutral-50',
                copy: 'var(--shadow-alt-100)'
            },
            {
                token: 'shadow-alt-200',
                background: 'color-neutral-40',
                copy: 'var(--shadow-alt-200)'
            },
            {
                token: 'shadow-alt-300',
                background: 'color-neutral-30',
                copy: 'var(--shadow-alt-300)'
            },
            {
                token: 'shadow-alt-400',
                background: 'color-neutral-20',
                copy: 'var(--shadow-alt-400)'
            }
        ]
    }
]