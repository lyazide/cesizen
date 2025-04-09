import { Provider } from "../components/ui/provider";
import { Block } from "../components/Block";
import Footer from "../components/Footer";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Block />
          {/* Ajout de paddingTop pour compenser la hauteur du header */}
          <main style={{ paddingTop: "30px" /* ou une hauteur adaptée */ }}>
            {children}
          </main>

          <Footer />
        </Provider>
      </body>
    </html>
  );
}
