import { useCallback, useState } from "react";

import type { ButtonProps } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useI18n } from "~/i18n/use-i18n";

interface DeleteItemProps {
  id: string;
  name: string;
  withTooltip?: boolean;
}

export default function DeleteItem({
  id,
  name,
  withTooltip = false,
  ...props
}: DeleteItemProps & ButtonProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const deleteItem = useCallback(async () => {
    await fetch(`/api/result/${id}`, {
      method: "DELETE",
    });

    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  }, [id]);

  return (
    <>
      {withTooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button {...props} onClick={() => setOpen(true)} />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t('deleteButton')}</p>
          </TooltipContent>
        </Tooltip>
      )}
      <AlertDialog open={open} onOpenChange={setOpen}>
        {!withTooltip && (
          <AlertDialogTrigger asChild>
            <Button {...props} />
          </AlertDialogTrigger>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('errorTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('errorDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem}>{t('deleteButton')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
