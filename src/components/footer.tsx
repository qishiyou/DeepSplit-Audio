import { HeartIcon } from "lucide-react";
import { useI18n } from "~/i18n/use-i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="flex h-[4.5rem] w-full border-t bg-background opacity-100 transition-transform duration-300 sm:h-14 lg:px-4">
      <div className="container flex w-full flex-col items-center justify-between space-y-1 py-[14px] sm:flex-row">
        <a
          className="flex items-center space-x-1.5 text-sm text-muted-foreground transition-opacity hover:opacity-80"
          href="https://podter.me"
        >
          <HeartIcon size={12} />
          <span className="font-medium">{t('footerText')}</span>
        </a>
        <p className="flex items-center text-sm font-medium text-muted-foreground">
          Powered by ElysiaJS, React, and Demucs
        </p>
      </div>
    </footer>
  );
}
