import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './RequestsPage.css';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('خطأ في جلب الطلبات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/requests', newRequest);
      setRequests([response.data, ...requests]);
      setNewRequest({ title: '', description: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('خطأ في إضافة الطلب:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`/requests/${id}`, { status: newStatus });
      setRequests(requests.map(req => 
        req._id === id ? response.data : req
      ));
    } catch (error) {
      console.error('خطأ في تحديث حالة الطلب:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      try {
        await api.delete(`/requests/${id}`);
        setRequests(requests.filter(req => req._id !== id));
      } catch (error) {
        console.error('خطأ في حذف الطلب:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'in-progress':
        return '#17a2b8';
      case 'completed':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  if (loading) {
    return (
      <div className="requests-page">
        <div className="loading">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h1>إدارة الطلبات</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-btn"
        >
          {showAddForm ? 'إلغاء' : 'إضافة طلب جديد'}
        </button>
      </div>

      {/* نموذج إضافة طلب جديد */}
      {showAddForm && (
        <div className="add-form">
          <h3>إضافة طلب جديد</h3>
          <form onSubmit={handleAddRequest}>
            <div className="form-group">
              <label htmlFor="title">عنوان الطلب</label>
              <input
                type="text"
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                required
                placeholder="أدخل عنوان الطلب"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">وصف الطلب</label>
              <textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                required
                placeholder="أدخل وصف الطلب"
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">إضافة الطلب</button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="cancel-btn"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* فلتر الطلبات */}
      <div className="filter-section">
        <label htmlFor="filter">تصفية حسب الحالة:</label>
        <select 
          id="filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">جميع الطلبات</option>
          <option value="pending">في الانتظار</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* قائمة الطلبات */}
      <div className="requests-grid">
        {filteredRequests.length === 0 ? (
          <div className="no-requests">
            <p>لا توجد طلبات {filter !== 'all' && `بالحالة المحددة`}</p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div key={request._id} className="request-card">
              <div className="request-header">
                <h3>{request.title}</h3>
                <div className="request-actions">
                  <select
                    value={request.status}
                    onChange={(e) => handleUpdateStatus(request._id, e.target.value)}
                    className="status-select"
                    style={{ borderColor: getStatusColor(request.status) }}
                  >
                    <option value="pending">في الانتظار</option>
                    <option value="in-progress">قيد التنفيذ</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                  <button
                    onClick={() => handleDeleteRequest(request._id)}
                    className="delete-btn"
                    title="حذف الطلب"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="request-content">
                <p>{request.description}</p>
                <div className="request-meta">
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(request.status) }}>
                    {getStatusText(request.status)}
                  </span>
                  <span className="request-date">
                    {new Date(request.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsPage; 