import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal >= 300 ? 0 : 25;
  const tax      = Math.round(cartTotal * 0.15);
  const total    = cartTotal + shipping + tax;

  if (cartItems.length === 0) return (
    <div className="page-wrapper empty-cart">
      <div className="empty-cart-content">
        <div className="empty-icon">
          <i className="fas fa-shopping-cart" />
        </div>
        <h2>سلتك فارغة!</h2>
        <p>لم تضف أي منتجات بعد، تصفح منتجاتنا الرائعة وأضف ما يعجبك</p>
        <Link to="/products" className="btn-primary-custom">
          <i className="fas fa-shopping-bag" /> ابدأ التسوق
        </Link>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-shopping-cart" /> سلة التسوق</h1>
          <p className="breadcrumb">
            <span>الرئيسية</span>
            <i className="fas fa-chevron-left" />
            <span>السلة</span>
          </p>
        </div>
      </div>

      <div className="container cart-layout">
        {/* Items */}
        <div className="cart-items-col">
          <div className="cart-items-header">
            <h3>المنتجات ({cartItems.length})</h3>
            <button className="clear-btn" onClick={clearCart}>
              <i className="fas fa-trash" /> مسح الكل
            </button>
          </div>

          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.cartKey} className="cart-item">
                <img src={item.image} alt={item.name} className="item-img" />

                <div className="item-info">
                  <span className="item-category">{item.category}</span>
                  <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                  <div className="item-meta">
                    <span>
                      <i className="fas fa-ruler" /> {item.selectedSize}
                    </span>
                    <span>
                      <i className="fas fa-circle" style={{ color: item.selectedColor }} /> لون
                    </span>
                  </div>
                </div>

                <div className="item-qty">
                  <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>
                    <i className="fas fa-minus" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>
                    <i className="fas fa-plus" />
                  </button>
                </div>

                <div className="item-price">
                  <span className="item-total">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                  <span className="item-unit">{item.price} ر.س / قطعة</span>
                </div>

                <button className="item-remove" onClick={() => removeFromCart(item.cartKey)}>
                  <i className="fas fa-times" />
                </button>
              </div>
            ))}
          </div>

          {/* Continue shopping */}
          <Link to="/products" className="continue-shopping">
            <i className="fas fa-arrow-right" /> مواصلة التسوق
          </Link>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3 className="summary-title">ملخص الطلب</h3>

          <div className="summary-rows">
            <div className="summary-row">
              <span>المجموع الفرعي</span>
              <span>{cartTotal.toLocaleString()} ر.س</span>
            </div>
            <div className="summary-row">
              <span>الشحن</span>
              <span className={shipping === 0 ? 'free-ship' : ''}>
                {shipping === 0 ? '🎉 مجاني' : `${shipping} ر.س`}
              </span>
            </div>
            <div className="summary-row">
              <span>الضريبة (15%)</span>
              <span>{tax.toLocaleString()} ر.س</span>
            </div>
            {cartTotal < 300 && (
              <div className="free-ship-notice">
                <i className="fas fa-truck" />
                أضف <strong>{(300 - cartTotal).toLocaleString()} ر.س</strong> للحصول على شحن مجاني
              </div>
            )}
          </div>

          <div className="summary-total">
            <span>الإجمالي</span>
            <span>{total.toLocaleString()} ر.س</span>
          </div>

          {/* Coupon */}
          <div className="coupon-row">
            <input type="text" placeholder="كود الخصم..." className="coupon-input" />
            <button className="coupon-btn">تطبيق</button>
          </div>

          <button
            className="btn-primary-custom checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            <i className="fas fa-lock" /> إتمام الشراء
          </button>

          <div className="payment-icons">
            <i className="fab fa-cc-visa" />
            <i className="fab fa-cc-mastercard" />
            <i className="fab fa-cc-paypal" />
            <i className="fab fa-cc-apple-pay" />
          </div>
        </div>
      </div>
    </div>
  );
}
