<div align="center">

# 🖼️ GPT-Image2 Prompt Skill Hub & Gallery

> **Empowering your AI Image Generation with 2,400+ curated prompts, 30+ style categories, 1-click clipboard copy, and optional Google Firebase cloud sync.**

[![Developer](https://img.shields.io/badge/Developer-Lebi__Cybereun-FF4081?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cybereun)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[🇰🇷 한국어](#-한국어-가이드) | [🇺🇸 English](#-english-guide) | [🇯🇵 日本語](#-日本語ガイド)

---

</div>

## 🌐 Quick Language Navigation
- [🇰🇷 한국어 (Korean)](#-한국어-가이드)
- [🇺🇸 English](#-english-guide)
- [🇯🇵 日本語 (Japanese)](#-日本語ガイド)

---

<a name="-한국어-가이드"></a>
## 🇰🇷 한국어 가이드

### 📌 프로젝트 소개
**GPT-Image2 Prompt Skill Hub**는 DALL-E 3 및 GPT-Image2 생성에 최적화된 초대형 프롬프트 갤러리 웹앱입니다.  
주요 오픈소스 리포지토리들로부터 수집된 **2,480개 이상의 정제된 프롬프트**를 바탕으로 원하는 스타일의 이미지를 검색하고 클릭 한 번으로 프롬프트를 복사하여 사용할 수 있습니다.

### ✨ 주요 기능
- **🎨 비주얼 인트로 랜딩 페이지**: React Bits의 WebGL Lightfall 셰이더 다크 네온 모던 에스테틱.
- **⚡ 1-Click 프롬프트 복사**: 클릭 한 번으로 클립보드 복사 및 Toast 알림 표시.
- **🔍 실시간 정밀 검색**: 제목, 카테고리, 키워드, 태그 기준 2,400+ 프롬프트 실시간 검색.
- **🏷️ 30+ 스타일 카테고리**: Anime, Cinematic, Photography, Gaming, Fine Art, UI/UX, Awesome Library 등.
- **➕ 커스텀 프롬프트 추가 & 삭제**: 나만의 프롬프트를 갤러리에 추가하거나 원치 않는 항목 삭제 가능.
- **☁️ Firebase (무료 DB) & LocalStorage 하이브리드**: 설정이 없어도 로컬스토리지로 100% 작동하며, Firebase 연동 시 동기화 지원.

---

### 🔥 Google Firebase (무료) DB 설정 방법
본 웹앱은 Firebase Firestore 연동을 지원합니다. (미설정 시에도 기본 데이터와 LocalStorage로 완전 동작)

1. [Google Firebase Console](https://console.firebase.google.com/) 접속 후 새 프로젝트 생성.
2. **Firestore Database**를 만들고 시작 모드를 `테스트 모드(Test Mode)` 또는 읽기/쓰기 허용으로 생성.
3. 프로젝트 설정(`Project Settings`) ⚙️에서 **웹 앱(Web App)** 추가 후 발급된 `firebaseConfig` 확인.
4. **방법 A (웹앱 UI 상에서 설정)**:
   - 웹앱 오른쪽 상단 **`Firebase DB`** 버튼 클릭.
   - API Key, Project ID 등의 정보를 입력하고 저장.
5. **방법 B (Vercel 환경 변수 설정)**:
   - `.env.example`을 참고하여 Vercel Dashboard의 `Environment Variables`에 추가:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_AUTH_DOMAIN` 등

---

### 🛡️ 보안 및 안전성 안내
- **비밀키 하드코딩 없음**: 소스 코드에 어떤 API Key나 Secret도 하드코딩되어 있지 않습니다.
- **`.gitignore` 안전 설정**: `.env`, `.env.local`, `node_modules`, `dist` 등 민감한 파일과 빌드 생성물이 Git 저장소에 포함되지 않습니다.
- **안전한 클라이언트 스토리지**: 사용자 개인 Firebase Key는 브라우저 보안 영역 및 암호화 환경 변수에서만 관리됩니다.

---

### 💻 로컬 설치 및 실행 방법

```bash
# 1. 리포지토리 클론
git clone https://github.com/cybereun/gptimage2.git
cd gptimage2

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```
브라우저에서 `http://localhost:3000` 접속.

---

### 🚀 Vercel 배포 방법
1. 본 리포지토리를 Fork 또는 Push 하세요.
2. [Vercel Dashboard](https://vercel.com/dashboard)에서 **Add New Project** 선택.
3. `cybereun/gptimage2` 선택 후 **Deploy** 클릭! (Vite 세팅 자동 인식, `vercel.json` 포함됨)

---

### 📜 원본 출처 및 크레딧 (Credits)
이 프로젝트의 2,400+ 프롬프트 데이터셋은 아래 6개 대표 오픈소스 리포지토리를 기반으로 제작되었습니다:
- [wuyoscar/GPT-Image2-Skill](https://github.com/wuyoscar/GPT-Image2-Skill.git)
- [indreamai/awesome-gpt-image-2-prompts](https://github.com/indreamai/awesome-gpt-image-2-prompts)
- [moosl/awsome-gpt-image-2-prompts](https://github.com/moosl/awsome-gpt-image-2-prompts)
- [Kewal-Yaduvanshi/GPT-Image-2-Flow-Workbench](https://github.com/Kewal-Yaduvanshi/GPT-Image-2-Flow-Workbench)
- [EddieTYP/image-prompt-library](https://github.com/EddieTYP/image-prompt-library)
- [AtlasCloudAI/awesome-gpt-image-2-prompts](https://github.com/AtlasCloudAI/awesome-gpt-image-2-prompts)
- **Developer**: [Lebi_Cybereun](https://github.com/cybereun)

---

<hr />

<a name="-english-guide"></a>
## 🇺🇸 English Guide

### 📌 Overview
**GPT-Image2 Prompt Skill Hub** is a premium gallery web app optimized for GPT-Image2 and DALL-E 3 image generation.  
Developed by **Lebi_Cybereun**. Explore over 2,400+ curated prompts across 30+ visual categories from 6 major open-source prompt repositories.

### ✨ Key Features
- **🎨 Glassmorphic Intro Landing Page**: Interactive WebGL Lightfall shader background.
- **⚡ 1-Click Clipboard Copy**: Copy full prompt instantly with Toast notifications.
- **🔍 Instant Real-time Search**: Search across 2,400+ titles, tags, prompts, and categories.
- **🏷️ 30+ Style Categories**: Anime, Cinematic, Photography, Gaming, Fine Art, UI/UX, Awesome Library, etc.
- **➕ Custom Add & Delete Prompts**: Register your own prompts or remove unwanted cards easily.
- **☁️ Firebase & LocalStorage Hybrid Sync**: Works 100% standalone via LocalStorage or syncs with Google Firebase Firestore.

### 💻 Local Setup & Installation
```bash
git clone https://github.com/cybereun/gptimage2.git
cd gptimage2
npm install
npm run dev
```

---

<hr />

<a name="-日本語ガイド"></a>
## 🇯🇵 日本語ガイド

### 📌 概要
**GPT-Image2 Prompt Skill Hub**は、DALL-E 3およびGPT-Image2の画像生成に最適化された超大型プロンプトギャラリーWebアプリです。（開発者: **Lebi_Cybereun**）  
6つの主要オープンソースから集められた2,400以上のプロンプトからお気に入りのスタイルを検索し、ワンクリックでプロンプトをコピーして利用できます。

### ✨ 主な機能
- **🎨 インタラクティブデザイン**: WebGL Lightfallシェーダーアニメーション。
- **⚡ ワンクリックプロンプトコピー**: 1秒でクリップボードにコピー＆Toast通知表示。
- **🔍 2,400+リアルタイム高速検索**: タイトル、スタイル、タグから瞬時に検索。
- **➕ プロンプト追加・削除機能**: 独自のプロンプトを追加・削除して自由に管理。
- **☁️ Firebase（無料DB）＆ LocalStorage ハイブリッド同期**: Firebase非設定時でもLocalStorageで100%正常動作。

### 💻 ローカル実行
```bash
git clone https://github.com/cybereun/gptimage2.git
cd gptimage2
npm install
npm run dev
```

---

<div align="center">
  <p>Made with ❤️ by Lebi_Cybereun for AI Creators • Powered by OpenAI & Vercel</p>
</div>
