import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gate Keeper",
  description: "Sistema Automatizado de Controle de Acesso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/images/logo-icon.png" />
      <body className={`${inter.className} overflow-hidden h-screen max-h-screen`}>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
