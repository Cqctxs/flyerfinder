import localFont from "next/font/local";
import "./globals.css";
import TanstackProvider from "@/provider/TanstackProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider"

const estrella = localFont({
  src: "../public/fonts/Estrella.otf",
  variable: "--font-estrella",
  weight: "400",
});

const advercaseRegular = localFont({
  src: "../public/fonts/Advercase-Regular.otf",
  variable: "--font-advercase-regular",
  weight: "400",
});

const advercaseBold = localFont({
  src: "../public/fonts/Advercase-Bold.otf",
  variable: "--font-advercase-bold",
  weight: "400",
});

export const metadata = {
  title: "FlyerFinder",
  description: "Gone are the days of scouring for deals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TanstackProvider>
        <AuthProvider>
          <body
            className={`${estrella.variable} ${advercaseRegular.variable} ${advercaseBold.variable}`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </AuthProvider>
      </TanstackProvider>
    </html>
  );
}
