<template>
    <!-- <div style="width: 35%; padding: 15px; background: #ccc;"> -->
        <!-- <BaseInput
            model="init value"
            @update:model="update"
            @change="change"
            @focus="focus"
        >
            <template #label>Label</template>
            <template #message>Help Text</template>
        </BaseInput> -->
        <template
            v-for="item in navigation"
            :key="item.label"
        >
            <SideNavigationItem
                :inverse="item.inverse"
                :children="item.children"
                :expanded="item.expanded"
            >
                <template #icon>
                    <BaseIcon
                        :name="item.icon"
                        :size="item.expanded ? Sizes.M : Sizes.L"
                    />
                </template>
                <template #label>
                    {{ item.label }}
                </template>
            </SideNavigationItem>
        </template>
    <!-- </div> -->
</template>
<script setup lang="ts">
import BaseInput from '@/components/base/base-input/BaseInput.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import ViewSearch from './components/base/base-search/ViewSearch.vue'
import SideNavigationItem from '@/components/side-navigation/side-navigation-item/SideNavigationItem.vue';
import { type ISideNavigationItem } from './components/side-navigation/side-navigation-item/types';
import { Sizes } from './components/base/base-icon/types';

// const update = (value: string) => console.log('update', value)
// const change = (value: string) => console.log('change', value)
// const focus = () => console.log('focus')

const navigation: ISideNavigationItem[] = [
    {
        label: 'Label 1',
        icon: 'IconArrowCircleRight',
        link: 'https://google.com',
        inverse: false,
        expanded: true
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        link: 'https://youtube.com',
        inverse: true,
        expanded: true,
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                link: 'https://youtube.com',
                inverse: false,
                expanded: true
            }
        ]
    },
    {
        label: 'Label 3',
        icon: 'IconArrowCircleRight',
        link: 'https://google.com',
        inverse: false,
        expanded: false
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        link: 'https://youtube.com',
        inverse: true,
        expanded: false,
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                link: 'https://youtube.com',
                inverse: false,
                expanded: false
            }
        ]
    },
]
</script>
