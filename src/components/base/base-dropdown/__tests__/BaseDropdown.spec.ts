import { beforeEach, describe, it, expect } from 'vitest';
import BaseDropdown from '../BaseDropdown.vue';
import { mountComponent } from '@/shared/tests/utilities';

import {
    $providedHeader,
    $providedError,
    $uiDropdownButton,
    $uiDropdownList,
    $propPlaceholder,
    $propSelectedOption,
    $propList
} from './utilites';
import { mount } from '@vue/test-utils';

let $wrapper: any;

describe('BaseDropdown component tests', () => {
    describe('Test slots behaviours', () => {
        it('Should render all slots with accurate content', async () => {
            $wrapper = mount(BaseDropdown, {
                slots: {
                    header: $providedHeader,
                    error: $providedError
                }
            });
            
            $wrapper.vm.isActive = true;
            await $wrapper.vm.$nextTick();

            expect($wrapper.html()).toContain($providedHeader);
            expect($wrapper.html()).toContain($providedError);
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
                propsData: {
                    list: $propList
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
            const dropdownList = $wrapper.find($uiDropdownList);

            expect($wrapper.html({ raw: true }))
                .toContain(dropdownList.html({ raw: true }));

            outsideElement?.click();
            await $wrapper.vm.$nextTick();

            expect($wrapper.html({ raw: true }))
                .not.toContain(dropdownList.html({ raw: true }));

            document.body.innerHTML = '';
        });
    });

    describe('Test props behaviours', () => {
        it('Should render custom placeholder depending on placeholder prop', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    placeholder: $propPlaceholder
                },
            }, 'mount');

            expect($wrapper.html()).toContain($propPlaceholder);
        });

        it('Should render current label if it is defined', async () => {
            $wrapper = await mountComponent(BaseDropdown, {
                propsData: {
                    placeholder: $propPlaceholder,
                    current: $propSelectedOption.option,
                    list: $propList
                },
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

            const button = await $wrapper.find($uiDropdownButton);
            expect(button.attributes().disabled).not.toBeUndefined();
        });
    });
});