export default [
    {
        type: 'Negative',
        items: [
            {
                token: 'shadow-100',
                copy: '@include create-elevation()'
            },
            {
                token: 'shadow-200',
                copy: '@include create-elevation($weight: 200)'
            },
            {
                token: 'shadow-300',
                copy: '@include create-elevation($weight: 300)'
            },
            {
                token: 'shadow-400',
                copy: '@include create-elevation($weight: 400)'
            }
        ]
    },
    {
        type: 'Positive',
        items: [
            {
                token: 'shadow-alt-100',
                copy: '@include create-elevation($type: alt)'
            },
            {
                token: 'shadow-alt-200',
                copy: '@include create-elevation($weight: 200, $type: alt)'
            },
            {
                token: 'shadow-alt-300',
                copy: '@include create-elevation($weight: 300, $type: alt)'
            },
            {
                token: 'shadow-alt-400',
                copy: '@include create-elevation($weight: 400, $type: alt)'
            }
        ]
    }
]