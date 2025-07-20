# إعداد متغيرات البيئة

## 1. إنشاء ملف .env

أنشئ ملف `.env` في مجلد `server` مع المحتوى التالي:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=development
```

## 2. الحصول على رابط MongoDB Atlas

1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. سجل الدخول إلى حسابك
3. اختر مشروعك
4. اضغط على "Connect"
5. اختر "Connect your application"
6. انسخ رابط الاتصال

## 3. تحديث رابط الاتصال

استبدل `your-mongodb-atlas-connection-string` برابط MongoDB Atlas الخاص بك.

مثال:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack-website?retryWrites=true&w=majority
```

## 4. تشغيل المشروع

بعد إعداد الملف، قم بتشغيل المشروع:

```bash
npm run dev
``` 