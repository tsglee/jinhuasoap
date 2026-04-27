# 版本與部署規則

簡單到能一個人維護、出事能立刻 rollback 的兩條路徑。

## 版號規則（SemVer）

`MAJOR.MINOR.PATCH` — 從 `v0.1.0` 起算。

| 改動類型 | 版號動作 | 範例 |
|---|---|---|
| 新功能批次（一個 tab 改版、加新整段內容、新接金流等） | MINOR ＋1 | `v0.1.0` → `v0.2.0` |
| 修 bug、文案微調、文件補充 | PATCH ＋1 | `v0.1.0` → `v0.1.1` |
| 大改版 / breaking change（網域換、整站重設計） | MAJOR ＋1 | `v0.x.y` → `v1.0.0` |

## 打 tag 流程

每次想 release 跟 Claude 喊「打 v0.x.y」就會跑這四步：

```
git tag -a v0.x.y -m "v0.x.y — 一行說明"
git push origin v0.x.y
gh release create v0.x.y --title "v0.x.y — 一行說明" --notes "..."
（package.json version 維持同步，必要時 bump）
```

## 兩種 rollback 路徑

### A. 網站掛了，馬上想看上一版（最快）

Cloudflare Dashboard → **Workers** → `jinhuasoap` → **Deployments** tab
找到上一個正常的 deploy → 點旁邊的 **Rollback** → 立即生效。不用碰程式碼、不用 push、不用等 build。

Cloudflare 自動保留所有歷史 deploy。這是「**網站掛了還可以隨時 on 起來**」的核心工具。

### B. 把 git 主線拉回某個 release 的程式碼狀態

```
git checkout v0.x.y                  # 看那個版本長什麼樣
git push --force-with-lease origin main \
  --commit=$(git rev-parse v0.x.y)   # 把 main 推回那個 commit
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
