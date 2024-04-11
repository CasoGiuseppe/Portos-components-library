import { computed, ref } from 'vue';
import { Icons, Types } from './types'

export default function useCustomBehaviours(
    { customEmits, type } :
    { customEmits: (name:any, props: Record<string, any>) => void, type: Types }): any {  
        
    const currentType = ref<Types>(type);
    const typeAllowedIcon = computed(() => [Icons.PASSWORD].includes(Icons[type.toUpperCase() as keyof typeof Icons]));

    const behavioursType = {
        [Types.PASSWORD]: (): void => { currentType.value = currentType.value === Types.PASSWORD ? Types.TEXT : Types.PASSWORD },
        [Types.TEXT]: ({ value }: { value: string }): void => {
            console.log(value)
            customEmits('send', { value })
        }
    }

    return {
        currentType,
        behavioursType,
        typeAllowedIcon
    }
  }