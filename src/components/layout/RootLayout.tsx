import React from 'react';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>CyberCat Academy</title>
        <meta name="description" content="Enhance your cybersecurity skills with CyberCat Academy" />
      </Head>
      {children}
    </>
  );
}