import './globals.css';

export const metadata = {
  title: 'SVIT CodeLab — Master DSA | Sai Vidya Institute of Technology',
  description: 'Practice 100 curated DSA problems organized by patterns. Built for SVIT students to ace coding interviews.',
  keywords: ['DSA', 'SVIT', 'LeetCode', 'Data Structures', 'Algorithms', 'Sai Vidya Institute of Technology'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
