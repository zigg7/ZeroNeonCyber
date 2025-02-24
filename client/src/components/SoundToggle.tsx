import { useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound("https://cdn.pixabay.com/audio/2024/01/01/audio_2a1680a5aa.mp3", {
    loop: true,
  });

  const toggleSound = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50"
      onClick={toggleSound}
    >
      {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
    </Button>
  );
};
