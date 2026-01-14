'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);
    
    // Simulate a brief loading delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Access Granted',
        description: "You're being redirected to the admin panel.",
      });
      router.push('/admin');
    }, 500);
  }

  return (
    <div className="grid gap-4">
      <Alert>
        <AlertDescription>
          Click the button below to access the admin panel. The admin panel is only accessible through this URL and can be used to manage all website content.
        </AlertDescription>
      </Alert>
      <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Access Admin Panel
      </Button>
    </div>
  );
}
