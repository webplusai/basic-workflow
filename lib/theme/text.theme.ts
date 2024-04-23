import { StyleFunctionProps } from "@chakra-ui/react"

const TextTheme = {
  Text: {
    baseStyle: {
      fontFamily: 'body', // Use the body font family
      fontSize: 'md', // Default font size
    },
    variants: {
      heading: {
        fontSize: 'xl', // Adjust font size for headings
      },
      paragraph: {
        fontFamily: 'arial'
      },
      note: {
        fontFamily: 'arial',
        fontSize: 'xs',
        color: 'gray.500'
      }
    },
  },
  FormLabel: {
    baseStyle: (props: StyleFunctionProps) => ({
      fontFamily: 'arial',
      fontWeight: 500,
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.600'
    })
  }
}

export default TextTheme
