<template>
    <section style="padding: 3rem">
        <ToastBox
            :duration="3000"
            :border-color="'#ff0000'"
            :type="UIToastType.SUCCESS"
            :visibility="'visible'"
            @close="onClose"
            @action="onAction"
        >
            <template #icon>
                <BaseIcon
                    :id="'CloseIcon'"
                    :type="IconTypes.FEEDBACK"
                    :name="'IconFeedbackInfo'"
                    :size="IconSizes.M"
                ></BaseIcon>
            </template>
            <template #header> Custom Header</template>
            <template #body>This is a very very very very looong text</template>
            <template #footer>
                <BaseButton :type="ButtonTypes.TERTIARY" :size="ButtonSizes.S"
                    >Test me please</BaseButton
                >
            </template>
        </ToastBox>
    </section>
</template>
<script setup lang="ts">
import ToastBox from "@/components/tools/toast-box/ToastBox.vue"
import BaseIcon from "./components/base/base-icon/BaseIcon.vue"
import BaseButton from "./components/base/base-button/BaseButton.vue"
import { UIToastType } from "./components/tools/toast-box/types"
import {
    Types as IconTypes,
    Sizes as IconSizes
} from "./components/base/base-icon/types"
import {
    Types as ButtonTypes,
    Sizes as ButtonSizes
} from "./components/base/base-button/types"

const onClose = () => {
    console.log("closed")
}

const onAction = () => {
    console.log("action!")
}
</script>
