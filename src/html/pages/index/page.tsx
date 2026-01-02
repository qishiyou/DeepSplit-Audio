import type { ResultType } from "~/db/schema";
import Form from "./components/form";
import ResultItem from "./components/result-item";
import { useI18n } from "~/i18n/use-i18n";

interface IndexProps {
  results: ResultType[];
}

export default function Index({ results }: IndexProps) {
  const { t } = useI18n();

  return (
    <main className="w-full px-6 py-12 lg:pt-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            {t('heroTitle')}
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            {t('heroSubtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column: Upload Form */}
          <div className="bg-card rounded-lg shadow-sm p-8 border border-border hover:shadow-md transition-shadow duration-300">
            <Form />
          </div>
          
          {/* Right column: History Files */}
          <div className="bg-card rounded-lg shadow-sm p-8 border border-border hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">{t('processingTitle')}</h2>
            <div className="flex w-full flex-col space-y-2">
              {results.length > 0 ? (
                results.map((result) => (
                  <ResultItem initialData={result} key={result.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-lg">
                  <p className="mb-2">{t('dragDropText')}</p>
                  <p className="text-sm">{t('orClickText')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
