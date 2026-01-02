import { useMemo, useRef } from "react";
import { FileMusicIcon, UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

import ChevronRight from "~/components/icons/chevron-right";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";
import { useI18n } from "~/i18n/use-i18n";

export default function Form() {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  const { isDragAccept, getRootProps, getInputProps, open, acceptedFiles } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: {
        "audio/*": [],
      },
      maxFiles: 1,
      multiple: false,
      onDrop: (files) => {
        if (inputRef.current) {
          const dataTransfer = new DataTransfer();
          files.forEach((v) => {
            dataTransfer.items.add(v);
          });
          inputRef.current.files = dataTransfer.files;
        }
      },
    });

  const file = useMemo(() => acceptedFiles[0], [acceptedFiles]);

  return (
    <form
      method="POST"
      action="/"
      encType="multipart/form-data"
      className="flex w-full flex-col items-center space-y-6"
    >
      <div
        {...getRootProps({
          className: cn(
            "flex w-full flex-col items-center space-y-6 rounded-lg bg-card p-8 text-card-foreground shadow-sm outline-dashed outline-2 outline-border hover:outline-accent transition-all duration-300",
            isDragAccept && "bg-accent dark:bg-accent/50",
          ),
        })}
      >
        {file ? <FileMusicIcon size={48} /> : <UploadIcon size={48} />}
        <div className="flex flex-col items-center space-y-2 text-center">
          <p>{file ? file.name : t('dragDropText')}</p>
          <p className="text-sm text-muted-foreground">
            {file
              ? t('anotherFileText')
              : t('orClickText')}
          </p>
        </div>
        <Button onClick={open} variant="outline" type="button">
          {t('browseFiles')}
        </Button>
        <input
          type="file"
          name="file"
          required
          accept="audio/*"
          className="sr-only"
          ref={inputRef}
        />
        <input {...getInputProps()} />
      </div>
      <div className="flex flex-col w-full space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="two-stems" name="two_stems" />
            <Label htmlFor="two-stems">{t('onlyVocalsAndInstrumental')}</Label>
          </div>
          <div className="ml-7">
            <p className="text-xs text-muted-foreground">
              <span id="mode-description">
                选择"仅分离人声和背景音乐"将生成两个音轨；
                否则将分离为鼓、贝斯和其他乐器，建议使用纯音乐文件。
              </span>
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="model">{t('modelLabel')}</Label>
          <select 
            id="model" 
            name="model" 
            defaultValue="htdemucs"
            className="w-full px-3 py-2 bg-card text-card-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-accent"
          >
            <option value="htdemucs">{t('htdemucs')} - Supports: vocals, drums, bass, other</option>
            <option value="htdemucs_ft">{t('htdemucs_ft')} - Supports: vocals, drums, bass, other</option>
            <option value="htdemucs_6s">{t('htdemucs_6s')} - Supports: vocals, drums, bass, other</option>
            <option value="mdx_extra_q">{t('mdx_extra_q')} - Supports: vocals, drums, bass, other</option>
          </select>
          <p className="text-xs text-muted-foreground">
            All models support two-stage separation: first vocals + music, then further separation of music into instruments.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quality">{t('qualityLabel')}</Label>
          <select 
            id="quality" 
            name="quality" 
            defaultValue="2"
            className="w-full px-3 py-2 bg-card text-card-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-accent"
          >
            <option value="0">{t('lowQuality')}</option>
            <option value="2">{t('mediumQuality')}</option>
            <option value="5">{t('highQuality')}</option>
          </select>
        </div>
      </div>
      
      <Button className="group w-full max-w-sm transition-all duration-200 hover:shadow-md" type="submit">
        {t('separateButton')} <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </form>
  );
}
