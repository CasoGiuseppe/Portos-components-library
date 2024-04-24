<template>
    <section style="width: 344px;">
        <FileUploader @send="handleFeedback">
            <template #title>
                Añadir Documento
            </template>

            <template #feedback>
                <ToastBox
                    v-if="feedback"
                    :type="Type.WARNING"
                    @close="feedback = null"
                >
                    <template #icon>
                        <BaseIcon
                            :type="Types.FEEDBACK"
                            name="IconFeedbackError"
                        />
                    </template>
                    <template #title> {{ feedback?.title}} </template>
                    {{  feedback?.message }}
                </ToastBox>
            </template>

            <template #input>
                <BaseInput placeholder="Añade un título descriptivo">
                    <template #label>Título</template>
                </BaseInput>
            </template>

            <template #drag-and-drop>
                <BaseIcon
                    :type="Types.FILE"
                    name="IconFileExport"
                />
                <p>
                    Añada y suelte los archivos o pulse en el siguiente enlace. Añada archivos
                    <strong>PDF, imagen, Word, Excel o GIF.</strong>
                </p>
            </template>

            <template #files="{ files, fileIcons, removeFile }">
                <p>Documentos a añadir</p>

                <section
                    v-for="(file, index) in files"
                    :key="file.name"
                    :data-file="!!file.name"
                >
                    <BaseIcon v-bind="fileIcons[file.type]" />
                    
                    <p v-text="file.name" />
                    
                    <picture @click="() => removeFile(index)">
                        <BaseIcon
                            :type="Types.NAVIGATION"
                            name="IconNavigationCloseS"
                        />
                    </picture>
                </section>
            </template>
        </FileUploader>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import FileUploader from '@/components/files/file-uploader/FileUploader.vue';
import BaseInput from '@/components/base/base-input/BaseInput.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types } from '@/components/base/base-icon/types';
import ToastBox from '@/components/tools/toast-box/ToastBox.vue';
import { Type } from "@/components/tools/toast-box/types";

interface IFeedback {
    title: string
    message: string
}

const feedback = ref<IFeedback | null>();

const handleFeedback = (newFeedback: IFeedback) => {
    feedback.value = newFeedback;
};
</script>
