import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to CyberCat Academy</h1>
        <p className="mb-8">Enhance your cybersecurity skills with our challenges and courses.</p>
        <Link href="/challenges" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Learning
        </Link>
      </main>
    </div>
  );
}