'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash2, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { University } from '@/lib/types';
import EditUniversityDialog from './edit-university-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { deleteUniversity } from '@/lib/localStorage';


type AdminTableProps = {
  initialUniversities: University[];
  initialHeaders: string[];
};

export default function AdminTable({ initialUniversities, initialHeaders }: AdminTableProps) {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [headers, setHeaders] = useState<string[]>(initialHeaders);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = (university: University) => {
    setSelectedUniversity(university);
    setIsEditDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setSelectedUniversity(null);
    setIsEditDialogOpen(true);
  }

  const handleDelete = (universityId: string) => {
    deleteUniversity(universityId);
    setUniversities(prev => prev.filter(u => u.id !== universityId));
    toast({ title: 'Success', description: 'University deleted successfully.' });
  };

  const onUniversityUpdated = (updatedUniversity: University) => {
    const isNew = !universities.some(u => u.id === updatedUniversity.id);
    if (isNew) {
        setUniversities(prev => [...prev, updatedUniversity]);
    } else {
        setUniversities(prev => prev.map(u => u.id === updatedUniversity.id ? updatedUniversity : u));
    }
    // Update headers if new keys were added
    const newKeys = Object.keys(updatedUniversity);
    const currentHeaderSet = new Set(headers);
    const newHeaders = [...headers];
    let hasNewHeaders = false;
    newKeys.forEach(key => {
        if(!['id', 'details', 'headerImage'].includes(key) && !currentHeaderSet.has(key)) {
            newHeaders.push(key);
            hasNewHeaders = true;
        }
    });
    if (hasNewHeaders) {
        setHeaders(newHeaders);
    }
  }

  const formatHeader = (header: string) => {
    return header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
                Admin Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Manage university information.
            </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add University
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header}>{formatHeader(header)}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {universities.map(uni => (
              <TableRow key={uni.id}>
                {headers.map(header => (
                  <TableCell key={`${uni.id}-${header}`} className="max-w-[200px] truncate">
                    {header === 'name' ? (
                      <Link href={`/universities/${uni.id}`} className="font-medium text-primary hover:underline">
                        {uni[header]}
                      </Link>
                    ) : (
                      uni[header]?.toString() || 'N/A'
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(uni)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the university
                          and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(uni.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                   </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <EditUniversityDialog 
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        university={selectedUniversity}
        onUniversityUpdated={onUniversityUpdated}
        allHeaders={headers}
      />
    </>
  );
}
