<template>
    <section class="file-uploader">
        <div class="file-uploader__title">
            <slot name="title" />
        </div>

        <form class="file-uploader__form" ref="form">
            <slot name="input" />
            <section class="file-uploader__form-drag-and-drop">
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
                    @change="handleFileChange"
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
                @click.prevent="handleCancel"
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

import { type UniqueId, type IFileIcons } from './types';
import BaseLink from '@/components/base/base-link/BaseLink.vue';
import { Element } from '@/components/base/base-link/types';
import BaseButton from '@/components/base/base-button/BaseButton.vue';
import { Types } from '@/components/base/base-icon/types';

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

const formats = ref<string>(accept as string);
const message = ref<string>(label as string);

const files = ref<FileList | null>(null);

const fileIcons: IFileIcons = {
    'application/pdf': {
        type: Types.FILE,
        name: 'IconFilePdf'
    },
    'image/gif': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'image/jpeg': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'image/png': {
        type: Types.SYSTEM,
        name: 'IconSystemImage'
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        type: Types.FILE,
        name: 'IconFileExcel'
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        type: Types.FILE,
        name: 'IconFileWord'
    }
};

const openFileInput = (): void => {
    inputFile?.value?.click();
};

const filterFiles = (files: File[], maxFileSize: number): FileList => {
    const maxSizeBytes = (1024 * 1024) * maxFileSize;
    const remainingFiles = new DataTransfer();

    files.forEach((file): DataTransfer | undefined => {
        if (file.size > maxSizeBytes) {
            console.log('Los sentimos, pero el archivo supera los 200MB.');
            return;
        };

        remainingFiles.items.add(file);
    });

    return remainingFiles.files;
}

const addFilesToDataTransfer = (dataTransfer: DataTransfer, files: FileList | null): DataTransfer => {
    if (files) {
        Array.prototype.slice.call(files)
            .forEach((file: File) => {
                dataTransfer.items.add(file)
            });
    };

    return dataTransfer;
};

const handleFileChange = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
        return;
    };

    const filesToRender = new DataTransfer();

    addFilesToDataTransfer(filesToRender, files.value);
    addFilesToDataTransfer(filesToRender, event.target.files);
    
    const selectedFiles: File[] = Array.prototype.slice.call(filesToRender.files);
    const remainingFiles = filterFiles(selectedFiles, maxFileSize as number);

    event.target.files = remainingFiles;
    files.value = remainingFiles;
};

const handleCancel = () => {
    form.value?.reset();
    files.value = null;
};

const removeFile = (indexToRemove: number) => {
    const currentFiles = Array.prototype.slice.call(inputFile.value?.files);
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
}
</script>

<style src="./FileUploader.scss" lang="scss"></style>