import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/app/globals.css";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";
import Providers from "@/app/providers";
import ParticlesBg from "@/components/particles-bg";
import ClearOldRecentlyViewedItems from "@/components/clear-old-recently-viewed-items";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfinitySneakers",
  description: "InfinitySneakers Ecommerce Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="max-w-[2100px] mx-auto">
            <Navbar />
            <div className="min-h-screen">{children}</div>
          </div>
          <Footer />
          <div className="hidden sm:block relative z-0">
            {/* Background particles animation */}
            <ParticlesBg />
          </div>
          <ClearOldRecentlyViewedItems />
          <GoogleAnalytics gaId="G-G98RQ0S92P" />
        </Providers>
      </body>
    </html>
  );
}
