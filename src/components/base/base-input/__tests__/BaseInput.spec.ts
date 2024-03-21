import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';
import BaseInput from '../BaseInput.vue';
import { Types } from '../types';
import {
    $providedErrorMessage,
    $providedInfoMessage,
    $providedInputLabel,
    $uiDOMInputError,
    $uiDOMInputMessage,
    $uiDOMInputTrigger,
    $initProvidedEmittedValue,
    $newProvidedEmittedValue,
    $newProvidedInvalidValue,
    $userAllowedPattern
} from './utilities';

let $wrapper: any;
describe('BaseInput component tests', () => {
    describe('Test slots behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseInput, {
              slots: {
                error: $providedErrorMessage,
                message: $providedInfoMessage,
                label: $providedInputLabel
              }
            });
        });

        it('Should error slot have a correct text content', () => {
            expect($wrapper.html()).toContain($providedErrorMessage);
        });

        it('Should message slot have a correct text content', () => {
            expect($wrapper.html()).toContain($providedInfoMessage);
        });

        it('Should label slot have a correct text content', () => {
            expect($wrapper.html()).toContain($providedInputLabel);
        });

        it('Should user error box be visible', () => {
            expect($wrapper.find(`${$uiDOMInputError}`)).not.toBeUndefined();
        });

        it('Should user message box be visible', () => {
            expect($wrapper.find(`${$uiDOMInputMessage}`)).not.toBeUndefined();
        });
    });

    describe('Test v-model behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseInput, {
              props: {
                proxyValue: $initProvidedEmittedValue,
                'onUpdate:proxyValue': (e: any) => $wrapper.setProps({ proxyValue: e })
              }
            });
        });

        it('Should model value have correct text on input change', async () => {
            await $wrapper.find(`${$uiDOMInputTrigger}`).setValue($newProvidedEmittedValue);
            expect($wrapper.props('proxyValue')).toBe($newProvidedEmittedValue);
        });
    });

    describe('Test emits behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseInput, {
                props: {
                    pattern: $userAllowedPattern,
                },
                slots: {
                    error: $providedErrorMessage,
                }
            });
        });

        it('Should emit "update:proxyValue" could have a correct property on input change', async () => {
            $wrapper.find(`${$uiDOMInputTrigger}`).setValue($newProvidedEmittedValue);
            expect($wrapper.emitted()).toHaveProperty('update:proxyValue');
        });

        it('Should emit "update:proxyValue" was detected ad have correct value', async () => {
            $wrapper.find(`${$uiDOMInputTrigger}`).setValue($newProvidedEmittedValue);
            expect($wrapper.emitted('update:proxyValue')).toHaveLength(1);
            expect($wrapper.emitted('update:proxyValue')[0][0]).toEqual($newProvidedEmittedValue);
        });

        it('Should emit "invalid" was detected', async () => {
            $wrapper.find(`${$uiDOMInputTrigger}`).setValue($newProvidedInvalidValue);
            expect($wrapper.emitted()).toHaveProperty('invalid');
        });
    });

    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseInput, {
              props: {
                id: 'field',
                input: Types.TEXT,
                required: true,
                proxyValue: $initProvidedEmittedValue,
              }
            });
        });

        it('Should props have a correct typeof', async () => {
            expect(typeof $wrapper.props('id')).toBe('string');
            expect(typeof $wrapper.props('input')).toBe('string');
            expect(typeof $wrapper.props('required')).toBe('boolean');
            expect(typeof $wrapper.props('proxyValue')).toBe('string');
        });

        it('Should prop input have a correct content', async () => {
            expect($wrapper.props('input')).toEqual(Types.TEXT);
        });
    });
});