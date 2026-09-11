import './globals.css';

export const metadata = {
  title: 'iPhone Duo Site Preview',
  description: 'Preview websites on iPhone Duo closed and open displays.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
