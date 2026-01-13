import Link from 'next/link';
import { BookOpen, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl">SAGE Explorer</span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Your compass for international education.
            </p>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold font-headline tracking-wider uppercase">Navigate</h3>
            <Link href="/universities" className="hover:text-primary transition-colors">Universities</Link>
            <Link href="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
          <div className="grid gap-4">
             <h3 className="font-semibold font-headline tracking-wider uppercase">Contact Us</h3>
             <p className="text-muted-foreground">Have questions? Reach out to us.</p>
             <a href="mailto:contact@sage.edu" className="font-medium hover:text-primary transition-colors">contact@sage.edu</a>
             <div className="flex space-x-4 mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SAGE Committee. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
