"use client";

import { Provider } from "../components/ui/provider";
import { Block } from "../components/Block";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Box } from "@chakra-ui/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Provider>
            <Box display="flex" flexDirection="column" minHeight="100vh">
              <Block />
              {children}
              <Footer />
            </Box>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
