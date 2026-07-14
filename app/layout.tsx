import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reroom-ai.vercel.app"),
  title: "PNK Re-Room — 사진 한 장으로 완성하는 AI 인테리어 리디자인",
  description:
    "사진 한 장으로 내 방을 호텔, 카페, 북유럽 스타일로 순식간에 바꿔보세요. 클릭 한 번으로 경험하는 무료 AI 인테리어 디자이너.",
  keywords: [
    "AI 인테리어",
    "인테리어 디자인",
    "방 꾸미기",
    "PNK Re-Room",
    "리룸",
    "생성형 AI",
  ],
  openGraph: {
    title: "PNK Re-Room — 사진 한 장으로 완성하는 AI 인테리어 리디자인",
    description: "내 방 사진을 올리면 AI가 새로운 스타일로 즉시 바꿔드립니다.",
    url: "https://reroom-ai.vercel.app",
    siteName: "PNK Re-Room",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PNK Re-Room — AI 인테리어 리디자인 서비스",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNK Re-Room — 사진 한 장으로 완성하는 AI 인테리어 리디자인",
    description: "내 방 사진을 올리면 AI가 새로운 스타일로 즉시 바꿔드립니다.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/components/LanguageContext";
import { AuthProvider } from "@/components/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased ${notoSerif.variable}`}>
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
