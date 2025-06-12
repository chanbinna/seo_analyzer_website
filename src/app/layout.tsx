import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO 점수 분석기",
  description: "웹사이트의 SEO 점수를 분석하고 개선점을 제시하는 도구입니다.",
  keywords: "SEO, 분석, 점수, 웹사이트, 최적화",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
