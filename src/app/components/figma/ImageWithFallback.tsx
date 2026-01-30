import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  fallbackSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231c1c1c"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="14" fill="%23666"%3EImage unavailable%3C/text%3E%3C/svg%3E', 
  alt, 
  onLoad,
  onError: onErrorProp,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const onError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      onErrorProp?.();
    }
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={onError}
      onLoad={handleLoad}
      {...props}
    />
  );
};