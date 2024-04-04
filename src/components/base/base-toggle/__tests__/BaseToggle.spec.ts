import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';
import BaseToggle from '../BaseToggle.vue';
import { Sizes } from '../types';

import {
    $uiInputCheckbox,
    $providedToggleLabel
  } from './utilities';

let $wrapper: any

describe('BaseToggle component tests', () => {
    describe('Test HTML attribute', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(BaseToggle, {
                props: {
                    disabled: true,
                }
            })
        })

        it('Should input checkbox have correct disabled state', () => {
            const DOMElement = $wrapper.get(`${$uiInputCheckbox}`).html()
            expect(DOMElement).toContain('disabled')
        })

        it('Should input checkbox be hidden', () => {
            const checkbox = $wrapper.get(`${$uiInputCheckbox}`)
            expect(checkbox.isVisible()).toBe(false)
        })
    })

    describe('Test slost behaviours', () => {
        beforeEach(async () => {
          $wrapper = await mountComponent(BaseToggle, {
            slots: {
              default: $providedToggleLabel
            }
          })
        })
    
        it('Should default slot have a correct label content', () => {
          expect($wrapper.html()).toContain($providedToggleLabel)
        })
    })

    describe('Test props behaviours', () => {
        beforeEach(async () => {
          $wrapper = await mountComponent(BaseToggle, {
            props: {
              id: 'test',
              variant: true,
              size: Sizes.M,
              disabled: false,
              label: 'Aria label'
            }
          })
        })
    
        it('Should props have a correct typeof', async () => {
          expect(typeof $wrapper.props('id')).toBe('string')
          expect(typeof $wrapper.props('variant')).toBe('boolean')
          expect(typeof $wrapper.props('size')).toBe('string')
          expect(typeof $wrapper.props('disabled')).toBe('boolean')
          expect(typeof $wrapper.props('label')).toBe('string')
        })
    
        it('Should prop size have a correct content', async () => {
          expect($wrapper.props('size')).toEqual(Sizes.M)
        })
    })

    describe('Test emits behaviours', () => {
        it('Should emit "send" could have a correct property on reset click', async () => {
          $wrapper.find(`${$uiInputCheckbox}`).trigger('change')
          expect($wrapper.emitted()).toHaveProperty('checked')
        })
    })

    describe('Test HTML appearance', () => {
        beforeEach(async () => {
          $wrapper = await mountComponent(BaseToggle, {
            props: {
              variant: true,
              size: Sizes.M
            }
          })
        })

        it('Should have a correct variant class', async () => {
          expect($wrapper.classes()).toContain('base-toggle--is-ALT')
        })
    
        it('Should have a correct size class', async () => {
          expect($wrapper.classes()).toContain('base-toggle--is-M')
        })
    })
})