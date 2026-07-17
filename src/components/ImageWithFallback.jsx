import { useState, useEffect } from 'react';

export default function ImageWithFallback({ src, fallbackSrc, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  // Synchronize state with props when the source changes (e.g. when opening a different item inside a modal)
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
