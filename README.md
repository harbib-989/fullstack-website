# موقع إلكتروني كامل - Full Stack Website

موقع إلكتروني كامل مبني بـ React و Node.js و MongoDB

## 🚀 طرق النشر

### الطريقة الأولى: Render.com (مجاني)

1. **اذهب إلى [Render.com](https://render.com)**
2. **سجل دخول أو أنشئ حساب جديد**
3. **اضغط على "New +" → "Web Service"**
4. **ربط مستودع GitHub: `harbib-989/fullstack-website`**
5. **أدخل المعلومات:**
   - **Name:** `fullstack-website`
   - **Environment:** `Node`
   - **Build Command:** `npm run install-all && npm run build`
   - **Start Command:** `npm start`
6. **أضف متغيرات البيئة:**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   MONGODB_URI=mongodb+srv://harbib:RtxbQaUGEUTAsjWG@cluster0.ewgis0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
7. **اضغط "Create Web Service"**

### الطريقة الثانية: Railway (قاعدة البيانات فقط)

1. **اذهب إلى [Railway.app](https://railway.app)**
2. **أنشئ مشروع جديد**
3. **اختر "Add Database" → "MongoDB"**
4. **انسخ رابط الاتصال الجديد**
5. **استخدم Railway للقاعدة + Render للواجهة**

### الطريقة الثالثة: Netlify + Render

1. **نشر Backend على Render**
2. **نشر Frontend على Netlify**
3. **تحديث API URLs**

## 📦 التثبيت المحلي

```bash
# تثبيت جميع التبعيات
npm run install-all

# تشغيل التطبيق
npm run dev
```

## 🔧 المتغيرات البيئية

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb+srv://harbib:RtxbQaUGEUTAsjWG@cluster0.ewgis0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
```

## 🛠️ التقنيات المستخدمة

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Styling:** CSS3

## 📱 الميزات

- ✅ تسجيل الدخول وإنشاء الحساب
- ✅ لوحة تحكم المستخدم
- ✅ إدارة الطلبات
- ✅ واجهة عربية
- ✅ تصميم متجاوب

## 🚀 النشر السريع

```bash
# رفع الكود إلى GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# ثم اتبع خطوات النشر أعلاه
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

**ملاحظة:** تأكد من تغيير `JWT_SECRET` في الإنتاج إلى قيمة آمنة وعشوائية. #   f u l l s t a c k - w e b s i t e 
 
 