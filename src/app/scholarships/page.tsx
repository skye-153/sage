import MainLayout from "@/components/layout/main-layout";

export default function ScholarshipsPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-10 px-4 md:px-6">
                <h1 className="text-4xl font-bold font-headline tracking-tight">
                    Scholarships
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Information about scholarships will be available here soon.
                </p>
            </div>
        </MainLayout>
    );
}
