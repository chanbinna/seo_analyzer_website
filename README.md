# SEO Analyzer Website

A modern, bilingual (Korean/English) SEO analysis web application built with Next.js, providing real-time website SEO scoring, actionable recommendations, and a beautiful, user-friendly interface.

---

## 🚀 Project Overview

This app analyzes any website for SEO performance, giving you:
- **Overall and detailed SEO scores**
- **Actionable, prioritized recommendations**
- **Technical and content SEO breakdowns**
- **Animated, color-coded feedback**
- **Full Korean/English UI toggle**

---

## ✨ Features

- **Real-time SEO Analysis**: Enter any URL and get instant, live SEO analysis using Google PageSpeed Insights and HTML parsing.
- **Technical SEO Checks**: Page speed, mobile optimization, SSL, sitemap presence, etc.
- **Content SEO Checks**: Meta tags, heading structure, image optimization, keyword usage, etc.
- **Bilingual UI**: All text, labels, and recommendations are available in both Korean and English. Toggle instantly from the navbar.
- **Modern, Friendly UI**: Apple-inspired minimal design, pastel colors, rounded corners, and smooth animations (framer-motion).
- **Copyable Recommendations**: One-click copy for each improvement suggestion, with feedback.
- **Explanatory Pages**: "About SEO" and "How It Works" pages, both bilingual.

---

## 🛠️ Tech Stack

- **Next.js** (App Router, API routes)
- **React** (with context for language state)
- **Tailwind CSS** (utility-first styling)
- **framer-motion** (animations)
- **axios** (HTTP requests)
- **cheerio** (HTML parsing)
- **Google PageSpeed Insights API** (performance data)

---

## 🌏 Bilingual Support

- All user-facing text is available in both Korean and English.
- Language state is managed globally via React context (`LanguageProvider`).
- Toggle language from any page using the navbar button.
- All recommendations, explanations, and UI elements update instantly.

---

## ⚡ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chanbinna/seo_analyzer_website.git
   cd seo_analyzer_website
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file if you want to use your own Google PageSpeed API key (optional, not required for public API usage).
   ```env
   # .env.local
   # NEXT_PUBLIC_PAGESPEED_API_KEY=your_api_key_here
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Usage

1. **Home Page:**
   - Enter a website URL and click "Start SEO Analysis" (or "SEO 분석 시작").
2. **Results Page:**
   - View overall and detailed SEO scores.
   - See color-coded, animated progress bars.
   - Read explanations and improvement suggestions for each SEO factor.
   - Copy recommendations with one click ("복사됨!"/"Copied!" feedback).
3. **About & How It Works:**
   - Learn about SEO and how the analyzer works, in both languages.
4. **Language Toggle:**
   - Use the navbar button to switch between Korean and English at any time.

---

## 📁 Folder Structure

```
seo_analyzer_website/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # App layout (includes LanguageProvider)
│   │   ├── page.tsx             # Home page
│   │   ├── test/                # SEO analysis result page (client)
│   │   ├── about/               # About SEO page
│   │   ├── howitworks/          # How It Works page
│   │   ├── api/analyze/         # API route for SEO analysis
│   ├── components/
│   │   └── LanguageToggle.tsx   # Language toggle button
│   ├── context/
│   │   └── LanguageContext.tsx  # LanguageProvider & useLanguage hook
│   └── ...
├── public/
│   └── ...                      # Static assets (favicon, etc.)
├── package.json
├── tailwind.config.js
├── README.md
└── ...
```

---

## 🛠️ Customization

- **Add more languages:**
  - Extend the `LanguageContext` and text mapping objects.
- **Change SEO checks:**
  - Edit the API route logic in `src/app/api/analyze/route.ts`.
- **UI/UX tweaks:**
  - Update Tailwind classes or framer-motion animations in client components.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact & Links

- **GitHub:** [chanbinna/seo_analyzer_website](https://github.com/chanbinna/seo_analyzer_website)
- **Author:** Chanbin Na (나찬빈)
- **Issues:** Please use the GitHub Issues tab for bug reports or feature requests.

---

> Made with ❤️ using Next.js, React, and a passion for great UX & SEO. 