"use client";

import { Provider } from "../components/ui/provider";
import { Block } from "../components/Block";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Provider>
            <Block />

            {/* Ajout de paddingTop pour compenser la hauteur du header */}
            <main style={{ paddingTop: "30px" /* ou une hauteur adaptée */ }}>
              {children}
            </main>

            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
