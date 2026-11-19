import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '', agree: false });
  const [show, setShow]   = useState({ pass: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('الرجاء تعبئة جميع الحقول'); return;
    }
    if (form.password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    if (form.password !== form.confirm) { setError('كلمة المرور غير متطابقة'); return; }
    if (!form.agree) { setError('يجب الموافقة على الشروط والأحكام'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/');
  };

  const strength = form.password.length === 0 ? 0
    : form.password.length < 4 ? 1
    : form.password.length < 7 ? 2 : 3;
  const strengthLabel = ['', 'ضعيفة', 'متوسطة', 'قوية'][strength];
  const strengthColor = ['', '#e74c3c', '#f39c12', '#2ecc71'][strength];

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo"><i className="fas fa-store" /></div>
          <h2>سمارت شوب</h2>
          <p>انضم لعائلة سمارت شوب</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
          alt="Fashion"
          className="auth-side-img"
        />
        <div className="auth-side-overlay" />
        <div className="auth-side-content">
          <h3>انضم إلينا اليوم! 🛍️</h3>
          <p>أنشئ حسابك مجاناً واستمتع بمزايا لا تُحصى</p>
          <div className="auth-features">
            {['خصم 15% على أول طلب','تتبع الطلبات في الوقت الفعلي','إرجاع مجاني لمدة 30 يوماً'].map(f => (
              <div key={f} className="auth-feature">
                <i className="fas fa-gift" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h1>إنشاء حساب جديد</h1>
            <p>أنشئ حسابك وابدأ التسوق الآن</p>
          </div>

          {error && (
            <div className="auth-error">
              <i className="fas fa-circle-exclamation" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="name">الاسم الكامل</label>
              <div className="input-wrap">
                <i className="fas fa-user" />
                <input id="name" name="name" type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={form.name} onChange={handleChange} />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="reg-email">البريد الإلكتروني</label>
              <div className="input-wrap">
                <i className="fas fa-envelope" />
                <input id="reg-email" name="email" type="email"
                  placeholder="example@email.com"
                  value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="reg-pass">كلمة المرور</label>
              <div className="input-wrap">
                <i className="fas fa-lock" />
                <input id="reg-pass" name="password" type={show.pass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange} />
                <button type="button" className="toggle-pass" onClick={() => setShow(s => ({ ...s, pass: !s.pass }))}>
                  <i className={`fas ${show.pass ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
              {form.password && (
                <div className="pass-strength">
                  <div className="strength-bars">
                    {[1,2,3].map(i => (
                      <div key={i} className="bar" style={{ background: i <= strength ? strengthColor : 'var(--border)' }} />
                    ))}
                  </div>
                  <span style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="confirm">تأكيد كلمة المرور</label>
              <div className="input-wrap">
                <i className="fas fa-lock" />
                <input id="confirm" name="confirm" type={show.confirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.confirm} onChange={handleChange} />
                <button type="button" className="toggle-pass" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}>
                  <i className={`fas ${show.confirm ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            <label className="agree-check">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
              <span>أوافق على <a href="#">الشروط والأحكام</a> و<a href="#">سياسة الخصوصية</a></span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin" /> جارٍ الإنشاء...</>
                : <><i className="fas fa-user-plus" /> إنشاء الحساب</>
              }
            </button>
          </form>

          <div className="auth-divider"><span>أو</span></div>
          <div className="social-auth">
            <button className="social-auth-btn google"><i className="fab fa-google" /> Google</button>
            <button className="social-auth-btn facebook"><i className="fab fa-facebook-f" /> Facebook</button>
          </div>

          <p className="auth-switch">
            لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
