import { beforeEach, describe, expect, it, vi } from 'vitest';
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';
import { mountComponent } from '@/shared/tests/utilities';

class IntersectionObserverMock {
    private callback: IntersectionObserverCallback;
    private records: IntersectionObserverEntry[] = [];
    options?: IntersectionObserverInit;
    
    root = document.body;
    thresholds = [];
    rootMargin = '0';

  
    constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
    ) {
      this.callback = callback;
      if (options) this.options = options;
    }
  
    observe() {
      this.callback([], this);
    }
  
    disconnect() {
        return vi.fn();
    }

    takeRecords(): IntersectionObserverEntry[] {
        const records = this.records;
        this.records = [];
        return records;
    }

    unobserve() {
        return vi.fn();
    }
}
  
window.IntersectionObserver = IntersectionObserverMock;

describe('useIntersectionObserver', () => {
    const actionMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call action when element intersects', async () => {
        const MockComponent = {
            template: '<div ref="element" style="height: 100px;"></div>',
            setup() {
                return useIntersectionObserver({ action: actionMock })
            },
        };

        const wrapper = await mountComponent(MockComponent);

        wrapper.vm.createObserver({
            element: wrapper.vm.element,
        });

        expect(actionMock).toHaveBeenCalled();
    });

    it('should observe an element with custom options', async () => {
        const customOptions = {
            rootMargin: '10px',
            threshold: 0.5,
        };

        const MockComponent = {
            template: '<div ref="element" style="height: 100px;"></div>',
            setup() {
                return {
                    ...useIntersectionObserver({ action: actionMock })
                };
            },
        };

        const wrapper = await mountComponent(MockComponent);

        const observer = wrapper.vm.createObserver({
            element: wrapper.vm.element,
            options: {
                rootMargin: '10px',
                threshold: 0.5,
            }
        });

        expect(observer.options).toMatchObject(customOptions);
    });
});