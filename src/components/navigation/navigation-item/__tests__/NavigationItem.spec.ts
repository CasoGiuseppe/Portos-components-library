import { describe, it, expect, beforeEach } from 'vitest';
import { mountComponent } from '@tests/utilities';

import NavigationItem from '../NavigationItem.vue';
import {
    $providedNavigationLabel,
    $uiDOMNavigationItem,
    $providedIcon
} from './utilities';

let $wrapper: any;

describe('NavigationItem component tests', () => {
    describe('Test slots behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
                props: {
                    id: 1,
                    label: $providedNavigationLabel,
                    selected: false,
                    collapsed: false,
                    inversed: false,
                    children: []
                },
                slots: {
                    icon: $providedIcon,
                }
            });
        });

        it('Should render icon slot correctly', async () => {
            expect($wrapper.html({ raw: true })).toContain($providedIcon);
        });
    });

    describe('Test emits behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
                props: {
                    id: 1,
                    label: $providedNavigationLabel,
                    selected: false,
                    collapsed: false,
                    inversed: false,
                    children: []
                }
            });
        });

        it('Should emit "select" when item is clicked', async () => {
            $wrapper.find($uiDOMNavigationItem).trigger('click');
            expect($wrapper.emitted()).toHaveProperty('select');
        });
    });

    describe('Test props behaviours', () => {
        beforeEach(async () => {
            $wrapper = await mountComponent(NavigationItem, {
              props: {
                id: 1,
                label: $providedNavigationLabel,
                selected: false,
                collapsed: false,
                inversed: false,
                children: []
              }
            });
        });

        it('Should props have a correct typeof', async () => {
            expect(typeof $wrapper.props('id')).toBe('number');
            expect(typeof $wrapper.props('label')).toBe('string');
            expect(typeof $wrapper.props('selected')).toBe('boolean');
            expect(typeof $wrapper.props('collapsed')).toBe('boolean');
            expect(typeof $wrapper.props('inversed')).toBe('boolean');
            expect(typeof $wrapper.props('children')).toBe('object');
        });

        it('Should render label according to the prop', () => {
            expect($wrapper.html()).toContain($providedNavigationLabel);
        });
    });
});