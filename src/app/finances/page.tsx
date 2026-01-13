import MainLayout from "@/components/layout/main-layout";

export default function FinancesPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-10 px-4 md:px-6">
                <h1 className="text-4xl font-bold font-headline tracking-tight">
                    Financial Guidance
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Information about financing your studies will be available here soon.
                </p>
            </div>
        </MainLayout>
    );
}
