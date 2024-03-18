import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export const mountComponent = async (component: Component, props?: Record<string, any>) => {
  return await mount(component, props);
};