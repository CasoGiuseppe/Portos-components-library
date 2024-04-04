import  { type Preview, setup } from '@storybook/vue3';
import '../src/stories/foundations/shared/styles/index.scss';
import '../src/stories/foundations/shared/styles/layout.scss';
import '../src/stories/foundations/shared/styles/modifiers.scss';
import '../src/stories/foundations/shared/styles/graduate_colors.scss';
import '../src/stories/foundations/shared/styles/typography.scss';
import { useArgs } from '@storybook//preview-api';
import ClickOutside from "../src/components/utilities/directives/clickOutside";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs()
    return story({ ...context, updateArgs })
  },
  () => ({ template: '<story />' }),
]

setup((app) => {
  app.directive('click-outside', ClickOutside);
});


export default preview
