import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';
import BaseToggle from '@/components/base/base-toggle/BaseToggle.vue';
import { Types, Sizes, type UniqueId } from '../types';
import {
  $providedToggleLabel,
  $uiSubmitTrigger
} from './utilities';

let $wrapper: any;
describe('BaseToggle component tests', () => {
  describe('Test HTML attribute', () => {
    beforeEach(async () => {
      $wrapper = await mountComponent(BaseToggle, {
        props: {
          disabled: true,
        }
      });
    });

    it('Should input have correct disabled state', () => {
      expect($wrapper.props('disabled')).toBeTruthy;
    });
  });

  describe('Test slost behaviours', () => {
    beforeEach(async () => {
      $wrapper = await mountComponent(BaseToggle, {
        slots: {
          default: $providedToggleLabel
        }
      });
    });

    it('Should default slot have a correct label content', () => {
      expect($wrapper.html()).toContain($providedToggleLabel);
    });
  });

  describe('Test props behaviours', () => {
    beforeEach(async () => {
      $wrapper = await mountComponent(BaseToggle, {
        props: {
          id: 'test',
          type: Types.PRIMARY,
          marked: true,
          size: Sizes.M,
          disabled: false,
          label: 'Aria label',
          focus: false,
        }
      });
    });

    it('Should props have a correct typeof', async () => {
      expect(typeof $wrapper.props('id')).toBe('string');
      expect(typeof $wrapper.props('type')).toBe('string');
      expect(typeof $wrapper.props('marked')).toBe('boolean');
      expect(typeof $wrapper.props('focus')).toBe('boolean');
      expect(typeof $wrapper.props('size')).toBe('string');
      expect(typeof $wrapper.props('disabled')).toBe('boolean');
      expect(typeof $wrapper.props('label')).toBe('string');
    });

    it('Should prop type have a correct content', async () => {
      expect($wrapper.props('type')).toEqual(Types.PRIMARY);
    });

    it('Should prop size have a correct content', async () => {
      expect($wrapper.props('size')).toEqual(Sizes.M);
    });
  });

  describe('Test emits behaviours', () => {
    it('Should emit "submit" could have a correct property on reset click', async () => {
      $wrapper.find(`${$uiSubmitTrigger}`).trigger('click');
      expect($wrapper.emitted()).toHaveProperty('submit');
    });
  });

  describe('Test HTML appearance', () => {
    beforeEach(async () => {
      $wrapper = await mountComponent(BaseToggle, {
        props: {
          type: Types.SECONDARY,
          variant: true,
          size: Sizes.M,
        }
      });
    });
    it('Should have a correct type class', async () => {
      expect($wrapper.classes()).toContain('base-toggle--is-secondary');
    })

    it('Should have a correct variant class', async () => {
      expect($wrapper.classes()).toContain('base-toggle--is-secondary-ALT');
    })

    it('Should have a correct size class', async () => {
      expect($wrapper.classes()).toContain('base-toggle--is-M');
    })
  })
})