import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Opensource project for form builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <footer className="border-t w-full bg-white p-5 flex gap-2">
          <div className="flex-1 flex items-center justify-start gap-3">

            <Link href={"/"}><Button variant={"default"}>Form Builder</Button></Link>
            <Link href={"/preview"}><Button variant={"outline"}>Json Preview</Button></Link>

          </div>

          <a href="https://asterconsult.app/" className="flex flex-col items-center justify-center">
            <h1 className="text-gray-500 font-bold">Used in production by</h1>
            <Image src={"/astergaze-logo.svg"} alt="astercounsult" height={50} width={100} />
          </a>

          <div className="flex-1 flex gap-2 justify-end">
            <a href="https://github.com/Subu19/form_builder"><Button className="flex gap-2" variant={"link"}><FaGithub size={30} />Source Code</Button></a>
            <a href="https://www.linkedin.com/in/subashacharya/"><Button className="flex gap-2" variant={"link"}> <FaLinkedin size={30} />LinkedIn</Button></a>
          </div>
        </footer>
      </body>
    </html>
  );
}
