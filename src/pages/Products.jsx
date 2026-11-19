import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const sortOptions = [
  { value: 'default',    label: 'الافتراضي'      },
  { value: 'price-asc',  label: 'السعر: الأقل أولاً' },
  { value: 'price-desc', label: 'السعر: الأعلى أولاً' },
  { value: 'rating',     label: 'الأعلى تقييماً'  },
  { value: 'newest',     label: 'الأحدث'          },
];

const priceRanges = [
  { label: 'الكل',          min: 0,   max: Infinity },
  { label: 'أقل من 100 ر.س', min: 0,   max: 100     },
  { label: '100 - 250 ر.س',  min: 100, max: 250     },
  { label: '250 - 400 ر.س',  min: 250, max: 400     },
  { label: 'أكثر من 400 ر.س', min: 400, max: Infinity },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort,       setSort]       = useState('default');
  const [priceIdx,   setPriceIdx]   = useState(0);
  const [viewMode,   setViewMode]   = useState('grid'); // grid | list
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam   = searchParams.get('search')   || '';
  const filterParam   = searchParams.get('filter')   || '';

  const setCategory = (slug) => {
    const p = new URLSearchParams(searchParams);
    if (slug === 'all') p.delete('category'); else p.set('category', slug);
    p.delete('search');
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    // category
    if (categoryParam !== 'all') list = list.filter(p => p.categorySlug === categoryParam);
    // search
    if (searchParam) list = list.filter(p =>
      p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      p.tags.some(t => t.includes(searchParam))
    );
    // new
    if (filterParam === 'new') list = list.filter(p => p.isNew);
    // price
    const range = priceRanges[priceIdx];
    list = list.filter(p => p.price >= range.min && p.price <= range.max);

    // sort
    switch (sort) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
      case 'price-desc': list.sort((a,b) => b.price - a.price); break;
      case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
      case 'newest':     list.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }
    return list;
  }, [categoryParam, searchParam, filterParam, priceIdx, sort]);

  const activeCatLabel = categoryParam === 'all'
    ? 'جميع المنتجات'
    : (categories.find(c => c.slug === categoryParam)?.name ?? 'المنتجات');

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>{searchParam ? `نتائج: "${searchParam}"` : activeCatLabel}</h1>
          <p className="breadcrumb">
            <span>الرئيسية</span>
            <i className="fas fa-chevron-left" />
            <span>المنتجات</span>
            {categoryParam !== 'all' && <><i className="fas fa-chevron-left" /><span>{activeCatLabel}</span></>}
          </p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Mobile Filter Toggle */}
        <button className="filter-toggle-btn" onClick={() => setSidebarOpen(true)}>
          <i className="fas fa-sliders-h" /> الفلاتر
        </button>

        {/* Sidebar Overlay */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`products-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3><i className="fas fa-filter" /> الفلاتر</h3>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-title">الأقسام</h4>
            <ul className="filter-list">
              <li>
                <button
                  className={categoryParam === 'all' ? 'active' : ''}
                  onClick={() => { setCategory('all'); setSidebarOpen(false); }}
                >
                  <i className="fas fa-th-large" /> جميع الأقسام
                  <span className="filter-count">{products.length}</span>
                </button>
              </li>
              {categories.map(c => (
                <li key={c.slug}>
                  <button
                    className={categoryParam === c.slug ? 'active' : ''}
                    onClick={() => { setCategory(c.slug); setSidebarOpen(false); }}
                  >
                    <i className={`fas ${c.icon}`} /> {c.name}
                    <span className="filter-count">{c.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="filter-group">
            <h4 className="filter-title">نطاق السعر</h4>
            <ul className="filter-list">
              {priceRanges.map((r, i) => (
                <li key={r.label}>
                  <button
                    className={priceIdx === i ? 'active' : ''}
                    onClick={() => { setPriceIdx(i); setSidebarOpen(false); }}
                  >
                    <i className="fas fa-tag" /> {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <span className="results-count">
              <strong>{filtered.length}</strong> منتج
            </span>
            <div className="toolbar-actions">
              {/* Sort */}
              <select
                className="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {/* View */}
              <div className="view-toggle">
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                  aria-label="عرض شبكة"
                >
                  <i className="fas fa-th" />
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                  aria-label="عرض قائمة"
                >
                  <i className="fas fa-list" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-box-open" />
              <h3>لا توجد منتجات</h3>
              <p>جرب تغيير الفلاتر أو البحث بكلمة مختلفة</p>
              <button className="btn-primary-custom" onClick={() => { setCategory('all'); setPriceIdx(0); }}>
                عرض الكل
              </button>
            </div>
          ) : (
            <div className={`products-grid-wrap ${viewMode}`}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
