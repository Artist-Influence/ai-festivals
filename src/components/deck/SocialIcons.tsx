import { Music, Youtube, Instagram, Radio } from 'lucide-react';

interface SocialIcon {
  name: string;
  Icon: React.ReactNode;
}

const SocialIcons = ({ size = 24 }: { size?: number }) => {
  const icons: SocialIcon[] = [
    {
      name: 'Meta & TikTok',
      Icon: (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute w-4 h-4 bg-primary rounded-sm flex items-center justify-center text-[8px] font-bold text-primary-foreground">
            f
          </div>
          <div className="absolute w-4 h-4 ml-3 bg-gradient-to-r from-primary to-primary rounded flex items-center justify-center text-[8px] font-bold text-primary-foreground">
            ♪
          </div>
        </div>
      ),
    },
    {
      name: 'Spotify',
      Icon: <Music size={size} className="text-primary" />,
    },
    {
      name: 'YouTube',
      Icon: <Youtube size={size} className="text-primary" />,
    },
    {
      name: 'SoundCloud',
      Icon: <Radio size={size} className="text-primary" />,
    },
    {
      name: 'Instagram',
      Icon: <Instagram size={size} className="text-primary" />,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {icons.map((icon) => (
        <div
          key={icon.name}
          className="flex items-center justify-center w-8 h-8"
          title={icon.name}
        >
          {icon.Icon}
        </div>
      ))}
    </div>
  );
};

export default SocialIcons;
