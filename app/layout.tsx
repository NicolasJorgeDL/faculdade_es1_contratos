import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";

import { FileText, UserRound } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Contratos",
  description: "Gerenciador de contratos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} flex`}>
        <header className="flex bg-slate-800 flex-col w-min p-7">
          <NavigationMenu className="text-lg text-secondary">
            <NavigationMenuList className="flex flex-col gap-8">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="font-bold text-5xl">
                  Empresa Exemplo
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuLink href="/contratos" className="flex gap-2 mt-8">
                <FileText />
                Contratos
              </NavigationMenuLink>
              <NavigationMenuLink href="/fornecedores" className="flex gap-2">
                <UserRound />
                Fornecedores
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        {children}
      </body>
    </html>
  );
}
