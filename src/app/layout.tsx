import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { poppins } from "./ui/fonts";
import SessionProviderWrapper from "./component/sessionProviderWrapper";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/auth";
import NavBar from "./component/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do App",
  description: "mateng to-do app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProviderWrapper session={session}>
          <NavBar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
