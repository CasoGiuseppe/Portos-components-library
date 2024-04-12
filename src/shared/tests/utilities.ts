import clickOutside from "@/components/utilities/directives/clickOutside";
import { shallowMount } from "@vue/test-utils";

import type { Component } from "vue";

export const mountComponent = async (component: Component, props?: Record<string, any>) => {
  return await shallowMount(component, {
    ...props,
    global:  {
      ...props?.global,
      directives: {
        ...props?.global?.directives,
        ClickOutside: clickOutside
      }
    }
  });
};