# The Flower Code - Botanical Bingo 🌸

**קוד הפרחים - משימת הבינגו**

אפליקציית ווב אינטראקטיבית למשחק בינגו בוטני בטבע. חיפוש צמחים, פתרון חידה מתמטית, וקבלת קוד לפתיחת קופסת הפתעות.

## תכונות עיקריות

- 🌿 12 כרטיסי משימות בוטניים
- 🔄 אנימציות היפוך תלת-ממדיות
- 🧮 חידה מתמטית עם קוד סודי
- 🎉 אפקט קונפטי בניצחון
- 📱 מותאם למובייל (שימוש בטבע)
- ⚡ עובד offline לחלוטין
- 🌐 ממשק RTL בעברית

## התקנה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn

### שלבי התקנה

1. שכפול הפרויקט:
```bash
git clone https://github.com/YOUR_USERNAME/flower-code-bingo.git
cd flower-code-bingo
```

2. התקנת תלויות:
```bash
npm install
```

3. הרצה מקומית:
```bash
npm run dev
```

האפליקציה תיפתח ב-`http://localhost:5173`

## פריסה ל-GitHub Pages

### שלב 1: עדכון vite.config.js

ודא שהשורה `base` מכוונת לשם הריפוזיטורי שלך:
```javascript
base: '/flower-code-bingo/'
```

### שלב 2: בנייה ופריסה

```bash
# בניית הפרויקט
npm run build

# פריסה ידנית
# העתק את תוכן תיקיית dist/ ל-branch gh-pages
```

### שלב 3: או השתמש ב-GitHub Actions

צור קובץ `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### שלב 4: הפעלת GitHub Pages

1. עבור ל-Settings > Pages ברפוזיטורי
2. בחר את ה-branch `gh-pages` כמקור
3. שמור

האפליקציה תהיה זמינה ב:
`https://YOUR_USERNAME.github.io/flower-code-bingo/`

## מבנה הפרויקט

```
flower-code-bingo/
├── src/
│   ├── App.jsx          # קומפוננטה ראשית
│   ├── main.jsx         # נקודת כניסה
│   └── index.css        # סגנונות גלובליים
├── index.html           # HTML ראשי
├── package.json         # תלויות
├── vite.config.js       # הגדרות Vite
├── tailwind.config.js   # הגדרות Tailwind
└── postcss.config.js    # הגדרות PostCSS
```

## טכנולוגיות

- **React 18** - ספריית UI
- **Vite** - כלי בנייה מהיר
- **Tailwind CSS** - עיצוב
- **Lucide React** - אייקונים
- **CSS3 Animations** - אנימציות תלת-ממד

## הפתרון המתמטי

התרגיל: `50*2+30-8:2`  
פתרון: `50*2=100, 100+30=130, 8:2=4, 130-4=126`  
**קוד המנעול: 126** (גימטריה של "סוס")

## רישיון

MIT License - חופשי לשימוש ושינוי

## יצירת קשר

נוצר במיוחד עבור פרויקט יום הולדת 12 🐎
