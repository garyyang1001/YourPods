# YourPods Landing Page

這是 YourPods AI 即時美股語音助手的官方登入頁面，經過重構以提高代碼的可維護性和組織性。

## 📁 檔案結構

```
yourpods-landing/
├── index.html              # 主要 HTML 結構
├── styles.css              # 所有 CSS 樣式
├── script.js               # 主要 JavaScript 功能
├── firebase-config.js      # Firebase 配置
├── demo-audio.mp3          # 演示音頻檔案 (需要提供)
├── demo-audio.mp4          # 演示音頻檔案 (需要提供)
└── README.md               # 專案說明
```

## 🚀 快速開始

### 1. 設定檔案

將所有檔案放在同一個資料夾中：
- `index.html` - 主頁面
- `styles.css` - 樣式表
- `script.js` - JavaScript 功能
- `firebase-config.js` - Firebase 設定

### 2. Firebase 配置

編輯 `firebase-config.js` 檔案，替換為您的實際 Firebase 配置：

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 3. 添加音頻檔案

在根目錄添加以下音頻檔案：
- `demo-audio.mp3` - MP3 格式的演示音頻
- `demo-audio.mp4` - MP4 格式的演示音頻

### 4. 啟動網站

使用任何網頁伺服器啟動網站，例如：

#### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用 Node.js (http-server)
```bash
npm install -g http-server
http-server
```

#### 使用 Live Server (VS Code 擴展)
在 VS Code 中安裝 Live Server 擴展，右鍵點擊 `index.html` 選擇 "Open with Live Server"

## 🎨 重構改進

### 原始問題
- 所有代碼都在單一 HTML 檔案中
- 內嵌的 CSS 和 JavaScript 難以維護
- 代碼組織性差，不符合最佳實踐

### 改進後的結構
- **分離關注點**: HTML、CSS、JavaScript 各自獨立
- **模組化**: Firebase 配置獨立管理
- **可維護性**: 易於修改和擴展
- **開發體驗**: 更好的代碼編輯和除錯體驗

## 📋 功能說明

### HTML (`index.html`)
- 保持乾淨的結構標記
- 移除所有內嵌樣式和腳本
- 添加適當的外部檔案連結

### CSS (`styles.css`)
- 完整的響應式設計
- 動畫和過渡效果
- 移動端優化
- 組件化的樣式結構

### JavaScript (`script.js`)
- 音頻播放控制
- 表單處理和驗證
- 滾動動畫
- Firebase 資料儲存
- 事件追蹤

### Firebase (`firebase-config.js`)
- 模組化配置
- 錯誤處理
- ES6 和全域變數支援

## 🔧 自定義設定

### 修改樣式
編輯 `styles.css` 檔案來自定義：
- 顏色主題
- 字體大小
- 動畫效果
- 響應式斷點

### 添加功能
在 `script.js` 中添加新功能：
- 新的互動效果
- 額外的表單驗證
- 更多追蹤事件

### 更新內容
在 `index.html` 中修改：
- 文字內容
- 圖片和圖標
- 結構佈局

## 📱 響應式設計

網站針對以下設備進行了優化：
- 桌面電腦 (1200px+)
- 平板電腦 (768px - 1199px)
- 手機 (480px - 767px)
- 小螢幕手機 (480px 以下)

## 🎯 性能優化

- CSS 動畫使用 GPU 加速
- 圖片和字體預載入
- 最小化重繪和重排
- 懶載入滾動動畫

## 🔒 安全性考慮

- 表單驗證 (前端和後端)
- Firebase 規則設定
- XSS 防護
- CSRF 保護

## 📊 分析和追蹤

支援以下分析工具：
- Google Analytics
- Facebook Pixel
- 自定義事件追蹤

## 🐛 常見問題

### Firebase 連接失敗
檢查 `firebase-config.js` 中的配置是否正確，確保 Firebase 專案已啟用 Realtime Database。

### 音頻無法播放
確保音頻檔案存在且格式正確，檢查瀏覽器的自動播放政策。

### 樣式異常
確保 `styles.css` 檔案路徑正確，檢查瀏覽器開發者工具中的錯誤訊息。

## 📝 更新日誌

### v2.0.0
- 重構代碼結構
- 分離 HTML、CSS、JavaScript
- 改善代碼組織和可維護性
- 添加詳細文檔

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案。

## 📄 授權

本專案採用 MIT 授權條款。