'use client';

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
import { Badge } from '@/components/ui/badge';

type DataTableProps = {
  universities?: any[];
  items?: any[];
  headers: string[];
  basePath?: string;
};

export default function DataTable({ 
  universities, 
  items, 
  headers, 
  basePath = '/universities' 
}: DataTableProps) {
  const rows = items || universities || [];

  const formatHeader = (header: string) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="font-bold">
                  {formatHeader(header)}
                </TableHead>
              ))}
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((item) => (
                <TableRow key={item.id}>
                  {headers.map((header) => (
                    <TableCell key={`${item.id}-${header}`}>
                      {header === 'name' ? (
                        <Link 
                          href={`${basePath}/${item.id}`} 
                          className="font-medium text-primary hover:underline"
                        >
                          {item[header]}
                        </Link>
                      ) : header.toLowerCase().includes('ranking') ? (
                        <Badge variant="secondary">#{item[header]}</Badge>
                      ) : (
                        item[header] || 'N/A'
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`${basePath}/${item.id}`}>
                        Know More
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
