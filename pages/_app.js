import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from '@/lib/theme';
import { AlertProvider } from "@/lib/contexts/AlertContext";
import { WorkflowProvider } from "@/lib/contexts/WorkflowContext";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AlertProvider>
          <WorkflowProvider>
            <Component {...pageProps} />
          </WorkflowProvider>
        </AlertProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
