const axios = require('axios');

async function testAPI() {
  try {
    console.log('اختبار الاتصال بالخادم...');
    
    // اختبار تسجيل الدخول
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'password'
    }, {
      timeout: 15000
    });
    
    console.log('✅ تم تسجيل الدخول بنجاح');
    console.log('المستخدم:', loginResponse.data.user);
    
    // اختبار جلب الطلبات
    const token = loginResponse.data.token;
    const requestsResponse = await axios.get('http://localhost:5000/api/requests', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 15000
    });
    
    console.log('✅ تم جلب الطلبات بنجاح');
    console.log('عدد الطلبات:', requestsResponse.data.length);
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ لا يمكن الاتصال بالخادم. تأكد من تشغيل الخادم على المنفذ 5000');
    } else if (error.response) {
      console.error('❌ خطأ في الاستجابة:', error.response.data);
    } else {
      console.error('❌ خطأ في الاختبار:', error.message);
    }
  }
}

testAPI(); 