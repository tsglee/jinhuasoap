// Floating Line 加入好友 widget — fixed bottom-right of every page.
// Replaces all in-page LineCTA blocks with one persistent CTA. Same Line
// official 加入好友 button image, with subtle elevation shadow.
export function LineFloat() {
  return (
    <a
      href="https://lin.ee/7m167md"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="加入好友 · 聯絡金花樓"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 100,
        display: 'block',
        lineHeight: 0,
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <img
        src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
        alt="加入好友"
        height="40"
        style={{ display: 'block', border: 0 }}
      />
    </a>
  );
}
