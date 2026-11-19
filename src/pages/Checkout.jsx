import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const steps = ['معلومات الشحن', 'طريقة الدفع', 'تأكيد الطلب'];

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate  = useNavigate();
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const [shipping, setShipping] = useState({
    name: '', phone: '', email: '', city: '', address: '', notes: ''
  });
  const [payment, setPayment] = useState({ method: 'card', card: '', expiry: '', cvv: '', holder: '' });

  const shippingCost = cartTotal >= 300 ? 0 : 25;
  const tax   = Math.round(cartTotal * 0.15);
  const total = cartTotal + shippingCost + tax;

  const handleShip  = e => setShipping(f => ({ ...f, [e.target.name]: e.target.value }));
  const handlePay   = e => setPayment(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleStep1 = e => {
    e.preventDefault();
    if (!shipping.name || !shipping.phone || !shipping.city || !shipping.address) return;
    setStep(1);
  };

  const handleStep2 = e => { e.preventDefault(); setStep(2); };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setLoading(false);
    setDone(true);
  };

  if (cartItems.length === 0 && !done) {
    return (
      <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'80vh' }}>
        <div style={{ textAlign:'center' }}>
          <i className="fas fa-shopping-cart" style={{ fontSize:'4rem', color:'var(--border)', marginBottom:20, display:'block' }} />
          <h2>السلة فارغة</h2>
          <Link to="/products" className="btn-primary-custom" style={{ marginTop:20 }}>تسوق الآن</Link>
        </div>
      </div>
    );
  }

  if (done) return (
    <div className="page-wrapper success-page">
      <div className="success-card">
        <div className="success-icon">
          <i className="fas fa-circle-check" />
        </div>
        <h1>تم تأكيد طلبك! 🎉</h1>
        <p>شكراً لك على تسوقك من سمارت شوب. سيتم شحن طلبك خلال 24-48 ساعة.</p>
        <div className="success-info">
          <div><i className="fas fa-hashtag" /> رقم الطلب: <strong>SS-{Date.now().toString().slice(-6)}</strong></div>
          <div><i className="fas fa-truck" /> التوصيل المتوقع: <strong>خلال 2-3 أيام عمل</strong></div>
        </div>
        <div className="success-actions">
          <Link to="/"        className="btn-primary-custom">العودة للرئيسية</Link>
          <Link to="/products" className="btn-secondary-custom">مواصلة التسوق</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-lock" /> إتمام الشراء</h1>
          <p className="breadcrumb">
            <Link to="/">الرئيسية</Link>
            <i className="fas fa-chevron-left" />
            <Link to="/cart">السلة</Link>
            <i className="fas fa-chevron-left" />
            <span>الدفع</span>
          </p>
        </div>
      </div>

      <div className="container checkout-layout">
        {/* Steps */}
        <div className="checkout-main">
          <div className="steps-bar">
            {steps.map((s, i) => (
              <div key={s} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-num">
                  {i < step ? <i className="fas fa-check" /> : i + 1}
                </div>
                <span>{s}</span>
                {i < steps.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>

          {/* Step 0 – Shipping */}
          {step === 0 && (
            <form className="checkout-form" onSubmit={handleStep1}>
              <h3><i className="fas fa-map-marker-alt" /> معلومات الشحن</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>الاسم الكامل *</label>
                  <input name="name" placeholder="محمد أحمد" value={shipping.name} onChange={handleShip} required />
                </div>
                <div className="form-field">
                  <label>رقم الهاتف *</label>
                  <input name="phone" placeholder="05xxxxxxxx" value={shipping.phone} onChange={handleShip} required />
                </div>
              </div>
              <div className="form-field">
                <label>البريد الإلكتروني</label>
                <input name="email" type="email" placeholder="example@email.com" value={shipping.email} onChange={handleShip} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>المدينة *</label>
                  <select name="city" value={shipping.city} onChange={handleShip} required>
                    <option value="">اختر المدينة</option>
                    {['الرياض','جدة','مكة','المدينة','الدمام','الخبر','أبها','تبوك'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>الحي / المنطقة *</label>
                  <input name="address" placeholder="اسم الحي، رقم الشارع" value={shipping.address} onChange={handleShip} required />
                </div>
              </div>
              <div className="form-field">
                <label>ملاحظات إضافية</label>
                <textarea name="notes" placeholder="أي تعليمات خاصة للتوصيل..." value={shipping.notes} onChange={handleShip} rows={3} />
              </div>
              <button type="submit" className="btn-primary-custom step-btn">
                التالي: طريقة الدفع <i className="fas fa-arrow-left" />
              </button>
            </form>
          )}

          {/* Step 1 – Payment */}
          {step === 1 && (
            <form className="checkout-form" onSubmit={handleStep2}>
              <h3><i className="fas fa-credit-card" /> طريقة الدفع</h3>

              <div className="pay-methods">
                {[
                  { key: 'card',   icon: 'fa-credit-card',    label: 'بطاقة بنكية' },
                  { key: 'stc',    icon: 'fa-mobile-screen',   label: 'STC Pay' },
                  { key: 'cash',   icon: 'fa-money-bill-wave', label: 'الدفع عند الاستلام' },
                ].map(m => (
                  <label key={m.key} className={`pay-option ${payment.method === m.key ? 'active' : ''}`}>
                    <input type="radio" name="method" value={m.key}
                      checked={payment.method === m.key} onChange={handlePay} />
                    <i className={`fas ${m.icon}`} />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="card-fields">
                  <div className="form-field">
                    <label>رقم البطاقة</label>
                    <input name="card" placeholder="1234 5678 9012 3456"
                      value={payment.card} onChange={handlePay} maxLength={19} />
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>تاريخ الانتهاء</label>
                      <input name="expiry" placeholder="MM/YY" value={payment.expiry} onChange={handlePay} maxLength={5} />
                    </div>
                    <div className="form-field">
                      <label>CVV</label>
                      <input name="cvv" placeholder="123" value={payment.cvv} onChange={handlePay} maxLength={4} type="password" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>اسم حامل البطاقة</label>
                    <input name="holder" placeholder="MOHAMMED AHMED" value={payment.holder} onChange={handlePay} />
                  </div>
                </div>
              )}

              {payment.method === 'stc' && (
                <div className="card-fields">
                  <div className="form-field">
                    <label>رقم الهاتف المرتبط بـ STC Pay</label>
                    <input placeholder="05xxxxxxxx" />
                  </div>
                </div>
              )}

              {payment.method === 'cash' && (
                <div className="cash-notice">
                  <i className="fas fa-info-circle" />
                  <p>سيتم تحصيل المبلغ عند وصول الطلب. يرجى التأكد من توفر المبلغ كاملاً.</p>
                </div>
              )}

              <div className="step-actions">
                <button type="button" className="btn-secondary-custom" onClick={() => setStep(0)}>
                  <i className="fas fa-arrow-right" /> رجوع
                </button>
                <button type="submit" className="btn-primary-custom step-btn">
                  التالي: مراجعة الطلب <i className="fas fa-arrow-left" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2 – Confirm */}
          {step === 2 && (
            <div className="checkout-form">
              <h3><i className="fas fa-clipboard-check" /> مراجعة الطلب</h3>
              <div className="confirm-items">
                {cartItems.map(item => (
                  <div key={item.cartKey} className="confirm-item">
                    <img src={item.image} alt={item.name} />
                    <div className="confirm-item-info">
                      <span className="ci-name">{item.name}</span>
                      <span className="ci-meta">المقاس: {item.selectedSize} | الكمية: {item.quantity}</span>
                    </div>
                    <span className="ci-price">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                  </div>
                ))}
              </div>
              <div className="confirm-address">
                <i className="fas fa-map-marker-alt" />
                <div>
                  <strong>{shipping.name}</strong>
                  <span>{shipping.city}، {shipping.address}</span>
                  <span>{shipping.phone}</span>
                </div>
              </div>
              <div className="step-actions">
                <button type="button" className="btn-secondary-custom" onClick={() => setStep(1)}>
                  <i className="fas fa-arrow-right" /> رجوع
                </button>
                <button className="btn-primary-custom step-btn" onClick={handleConfirm} disabled={loading}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" /> جارٍ المعالجة...</>
                    : <><i className="fas fa-check" /> تأكيد الطلب</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="checkout-summary">
          <h3 className="summary-title">ملخص الطلب</h3>
          <div className="checkout-items-mini">
            {cartItems.map(item => (
              <div key={item.cartKey} className="mini-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <small>x{item.quantity}</small>
                </div>
                <span>{(item.price * item.quantity).toLocaleString()} ر.س</span>
              </div>
            ))}
          </div>
          <div className="summary-rows">
            <div className="summary-row"><span>المجموع الفرعي</span><span>{cartTotal.toLocaleString()} ر.س</span></div>
            <div className="summary-row"><span>الشحن</span><span className={shippingCost === 0 ? 'free-ship' : ''}>{shippingCost === 0 ? 'مجاني' : `${shippingCost} ر.س`}</span></div>
            <div className="summary-row"><span>الضريبة</span><span>{tax} ر.س</span></div>
          </div>
          <div className="summary-total">
            <span>الإجمالي</span>
            <span>{total.toLocaleString()} ر.س</span>
          </div>
          <div className="secure-badge">
            <i className="fas fa-shield-halved" /> دفع آمن ومشفر
          </div>
        </div>
      </div>
    </div>
  );
}
