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
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
