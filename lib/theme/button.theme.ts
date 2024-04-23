import { StyleFunctionProps } from "@chakra-ui/react";

const ButtonTheme = {
  Button: {
    // 1. We can update the base styles
    baseStyle: {
      borderRadius: 5,
      borderWidth: 0,
      '&:hover, &:focus': {
        outline: 'none',
        borderWidth: 0,
        boxShadow: '-2px 3px 5px 2px rgba(127, 127, 124, 0.21)',
        backgroundColor: 'primary.400',
        color: 'white.500'
      },
    },

    // 2. We can add a new button size or extend existing
    sizes: {
      xl: {
        h: '56px',
        fontSize: 'lg',
        px: '32px',
      },
    },
    // 3. We can add a new visual variant
    variants: {
      'with-shadow': {
        bg: 'primary.900',
        boxShadow: '0 0 2px 2px #efdfde',
      },
      // 4. We can override existing variants
      solid: (props: StyleFunctionProps) => ({
        bg: props.colorMode === 'dark' ? 'primary.500' : 'primary.500',
        color: props.colorMode === 'dark' ? 'white.500' : 'white.500'
      }),
      // 5. We can add responsive variants
      sm: {
        bg: 'teal.500',
        fontSize: 'md',
      },
      gray: {
        bg: 'black.700',
        color: 'white.500'
      },
      black: (props: StyleFunctionProps) => ({
        bg: props.colorMode === 'dark' ? 'black.200' : 'black.500',
        color: props.colorMode === 'dark' ? 'black.800' : 'white.500',
        '&:hover': {
          bg: 'black.800',
          color: 'white.500',
        }
      }),
      white: {
        bg: 'white.500',
        color: 'black.500',
        '&:hover': {
          bg: 'black.800',
          color: 'white.500',
        }
      },
      success: {
        bg: 'success.500',
        color: 'white.500',
        '&:hover': {
          bg: 'success.700',
          color: 'white.500',
        }
      },
      link: {
        color: 'info.500',
        '&:hover, &:focus': {
          bg: 'transparent',
          cursor: 'ponter',
          color: 'info.400',
          boxShadow: 'none'
        }
      },
      classCategoryButton: (props: StyleFunctionProps) => ({
        fontWeight: '700',
        fontFamily: 'arial',

        '&.active': {
          bg: props.colorMode === 'dark' ? 'warning.500' : 'success.500',
          color: props.colorMode === 'dark' ? 'black.500' : 'white.500',
        },

        '&:hover': {
          bg: props.colorMode === 'dark' ? 'black.100' : 'black.200',
          color: 'black.700',
        }
      }),
    },
    // 6. We can overwrite defaultProps
    defaultProps: {
      size: 'lg', // default is md
    },
  },
}

export default ButtonTheme
