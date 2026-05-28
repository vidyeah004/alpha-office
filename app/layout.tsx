import './globals.css'; // Next.js automatically injects Tailwind via this

export const metadata = {
  title: 'AlphaOffice // CEO Strategic Intelligence Hub',
  description: 'Automated competitive tracking, macro vertical deep-dives, and GTM strategy pipelines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-zinc-950 text-zinc-50">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="h-full antialiased font-sans">{children}</body>
    </html>
  );
}
