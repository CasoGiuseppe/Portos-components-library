import { beforeEach, describe, it, expect } from 'vitest';
import BaseDropdown from '../BaseDropdown.vue';
import { mountComponent } from '@/shared/tests/utilities';

import {
    $providedHeader,
    $providedList,
    $providedFooter,
    $providedPlaceholder,
    $uiDropdown,
    $uiDropdownButton,
    $propPlaceholder,
    $propSelectedOption
} from './utilites';
import { mount } from '@vue/test-utils';

let $wrapper: any;

describe('BaseDropdown component tests', () => {
    describe('Test slots behaviours', () => {
        it('Should render all slots with accurate content', async () => {
            $wrapper = mount(BaseDropdown, {
                slots: {
                    header: $providedHeader,
                    list: $providedList,
                    placeholder: $providedPlaceholder
                }
            });
            
            $wrapper.vm.isActive = true;
            await $wrapper.vm.$nextTick();

            expect($wrapper.html()).toContain($providedHeader);
            expect($wrapper.html({ raw: true })).toContain($providedList);
            expect($wrapper.html({ raw: true })).toContain($providedPlaceholder);
        });

        it('Should not display slot list if it is disabled or inactive', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                slots: {
                    list: $providedList,
                },
                propsData: {
                    disabled: true
                }
            });

            expect($wrapper.vm.isActive).toBeFalsy();
            expect($wrapper.html({ raw: true })).not.toContain($providedList);
        });

        it('Should render slot footer depending on error prop value', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                slots: { footer: $providedFooter },
                propsData: { error: 'Mock Error' }
            });

            expect($wrapper.html({ raw: true })).toContain($providedFooter);

            $wrapper = await mountComponent(BaseDropdown, {
                slots: { footer: $providedFooter }
            });

            expect($wrapper.html({ raw: true })).not.toContain($providedFooter);
        });
    });

    describe('UX events', () => {
        beforeEach(async () => {
            document.body.innerHTML = `
                <div>
                    <h1 id="outside">Outside content</h1>
                    <div id="app"></div>
                </div>
            `;

            $wrapper = await mountComponent(BaseDropdown, {
                slots: {
                    list: $providedList,
                },
                attachTo: document.getElementById('app') as HTMLElement
            }, 'mount');
        });

        it('Should toggle active value when button is clicked', async () => {
            const button = $wrapper.find($uiDropdownButton);
            
            await button.trigger('click');
            expect($wrapper.vm.isActive).toBe(true);

            await button.trigger('click');
            expect($wrapper.vm.isActive).toBe(false);
        });

        it('Should hide slot list if any outside element is clicked', async () => {
            const button = await $wrapper.find($uiDropdownButton);
            const outsideElement = document.getElementById('outside') as HTMLElement;
            
            await button.trigger('click');
            expect($wrapper.html({ raw: true })).toContain($providedList);

            outsideElement?.click();
            await $wrapper.vm.$nextTick();

            expect($wrapper.html({ raw: true })).not.toContain($providedList);

            document.body.innerHTML = '';
        });
    });

    describe('Test props behaviours', () => {
        it('Should render custom placeholder depending on placeholder prop', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    placeholder: $propPlaceholder
                },
                slots: {
                    placeholder: $providedPlaceholder
                }
            }, 'mount');

            expect($wrapper.html()).toContain($providedPlaceholder);
        });

        it('Should render selectedOption label if it is defined', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    selectedOption: $propSelectedOption
                },
                slots: {
                    placeholder: `
                        <template #placeholder>
                            <div>${$propSelectedOption.label}</div>
                        </template>
                    `
                }
            }, 'mount');

            expect($wrapper.html()).not.toContain($propPlaceholder);
            expect($wrapper.html()).toContain($propSelectedOption.label);
        });

        it('Should disable dropdown if isDisabled prop is true', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    disabled: true
                }
            }, 'mount');

            const dropdown = await $wrapper.find($uiDropdown);
            const button = await $wrapper.find($uiDropdownButton);

            expect(dropdown.element.dataset.disabled).toBe('true');
            expect(button.attributes().disabled).not.toBeUndefined();
        });
    });
});