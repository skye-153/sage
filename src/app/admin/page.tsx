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
import { Trash2, Edit2, Plus, FileText, Save, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { University } from '@/lib/types';

interface DataStore {
  universities: any[];
  scholarships: any[];
  accommodations: any[];
  visa: any[];
  finances: any[];
}

const pages = ['universities', 'scholarships', 'accommodations', 'visa', 'finances'];

export default function AdminPage() {
  const { toast } = useToast();
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
  const [isSaving, setIsSaving] = useState(false);
  const [allData, setAllData] = useState<DataStore | null>(null);

  // Load data when component mounts or page changes
  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (allData) {
      loadData(selectedPage);
    }
  }, [selectedPage, allData]);

  const loadAllData = async () => {
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const data = await response.json();
        setAllData(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data from server',
        variant: 'destructive',
      });
    }
  };

  const loadData = (page: string) => {
    if (!allData) return;
    
    let pageData: any[] = [];
    const pageLower = page.toLowerCase();
    
    if (pageLower === 'universities') {
      pageData = allData.universities || [];
    } else if (pageLower === 'scholarships') {
      pageData = allData.scholarships || [];
    } else if (pageLower === 'accommodations') {
      pageData = allData.accommodations || [];
    } else if (pageLower === 'visa') {
      pageData = allData.visa || [];
    } else if (pageLower === 'finances') {
      pageData = allData.finances || [];
    }
    
    setData(pageData);
    
    // Extract all unique column names
    const allKeys = new Set<string>();
    pageData.forEach(item => {
      Object.keys(item).forEach(key => allKeys.add(key));
    });
    
    const preferredOrder = ['id', 'name', 'Country', 'City', 'QS Ranking', 'Public/Private', 'Acceptance Rate', 'Tuition Fees (USD)', 'details', 'headerImage'];
    const orderedColumns = [
      ...preferredOrder.filter(col => allKeys.has(col)),
      ...Array.from(allKeys).filter(col => !preferredOrder.includes(col) && col !== 'knowMore'),
      ...(allKeys.has('knowMore') ? ['knowMore'] : []),
    ];
    setColumns(orderedColumns);
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

  const handleSaveRow = async () => {
    if (!allData) return;

    const newData = { ...allData };
    const pageLower = selectedPage.toLowerCase();
    let items: any[] = [];

    if (pageLower === 'universities') {
      items = newData.universities;
    } else if (pageLower === 'scholarships') {
      items = newData.scholarships;
    } else if (pageLower === 'accommodations') {
      items = newData.accommodations;
    } else if (pageLower === 'visa') {
      items = newData.visa;
    } else if (pageLower === 'finances') {
      items = newData.finances;
    }

    if (editingItem) {
      // Update existing
      const index = items.findIndex(u => u.id === editingItem.id);
      if (index >= 0) {
        items[index] = { ...items[index], ...formData };
      }
    } else {
      // Add new
      items.push({
        id: Date.now().toString(),
        ...formData,
      });
    }

    await saveAllData(newData);
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setFormData({});
  };

  const handleDeleteRow = async (id: string) => {
    if (!allData) return;

    const newData = { ...allData };
    const pageLower = selectedPage.toLowerCase();
    let items: any[] = [];

    if (pageLower === 'universities') {
      items = newData.universities;
    } else if (pageLower === 'scholarships') {
      items = newData.scholarships;
    } else if (pageLower === 'accommodations') {
      items = newData.accommodations;
    } else if (pageLower === 'visa') {
      items = newData.visa;
    } else if (pageLower === 'finances') {
      items = newData.finances;
    }

    items = items.filter(item => item.id !== id);

    if (pageLower === 'universities') {
      newData.universities = items;
    } else if (pageLower === 'scholarships') {
      newData.scholarships = items;
    } else if (pageLower === 'accommodations') {
      newData.accommodations = items;
    } else if (pageLower === 'visa') {
      newData.visa = items;
    } else if (pageLower === 'finances') {
      newData.finances = items;
    }

    await saveAllData(newData);
    setDeleteId(null);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
      setNewColumnName('');
      setIsAddColumnDialogOpen(false);
    }
  };

  const handleDeleteColumn = async (columnName: string) => {
    if (!allData) return;

    const newData = { ...allData };
    const pageLower = selectedPage.toLowerCase();
    let items: any[] = [];

    if (pageLower === 'universities') {
      items = newData.universities;
    } else if (pageLower === 'scholarships') {
      items = newData.scholarships;
    } else if (pageLower === 'accommodations') {
      items = newData.accommodations;
    } else if (pageLower === 'visa') {
      items = newData.visa;
    } else if (pageLower === 'finances') {
      items = newData.finances;
    }

    // Remove the column from all data rows
    items = items.map(item => {
      const { [columnName]: _, ...rest } = item;
      return rest;
    });

    if (pageLower === 'universities') {
      newData.universities = items;
    } else if (pageLower === 'scholarships') {
      newData.scholarships = items;
    } else if (pageLower === 'accommodations') {
      newData.accommodations = items;
    } else if (pageLower === 'visa') {
      newData.visa = items;
    } else if (pageLower === 'finances') {
      newData.finances = items;
    }

    await saveAllData(newData);
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

  const handleSaveKnowMore = async () => {
    if (!allData || !editingKnowMore) return;

    const newData = { ...allData };
    const pageLower = selectedPage.toLowerCase();
    let items: any[] = [];

    if (pageLower === 'universities') {
      items = newData.universities;
    } else if (pageLower === 'scholarships') {
      items = newData.scholarships;
    } else if (pageLower === 'accommodations') {
      items = newData.accommodations;
    } else if (pageLower === 'visa') {
      items = newData.visa;
    } else if (pageLower === 'finances') {
      items = newData.finances;
    }

    const index = items.findIndex(item => item.id === editingKnowMore.id);
    if (index >= 0) {
      items[index].knowMore = knowMoreContent;
    }

    await saveAllData(newData);
    setIsKnowMoreDialogOpen(false);
  };

  const saveAllData = async (newData: DataStore) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        setAllData(newData);
        toast({
          title: 'Success',
          description: 'Data saved successfully! Remember to rebuild and redeploy your site.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save data',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: 'Error',
        description: 'Failed to save data',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadData = () => {
    if (!allData) return;
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sage-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Edit your data and save changes. After saving, rebuild and redeploy your site.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadData}>
              <Download className="w-4 h-4 mr-2" />
              Download Data
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📝 How to Deploy Changes:</h3>
          <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
            <li>Make changes in this admin dashboard</li>
            <li>Click Save when done</li>
            <li>Run <code className="bg-white px-2 py-1 rounded">npm run build</code> locally</li>
            <li>The changes are now in your static export</li>
            <li>Deploy the <code className="bg-white px-2 py-1 rounded">out/</code> folder to your hosting</li>
          </ol>
        </div>

        <Tabs value={selectedPage} onValueChange={setSelectedPage}>
          <TabsList className="grid w-full grid-cols-5">
            {pages.map(page => (
              <TabsTrigger key={page} value={page} className="capitalize">
                {page}
              </TabsTrigger>
            ))}
          </TabsList>

          {pages.map(page => (
            <TabsContent key={page} value={page} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold capitalize">{page}</h2>
                <div className="flex gap-2">
                  <Button onClick={() => setIsAddColumnDialogOpen(true)} variant="outline">
                    + Add Column
                  </Button>
                  <Button onClick={handleAddRow}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Row
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  {data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No data available. Add a new row to get started.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {columns.map(col => (
                              <TableHead key={col} className="relative">
                                <div className="flex items-center gap-2">
                                  {col}
                                  {col !== 'id' && (
                                    <button
                                      onClick={() => setDeleteColumnName(col)}
                                      className="text-red-500 hover:text-red-700 opacity-0 hover:opacity-100 transition"
                                      title="Delete column"
                                    >
                                      ×
                                    </button>
                                  )}
                                </div>
                              </TableHead>
                            ))}
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.map((item, idx) => (
                            <TableRow key={item.id || idx}>
                              {columns.map(col => (
                                <TableCell key={`${item.id}-${col}`} className="max-w-xs truncate">
                                  {col === 'details' || col === 'knowMore' ? (
                                    <span className="text-blue-600 cursor-pointer hover:underline">
                                      [HTML Content]
                                    </span>
                                  ) : (
                                    String(item[col] || '')
                                  )}
                                </TableCell>
                              ))}
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditRow(item)}
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    onClick={() => setDeleteId(item.id)}
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600"
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Add/Edit Row Dialog */}
        <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open && !isEditDialogOpen);
          setIsEditDialogOpen(open && !!editingItem);
        }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {columns.map(col => (
                <div key={col}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {col}
                  </label>
                  {col === 'details' || col === 'knowMore' ? (
                    <Textarea
                      value={formData[col] || ''}
                      onChange={(e) => handleFormChange(col, e.target.value)}
                      placeholder={`Enter ${col}...`}
                      rows={6}
                    />
                  ) : (
                    <Input
                      type={col.includes('Rank') ? 'number' : 'text'}
                      value={formData[col] || ''}
                      onChange={(e) => handleFormChange(col, e.target.value)}
                      placeholder={`Enter ${col}...`}
                    />
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                setFormData({});
                setEditingItem(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveRow} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Know More Dialog */}
        <Dialog open={isKnowMoreDialogOpen} onOpenChange={setIsKnowMoreDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Know More Content</DialogTitle>
            </DialogHeader>
            <Textarea
              value={knowMoreContent}
              onChange={(e) => setKnowMoreContent(e.target.value)}
              placeholder="Enter HTML content..."
              rows={10}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsKnowMoreDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveKnowMore} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialogs */}
        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteRow(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={!!deleteColumnName} onOpenChange={(open) => !open && setDeleteColumnName(null)}>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Column</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{deleteColumnName}" column? This will remove this data from all items.
            </AlertDialogDescription>
            <AlertDialogAction
              onClick={() => deleteColumnName && handleDeleteColumn(deleteColumnName)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>

        {/* Add Column Dialog */}
        <Dialog open={isAddColumnDialogOpen} onOpenChange={setIsAddColumnDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Column name (e.g., 'Location')"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddColumn();
                }
              }}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddColumnDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddColumn}>Add Column</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
