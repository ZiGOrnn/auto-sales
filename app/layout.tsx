import { Metadata } from "next";
import { Inter } from "next/font/google";
import "styles/globals.css";
import { Store } from "../src/context/store";
import { Children } from "../src/types/children";

interface Props extends Children {}

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: { url: "/icons/ic_scb.png", type: "image/svg" },
    shortcut: { url: "/icons/ic_scb.png", type: "image/svg" },
  },
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body suppressHydrationWarning={true} className={inter.className}>
        <main>
          <Store>{children}</Store>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
