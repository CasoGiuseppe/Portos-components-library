import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';

import NavigationItem from '../NavigationItem.vue';
import {
    $providedId,
    $providedIcon,
    $providedLabel,
    $providedChild,
    $uiDOMNavigationItem,
    $uiDOMNavigationAction,
    $uiClassNavigationSelected,
    $uiClassDOMNavigationCollapsed
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
                    child: $providedChild
                }
            });
        });

        it('Should render all slots with accurate content', async () => {
            expect($wrapper.html({ raw: true })).toContain($providedIcon);
            expect($wrapper.html({ raw: true })).toContain($providedLabel);
            expect($wrapper.html({ raw: true })).toContain($providedChild);
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
                    children: $providedChild
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

            it(`Should add ${$uiClassNavigationSelected} class when is selected`, async () => {
                expect($wrapper.classes()).toContain($uiClassNavigationSelected);
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
            
            it(`Should add ${$uiClassDOMNavigationCollapsed} class when is collapsed`, () => {
                expect($wrapper.classes()).toContain($uiClassDOMNavigationCollapsed);
            });
            
            it('Should hide label when is collapsed', () => {
                expect($wrapper.html({ raw: true })).not.toContain($providedLabel);
            });

            it(`Should not use ${$uiClassDOMNavigationCollapsed} class by default`, async () => {
                $wrapper = await mountComponent(NavigationItem, {
                    props: {
                        id: $providedId,
                    },
                    slots: {
                        label: $providedLabel,
                    }
                });

                expect($wrapper.classes()).not.toContain($uiClassDOMNavigationCollapsed);
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

                expect($wrapper.find($uiDOMNavigationItem).attributes('dir')).toBe('ltr');
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