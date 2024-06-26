import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthContext from "@/providers/auth-context";
import ClientOnly from "@/components/client-only";
import CustomLoader from "@/components/custom-loader";
import ToasterProvider from "@/providers/toaster-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ReduxProvider>
            <AuthContext>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <CustomLoader>{children}</CustomLoader>
                <ToasterProvider />
              </ThemeProvider>
            </AuthContext>
          </ReduxProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
