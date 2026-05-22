// Plain section wrapper with max-width and consistent padding. Inner content
// owns its own layout grid — this just centers + bounds the column.
export function Section({ as: Tag = 'section', className = '', children, id }) {
  return (
    <Tag id={id} className={`r-section ${className}`}>
      {children}
    </Tag>
  );
}
