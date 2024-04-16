import { beforeEach, describe, expect, it, vi } from 'vitest';

import BaseList from '@/components/base/base-list/BaseList.vue';
import { mountComponent } from '@/shared/tests/utilities';
import {
    $providedRow,
    $providedList,
    $providedComponent
} from './utilities';

let $wrapper: any;

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('BaseList component tests', () => {
    describe('Test slots behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });
          });
      
          it('Should all slot have a correct content', () => {
            expect($wrapper.html()).toContain($providedRow);
            expect($wrapper.html()).toContain($providedComponent);
          });
    });

    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });
          });
      
          it('Should render a li element for each list item', () => {
            const liElements = $wrapper.findAll('li');
            expect(liElements).toHaveLength($providedList.length);
          });

          it('Should select an option by default when current prop is defined', async () => {
            const currentIndex = 0;
            const currentValue = $providedList[currentIndex].option;

            $wrapper = await mountComponent(BaseList, {
                propsData: {
                    list: $providedList,
                    current: currentValue
                },
                slots: {
                    row: $providedRow,
                    component: $providedComponent
                }
            });

            const liElement = $wrapper.findAll('li')[currentIndex];

            expect(liElement.element.dataset.current).toBe('true');
            expect(liElement.element.dataset.option).toBe(currentValue);
            expect(liElement.element.dataset.index).toBe(currentIndex.toString());
          });
    });
});