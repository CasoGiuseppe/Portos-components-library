<template>
  <BaseTextarea
    :id="'textarea-1'"
    :placeholder="'Type your text...'"
    :helpText="helpText"
    :disabled="false"
    :text="'I was typing all day long...'"
    :maxLength="20"
    @invalid="emitsInvalid"
    @change="emitsInvalid"
    @cleared="emitsInvalid"
    required
  >
    <template #label> Slot label </template>
    <template #iconHelp>
      <base-icon
        :id="'IconFeedbackAnswer'"
        :name="'IconFeedbackAnswer'"
        :type="Types.FEEDBACK"
        :size="Sizes.S"
      ></base-icon>
    </template>
    <template #iconClear>
      <base-icon
        :id="'IconEditCleanCircle'"
        :name="'IconEditCleanCircle'"
        :type="Types.EDIT"
        :size="Sizes.S"
      >
      </base-icon>
    </template>
    <template #error>
      <Suspense>
        <base-icon
          :id="'IconFeedbackError'"
          :name="'IconFeedbackError'"
          :type="Types.FEEDBACK"
          :size="Sizes.XS"
        ></base-icon>
      </Suspense>
      <span> este es el error texto</span>
    </template>
    <template #message>this is my message</template>
  </BaseTextarea>

  <br />

  <BaseTextarea :id="'textarea-2'" :label="'label 2'" :placeholder="'Type your text...'">
    <template #label> Slot label </template>

    <template #iconHelp>
      <base-icon
        :id="'IconFeedbackAnswer'"
        :name="'IconFeedbackAnswer'"
        :type="Types.FEEDBACK"
        :size="Sizes.S"
      ></base-icon>
    </template>
    <template #iconClear>
      <base-icon
        :id="'IconEditCleanCircle'"
        :name="'IconEditCleanCircle'"
        :type="Types.EDIT"
        :size="Sizes.S"
      >
      </base-icon>
    </template>
    <template #error>
      <Suspense>
        <base-icon
          :id="'IconFeedbackError'"
          :name="'IconFeedbackError'"
          :type="Types.FEEDBACK"
          :size="Sizes.XS"
        ></base-icon>
      </Suspense>
      <span> este es el error texto</span>
    </template>
    <template #message>this is my message</template>
  </BaseTextarea>
  <br />
  <BaseTextarea
    :id="'textarea-3'"
    :label="'label'"
    :placeholder="'Type your text...'"
    :helpText="'Do something!'"
    :disabled="true"
    :text="'I was typing all day long...'"
  >
    <template #label> Slot label </template>

    <template #optional>(*)</template>
    <template #iconHelp>
      <base-icon
        :id="'IconFeedbackAnswer'"
        :name="'IconFeedbackAnswer'"
        :type="Types.FEEDBACK"
        :size="Sizes.S"
      ></base-icon>
    </template>
    <template #iconClear>
      <base-icon
        :id="'IconEditCleanCircle'"
        :name="'IconEditCleanCircle'"
        :type="Types.EDIT"
        :size="Sizes.S"
      >
      </base-icon>
    </template>
    <template #error>
      <Suspense>
        <base-icon
          :id="'IconFeedbackError'"
          :name="'IconFeedbackError'"
          :type="Types.FEEDBACK"
          :size="Sizes.XS"
        ></base-icon>
      </Suspense>
      <span> este es el error texto</span>
    </template>
    <template #message>this is my message</template>
  </BaseTextarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '@ui/base/base-icon/types'

let helpText = ref('Type since you can...')

const emitsInvalid = (invalid: any) => {
  console.log(invalid)
}
</script>

<style scoped></style>
