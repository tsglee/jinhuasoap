// Mono uppercase label, the single most-used type primitive in this design.
// e.g.  <Kicker>NO. 壹 · 花神守護</Kicker>
export function Kicker({ children, as: Tag = 'span', className = '', style }) {
  return (
    <Tag className={`r-kicker ${className}`} style={style}>
      {children}
    </Tag>
  );
}
