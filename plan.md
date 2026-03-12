# 韓文學習網頁遊戲開發計畫 (Korean Learning Web Game Plan)

## 1. 遊戲核心概念 (Core Concept)
這是一款旨在幫助使用者透過輕鬆、互動的方式學習韓文單字與基礎文法的網頁遊戲。
遊戲將分為不同的難度與主題區塊（如：母音/子音、日常問候、食物、數字等）。

## 2. 功能規劃 (Features)

### 階段零：零基礎 40 音學習 (Hangul 40 Characters Learning) - *新增*
針對完全沒學過韓文的初學者，提供專屬的基礎發音與字形記憶遊戲。
* **動態 40 音表 (Alphabet Chart)**：圖像化的發音點擊表，完整包含 14 個基本子音、10 個基本母音、5 個雙子音與 11 個複合母音。點擊可查看羅馬拼音並加上發音功能。
* **羅馬拼音配對 (Romanization Match)**：從天而降或隨機出現羅馬拼音 (如："ga", "eo")，玩家需要快速點擊對應的韓文字母，訓練直覺反應。
* **聽音辨字測驗 (Sound Quiz)**：播放單一字母的發音，讓使用者選出正確的韓文字母，以強化「聽力」與「字形」的連結。

### 階段一：MVP (最小可行性產品) - 基礎單字測驗
* **題庫系統**：建立基礎的韓文單字 JSON 資料（包含韓文、中文翻譯、羅馬拼音）。
* **四大模式**：
    1. **字卡模式 (Flashcards)**：用於學習，顯示韓文、發音及中文。
    2. **選擇題模式 (Quiz)**：看韓文選中文，或看中文選韓文。
    3. **配對遊戲 (Matching)**：將韓文單字卡與中文翻譯卡進行配對消除。
* **計分與回饋**：答對加分，答錯顯示正確答案及解析。

### 階段二：進階功能與使用者體驗 (UX/UI Enhancement)
* **發音功能 (Text-to-Speech)**：使用 Web Speech API 讓使用者能聽到正確的韓文發音。
* **動畫效果**：加入答對/答錯的視覺回饋（可使用 Tailwind 動畫或 Framer Motion）。
* **進度追蹤 (Progress Tracking)**：使用 LocalStorage 記錄使用者的最高分和學習進度。
* **響應式設計 (RWD)**：確保在手機與電腦上都能獲得良好的遊玩體驗。

### 階段三：長期擴展 (Future Expansion)
* **分類關卡**：按主題（美食、旅遊、K-pop）或等級（TOPIK I, TOPIK II）分類。
* **排行榜系統**：加入後端資料庫（如 Firebase 或 Supabase）記錄全球/好友排行榜。
* **打字測驗 (Typing Test)**：練習韓文鍵盤輸入。

## 3. 技術棧 (Tech Stack)
* **框架**：Next.js (App Router)
* **語言**：TypeScript
* **樣式/UI**：Tailwind CSS
* **動畫**：Framer Motion (選擇性，用於豐富卡片翻轉、配對等動畫)
* **音效發音**：Web Speech API (語音合成)
* **資料儲存**：前端靜態 JSON (初期), LocalStorage

## 4. 實作步驟 (Implementation Steps)

1. **環境與版面配置**：
    * 設定基本 Layout 與全域樣式。
    * 建立首頁 (Home) 與模式選擇選單。
2. **新增階段零：基礎 40 音學習**：
    * 建立 `src/data/hangul.ts` 包含 40 音字母與發音對應資料。
    * 實作動態 40 音表 (`src/app/alphabet/page.tsx`)。
    * 實作羅馬拼音配對或聽音辨字小遊戲 (`src/app/alphabet-game/page.tsx`)。
3. **資料庫建立 (MVP 單字測驗)**：
    * 新增 `src/data/vocabulary.json` 包含初始的韓文基礎單字庫。
4. **核心遊戲邏輯 (以選擇題模式為例)**：
    * 建立遊戲頁面 (e.g., `src/app/quiz/page.tsx`)。
    * 實作隨機出題、選項打亂、對錯判定與計分系統。
5. **UI/UX 優化**：
    * 美化按鈕與卡片設計（使用 Tailwind CSS 的 hover, transition）。
    * 加入答對過關的視覺與聲音回饋。
6. **擴展其他模式**：
    * 實作字卡學習模式 (`src/app/flashcards/page.tsx`)。
    * 實作配對遊戲 (`src/app/matching/page.tsx`)。
7. **測試與調整**：
    * 進行跨裝置測試確認響應式設計。
    * 優化遊戲節奏與過場體驗。
