const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const User = require('./models/User');
const Request = require('./models/Request');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('تم الاتصال بقاعدة البيانات بنجاح'))
.catch(err => console.error('خطأ في الاتصال بقاعدة البيانات:', err));

// إنشاء مستخدم مدير افتراضي إذا لم يكن موجود
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('تم إنشاء المستخدم المدير بنجاح');
    } else {
      console.log('المستخدم المدير موجود بالفعل');
    }
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم المدير:', error);
  }
};

createDefaultAdmin();

// مسار للصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({ 
    message: 'مرحباً بك في API الموقع الإلكتروني',
    version: '1.0.0',
    status: 'running'
  });
});

// Routes

// تسجيل الدخول
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('محاولة تسجيل دخول:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('المستخدم غير موجود:', email);
      return res.status(401).json({ message: 'بيانات غير صحيحة' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('كلمة المرور غير صحيحة للمستخدم:', email);
      return res.status(401).json({ message: 'بيانات غير صحيحة' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('تم تسجيل الدخول بنجاح للمستخدم:', email);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// التحقق من التوكن
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'توكن مطلوب' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'توكن غير صالح' });
    }
    req.user = user;
    next();
  });
};

// الحصول على جميع الطلبات
app.get('/api/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// إضافة طلب جديد
app.post('/api/requests', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newRequest = new Request({
      title,
      description,
      userId: req.user.userId
    });
    
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('خطأ في إضافة الطلب:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// تحديث حالة الطلب
app.put('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const request = await Request.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { status },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }
    
    res.json(request);
  } catch (error) {
    console.error('خطأ في تحديث الطلب:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// حذف طلب
app.delete('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const request = await Request.findOneAndDelete({ 
      _id: id, 
      userId: req.user.userId 
    });
    
    if (!request) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }
    
    res.json({ message: 'تم حذف الطلب بنجاح' });
  } catch (error) {
    console.error('خطأ في حذف الطلب:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// إنشاء مستخدم جديد
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'البريد الإلكتروني أو اسم المستخدم مستخدم بالفعل' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (error) {
    console.error('خطأ في إنشاء الحساب:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// الحصول على معلومات المستخدم
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }
    res.json(user);
  } catch (error) {
    console.error('خطأ في جلب معلومات المستخدم:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
});

// خدمة الملفات الثابتة في الإنتاج
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
}); 