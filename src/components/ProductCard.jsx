import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] ?? '-', product.colors?.[0] ?? '-');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="card-badges">
        {product.isNew     && <span className="badge badge-new">جديد</span>}
        {product.discount  && <span className="badge badge-sale">-{product.discount}%</span>}
      </div>

      {/* Wishlist */}
      <button
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label="المفضلة"
      >
        <i className={wishlisted ? 'fas fa-heart' : 'far fa-heart'} />
      </button>

      {/* Image */}
      <Link to={`/products/${product.id}`} className="card-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="card-img-overlay">
          <button className="quick-view-btn" onClick={handleAddToCart}>
            <i className="fas fa-shopping-cart" />
            <span>أضف للسلة</span>
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="card-title">{product.name}</Link>

        {/* Rating */}
        <div className="card-rating">
          <div className="stars">
            {[1,2,3,4,5].map(s => (
              <i key={s} className={`fas fa-star ${s <= Math.round(product.rating) ? 'filled' : ''}`} />
            ))}
          </div>
          <span className="reviews-count">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="card-price">
          <span className="price-current">{product.price} ر.س</span>
          {product.oldPrice && <span className="price-old">{product.oldPrice} ر.س</span>}
        </div>

        {/* Colors */}
        <div className="card-colors">
          {product.colors.slice(0, 4).map(c => (
            <span key={c} className="color-dot" style={{ background: c }} title={c} />
          ))}
          {product.colors.length > 4 && (
            <span className="color-more">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
