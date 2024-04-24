<template>
    <section style="width: 344px;">
        <!-- <NavigationItemContextual>
            ciccio
        </NavigationItemContextual> -->
        <FileUploader>
            <template #title>
                Añadir Documento
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
// import NavigationItemContextual from './components/navigation/contextual/navigation-item/NavigationItemContextual.vue';
import FileUploader from '@/components/files/file-uploader/FileUploader.vue';
import BaseInput from '@/components/base/base-input/BaseInput.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types } from '@/components/base/base-icon/types';
</script>
