import { extendTheme } from '@chakra-ui/react';
import ButtonTheme from './button.theme';
import LinkTheme from './link.theme';
import ColorsTheme from './colors.theme';
import TextTheme from './text.theme';

const theme = extendTheme({
  colors: ColorsTheme,
  fonts: {
    heading: `'Heading Font Name', Inter`,
    body: `'Body Font Name', Inter`,
    input: `'Input Font Name', arial`,
    select: `'Select Font Name', arial`,
    textarea: `'Textarea Font Name', arial`,
  },
  components: {
    ...ButtonTheme,
    ...LinkTheme,
    ...TextTheme
  },
});

export default theme;
