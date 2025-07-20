# موقع إلكتروني كامل - Full Stack Website

موقع إلكتروني متكامل مبني بـ React للواجهة الأمامية و Node.js/Express للخادم، مع قاعدة بيانات MongoDB.

## 🚀 الميزات

- ✅ **الواجهة الرئيسية** - تصميم جميل وعصري
- ✅ **صفحة تسجيل الدخول** - نظام مصادقة آمن
- ✅ **صفحة إدارة الطلبات** - إدارة كاملة للطلبات
- ✅ **قاعدة بيانات حقيقية** - MongoDB Atlas
- ✅ **نظام أمان متقدم** - JWT + تشفير كلمات المرور

## 📋 المتطلبات

- Node.js (الإصدار 14 أو أحدث)
- npm أو yarn
- حساب MongoDB Atlas

## 🛠️ التثبيت والتشغيل المحلي

### 1. تثبيت التبعيات
```bash
npm run install-all
```

### 2. إعداد متغيرات البيئة
أنشئ ملف `.env` في مجلد `server` وأضف:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=development
```

### 3. تشغيل المشروع
```bash
# تشغيل الخادم والواجهة الأمامية معاً
npm run dev

# أو تشغيل كل منهما منفصلاً
npm run server  # الخادم على المنفذ 5000
npm run client  # الواجهة الأمامية على المنفذ 3000
```

### 4. الوصول للموقع
- **الواجهة الأمامية:** http://localhost:3000
- **API الخادم:** http://localhost:5000

## 🔐 بيانات تسجيل الدخول الافتراضية

- **البريد الإلكتروني:** admin@example.com
- **كلمة المرور:** password

## 🚀 النشر على Railway

### 1. إعداد Railway

1. اذهب إلى [Railway.app](https://railway.app)
2. سجل دخول أو أنشئ حساب جديد
3. اضغط على "New Project"
4. اختر "Deploy from GitHub repo"

### 2. ربط المستودع

1. اربط حساب GitHub الخاص بك
2. اختر مستودع المشروع
3. اضغط على "Deploy Now"

### 3. إعداد متغيرات البيئة

في لوحة تحكم Railway، اذهب إلى "Variables" وأضف:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NODE_ENV=production
```

### 4. إعداد قاعدة البيانات

1. في Railway، اذهب إلى "New"
2. اختر "Database" > "MongoDB"
3. انسخ رابط الاتصال وأضفه إلى `MONGODB_URI`

### 5. النشر

Railway سيقوم تلقائياً بـ:
- تثبيت التبعيات
- بناء المشروع
- تشغيل الخادم

### 6. الوصول للموقع

بعد النشر، ستحصل على رابط مثل:
`https://your-app-name.railway.app`

## 🚀 النشر على Heroku (بديل)

### 1. إنشاء تطبيق Heroku
```bash
# تثبيت Heroku CLI
npm install -g heroku

# تسجيل الدخول
heroku login

# إنشاء تطبيق
heroku create your-app-name
```

### 2. تعيين متغيرات البيئة
```bash
heroku config:set JWT_SECRET=your-super-secret-jwt-key
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set NODE_ENV=production
```

### 3. رفع الكود
```bash
git add .
git commit -m "Initial commit"
git push heroku main
```

## 🚀 النشر على Vercel (للـ Frontend فقط)

### 1. تثبيت Vercel CLI
```bash
npm i -g vercel
```

### 2. النشر
```bash
cd client
vercel
```

## 📁 هيكل المشروع

```
fu/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
├── server/                 # Node.js Backend
│   ├── models/
│   ├── config/
│   └── index.js
├── package.json
└── README.md
```

## 🔧 API Endpoints

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - إنشاء حساب جديد
- `GET /api/auth/me` - معلومات المستخدم

### الطلبات
- `GET /api/requests` - جلب جميع الطلبات
- `POST /api/requests` - إضافة طلب جديد
- `PUT /api/requests/:id` - تحديث طلب
- `DELETE /api/requests/:id` - حذف طلب

## 🛡️ الأمان

- تشفير كلمات المرور باستخدام bcryptjs
- JWT للتحقق من الهوية
- CORS محمي
- تحقق من صحة المدخلات

## 📝 الترخيص

MIT License

## 🤝 المساهمة

نرحب بالمساهمات! يرجى إنشاء issue أو pull request.

---

**ملاحظة:** تأكد من تغيير `JWT_SECRET` في الإنتاج إلى قيمة آمنة وعشوائية. 