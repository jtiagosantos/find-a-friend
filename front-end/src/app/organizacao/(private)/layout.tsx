export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="p-6 h-screen bg-[#FDECED]">{children}</main>;
}
