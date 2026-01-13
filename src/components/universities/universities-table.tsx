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
import type { University } from '@/lib/types';
import { Badge } from '../ui/badge';

type UniversitiesTableProps = {
  universities: University[];
  headers: string[];
};

export default function UniversitiesTable({ universities, headers }: UniversitiesTableProps) {
  const formatHeader = (header: string) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {universities.length > 0 ? (
              universities.map((uni) => (
                <TableRow key={uni.id}>
                  {headers.map((header) => (
                    <TableCell key={`${uni.id}-${header}`}>
                      {header === 'name' ? (
                        <Link href={`/universities/${uni.id}`} className="font-medium text-primary hover:underline">
                          {uni[header]}
                        </Link>
                      ) : header.toLowerCase().includes('ranking') ? (
                        <Badge variant="secondary">#{uni[header]}</Badge>
                      ) : (
                        uni[header] || 'N/A'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="h-24 text-center">
                  No universities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
