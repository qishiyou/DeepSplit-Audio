import { AudioLines } from "lucide-react";

import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { useI18n } from "~/i18n/use-i18n";

export default function Header() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full border-b border-[#0a0a0a1a] bg-background/50 backdrop-blur-md dark:border-[#e5e5e526] lg:px-4">
      <div className="container flex w-full items-center justify-between">
        <a
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          href="/"
        >
          <AudioLines size={16} />
          <span className="font-medium">{t('title')}</span>
        </a>
        <div className="flex items-center space-x-1">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          >
            {lang === 'en' ? '中文' : 'EN'}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
