import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // تسجيل الدخول
        const result = await login(formData.email, formData.password);
        if (result.success) {
          setMessageType('success');
          setMessage('تم تسجيل الدخول بنجاح');
          setTimeout(() => {
            navigate('/requests');
          }, 1000);
        } else {
          setMessageType('error');
          setMessage(result.message);
        }
      } else {
        // إنشاء حساب جديد
        if (formData.password !== formData.confirmPassword) {
          setMessageType('error');
          setMessage('كلمات المرور غير متطابقة');
          setLoading(false);
          return;
        }

        const result = await register(formData.username, formData.email, formData.password);
        if (result.success) {
          setMessageType('success');
          setMessage(result.message);
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } else {
          setMessageType('error');
          setMessage(result.message);
        }
      }
    } catch (error) {
      setMessageType('error');
      setMessage('حدث خطأ غير متوقع');
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setMessage('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
            <p>{isLogin ? 'أدخل بياناتك لتسجيل الدخول' : 'أدخل بياناتك لإنشاء حساب جديد'}</p>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">اسم المستخدم</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="أدخل كلمة المرور"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'جاري التحميل...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب')}
            </button>
          </form>

          <div className="login-footer">
            <button onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب؟ تسجيل الدخول'}
            </button>
          </div>

          {isLogin && (
            <div className="demo-info">
              <h4>بيانات تجريبية:</h4>
              <p><strong>البريد الإلكتروني:</strong> admin@example.com</p>
              <p><strong>كلمة المرور:</strong> password</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 