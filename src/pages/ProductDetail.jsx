import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [activeImg,     setActiveImg]     = useState(0);
  const [selectedSize,  setSelectedSize]  = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty,           setQty]           = useState(1);
  const [tab,           setTab]           = useState('desc');

  if (!product) return (
    <div className="page-wrapper not-found-state">
      <i className="fas fa-box-open" />
      <h2>المنتج غير موجود</h2>
      <button className="btn-primary-custom" onClick={() => navigate('/products')}>
        العودة للمنتجات
      </button>
    </div>
  );

  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize)  { alert('الرجاء اختيار المقاس'); return; }
    if (!selectedColor) { alert('الرجاء اختيار اللون');  return; }
    addToCart(product, selectedSize, selectedColor, qty);
  };

  const handleBuyNow = () => {
    if (!selectedSize)  { alert('الرجاء اختيار المقاس'); return; }
    if (!selectedColor) { alert('الرجاء اختيار اللون');  return; }
    addToCart(product, selectedSize, selectedColor, qty);
    navigate('/cart');
  };

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="container">
          <Link to="/">الرئيسية</Link>
          <i className="fas fa-chevron-left" />
          <Link to="/products">المنتجات</Link>
          <i className="fas fa-chevron-left" />
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container">
        {/* Main Grid */}
        <div className="detail-grid">

          {/* Images */}
          <div className="detail-images">
            <div className="main-img-wrap">
              {product.discount && <span className="detail-badge">-{product.discount}%</span>}
              {product.isNew    && <span className="detail-badge new-badge">جديد</span>}
              <img src={product.images?.[activeImg] ?? product.image} alt={product.name} className="main-img" />
              <button
                className={`detail-wishlist ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <i className={wishlisted ? 'fas fa-heart' : 'far fa-heart'} />
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="thumb-row">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${activeImg === i ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>

            {/* Rating */}
            <div className="detail-rating">
              <div className="stars">
                {[1,2,3,4,5].map(s => (
                  <i key={s} className={`fas fa-star ${s <= Math.round(product.rating) ? 'filled' : ''}`} />
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="sep">|</span>
              <span>{product.reviews} تقييم</span>
              <span className="sep">|</span>
              <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
                <i className={`fas ${product.stock > 0 ? 'fa-circle-check' : 'fa-circle-xmark'}`} />
                {product.stock > 0 ? `متوفر (${product.stock})` : 'نفد المخزون'}
              </span>
            </div>

            {/* Price */}
            <div className="detail-price">
              <span className="price-now">{product.price} <small>ر.س</small></span>
              {product.oldPrice && (
                <>
                  <span className="price-was">{product.oldPrice} ر.س</span>
                  <span className="price-save">وفّر {product.oldPrice - product.price} ر.س</span>
                </>
              )}
            </div>

            {/* Colors */}
            <div className="option-group">
              <label>
                اللون: {selectedColor && <strong style={{ color: selectedColor }}>{selectedColor}</strong>}
              </label>
              <div className="color-options">
                {product.colors.map(c => (
                  <button
                    key={c}
                    className={`color-btn ${selectedColor === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="option-group">
              <label>المقاس: {selectedSize && <strong>{selectedSize}</strong>}</label>
              <div className="size-options">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="option-group">
              <label>الكمية:</label>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}><i className="fas fa-minus" /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}><i className="fas fa-plus" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button className="btn-primary-custom" onClick={handleAddToCart} style={{ flex: 1 }}>
                <i className="fas fa-shopping-cart" /> أضف للسلة
              </button>
              <button className="btn-accent" onClick={handleBuyNow} style={{ flex: 1 }}>
                <i className="fas fa-bolt" /> اشترِ الآن
              </button>
            </div>

            {/* Guarantees */}
            <div className="guarantees">
              {[
                { icon: 'fa-shield-halved', text: 'ضمان جودة 100%' },
                { icon: 'fa-rotate-left',   text: 'إرجاع مجاني خلال 30 يوم' },
                { icon: 'fa-truck-fast',    text: 'شحن سريع خلال 48 ساعة' },
              ].map(g => (
                <div key={g.text} className="guarantee-item">
                  <i className={`fas ${g.icon}`} />
                  <span>{g.text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="detail-tags">
              {product.tags.map(t => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <div className="tabs-nav">
            {[
              { key: 'desc',    label: 'الوصف'     },
              { key: 'details', label: 'التفاصيل'  },
              { key: 'reviews', label: `التقييمات (${product.reviews})` },
            ].map(t => (
              <button
                key={t.key}
                className={tab === t.key ? 'active' : ''}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tab === 'desc' && (
              <p className="tab-desc">{product.description}</p>
            )}
            {tab === 'details' && (
              <table className="details-table">
                <tbody>
                  <tr><td>الفئة</td><td>{product.category}</td></tr>
                  <tr><td>المقاسات المتاحة</td><td>{product.sizes.join(' - ')}</td></tr>
                  <tr><td>الألوان المتاحة</td><td>{product.colors.length} ألوان</td></tr>
                  <tr><td>الكمية المتاحة</td><td>{product.stock} قطعة</td></tr>
                  <tr><td>رقم المنتج</td><td>SS-{String(product.id).padStart(4, '0')}</td></tr>
                </tbody>
              </table>
            )}
            {tab === 'reviews' && (
              <div className="reviews-summary">
                <div className="rating-big">
                  <span className="rating-num">{product.rating}</span>
                  <div>
                    <div className="stars">
                      {[1,2,3,4,5].map(s => (
                        <i key={s} className={`fas fa-star ${s <= Math.round(product.rating) ? 'filled' : ''}`} />
                      ))}
                    </div>
                    <span>{product.reviews} تقييم</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginTop: 16 }}>
                  انضم لآلاف العملاء الراضين عن منتجاتنا!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">منتجات <span>مشابهة</span></h2>
            <div className="related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
