import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>مرحباً بكم في موقعنا الإلكتروني</h1>
          <p>نقدم لكم أفضل الخدمات والحلول التقنية المتطورة</p>
          {!isAuthenticated && (
            <Link to="/login" className="cta-button">
              تسجيل الدخول
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/requests" className="cta-button">
              إدارة الطلبات
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>خدماتنا</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>الصيانة والدعم</h3>
              <p>نقدم خدمات الصيانة والدعم الفني لجميع الأجهزة والأنظمة</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>التطوير البرمجي</h3>
              <p>تطوير تطبيقات ومواقع إلكترونية عالية الجودة</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>الأمان والحماية</h3>
              <p>حلول أمنية متقدمة لحماية بياناتكم وأنظمتكم</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>من نحن</h2>
              <p>
                نحن شركة تقنية متخصصة في تقديم الحلول التقنية المتكاملة. 
                نعمل على تطوير وتقديم خدمات عالية الجودة تلبي احتياجات عملائنا.
              </p>
              <p>
                فريقنا من الخبراء والمطورين المحترفين يعملون على مدار الساعة 
                لتقديم أفضل الحلول والخدمات لعملائنا الكرام.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>100+</h3>
                <p>عميل راضي</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>مشروع مكتمل</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>دعم فني</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2>تواصل معنا</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h4>📧 البريد الإلكتروني</h4>
              <p>info@example.com</p>
            </div>
            <div className="contact-item">
              <h4>📞 الهاتف</h4>
              <p>+966 50 123 4567</p>
            </div>
            <div className="contact-item">
              <h4>📍 العنوان</h4>
              <p>الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 