const axios = require('axios');

async function simpleTest() {
  try {
    console.log('اختبار الاتصال البسيط...');
    
    // اختبار بسيط للاتصال
    const response = await axios.get('http://localhost:5000', {
      timeout: 3000
    });
    
    console.log('✅ الخادم يستجيب');
    console.log('الحالة:', response.status);
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ لا يمكن الاتصال بالخادم');
    } else if (error.response) {
      console.log('✅ الخادم يستجيب (حتى لو كان خطأ 404)');
      console.log('الحالة:', error.response.status);
    } else {
      console.error('❌ خطأ:', error.message);
    }
  }
}

simpleTest(); 