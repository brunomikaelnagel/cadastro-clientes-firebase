import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Components
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Cadastro simples de clientes",
  description: "Cadastro simples de clientes que utiliza o firestore para armazenar os dados",
  authors: [{name: "Bruno Mikael Nagel"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} box-border p-0 m-0 h-screen w-screen flex items-center justify-center container bg-gradient-to-r from-blue-500 to-purple-500`}>
        <main className="w-8/12 rounded bg-white flex flex-col min-w-[500px]">
          <Title>Cadastro Simples</Title>
          {children}
        </main>
      </body>
    </html>
  );
}
