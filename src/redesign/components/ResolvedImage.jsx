function stripExt(src) {
  return src.replace(/\.(png|jpe?g|webp|avif)$/i, '');
}

// <picture> with AVIF → WebP → PNG fallback chain. Matches the source format
// triplet produced by scripts/optimize-images.js for every product photo.
export function ResolvedImage({
  src,
  alt = '',
  fit = 'cover',
  loading = 'lazy',
  fetchPriority,
  className,
}) {
  const base = stripExt(src);
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.png`}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchpriority={fetchPriority}
        className={className}
        style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
      />
    </picture>
  );
}
