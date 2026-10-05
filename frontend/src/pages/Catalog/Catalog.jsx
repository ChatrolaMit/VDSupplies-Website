import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../data/products';
import './Catalog.css';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeCat = searchParams.get('cat') || 'all';

  useEffect(() => {
    document.title = "Radiology Supplies | VDS — Victoria Diagnostic Supplies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Contrast, injector, positioning, protection and ultrasound consumables and equipment, supplied directly by VDS (Victoria Diagnostic Supplies).'
      );
    }
  }, []);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCat !== 'all') {
      result = result.filter((p) => p.category === activeCat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCat, searchQuery]);

  return (
    <>
      <main className="catalog">
        {/* Hero Section */}
        <section className="catalog__hero">
          <div className="container">
            <span className="catalog__badge">Product Catalog</span>
            <h1 className="catalog__h1">Radiology and imaging supply, done properly</h1>
            <p className="catalog__lead">
              Certified radiology consumables and equipment developed using state-of-the-art scientific innovation.
            </p>
            {/* Standalone Search Bar within Hero */}
            <div className="catalog__search-row">
              <div className="catalog__search-wrap">
                <Search size={18} className="catalog__search-icon" />
                <input
                  type="text"
                  className="catalog__search"
                  placeholder="Search radiology consumables, accessories, SKUs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container catalog__inner">
          {/* Catalog Main Content */}
          <div className="catalog__main">
            {/* Results Count bar */}
            <div className="catalog__results-bar">
              <span className="catalog__count">
                {loading ? 'Loading catalog items...' : (
                  <>Showing <strong>{filtered.length}</strong> clinical consumables & equipment</>
                )}
              </span>
            </div>

            <div className="catalog__grid">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div 
                    key={`skel-${i}`} 
                    className="product-card" 
                    style={{ minHeight: '380px', opacity: 0.15, background: 'var(--card)' }} 
                  />
                ))
              ) : (
                filtered.map((product) => (
                  <ProductCard key={product.id} product={product} showBadge={false} />
                ))
              )}
            </div>

            {!loading && filtered.length === 0 && (
              <div className="catalog__empty">
                <p>No medical supplies match the active search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
