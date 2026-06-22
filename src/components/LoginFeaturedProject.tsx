import { useEffect, useState } from 'react';
import { getLoginFeaturedProjectMedia, type LoginProjectMedia } from '../lib/projects';

type LoginFeaturedProjectProps = {
  className?: string;
};

type ProjectMediaProps = {
  media: LoginProjectMedia;
  className: string;
  mode: 'cover' | 'contain';
};

function ProjectMedia({ media, className, mode }: ProjectMediaProps) {
  const objectClass = mode === 'cover' ? 'object-cover' : 'object-contain';

  if (media.video) {
    return (
      <video
        src={media.video}
        poster={media.poster}
        className={`${className} ${objectClass}`}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
      />
    );
  }

  if (media.image) {
    return <img src={media.image} alt="Proyecto destacado" className={`${className} ${objectClass}`} />;
  }

  return <div className={`${className} bg-gradient-to-br from-brand-petrol via-brand-petrol-dark to-brand-green`} />;
}

export default function LoginFeaturedProject({ className = '' }: LoginFeaturedProjectProps) {
  const [media, setMedia] = useState<LoginProjectMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getLoginFeaturedProjectMedia()
      .then((featuredMedia) => {
        if (mounted) {
          setMedia(featuredMedia);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`relative overflow-hidden bg-brand-petrol-dark ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 bg-brand-petrol-dark">
          <div className="skeleton-shimmer absolute inset-0 bg-white/5" />
        </div>
      ) : media ? (
        <>
          <ProjectMedia
            media={media}
            mode="cover"
            className="absolute inset-0 h-full w-full scale-125 opacity-42 blur-3xl"
          />
          <div
            className="absolute left-1/2 top-1/2 h-[min(86dvh,900px)] max-h-[calc(100%-3rem)] aspect-[9/16] -translate-x-1/2 -translate-y-1/2"
            style={{
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskImage:
                'linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
              maskComposite: 'intersect',
            }}
          >
            <ProjectMedia
              media={media}
              mode="contain"
              className="h-full w-full drop-shadow-[0_34px_80px_rgba(0,0,0,0.7)]"
            />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-petrol via-brand-petrol-dark to-brand-green" />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(12,14,17,0.08)_30%,rgba(12,14,17,0.82)_100%),linear-gradient(90deg,rgba(255,92,0,0.18)_0%,rgba(15,31,36,0.04)_46%,rgba(45,91,55,0.22)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-brand-petrol-dark/92 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-petrol-dark/88 to-transparent" />
    </div>
  );
}
