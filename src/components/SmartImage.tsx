import React, { useEffect, useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#131b2e"/><stop offset="1" stop-color="#27406b"/>` +
      `</linearGradient></defs>` +
      `<rect width="400" height="250" fill="url(#g)"/>` +
      `<circle cx="200" cy="112" r="34" fill="none" stroke="#ffb690" stroke-width="3"/>` +
      `<ellipse cx="200" cy="112" rx="14" ry="34" fill="none" stroke="#ffb690" stroke-width="2"/>` +
      `<path d="M166 112h68" stroke="#ffb690" stroke-width="2"/>` +
      `<text x="200" y="186" text-anchor="middle" fill="#dce9ff" font-family="sans-serif" font-size="15" font-weight="bold">AfriPath</text>` +
    `</svg>`,
  );

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

// Drop-in <img> that lazy-loads and falls back to a branded placeholder
// when the remote image is unreachable (offline or expired URL).
export const SmartImage: React.FC<SmartImageProps> = ({ src, alt = "", ...rest }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      src={failed || !src ? PLACEHOLDER : src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};
