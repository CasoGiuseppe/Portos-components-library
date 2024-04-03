import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import { mountComponent } from '@tests/utilities';
import MainNavigation from '../MainNavigation.vue';
import { loadNavigationItems } from '../helpers';
import {
    $providedLogo,
    $uiClassSecondLevel,
    $mockNavigationItems
} from './utilities';

const createObserverMock = vi.fn();
let $wrapper: any;

vi.mock('../helpers', () => ({
    loadNavigationItems: vi.fn()
}));

vi.mock('@/shared/composables/useIntersectionObserver', () => ({
    __esModule: true,
    default: vi.fn(() => ({
        createObserver: createObserverMock,
    })),
}));

describe('MainNavigation widget tests', () => {
    beforeEach(async () => {
        (loadNavigationItems as Mock).mockResolvedValue($mockNavigationItems);

        $wrapper = await mountComponent(MainNavigation, {
            slots: {
                logo: $providedLogo,
            }
        });

        await $wrapper.vm.$nextTick();
        await $wrapper.vm.$nextTick();
    });

    describe('Test slots behaviours', () => {
        it('Should render all slots with accurate content', async () => {
            expect($wrapper.html()).toContain($providedLogo);
        });
    });

    describe('Test onMounted hook', () => {
        it('should update navigationItems according loadNavigationItems output', async () => {
            $wrapper = await mountComponent(MainNavigation);

            expect($wrapper.vm.navigationItems).toEqual([]);
            
            await $wrapper.vm.$nextTick();
            
            const { navigationItems, minimizeItem } = $wrapper.vm;
            
            expect(navigationItems).toEqual([
                ...$mockNavigationItems,
                minimizeItem
            ]);
        });
    });

    describe('Test component functions', () => {
        describe('endEnterEvent function', () => {
            it('should return undefined if the element does not have children nodes', () => {
                const liElement = $wrapper.find('li');
                const { endEnterEvent } = $wrapper.vm;

                expect(endEnterEvent(liElement)).toBeUndefined()
            });

            it('should return undefined if does not find second level', async () => {   
                const TestComponent = await mountComponent({
                    template: '<button><p>Test paragraph</p></button>',
                });

                const { endEnterEvent } = $wrapper.vm;
                const { element: rootButton } = TestComponent.find('button')

                expect(TestComponent.html()).not.toContain($uiClassSecondLevel);
                expect(endEnterEvent(rootButton)).toBeUndefined();
            });

            it('should add a specific class if it has second level and call createObserver function', async () => {    
                const TestComponent = await mountComponent({
                    template: `
                        <li class="gg">
                            <button>
                                <p class="${$uiClassSecondLevel}">Test paragraph</p>
                            </button>
                        </li>
                    `,
                });

                const { endEnterEvent } = $wrapper.vm;
                const { element: rootButton } = TestComponent.find('li');

                endEnterEvent(rootButton);

                expect(TestComponent.html()).toContain($uiClassSecondLevel);
                expect(createObserverMock).toHaveBeenCalled();
            });
        });
    });

    describe('Test HTML appearance', () => {
        it('should render item with customClass if it exists', () => {
            const { minimizeItem } = $wrapper.vm;
            expect($wrapper.html()).toContain(minimizeItem.customClass);
        });

        it('should render li items according navigationItems length', () => {
            const { navigationItems } = $wrapper.vm;
            expect($wrapper.findAll('li')).toHaveLength(navigationItems.length);
        });
    });
});