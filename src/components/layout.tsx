import type { PropsWithChildren } from "react";

import Footer from "./footer";
import Header from "./header";
import { TooltipProvider } from "./ui/tooltip";
import { I18nProvider } from "~/i18n/use-i18n";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <TooltipProvider>
        <Header />
        {children}
        <Footer />
      </TooltipProvider>
    </I18nProvider>
  );
}
