import "../styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>MGL</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
