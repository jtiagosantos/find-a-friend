export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-screen bg-[#FDECED]">{children}</main>;
}
