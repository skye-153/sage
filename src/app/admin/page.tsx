import { getUniversities } from "@/lib/firebase/firestore";
import { University } from "@/lib/types";
import AdminTable from "@/components/admin/admin-table";

const getTableHeaders = (universities: University[]): string[] => {
  if (universities.length === 0) return [];

  const allKeys = new Set<string>();
  universities.forEach(uni => {
    Object.keys(uni).forEach(key => allKeys.add(key));
  });

  const preferredOrder = ['name', 'Country', 'City', 'QS Ranking', 'Public/Private'];
  const nonTableKeys = new Set(['id', 'details', 'headerImage']);

  const headers = Array.from(allKeys).filter(key => !nonTableKeys.has(key));

  headers.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  return headers;
};


export default async function AdminPage() {
  const universities = await getUniversities();
  const headers = getTableHeaders(universities);

  return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <AdminTable initialUniversities={universities} initialHeaders={headers} />
      </div>
  );
}
