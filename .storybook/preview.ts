import type { Preview } from '@storybook/vue3';
import '../src/stories/foundations/shared/styles/index.scss';
import '../src/stories/foundations/shared/styles/layout.scss';
import '../src/stories/foundations/shared/styles/modifiers.scss';
import '../src/stories/foundations/shared/styles/graduate_colors.scss';
import '../src/stories/foundations/shared/styles/typography.scss';

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

export default preview
