// /order/:orderId — 公開查單頁。
//
// 買家從 email 拿到訂單編號 JH-YYMMDD-XXXX 後可以隨時來這查狀態。
// 無會員系統、無登入 ── 純粹用訂單編號做查詢。後端過濾敏感欄位
// （email / 電話 / IP 不回傳）。
//
// 兩種模式：
// - 路由帶 orderId → 直接查詢
// - 路由不帶 → 顯示輸入欄、按查詢 navigate 到 /order/:id
import { useEffect, useState } from 'react';

const STATUS_LABELS = {
  pending: { label: '訂單收到、處理中', color: 'var(--gold-3)' },
  processing: { label: '物流單已建、等待出貨', color: 'var(--red)' },
};

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

export function OrderTracking({ orderId, navigate }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputId, setInputId] = useState(orderId || '');

  useEffect(() => {
    document.title = orderId ? `查詢訂單 ${orderId} · 金花樓` : '查詢訂單 · 金花樓';
  }, [orderId]);

  useEffect(() => {
    if (!orderId) {
      setData(null);
      setError('');
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    fetch(`/api/order/${encodeURIComponent(orderId)}`)
      .then(async (r) => {
        const json = await r.json().catch(() => ({}));
        if (cancelled) return;
        if (!r.ok || !json.ok) {
          setError(json.error || `查詢失敗（HTTP ${r.status}）`);
          setData(null);
        } else {
          setData(json);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) setError(`連線錯誤：${err.message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputId.trim().toUpperCase();
    if (!trimmed) return;
    if (!/^JH-\d{6}-[A-Z0-9]{4}$/.test(trimmed)) {
      setError('訂單編號格式為 JH-YYMMDD-XXXX，請檢查 email 上的編號');
      return;
    }
    navigate(`/order/${trimmed}`);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '70px 44px 30px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          訂單查詢 · Order Status
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 54,
            fontWeight: 500,
            letterSpacing: 12,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          查詢訂單
        </h1>
        <div
          className="tc"
          style={{
            fontSize: 15,
            color: 'var(--ink-60)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.85,
            letterSpacing: 1,
          }}
        >
          訂單編號可從 email 通知裡找到，格式類似 JH-260510-MZ9M。
        </div>
      </section>

      <section
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 44px 80px',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: 12,
            margin: '0 auto 40px',
            maxWidth: 480,
          }}
        >
          <input
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="JH-YYMMDD-XXXX"
            aria-label="訂單編號"
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: 14,
              letterSpacing: 2,
              background: 'var(--paper)',
              border: '1px solid var(--ink-15)',
              color: 'var(--sumi)',
              fontFamily: '"DM Mono", monospace',
              textTransform: 'uppercase',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="mono"
            style={{
              padding: '12px 24px',
              background: 'var(--red)',
              color: 'var(--gold-2)',
              border: '1px solid var(--gold-1)',
              fontSize: 13,
              letterSpacing: 2,
              cursor: 'pointer',
            }}
          >
            查詢
          </button>
        </form>

        {loading && (
          <div className="tc" style={{ textAlign: 'center', color: 'var(--ink-60)', padding: '40px 0' }}>
            查詢中...
          </div>
        )}

        {error && !loading && (
          <div
            style={{
              padding: '20px 24px',
              border: '1px solid var(--red)',
              background: 'rgba(138, 42, 34, 0.06)',
              color: 'var(--red)',
              textAlign: 'center',
              fontSize: 14,
              letterSpacing: 1,
              lineHeight: 1.85,
            }}
          >
            ⚠ {error}
          </div>
        )}

        {data && !loading && (
          <div
            style={{
              border: '1px solid var(--ink-15)',
              background: 'var(--paper)',
              padding: '32px 28px',
              display: 'grid',
              gap: 24,
            }}
          >
            {/* Status badge */}
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(244,236,215,0.4)',
                border: `1px solid ${STATUS_LABELS[data.status]?.color || 'var(--ink-15)'}`,
                textAlign: 'center',
              }}
            >
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-60)', letterSpacing: 2 }}>
                目前狀態
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: 3,
                  color: STATUS_LABELS[data.status]?.color || 'var(--sumi)',
                  margin: '8px 0 0',
                }}
              >
                {STATUS_LABELS[data.status]?.label || data.status}
              </div>
              {data.logisticsId && (
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-60)', marginTop: 12, letterSpacing: 1.5 }}>
                  物流單號 · {data.logisticsId}
                </div>
              )}
            </div>

            {/* Order header */}
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px 24px', alignItems: 'baseline' }}>
              <DetailRow label="訂單編號" value={data.orderId} mono />
              <DetailRow label="下單時間" value={formatDate(data.createdAt)} />
              <DetailRow label="收件人" value={data.recipientName} />
              <DetailRow label="寄送方式" value={data.shipMethod} />
              {data.storeName && <DetailRow label="取件門市" value={data.storeName} />}
              {data.note && <DetailRow label="備註" value={data.note} />}
            </dl>

            {/* Items */}
            <div>
              <div className="mono" style={{ color: 'var(--gold-3)', fontSize: 12, letterSpacing: 2, marginBottom: 12 }}>
                品項
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {(data.items || []).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      borderBottom: '1px dotted var(--ink-15)',
                      fontSize: 14,
                      letterSpacing: 1,
                      color: 'var(--sumi)',
                    }}
                    className="tc"
                  >
                    <span>
                      № {item.num} · {item.zh}
                      <span style={{ color: 'var(--ink-60)', marginLeft: 8 }}>× {item.qty}</span>
                    </span>
                    <span className="mono">NT$ {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  fontSize: 16,
                  letterSpacing: 2,
                  color: 'var(--sumi)',
                  fontWeight: 500,
                }}
              >
                <span className="tc">合計</span>
                <span className="italic" style={{ color: 'var(--red)', fontSize: 20 }}>NT$ {data.total}</span>
              </div>
            </div>

            {data.logisticsError && (
              <div
                style={{
                  padding: 12,
                  background: 'rgba(138,42,34,0.06)',
                  border: '1px solid var(--ink-15)',
                  fontSize: 12,
                  color: 'var(--ink-60)',
                  letterSpacing: 1,
                  lineHeight: 1.7,
                }}
              >
                註：ECPay 自動建單未完成（{data.logisticsError}）── 老闆娘會手動處理出貨，請待 Line 通知。
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mono"
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: 'var(--sumi)',
              border: '1px solid var(--ink-15)',
              fontSize: 12,
              letterSpacing: 2,
              cursor: 'pointer',
            }}
          >
            ← 回首頁
          </button>
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, value, mono }) {
  return (
    <>
      <dt
        className="mono"
        style={{
          color: 'var(--gold-3)',
          fontSize: 12,
          letterSpacing: 2,
          minWidth: 70,
        }}
      >
        {label}
      </dt>
      <dd
        className={mono ? 'mono' : 'tc'}
        style={{
          margin: 0,
          fontSize: 14,
          letterSpacing: 1,
          color: 'var(--sumi)',
          lineHeight: 1.6,
        }}
      >
        {value}
      </dd>
    </>
  );
}
