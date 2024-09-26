import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Github, Shield, Terminal, Network } from 'lucide-react';

const categories = [
  { name: 'Cryptography', icon: <Shield className="h-6 w-6" /> },
  { name: 'Web Security', icon: <Network className="h-6 w-6" /> },
  { name: 'Reverse Engineering', icon: <Terminal className="h-6 w-6" /> },
];

const testimonials = [
  { name: 'Alice', text: 'CyberCat Academy helped me land my dream job in cybersecurity!' },
  { name: 'Bob', text: 'The challenges are both fun and educational. Highly recommended!' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center flex items-center justify-center">
            CyberCat Academy
          </CardTitle>
          <CardDescription className="text-center flex items-center justify-center text-lg">
            Enhance your cybersecurity skills with our challenges and courses.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/challenges" className="flex items-center">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/RaxoCoding/CyberCat-Academy" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>

      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">Challenge Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-4">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="italic">&quot;{testimonial.text}`&quot;</p>
                <p className="mt-2 font-bold">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Why Choose CyberCat Academy?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Hands-on challenges designed by industry experts</li>
            <li>Learn at your own pace with our self-guided courses</li>
            <li>Join a community of cybersecurity enthusiasts</li>
            <li>Stay up-to-date with the latest security trends and techniques</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}