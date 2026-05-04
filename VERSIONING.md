# 版本與部署規則

簡單到能一個人維護、出事能立刻 rollback 的兩條路徑。

## 版號規則

`release-YYYY-MM-DD-HHMM` — **台灣時間**，每次想 release 跟 Claude 喊「打 tag」就用當下時間。

例：`release-2026-05-04-1701`

> **為什麼不用 SemVer**：單人小品牌站不需要 MAJOR/MINOR/PATCH 紀律；日期時間直接告訴你「這版是哪天哪時候的狀態」，rollback 找版本時更直觀。歷史上 `v0.1.0` 到 `v0.3.2` 是早期 SemVer 階段的 tag，保留作 back-reference 不再延續。切換點：`release-2026-05-04-1701`（與 `v0.3.2` 同一個 commit，明確標記新規則起點）。

## 打 tag 流程

```bash
TAG="release-$(TZ=Asia/Taipei date +%Y-%m-%d-%H%M)"
git tag -a "$TAG" -m "$TAG — 一行說明"
git push origin "$TAG"
gh release create "$TAG" --title "$TAG" --notes "..."
```

每次想 release 跟 Claude 喊「打 tag」就會跑這四步。

## 兩種 rollback 路徑

### A. 網站掛了，馬上想看上一版（最快）

Cloudflare Dashboard → **Workers** → `jinhuasoap` → **Deployments** tab
找到上一個正常的 deploy → 點旁邊的 **Rollback** → 立即生效。不用碰程式碼、不用 push、不用等 build。

Cloudflare 自動保留所有歷史 deploy。這是「**網站掛了還可以隨時 on 起來**」的核心工具。

### B. 把 git 主線拉回某個 release 的程式碼狀態

```bash
git checkout release-2026-05-04-1701              # 看那個版本長什麼樣
git push --force-with-lease origin main \
  --commit=$(git rev-parse release-2026-05-04-1701)   # 把 main 推回那個 commit
```

force-push 會觸發 Cloudflare Workers Builds 重新建置該版本並部署。**這個用法會讓中間的 commit 在 main 線上消失**（在 reflog 還在），所以慎用 — 通常 Path A 就夠了。

## Cloudflare Variables 的小陷阱

`wrangler.jsonc` 的 `vars` 區塊是 **deploy 時的唯一真相**：每次 push、Cloudflare Workers Builds 跑 `wrangler deploy`，都會把 dashboard 的 plaintext vars 同步成 wrangler.jsonc 寫的內容。**dashboard 手動加的 plaintext vars 在下一次 push 就會被 wipe 掉**。

兩種正確擺法：

| 類型 | 例子 | 放哪裡 |
|---|---|---|
| **公開設定**（公網看得到、寫進 git 沒問題） | `ECPAY_MERCHANT_ID` | wrangler.jsonc `vars` 區塊 |
| **加密 secret**（密鑰、API token） | `RESEND_API_KEY` | dashboard `+ Add` → `Secret`（或 `wrangler secret put`） |

Encrypted secrets 走獨立軌、不在 wrangler.jsonc，**deploy 不會碰它們**。

## 此 repo 目前狀態

- `wrangler.jsonc` 有 `ECPAY_MERCHANT_ID` plaintext var
- Dashboard 應該保留 `RESEND_API_KEY` 為 encrypted secret（其他 plaintext 都會被 push 抹掉，請以 wrangler.jsonc 為準）
