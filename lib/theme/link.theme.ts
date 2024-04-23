import { StyleFunctionProps } from "@chakra-ui/react"

const LinkTheme = {
  Link: {
    baseStyle: (props: StyleFunctionProps) => ({
      color: props.colorMode === 'dark' ? 'white.500' : 'black.500', // Default text color
      _hover: {
        textDecoration: 'none',
        color: 'primary.500'
      },
    }),
    variants: {
      // You can define different variants if needed
      // For example, 'nav' for navigation links
      nav: {
        color: 'black.700',
        _hover: {
          textDecoration: 'none', // Remove underline on hover
        },
      },
    },
  },
}

export default LinkTheme
