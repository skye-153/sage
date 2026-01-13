import { getUniversities } from "@/lib/firebase/firestore";
import UniversitiesTable from "@/components/universities/universities-table";
import MainLayout from "@/components/layout/main-layout";
import { University } from "@/lib/types";

// Helper to determine and order table headers
const getTableHeaders = (universities: University[]): string[] => {
  if (universities.length === 0) return [];

  const allKeys = new Set<string>();
  universities.forEach(uni => {
    Object.keys(uni).forEach(key => allKeys.add(key));
  });

  // Define a preferred order for common columns
  const preferredOrder = ['name', 'Country', 'City', 'QS Ranking', 'Public/Private', 'Acceptance Rate', 'Tuition Fees (USD)'];
  const nonTableKeys = new Set(['id', 'details', 'headerImage']);

  const headers = Array.from(allKeys).filter(key => !nonTableKeys.has(key));

  // Sort headers: preferred ones first, then alphabetically
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


export default async function UniversitiesPage() {
  const universities = await getUniversities();
  const headers = getTableHeaders(universities);

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Explore Universities
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse our curated list of international universities. Click on a university's name for more details.
          </p>
        </div>
        <UniversitiesTable universities={universities} headers={headers} />
      </div>
    </MainLayout>
  );
}
