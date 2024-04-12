import { beforeEach, describe, it, expect } from 'vitest';
import BaseDropdown from '../BaseDropdown.vue';
import { mountComponent } from '@/shared/tests/utilities';

import {
    $providedHeader,
    $providedList,
    $providedFooter,
    $uiDropdown,
    $uiDropdownButton,
    $uiDropdownList,
    $propPlaceholder,
    $propSelectedOption
} from './utilites';

let $wrapper: any;

describe('BaseDropdown component tests', () => {
    describe('Test slots behaviours', () => {
        it('Should render all slots with accurate content', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                slots: {
                    header: $providedHeader,
                    list: $providedList
                }
            });

            expect($wrapper.html()).toContain($providedHeader);
            expect($wrapper.html({ raw: true })).toContain($providedList);
        });

        it('Should not display slot list if it is disabled or inactive', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                slots: {
                    list: $providedList,
                },
                propsData: {
                    isDisabled: true
                }
            });

            const list = $wrapper.find($uiDropdownList);

            expect($wrapper.vm.isActive).toBeFalsy();
            expect(list.element.style.display).toBe('none');
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
                attachTo: document.getElementById('app') as HTMLElement
            });
        });

        it('Should toggle isActive value when button is clicked', async () => {
            const button = await $wrapper.find($uiDropdownButton);
            
            await button.trigger('click');
            expect($wrapper.vm.isActive).toBe(true);

            await button.trigger('click');
            expect($wrapper.vm.isActive).toBe(false);
        });

        it('Should hide slot list if any outside element is clicked', async () => {
            const button = await $wrapper.find($uiDropdownButton);
            const list = await $wrapper.find($uiDropdownList);
            const outsideElement = document.getElementById('outside') as HTMLElement;
            
            await button.trigger('click');
            expect(list.element.style.display).not.toBe('none');

            outsideElement?.click();
            await $wrapper.vm.$nextTick();

            expect(list.element.style.display).toBe('none');

            document.body.innerHTML = '';
        });
    });

    describe('Test props behaviours', () => {
        it('Should render custom placeholder depending on placeholder prop', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    placeholder: $propPlaceholder
                }
            });

            expect($wrapper.html()).toContain($propPlaceholder);
        });

        it('Should render selectedOption label if it is defined', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    selectedOption: $propSelectedOption
                }
            });

            expect($wrapper.html()).not.toContain($propPlaceholder);
            expect($wrapper.html()).toContain($propSelectedOption.label);
        });

        it('Should disable dropdown if isDisabled prop is true', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    isDisabled: true
                }
            });

            const dropdown = await $wrapper.find($uiDropdown);
            const button = await $wrapper.find($uiDropdownButton);

            expect(dropdown.element.dataset.disabled).toBe('true');
            expect(button.attributes().disabled).not.toBeUndefined();
        });
    });
});