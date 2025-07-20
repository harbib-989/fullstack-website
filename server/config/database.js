const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-website',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`تم الاتصال بقاعدة البيانات: ${conn.connection.host}`);
  } catch (error) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 