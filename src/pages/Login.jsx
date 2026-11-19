import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('الرجاء تعبئة جميع الحقول'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo"><i className="fas fa-store" /></div>
          <h2>سمارت شوب</h2>
          <p>وجهتك الأولى للأزياء العصرية</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
          alt="Fashion"
          className="auth-side-img"
        />
        <div className="auth-side-overlay" />
        <div className="auth-side-content">
          <h3>مرحباً بعودتك 👋</h3>
          <p>سجّل دخولك للاستمتاع بأفضل تجربة تسوق وتتبع طلباتك</p>
          <div className="auth-features">
            {['تتبع طلباتك بسهولة','عروض حصرية للأعضاء','شحن مجاني لأول طلب'].map(f => (
              <div key={f} className="auth-feature">
                <i className="fas fa-check-circle" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h1>تسجيل الدخول</h1>
            <p>أدخل بياناتك للوصول إلى حسابك</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fas fa-circle-exclamation" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="input-wrap">
                <i className="fas fa-envelope" />
                <input
                  id="email" name="email" type="email"
                  placeholder="example@email.com"
                  value={form.email} onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="password">
                كلمة المرور
                <a href="#" className="forgot-link">نسيت كلمة المرور؟</a>
              </label>
              <div className="input-wrap">
                <i className="fas fa-lock" />
                <input
                  id="password" name="password" type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  autoComplete="current-password"
                />
                <button type="button" className="toggle-pass" onClick={() => setShow(s => !s)}>
                  <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin" /> جارٍ الدخول...</>
                : <><i className="fas fa-sign-in-alt" /> دخول</>
              }
            </button>
          </form>

          <div className="auth-divider"><span>أو</span></div>

          <div className="social-auth">
            <button className="social-auth-btn google">
              <i className="fab fa-google" /> Google
            </button>
            <button className="social-auth-btn facebook">
              <i className="fab fa-facebook-f" /> Facebook
            </button>
          </div>

          <p className="auth-switch">
            ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
