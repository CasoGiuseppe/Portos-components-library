<template>
    <section class="file-uploader">
        <div class="file-uploader__title">
            <slot name="title" />
        </div>

        <form class="file-uploader__form" ref="form">
            <slot name="input" />
            <section
                class="file-uploader__form-drag-and-drop"
                :data-dragging="dragging"
                @drop.prevent="onFileDrop"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
            >
                    <slot name="drag-and-drop" />

                <BaseLink
                    :label="message"
                    :elementType="Element.BUTTON"
                    @click.prevent="openFileInput"
                >
                    {{  message }}
                </BaseLink>
        
                <input
                    multiple
                    type="file"
                    ref="inputFile"
                    hidden="hidden"
                    :accept="formats"
                    @change="onFileChange"
                />
            </section>
        
            <section
                v-if="!!files?.length"
                class="file-uploader__files"
            >
                <slot
                    name="files"
                    :files="files"
                    :file-icons="fileIcons"
                    :remove-file="removeFile"
                />
            </section>
        </form>
        <section class="file-uploader__files-actions">
            <BaseLink
                label="Cancelar subida de archivos"
                :elementType="Element.BUTTON"
                @click.prevent="onCancelForm"
            >
                Cancelar
            </BaseLink>
            <BaseButton fullSize>
                Guardar cambios
            </BaseButton>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

import { type UniqueId, AttachModes } from './types';
import BaseLink from '@/components/base/base-link/BaseLink.vue';
import { Element } from '@/components/base/base-link/types';
import BaseButton from '@/components/base/base-button/BaseButton.vue';
import { fileIcons } from './helpers';

const { label, accept, maxFileSize } = defineProps({
    /**
     * Set the unique id of the file uploader component
     */
    id: {
        type: String as PropType<UniqueId>,
        default: 'ListId'
    },

    /**
     * Set formats accepted by the input
     */
     accept: {
        type: String as PropType<String>,
        default: 'application/pdf,image/jpeg,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/gif'
    },
    /**
     * Set button label
     */
     label: {
        type: String as PropType<String>,
        default: 'Adjuntar archivo'
    },
    /**
     * Set file max size in megabytes
     */
     maxFileSize: {
        type: Number as PropType<Number>,
        default: 1
    },
});

const inputFile = ref<HTMLInputElement>();
const form = ref<HTMLFormElement>();
const files = ref<FileList | null>(null);

const formats = ref<string>(accept as string);
const message = ref<string>(label as string);
const dragging = ref<boolean>(false);

const openFileInput = (): void => {
    inputFile?.value?.click();
};

const addFilesToDataTransfer = (
    dataTransfer: DataTransfer,
    files: FileList | null,
    validateFile?: (file: File) => boolean
): DataTransfer => {
    if (files) {
        Array.prototype.slice.call(files)
            .forEach((file: File) => {
                if (validateFile) {
                    validateFile(file) && dataTransfer.items.add(file);
                    return;
                };

                dataTransfer.items.add(file);
            });
    };

    return dataTransfer;
};

const onCancelForm = () => {
    form.value?.reset();
    files.value = null;
};

const removeFile = (indexToRemove: number) => {
    const currentFiles = Array.prototype.slice.call(files.value);
    const remainingFiles = new DataTransfer();

    currentFiles.filter((file, index): void => {
        if (index !== indexToRemove) {
            remainingFiles.items.add(file);
        };
    });

    if (inputFile.value?.files) {
        inputFile.value.files = remainingFiles.files;
    };

    files.value = remainingFiles.files;
};

const validateSize = (file: File, maxFileSize: number, ): boolean => {
    const maxSizeBytes = (1024 * 1024) * maxFileSize;
    return file.size < maxSizeBytes;
};

const validateFormat = (file: File, availableFormats: string[]): boolean => {
    return availableFormats.includes(file.type);
};

interface FileValidations {
    validator: (...args: any[]) => boolean;
    args: any[]
}

const runFileValidations = (file: File, validations: FileValidations[]): boolean => {
    return validations
        .every(({ validator, args }) => validator(file, ...args))
}

const handleFiles = (event: Event, mode: AttachModes, targetFiles?: FileList | null) => {
    if (!targetFiles) {
        return;
    };
    
    const filesToRender = new DataTransfer();
    const availableFormats = accept.split(',');

    addFilesToDataTransfer(filesToRender, files.value);
    addFilesToDataTransfer(
        filesToRender,
        targetFiles,
        (file: File) => runFileValidations(file, [
            { validator: validateFormat, args: [availableFormats] },
            { validator: validateSize, args: [maxFileSize as number] },
        ])
    );

    if (event.target instanceof HTMLInputElement) {
        event.target.files = filesToRender.files;
    };

    files.value = filesToRender.files; 
}

const onFileChange = (event: Event): void => {
    const selectedFiles = event?.target as HTMLInputElement;

    handleFiles(
        event,
        AttachModes.BUTTON,
        selectedFiles?.files
    );
};

const onFileDrop = (event: DragEvent): void => {
    const droppedFiles = event?.dataTransfer?.files;

    handleFiles(
        event,
        AttachModes.DRAG,
        droppedFiles
    );

    dragging.value = false;
}
</script>

<style src="./FileUploader.scss" lang="scss"></style>