import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';

import NavigationItem from '../NavigationItem.vue';
import {
    $providedId,
    $providedIcon,
    $providedLabel,
    $providedChildren,
    $uiDOMNavigationItem,
    $uiDOMNavigationAction,
    $uiDOMNavigationSelected,
    $uiDOMNavigationCollapsed
} from './utilities';

let $wrapper: any;

describe('NavigationItem component tests', () => {
    describe('Test slots behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
                props: {
                    id: $providedId,
                },
                slots: {
                    icon: $providedIcon,
                    label: $providedLabel,
                    children: $providedChildren
                }
            });
        });

        it('Should render all slots with accurate content', async () => {
            expect($wrapper.html({ raw: true })).toContain($providedIcon);
            expect($wrapper.html({ raw: true })).toContain($providedLabel);
            expect($wrapper.html({ raw: true })).toContain($providedChildren);
        });

        it('Should hide action button if children slot is falsy', async () => {
            expect($wrapper.html({ raw: true })).not.toContain($uiDOMNavigationAction);
        });
    });

    describe('Test emits behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
                props: {
                    id: $providedId,
                },
                slots: {
                    children: $providedChildren
                }
            });
        });

        it('Should emit "submit" when item is clicked', async () => {
            $wrapper = await mountComponent(NavigationItem, {
                props: {
                    id: $providedId,
                }
            });

            $wrapper.find($uiDOMNavigationItem).trigger('click');
            expect($wrapper.emitted()).toHaveProperty('submit');
        });

        it('Should not emit "submit" when item has any children', async () => {
            $wrapper.find($uiDOMNavigationItem).trigger('click');
            expect($wrapper.emitted()).not.toHaveProperty('submit');
        });

        it('Should emit "action" when action button is clicked', async () => {
            $wrapper.find($uiDOMNavigationAction).trigger('click');
            expect($wrapper.emitted()).toHaveProperty('action');
        });
    });

    describe('Test HTML appearance', () => {
        describe('Selected status', () => {
            beforeEach(async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                        selected: true,
                    }
                });
            });

            it(`Should add ${$uiDOMNavigationSelected} class when is selected`, async () => {
                expect($wrapper.classes()).toContain($uiDOMNavigationSelected);
            });
        });

        describe('Collapsed status', () => {
            beforeEach(async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                        collapsed: true,
                    },
                    slots: {
                        label: $providedLabel,
                    }
                });
            });
            
            it(`Should add ${$uiDOMNavigationCollapsed} class when is collapsed`, () => {
                expect($wrapper.classes()).toContain($uiDOMNavigationCollapsed);
            });
            
            it('Should hide label when is collapsed', () => {
                expect($wrapper.html({ raw: true })).not.toContain($providedLabel);
            });

            it(`Should not use ${$uiDOMNavigationCollapsed} class by default`, async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                    },
                    slots: {
                        label: $providedLabel,
                    }
                });

                expect($wrapper.classes()).not.toContain($uiDOMNavigationCollapsed);
            });
        });

        describe('Text direction (RLT/LTR)', () => {
            it('Should render text direction with rtl by default', async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                    },
                    slots: {
                        label: $providedLabel,
                    }
                });

                expect($wrapper.find($uiDOMNavigationItem).attributes('dir')).toBe('rtl');
            });

            it('Should render text direction with ltr when rtl prop is false', async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                        rtl: false
                    },
                    slots: {
                        label: $providedLabel,
                    }
                });

                expect($wrapper.find($uiDOMNavigationItem).attributes('dir')).toBe('ltr');
            });
        });
    });

    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
              props: {
                id: $providedId,
                selected: false,
                collapsed: false,
                rtl: true,
              }
            });
        });

        it('Should have props with a correct typeof', async () => {
            expect(typeof $wrapper.props('id')).toBe('string');
            expect(typeof $wrapper.props('selected')).toBe('boolean');
            expect(typeof $wrapper.props('collapsed')).toBe('boolean');
            expect(typeof $wrapper.props('rtl')).toBe('boolean');
        });
    });
});