import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/provider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({weight:["100", "300", "400","500", "700", "900"], subsets:["latin"]})
export const metadata: Metadata = {
  title: "Gallery App",
  description: "Your personalized web gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${inter.className}, ${roboto.className}`}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
