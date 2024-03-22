import { describe, it, expect, beforeEach, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { mountComponent } from '@tests/utilities';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { Sizes, Types } from '../types'
import {
    $uiDOMIconRoot,
    $uiDOMIDValue,
  } from './utilities';


let $wrapper: any;
describe('BaseIcon component tests', () => {
    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseIcon, {
              props: {
                id: $uiDOMIDValue,
                size: Sizes.XS,
                type: Types.COMMUNICATION,
              }
            });
            await flushPromises;
            await vi.dynamicImportSettled();
        });

        it('Should component load correctly', () => {
            expect(BaseIcon).toBeTruthy()
        });

        it('Should prop id have a correct conent', async () => {
            expect($wrapper.props('id')).toBe($uiDOMIDValue);
        });

        it('Should prop size have a correct content', async () => {
            expect($wrapper.props('size')).toBe(Sizes.XS);            
        });

        it('Should prop type have a correct content', async () => {
            expect($wrapper.props('type')).toBe(Types.COMMUNICATION);            
        });
    })
})