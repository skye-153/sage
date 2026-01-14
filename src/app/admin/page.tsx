'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2, Edit2, Plus, FileText } from 'lucide-react';
import {
  getUniversities,
  saveUniversities,
  getPageData,
  savePageData,
  deleteUniversity,
} from '@/lib/localStorage';
import { University } from '@/lib/types';

const pages = ['universities', 'scholarships', 'accommodation', 'visa', 'finances'];

export default function AdminPage() {
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newColumnName, setNewColumnName] = useState('');
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [deleteColumnName, setDeleteColumnName] = useState<string | null>(null);
  const [editingKnowMore, setEditingKnowMore] = useState<any>(null);
  const [isKnowMoreDialogOpen, setIsKnowMoreDialogOpen] = useState(false);
  const [knowMoreContent, setKnowMoreContent] = useState('');

  // Load data when page changes
  useEffect(() => {
    loadData(selectedPage);
  }, [selectedPage]);

  const loadData = (page: string) => {
    if (page === 'universities') {
      const unis = getUniversities();
      setData(unis);
      
      // Extract all unique column names
      const allKeys = new Set<string>();
      unis.forEach(uni => {
        Object.keys(uni).forEach(key => allKeys.add(key));
      });
      
      const preferredOrder = ['name', 'Country', 'City', 'QS Ranking', 'Public/Private', 'Acceptance Rate', 'Tuition Fees (USD)', 'details', 'headerImage'];
      const orderedColumns = [
        ...preferredOrder.filter(col => allKeys.has(col)),
        ...Array.from(allKeys).filter(col => !preferredOrder.includes(col)),
      ];
      setColumns(orderedColumns);
    } else {
      const pageData = getPageData(page);
      setData(pageData);
      if (pageData.length > 0) {
        setColumns(Object.keys(pageData[0]));
      }
    }
  };

  const handleAddRow = () => {
    setEditingItem(null);
    setFormData({});
    setIsAddDialogOpen(true);
  };

  const handleEditRow = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleSaveRow = () => {
    if (selectedPage === 'universities') {
      let universities = getUniversities();
      
      if (editingItem) {
        // Update existing
        universities = universities.map(u =>
          u.id === editingItem.id ? { ...u, ...formData } : u
        );
      } else {
        // Add new
        universities.push({
          id: Date.now().toString(),
          ...formData,
        });
      }
      
      saveUniversities(universities);
    } else {
      let pageData = getPageData(selectedPage);
      
      if (editingItem) {
        pageData = pageData.map(item =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        );
      } else {
        pageData.push({
          id: Date.now().toString(),
          ...formData,
        });
      }
      
      savePageData(selectedPage, pageData);
    }

    loadData(selectedPage);
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setFormData({});
  };

  const handleDeleteRow = (id: string) => {
    if (selectedPage === 'universities') {
      deleteUniversity(id);
    } else {
      const pageData = getPageData(selectedPage);
      const filtered = pageData.filter(item => item.id !== id);
      savePageData(selectedPage, filtered);
    }
    
    loadData(selectedPage);
    setDeleteId(null);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      setNewColumnName('');
      setIsAddColumnDialogOpen(false);
    }
  };

  const handleDeleteColumn = (columnName: string) => {
    const updatedColumns = columns.filter(col => col !== columnName);
    setColumns(updatedColumns);
    
    // Remove the column from all data rows
    const updatedData = data.map(item => {
      const { [columnName]: _, ...rest } = item;
      return rest;
    });
    
    setData(updatedData);
    
    // Save updated data to localStorage
    if (selectedPage === 'universities') {
      saveUniversities(updatedData);
    } else {
      savePageData(selectedPage, updatedData);
    }
    
    setDeleteColumnName(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenKnowMore = (item: any) => {
    setEditingKnowMore(item);
    setKnowMoreContent(item.knowMore || '');
    setIsKnowMoreDialogOpen(true);
  };

  const handleSaveKnowMore = () => {
    if (editingKnowMore) {
      const updatedItem = { ...editingKnowMore, knowMore: knowMoreContent };
      
      let updatedData = data.map(item => 
        item.id === editingKnowMore.id ? updatedItem : item
      );
      
      setData(updatedData);
      
      // Save to localStorage
      if (selectedPage === 'universities') {
        saveUniversities(updatedData);
      } else {
        savePageData(selectedPage, updatedData);
      }
      
      setIsKnowMoreDialogOpen(false);
      setEditingKnowMore(null);
      setKnowMoreContent('');
    }
  };
  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Admin Panel
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your website content and data
          </p>
        </div>

        <Tabs value={selectedPage} onValueChange={setSelectedPage} className="w-full">
          <TabsList>
            {pages.map(page => (
              <TabsTrigger key={page} value={page} className="capitalize">
                {page}
              </TabsTrigger>
            ))}
          </TabsList>

          {pages.map(page => (
            <TabsContent key={page} value={page}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="capitalize">{page} Management</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handleAddRow} variant="default" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Row
                    </Button>
                    <Button
                      onClick={() => setIsAddColumnDialogOpen(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Column
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {columns.map(col => (
                            <TableHead key={col} className="relative group">
                              <div className="flex items-center justify-between gap-2">
                                <span>{col}</span>
                                <Button
                                  onClick={() => setDeleteColumnName(col)}
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                                  title="Delete column"
                                >
                                  <Trash2 className="w-3 h-3 text-destructive" />
                                </Button>
                              </div>
                            </TableHead>
                          ))}
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map(item => (
                          <TableRow key={item.id}>
                            {columns.map(col => (
                              <TableCell key={`${item.id}-${col}`} className="max-w-xs truncate">
                                {typeof item[col] === 'object'
                                  ? JSON.stringify(item[col]).substring(0, 50) + '...'
                                  : String(item[col] || '-')}
                              </TableCell>
                            ))}
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleOpenKnowMore(item)}
                                  variant="outline"
                                  size="sm"
                                  title="Edit Know More page"
                                >
                                  <FileText className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleEditRow(item)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => setDeleteId(item.id)}
                                  variant="destructive"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Add/Edit Row Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Row' : 'Add New Row'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {columns.map(col => (
              <div key={col} className="grid grid-cols-4 items-start gap-4">
                <label className="text-sm font-medium capitalize col-span-1 pt-2">
                  {col}
                </label>
                <div className="col-span-3">
                  {col === 'details' ? (
                    <Textarea
                      value={formData[col] || ''}
                      onChange={(e) => handleFormChange(col, e.target.value)}
                      placeholder={`Enter ${col}...`}
                      rows={4}
                    />
                  ) : (
                    <Input
                      type="text"
                      value={formData[col] || ''}
                      onChange={(e) => handleFormChange(col, e.target.value)}
                      placeholder={`Enter ${col}...`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveRow}>
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Column Dialog */}
      <Dialog open={isAddColumnDialogOpen} onOpenChange={setIsAddColumnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Column</DialogTitle>
            <DialogDescription>
              Enter the name of the new column
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Column name (e.g., 'Graduation Rate')"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddColumnDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddColumn}>
              Add Column
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Know More Editor Dialog */}
      <Dialog open={isKnowMoreDialogOpen} onOpenChange={setIsKnowMoreDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Know More Page</DialogTitle>
            <DialogDescription>
              Create detailed content for "{editingKnowMore?.name}" that users will see when they click "Know More"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Page Content</label>
              <Textarea
                placeholder="Enter HTML content or plain text. You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;img src='URL'&gt;, etc."
                value={knowMoreContent}
                onChange={(e) => setKnowMoreContent(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                💡 Tip: You can use HTML to format content. Examples:
                <br />
                • Headers: &lt;h2&gt;My Title&lt;/h2&gt;
                <br />
                • Paragraphs: &lt;p&gt;Your text here&lt;/p&gt;
                <br />
                • Images: &lt;img src=&quot;https://example.com/image.jpg&quot; alt=&quot;description&quot; /&gt;
                <br />
                • Bold: &lt;strong&gt;Bold text&lt;/strong&gt;
                <br />
                • Links: &lt;a href=&quot;https://example.com&quot;&gt;Link text&lt;/a&gt;
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsKnowMoreDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveKnowMore}>
              Save Know More Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => {
        if (!open) setDeleteId(null);
      }}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Row</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this row? This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteId && handleDeleteRow(deleteId)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Column Confirmation Dialog */}
      <AlertDialog open={!!deleteColumnName} onOpenChange={(open) => {
        if (!open) setDeleteColumnName(null);
      }}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Column</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the "{deleteColumnName}" column? This will remove it from all rows. This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteColumnName && handleDeleteColumn(deleteColumnName)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Column
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
