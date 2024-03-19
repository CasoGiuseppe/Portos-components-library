
import BaseLink from '../BaseLink.vue'
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ElementLink } from '../types'; // Asegúrate de que la ruta a los tipos sea correcta

// Mock global window location
const mockWindowLocation = (href: string) => {
  Object.defineProperty(window, 'location', {
    value: {
      href: href,
    },
    writable: true,
  });
};

describe('BaseLink', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseLink);
    expect(wrapper.find('[data-testid="ui-link"]').exists()).toBe(true);
    expect(wrapper.classes()).toContain('base-link--is-primary');
    expect(wrapper.classes()).toContain('base-link--is-M');
  });

  it('applies the correct classes when variant is true', () => {
    const wrapper = mount(BaseLink, {
      props: { variant: true },
    });
    expect(wrapper.classes()).toContain('base-link--is-primary-ALT');
  });

  it('applies the disabled class when disabled is true', () => {
    const wrapper = mount(BaseLink, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('base-link--is-disabled');
  });

  it('emits submit event when clicked', async () => {
    const wrapper = mount(BaseLink);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('submit');
  });

  it('navigates to href when not disabled', async () => {
    const href = 'http://example.com';
    mockWindowLocation(href);
    const wrapper = mount(BaseLink, {
      props: { href, elementType: ElementLink.A as ElementLink },
    });
    await wrapper.trigger('click');
    expect(window.location.href).toBe(href);
  });

  it('does not navigate when disabled', async () => {
    const href = 'http://example.com';
    mockWindowLocation(href);
    const wrapper = mount(BaseLink, {
      props: { href, elementType: ElementLink.A as ElementLink, disabled: true },
    });
    await wrapper.trigger('click');
    expect(window.location.href).toBe(href);
  });
});