'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const navLinks = [
  { href: '/universities', label: 'Universities' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/accommodation', label: 'Accommodation' },
  { href: '/visa', label: 'Visa' },
  { href: '/finances', label: 'Finances' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-foreground/80',
            isMobile && 'block w-full p-4 text-lg'
          )}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/#contact"
        onClick={handleContactClick}
        className={cn(
          'font-medium transition-colors hover:text-primary text-foreground/80',
           isMobile && 'block w-full p-4 text-lg'
        )}
      >
        Contact Us
      </Link>
      {user && (
        <Link
          href="/admin"
          className={cn(
            'font-medium transition-colors hover:text-primary',
            pathname === '/admin' ? 'text-primary' : 'text-foreground/80',
             isMobile && 'block w-full p-4 text-lg'
          )}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          Admin
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">SAGE Explorer</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-6 text-sm md:flex">
            <div className="flex-1 flex justify-end gap-6">
                 <NavLinkItems />
            </div>
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col items-start space-y-4 pt-10">
                <NavLinkItems isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
