import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
    title: 'Foundations/Grid System',
    argTypes: {
      copyToClipboard: () => {},
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: () => ({
        template: `
        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 1,1,1,1,1,1,1,1,1,1,1,1">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                    <div class="grid__col-sm-1 foundation__grid-col">1</div>
                </ul>
            </section>
        </section>
        
        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 2,2,2,2,2,2">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                    <div class="grid__col-sm-2 foundation__grid-col">2</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 3,3,3,3">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-3 foundation__grid-col">3</div>
                    <div class="grid__col-sm-3 foundation__grid-col">3</div>
                    <div class="grid__col-sm-3 foundation__grid-col">3</div>
                    <div class="grid__col-sm-3 foundation__grid-col">3</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 4,4,4">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-4 foundation__grid-col">4</div>
                    <div class="grid__col-sm-4 foundation__grid-col">4</div>
                    <div class="grid__col-sm-4 foundation__grid-col">4</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 6,6">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-6 foundation__grid-col">6</div>
                    <div class="grid__col-sm-6 foundation__grid-col">6</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": 12">Gryd System</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-12 foundation__grid-col">12</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": sm: 8,4 - md: 9,3">Gryd System Responsive</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-8 grid__col-md-3 foundation__grid-col foundation__grid-col--secondary">sm: 8, md: 3</div>
                    <div class="grid__col-sm-4 grid__col-md-9 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 9</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": sm: 4,4,4 - md: 2,2,8 - lg: 3,8,1">Gryd System Responsive</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-4 grid__col-md-2 grid__col-lg-3 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 2, lg: 3</div>
                    <div class="grid__col-sm-4 grid__col-md-2 grid__col-lg-8 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 2, lg: 8</div>
                    <div class="grid__col-sm-4 grid__col-md-8 grid__col-lg-1 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 8, lg: 1</div>
                </ul>
            </section>
        </section>

        <section class="foundation">
            <h2 class="foundation__title" data-subarea=": sm: 4,4,4 - md: 2,2,8 - lg: hidden">Gryd System Hidden</h2>
            <section class="grid">
                <ul class="grid__row">
                    <div class="grid__col-sm-4 grid__col-md-2 grid__col-lg-3 foundation__grid-col foundation__grid-col--tertiary">sm: 4, md: 2, lg: 3</div>
                    <div class="grid__col-sm-4 grid__col-md-2 grid__col--is-hidden-lg foundation__grid-col foundation__grid-col--tertiary">sm: 4, md: 2, lg: hidden</div>
                    <div class="grid__col-sm-4 grid__col-md-8 grid__col-lg-1 foundation__grid-col foundation__grid-col--tertiary">sm: 4, md: 8, lg: 1</div>
                </ul>
            </section>
        </section>
        `
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}