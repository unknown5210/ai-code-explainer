import './globals.css';

export const metadata = {
  title: 'CodeSense AI - Modern AI Code Explainer',
  description: 'AI-powered code explainer web application built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}