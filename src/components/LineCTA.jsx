// 法規要求的「可聯絡上的管道」— Line 加入好友按鈕。多處重用：
// Footer / Shop 訂單送出後 / 三個法律頁 / About 底部 CTA。
// 圖片來自 Line 官方 CDN，遵循其 button design guideline。
export function LineCTA({ caption = '有問題？歡迎加 Line 聯絡我們。' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {caption && (
        <span
          className="tc"
          style={{
            fontSize: 13,
            letterSpacing: 1,
            color: 'var(--ink-60)',
          }}
        >
          {caption}
        </span>
      )}
      <a href="https://lin.ee/7m167md" target="_blank" rel="noopener noreferrer">
        <img
          src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
          alt="加入好友"
          height="36"
          style={{ border: 0, display: 'block' }}
        />
      </a>
    </div>
  );
}
