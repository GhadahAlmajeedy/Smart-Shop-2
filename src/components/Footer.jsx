import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon"><i className="fas fa-store" /></div>
                <div>
                  <span className="logo-main">سمارت شوب</span>
                  <span className="logo-tagline">تسوق بذكاء</span>
                </div>
              </div>
              <p className="footer-desc">
                وجهتك الأولى للأزياء العصرية بأفضل الأسعار وأجود المنتجات. نوصل لك أحدث الموضات من أفضل الماركات العالمية.
              </p>
              <div className="social-links">
                {[
                  { icon: 'fa-instagram',  href: '#', color: '#E1306C' },
                  { icon: 'fa-twitter',    href: '#', color: '#1DA1F2' },
                  { icon: 'fa-facebook-f', href: '#', color: '#1877F2' },
                  { icon: 'fa-tiktok',     href: '#', color: '#000000' },
                  { icon: 'fa-youtube',    href: '#', color: '#FF0000' },
                ].map(s => (
                  <a key={s.icon} href={s.href} className="social-link" style={{ '--sc': s.color }}>
                    <i className={`fab ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">روابط سريعة</h4>
              <ul className="footer-links">
                {[
                  { to: '/',                label: 'الرئيسية' },
                  { to: '/products',        label: 'جميع المنتجات' },
                  { to: '/products?category=men',   label: 'ملابس رجالية' },
                  { to: '/products?category=women', label: 'ملابس نسائية' },
                  { to: '/products?category=kids',  label: 'ملابس أطفال' },
                ].map(l => (
                  <li key={l.to}><Link to={l.to}><i className="fas fa-chevron-left" />{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col">
              <h4 className="footer-heading">خدمة العملاء</h4>
              <ul className="footer-links">
                {[
                  'سياسة الإرجاع',
                  'تتبع طلبك',
                  'الأسئلة الشائعة',
                  'سياسة الخصوصية',
                  'الشروط والأحكام',
                ].map(l => (
                  <li key={l}><a href="#"><i className="fas fa-chevron-left" />{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">تواصل معنا</h4>
              <ul className="contact-list">
                {[
                  { icon: 'fa-phone',         text: '+966 50 123 4567' },
                  { icon: 'fa-envelope',      text: 'info@smartshop.sa' },
                  { icon: 'fa-map-marker-alt',text: 'الرياض، المملكة العربية السعودية' },
                  { icon: 'fa-clock',         text: 'السبت – الخميس: 9ص – 11م' },
                ].map(c => (
                  <li key={c.text} className="contact-item">
                    <div className="contact-icon"><i className={`fas ${c.icon}`} /></div>
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h3>اشترك في نشرتنا البريدية</h3>
              <p>احصل على أحدث العروض والخصومات مباشرة في بريدك</p>
            </div>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="أدخل بريدك الإلكتروني..." />
              <button type="submit">اشتراك</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© {year} سمارت شوب. جميع الحقوق محفوظة.</p>
            <div className="payment-methods">
              {['fa-cc-visa','fa-cc-mastercard','fa-cc-paypal','fa-cc-apple-pay'].map(i => (
                <i key={i} className={`fab ${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
