import { defineAsyncComponent, type Component } from "vue";
import type { IAsyncComponent } from "./interfaces/useAsyncComponent";
import UserDefaultError from "@ui/defaults/exceptions/error/Error.vue";
// import UserDefaultLoader from "@ui/components/defaults/default-loader/DefaultLoader.vue";

export default function useAsyncComponent(): IAsyncComponent {
  const create = async ({ component, error = UserDefaultError } :{ component: string, error?: Component, loader?: Component}): Promise<Component> => {
    return await defineAsyncComponent({
      errorComponent: error,
    //   loadingComponent: loader,
      loader: () => import (/* @vite-ignore */ `../../ui/${ component }.vue`)
    })
  }

  

  return { create }
}