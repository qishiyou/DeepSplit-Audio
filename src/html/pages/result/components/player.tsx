import type { LucideIcon } from "lucide-react";
import { useMemo } from "react";
import {
  AudioLinesIcon,
  DownloadIcon,
  DrumIcon,
  GuitarIcon,
  MicVocalIcon,
  Trash2Icon,
} from "lucide-react";

import type { ResultType } from "~/db/schema";
import DeleteItem from "~/components/delete-item";
import { Button } from "~/components/ui/button";

interface Track {
  name: string;
  displayName: string;
  icon: LucideIcon;
}

const DEFAULT_TRACKS = [
  { name: "vocals.mp3", displayName: "Vocals", icon: MicVocalIcon },
  { name: "drums.mp3", displayName: "Drums", icon: DrumIcon },
  { name: "bass.mp3", displayName: "Bass", icon: GuitarIcon },
  { name: "other.mp3", displayName: "Other Instruments", icon: AudioLinesIcon },
] satisfies Track[];

const TWO_STEMS_TRACKS = [
  { name: "vocals.mp3", displayName: "Vocals", icon: MicVocalIcon },
  { name: "no_vocals.mp3", displayName: "Instrumental", icon: AudioLinesIcon },
] satisfies Track[];

interface PlayerProps {
  data: ResultType;
}

export default function Player({ data }: PlayerProps) {
  return (
    <main className="flex w-full flex-col items-center space-y-6 px-6 py-12">
      <h1 className="text-xl font-semibold">{data.name}</h1>
      
      {/* Model information */}
      <div className="w-full max-w-lg">
        <div className="p-3 bg-muted rounded-md">
          <h2 className="text-sm font-medium mb-2">Model: {data.model}</h2>
          <p className="text-xs text-muted-foreground">
            {data.twoStems ? 
              "Separated into vocals and instrumental music." : 
              "Separated into individual instruments: drums, bass, and other instruments."}
          </p>
        </div>
      </div>
      
      {/* Separation Results based on mode */}
      <div className="w-full max-w-lg">
        <h2 className="text-sm font-medium mb-3">Separation Results</h2>
        
        {data.twoStems ? (
          /* Two Stems Mode: Only show vocals and instrumental */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MicVocalIcon size={16} />
              <div className="w-full">
                <div className="text-xs mb-1">Vocals</div>
                <audio src={`/file/${data.id}/vocals.mp3`} controls className="w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AudioLinesIcon size={16} />
              <div className="w-full">
                <div className="text-xs mb-1">Background Music</div>
                <audio src={`/file/${data.id}/no_vocals.mp3`} controls className="w-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Instrument Separation Mode: Show instruments only, no vocals */
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DrumIcon size={16} />
              <div className="w-full">
                <div className="text-xs mb-1">Drums</div>
                <audio src={`/file/${data.id}/drums.mp3`} controls className="w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GuitarIcon size={16} />
              <div className="w-full">
                <div className="text-xs mb-1">Bass</div>
                <audio src={`/file/${data.id}/bass.mp3`} controls className="w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AudioLinesIcon size={16} />
              <div className="w-full">
                <div className="text-xs mb-1">Other Instruments</div>
                <audio src={`/file/${data.id}/other.mp3`} controls className="w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button asChild>
          <a href={`/file/${data.id}/original.mp3`} download>
            <DownloadIcon />
            Original
          </a>
        </Button>
        <DeleteItem id={data.id} name={data.name} variant="outline">
          <Trash2Icon />
          Delete
        </DeleteItem>
      </div>
    </main>
  );
}
