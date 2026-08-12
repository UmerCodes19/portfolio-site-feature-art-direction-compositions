import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://umerqureshi.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Umer Qureshi — Full-Stack Developer & UI/UX Designer",
    template: "%s | Muhammad Umer Qureshi",
  },
  description:
    "Full-Stack Developer, UI/UX Designer, & AI Engineer crafting high-performance web applications, intuitive interfaces, and scalable interactive systems.",
  keywords: [
    "Muhammad Umer Qureshi",
    "Umer Qureshi",
    "Full-Stack Developer",
    "UI/UX Designer",
    "Software Engineer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Frontend Engineer",
    "Web Portfolio",
  ],
  authors: [{ name: "Muhammad Umer Qureshi", url: "https://github.com/UmerCodes19" }],
  creator: "Muhammad Umer Qureshi",
  publisher: "Muhammad Umer Qureshi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Muhammad Umer Qureshi — Full-Stack Developer & UI/UX Designer",
    description:
      "Full-Stack Developer, UI/UX Designer, & AI Engineer crafting high-performance web applications, intuitive interfaces, and scalable interactive systems.",
    siteName: "Muhammad Umer Qureshi Portfolio",
    images: [
      {
        url: "/images/portrait.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Umer Qureshi — Full-Stack Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umer Qureshi — Full-Stack Developer & UI/UX Designer",
    description:
      "Full-Stack Developer, UI/UX Designer, & AI Engineer crafting high-performance web applications, intuitive interfaces, and scalable interactive systems.",
    images: ["/images/portrait.png"],
    creator: "@UmerCodes19",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.variable} ${bebasNeue.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Narrow:ital,wght@0,400..700;1,400..700&family=Barlow+Condensed:ital,wght@0,100..900;1,100..900&family=Bebas+Neue&family=Encode+Sans+Condensed:wght@100..900&family=Fira+Sans+Extra+Condensed:ital,wght@0,100..900;1,100..900&family=IBM+Plex+Sans+Condensed:ital,wght@0,100..700;1,100..700&family=League+Gothic&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Saira+Extra+Condensed:wght@100..900&family=Staatliches&family=Syne:wght@400..800&family=Teko:wght@300..700&family=Alex+Brush&family=Birthstone&family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Herr+Von+Muellerhoff&family=Kristi&family=La+Belle+Aurore&family=MonteCarlo&family=Mr+De+Haviland&family=Nothing+You+Could+Do&family=Pinyon+Script&family=Sacramento&family=WindSong&family=Cinzel:wght@400..900&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400..800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=clash-display@400,600,700&f[]=boska@400,500,700&f[]=gambarino@400&f[]=stardom@400&f[]=aktura@400&f[]=sprat@400,700&f[]=casta@400,700&f[]=magilio@400&f[]=ouroboros@400&f[]=gtl001@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-[#080808] text-white selection:bg-[#af5bf0] selection:text-white">
        {children}
      </body>
    </html>
  );
}
