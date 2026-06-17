import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VU MIF Naujienų Portalas",
  description: "Vilniaus universiteto Matematikos ir informatikos fakulteto naujienų informacinė sistema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <head>
        {/* Critical inline polyfills — must run before any other script */}
        <script
          dangerouslySetInnerHTML={{
            __html: [
              `if(typeof globalThis==='undefined'){window.globalThis=window;}`,
              `if(!Array.prototype.at){Array.prototype.at=function(n){n=Math.trunc(n)||0;if(n<0)n+=this.length;return(n<0||n>=this.length)?undefined:this[n];};String.prototype.at=Array.prototype.at;}`,
              `if(!Object.fromEntries){Object.fromEntries=function(it){var o={};for(var p of it)o[p[0]]=p[1];return o;};}`,
            ].join('')
          }}
        />
        {/* Full polyfill bundle — served locally so it works on isolated/local networks */}
        <script src="/polyfill.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
