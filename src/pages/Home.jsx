import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

/* ── Feature items ── */
const features = [
  { icon: 'fa-truck-fast',      title: 'شحن سريع',       desc: 'توصيل خلال 24-48 ساعة' },
  { icon: 'fa-rotate-left',     title: 'إرجاع مجاني',    desc: 'استرداد كامل خلال 30 يوم' },
  { icon: 'fa-shield-halved',   title: 'دفع آمن',         desc: 'بروتوكولات حماية متقدمة' },
  { icon: 'fa-headset',         title: 'دعم 24/7',        desc: 'فريق دعم متاح دائماً' },
];

/* ── Hero slides ── */
const heroSlides = [
  {
    id: 1,
    title: 'أحدث صيحات',
    highlight: 'الموضة 2025',
    subtitle: 'اكتشف مجموعتنا الحصرية من الملابس العصرية بأسعار لا تُقاوم',
    badge: 'جديد هذا الموسم',
    cta: 'تسوق الآن',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80',
    bg: 'linear-gradient(135deg, #0A1628 0%, #023E8A 50%, #0077B6 100%)',
  },
  {
    id: 2,
    title: 'خصومات حتى',
    highlight: '50%',
    subtitle: 'عروض لا تفوتك على أحدث تشكيلات الملابس الرجالية والنسائية',
    badge: 'عرض محدود',
    cta: 'اشترِ الآن',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    bg: 'linear-gradient(135deg, #0A1628 0%, #005F73 50%, #00B4D8 100%)',
  },
];

export default function Home() {
  const featured  = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="page-wrapper">

      {/* ══ HERO ══ */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-fadeInUp">
              <span className="hero-badge">
                <i className="fas fa-bolt" /> جديد هذا الموسم
              </span>
              <h1 className="hero-title">
                أحدث صيحات<br />
                <span className="hero-highlight">الموضة 2025</span>
              </h1>
              <p className="hero-subtitle">
                اكتشف مجموعتنا الحصرية من الملابس العصرية<br />بأسعار لا تُقاوم وجودة لا مثيل لها
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn-primary-custom">
                  <i className="fas fa-shopping-bag" /> تسوق الآن
                </Link>
                <Link to="/products?category=women" className="btn-secondary-custom" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                  <i className="fas fa-heart" /> المفضلة
                </Link>
              </div>
              <div className="hero-stats">
                {[['500+','منتج'], ['50K+','عميل سعيد'], ['4.9★','تقييم']].map(([n, l]) => (
                  <div key={l} className="stat-item">
                    <strong>{n}</strong><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-image-wrap">
              <div className="hero-img-bg" />
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                alt="أحدث الموضة"
                className="hero-img"
              />
              <div className="hero-card floating-card card-1">
                <i className="fas fa-tag" />
                <div><strong>خصم 50%</strong><span>على كل الملابس</span></div>
              </div>
              <div className="hero-card floating-card card-2">
                <i className="fas fa-truck" />
                <div><strong>شحن مجاني</strong><span>لجميع الطلبات</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">
                  <i className={`fas ${f.icon}`} />
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section className="section-padding categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">تسوق حسب الفئة</span>
            <h2 className="section-title">اكتشف <span>أقسامنا</span></h2>
            <div className="section-line" />
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card">
                <div className="cat-icon-wrap" style={{ background: `${cat.color}20`, color: cat.color }}>
                  <i className={`fas ${cat.icon}`} />
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.count} منتج</p>
                <span className="cat-arrow"><i className="fas fa-arrow-left" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      <section className="section-padding products-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-badge">الأكثر مبيعاً</span>
              <h2 className="section-title">منتجات <span>مميزة</span></h2>
              <div className="section-line" style={{ margin: '12px 0 0' }} />
            </div>
            <Link to="/products" className="btn-secondary-custom">
              عرض الكل <i className="fas fa-arrow-left" />
            </Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ══ PROMO BANNER ══ */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <span className="promo-badge">عرض لفترة محدودة</span>
              <h2>خصم <strong>30%</strong> على مجموعة الشتاء</h2>
              <p>استخدم كود <strong>WINTER30</strong> عند الدفع</p>
              <Link to="/products" className="btn-accent">
                <i className="fas fa-bolt" /> اشترِ الآن
              </Link>
            </div>
            <div className="promo-image">
              <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" alt="عرض الشتاء" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEW ARRIVALS ══ */}
      <section className="section-padding products-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-badge">وصل حديثاً</span>
              <h2 className="section-title">الوافدون <span>الجدد</span></h2>
              <div className="section-line" style={{ margin: '12px 0 0' }} />
            </div>
            <Link to="/products?filter=new" className="btn-secondary-custom">
              عرض الكل <i className="fas fa-arrow-left" />
            </Link>
          </div>
          <div className="products-grid products-grid-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">آراء عملائنا</span>
            <h2 className="section-title">ماذا يقول <span>عملاؤنا</span></h2>
            <div className="section-line" />
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'أحمد محمد', role: 'عميل دائم', rating: 5, text: 'جودة رائعة وشحن سريع جداً، تجربة تسوق ممتازة أنصح بها الجميع!' },
              { name: 'فاطمة علي',  role: 'عميلة مميزة', rating: 5, text: 'الملابس أجمل من الصور، الأقمشة عالية الجودة والتغليف أنيق جداً.' },
              { name: 'خالد عبدالله', role: 'مشترٍ جديد', rating: 4, text: 'سعر ممتاز مقارنة بالجودة. سأتسوق منهم مرة أخرى بكل تأكيد.' },
            ].map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="t-stars">
                  {[1,2,3,4,5].map(s => (
                    <i key={s} className={`fas fa-star ${s <= t.rating ? 'filled' : ''}`} />
                  ))}
                </div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">
                    <i className="fas fa-user" />
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
