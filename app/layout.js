import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Aashram | Online Career Guidance & Counseling for Students in India",
  description:
    "career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India",
  keywords:
    "career guidance, career counseling, online counseling India, student career advice, best career options, college admission guidance, career test India, career planning, courses after 12th, top colleges India, online career guidance platform, study in India",
  classification: "Career Guidance, Education, Counseling",
  alternates: {
    canonical: "https://careeraashram.org/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K1CC0CP05M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K1CC0CP05M');
          `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
