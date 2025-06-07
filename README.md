# YourPods - AI 即時美股語音助手 🎧

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://garyyang1001.github.io/YourPods/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Firebase](https://img.shields.io/badge/Database-Firebase-orange.svg)](https://firebase.google.com/)

專為忙碌投資人打造的 AI 即時美股語音助手，重大消息 10 分鐘內即時分析。

## 🚀 產品特色

### ⚡ 即時生成
- 重大消息發生後 **10 分鐘內** AI 自動生成語音分析
- 不再錯過任何影響股價的關鍵時刻
- 24/7 全時服務，永不斷線

### 🎯 個人化訂製
- 專注你關心的股票和產業
- 過濾 90% 不相關資訊
- 每一分鐘都是精華內容

### 🎙️ 三種語音風格
- **專業財經主播風格**：專業、準確、值得信賴
- **財經老師風格**：直接、犀利、一針見血  
- **同事聊天風格**：輕鬆、親切、朋友分享

## 🌟 核心競爭優勢

| 特色 | YourPods | 傳統 Podcast | 投資 APP |
|------|----------|-------------|----------|
| **反應速度** | 10 分鐘 | 6-24 小時 | 即時但無分析 |
| **個人化** | 100% | 0% | 部分 |
| **語音質量** | 3 種風格 | 單一主播 | 無語音 |
| **更新頻率** | 即時 | 週更/日更 | 即時 |

## 📱 Landing Page 功能

### 設計特色
- ✅ **響應式設計** - 完美適配所有設備
- ✅ **Duolingo 風格情勒文案** - 提高用戶參與度
- ✅ **專業視覺效果** - 深色模式 + 微動畫
- ✅ **信任建立元素** - 社交證明 + 稀缺性策略

### 互動功能
- 🎧 **語音試聽** - 三種風格即時播放
- 📧 **Firebase 整合** - 自動保存用戶資料
- 📊 **UTM 追蹤** - 完整的轉換分析
- 🎯 **A/B 測試準備** - 可追蹤不同版本效果

## 🛠️ 技術架構

### 前端技術
- **Vanilla JavaScript** - 純 JS，無框架依賴
- **CSS3 動畫** - 流暢的視覺效果
- **響應式設計** - Mobile First 設計理念
- **Intersection Observer** - 高效的滾動動畫

### 後端整合
- **Firebase Realtime Database** - 即時數據同步
- **Firebase Authentication** - 安全的用戶管理
- **UTM 參數追蹤** - 精確的營銷分析
- **Google Analytics** - 完整的用戶行為分析

### 性能優化
- ⚡ **Critical CSS 內聯** - 首屏快速載入
- 🖼️ **圖片優化** - WebP 格式 + 響應式
- 🎯 **懶加載** - 提升頁面載入速度
- 📦 **資源壓縮** - 最小化檔案大小

## 🔧 安裝與部署

### 本地開發
```bash
# 克隆專案
git clone https://github.com/garyyang1001/YourPods.git

# 進入專案目錄
cd YourPods

# 開啟本地服務器（可使用 Live Server 或任何靜態服務器）
# 訪問 http://localhost:3000
```

### Firebase 設置
1. 前往 [Firebase Console](https://console.firebase.google.com)
2. 建立新專案
3. 啟用 Realtime Database
4. 複製配置到 `index.html` 中的 `firebaseConfig`

```javascript
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### GitHub Pages 部署
專案已自動部署到 GitHub Pages：
🌐 **[Live Demo](https://garyyang1001.github.io/YourPods/)**

## 📊 數據結構

### Firebase Database Schema
```json
{
  "signups": {
    "user_id": {
      "email": "user@example.com",
      "timestamp": "2025-06-08T10:30:00Z",
      "source": "landing_page",
      "utmSource": "google",
      "utmMedium": "cpc",
      "utmCampaign": "yourpods_launch",
      "userAgent": "Mozilla/5.0...",
      "referrer": "google.com"
    }
  }
}
```

## 🎯 轉換優化策略

### 心理學原理
- **稀缺性** - "限量開放 100 位"
- **社交證明** - "已有 87 位投資朋友加入"
- **損失規避** - "錯過機會就是損失金錢"
- **權威性** - 專業的設計和內容

### A/B 測試建議
- 📝 **標題文案**：測試不同的情勒程度
- 🎨 **按鈕顏色**：橙色 vs 綠色 vs 紅色
- 📊 **社交證明數字**：測試不同的註冊人數
- ⏰ **稀缺性策略**：時間限制 vs 數量限制

## 📈 效能指標

### Core Web Vitals 目標
- **LCP (Largest Contentful Paint)** < 2.5s
- **FID (First Input Delay)** < 100ms  
- **CLS (Cumulative Layout Shift)** < 0.1

### 轉換率目標
- **Email 轉換率** > 10%
- **頁面停留時間** > 2 分鐘
- **滾動深度** > 80%
- **跳出率** < 40%

## 🚀 未來規劃

### Phase 1: MVP 驗證 (目前)
- ✅ Landing Page 上線
- ✅ Email 收集系統
- ✅ 基本分析追蹤

### Phase 2: 產品開發
- 🔄 AI 語音生成引擎
- 🔄 用戶儀表板
- 🔄 個人化設定

### Phase 3: 市場擴展
- 🔄 付費訂閱系統
- 🔄 社群功能
- 🔄 合作夥伴整合

## 🤝 貢獻指南

歡迎提交 Pull Request 或建議！

### 開發規範
- 使用 2 空格縮排
- 遵循 BEM CSS 命名規範
- 保持響應式設計
- 添加適當的註解

### 提交格式
```
feat: 新增功能
fix: 修復錯誤  
docs: 更新文檔
style: 樣式調整
perf: 性能優化
```

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 文件

## 📞 聯絡方式

- **專案負責人**: Gary Yang
- **Email**: gary@yourpods.com
- **GitHub**: [@garyyang1001](https://github.com/garyyang1001)

---

**⭐ 如果這個專案對你有幫助，請給個 Star 支持一下！**

## 🏆 致謝

感謝所有為這個專案貢獻的開發者和設計師！

- **設計靈感**: Duolingo, Linear, Stripe
- **技術支持**: Firebase, GitHub Pages
- **字體**: Google Fonts (Noto Sans TC)
- **圖標**: Material Design Icons
