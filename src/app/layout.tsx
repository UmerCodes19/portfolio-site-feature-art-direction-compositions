import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio Studio & Customizer",
  description: "Design & development portfolio",
};

import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable} ${bebasNeue.variable} dark`}>
      <head>
        {/* Preconnect to Google Fonts & Fontshare */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        {/* Google Fons: Extended Architectural Condensed & Display Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Narrow:ital,wght@0,400..700;1,400..700&family=Barlow+Condensed:ital,wght@0,100..900;1,100..900&family=Bebas+Neue&family=Encode+Sans+Condensed:wght@100..900&family=Fira+Sans+Extra+Condensed:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans+Condensed:ital,wght@0,100..700;1,100..700&family=League+Gothic&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Saira+Extra+Condensed:wght@100..900&family=Staatliches&family=Syne:wght@400..800&family=Teko:wght@300..700&family=Alex+Brush&family=Birthstone&family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Herr+Von+Muellerhoff&family=Kristi&family=La+Belle+Aurore&family=MonteCarlo&family=Mr+De+Haviland&family=Nothing+You+Could+Do&family=Pinyon+Script&family=Sacramento&family=WindSong&family=Cinzel:wght@400..900&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400..800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
          rel="stylesheet"
        />

        {/* Fontshare CDN: EXACT requested Fontshare & Editorial Display Fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=clash-display@400,600,700&f[]=boska@400,500,700&f[]=gambarino@400&f[]=stardom@400&f[]=aktura@400&f[]=sprat@400,700&f[]=casta@400,700&f[]=magilio@400&f[]=ouroboros@400&f[]=gtl001@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-[#080808] dark:bg-[#080808] light-mode:bg-[#F5F5F7] text-white dark:text-white light-mode:text-zinc-900 transition-colors duration-400">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js?token=c1f33a51-609a-44cb-8542-f48a863cfec7"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
