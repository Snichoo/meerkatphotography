import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "@/components/QuoteModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meerkat Photography | Perth Photographer",
  description:
    "Friendly, professional photography across Perth, from weddings, families and birthdays to headshots, products and events. Photographed by Nora Wan, start to finish.",
  manifest: "/seo/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <QuoteModalProvider>{children}</QuoteModalProvider>
      </body>
    </html>
  );
}
