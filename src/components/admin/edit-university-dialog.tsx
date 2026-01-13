'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { University } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { addUniversity, updateUniversity } from '@/lib/firebase/firestore';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    headerImage: z.string().url('Must be a valid URL'),
    details: z.string().min(1, 'Details are required'),
    dynamicFields: z.array(z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
    })),
});

type EditUniversityDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  university: University | null;
  onUniversityUpdated: (university: University) => void;
  allHeaders: string[];
};

export default function EditUniversityDialog({
  isOpen,
  setIsOpen,
  university,
  onUniversityUpdated,
  allHeaders
}: EditUniversityDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = university !== null;

  const defaultDynamicFields = university ? 
    Object.entries(university)
      .filter(([key]) => !['id', 'name', 'headerImage', 'details'].includes(key))
      .map(([key, value]) => ({ key, value: String(value) }))
    : [];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      headerImage: '',
      details: '',
      dynamicFields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'dynamicFields',
  });

  useEffect(() => {
    if (university) {
      form.reset({
        name: university.name,
        headerImage: university.headerImage,
        details: university.details,
        dynamicFields: defaultDynamicFields
      });
    } else {
      form.reset({
        name: '',
        headerImage: 'https://picsum.photos/seed/10/1600/600',
        details: '<h1>New University</h1><p>Add details here.</p>',
        dynamicFields: [],
      });
    }
  }, [university, form, defaultDynamicFields]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const dynamicData = values.dynamicFields.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    const universityData = {
        name: values.name,
        headerImage: values.headerImage,
        details: values.details,
        ...dynamicData,
    };

    try {
        if (isEditMode && university) {
            const success = await updateUniversity(university.id, universityData);
            if(success) {
                onUniversityUpdated({ ...university, ...universityData });
                toast({ title: 'Success', description: 'University updated successfully.' });
            } else throw new Error("Update failed");
        } else {
            const newId = await addUniversity(universityData);
            if(newId) {
                onUniversityUpdated({ id: newId, ...universityData });
                toast({ title: 'Success', description: 'University added successfully.' });
            } else throw new Error("Add failed");
        }
        setIsOpen(false);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: `Failed to ${isEditMode ? 'update' : 'add'} university.` });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit University' : 'Add New University'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? `Editing ${university?.name}.` : 'Enter the details for the new university.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="headerImage" render={({ field }) => (
                <FormItem><FormLabel>Header Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="details" render={({ field }) => (
                <FormItem><FormLabel>Details (HTML)</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>
            )}/>
            
            <div className="space-y-2">
              <FormLabel>Additional Fields</FormLabel>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                       <FormField control={form.control} name={`dynamicFields.${index}.key`} render={({ field }) => (
                           <FormItem className="flex-1"><FormControl><Input placeholder="Field Name (e.g. Country)" {...field} /></FormControl><FormMessage /></FormItem>
                       )}/>
                       <FormField control={form.control} name={`dynamicFields.${index}.value`} render={({ field }) => (
                           <FormItem className="flex-1"><FormControl><Input placeholder="Value" {...field} /></FormControl><FormMessage /></FormItem>
                       )}/>
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ key: '', value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Field
                </Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Save Changes' : 'Create University'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
