import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Button from '../../components/Button/Button';
import categories from '../../data/categories';
import './Categories.css';

export default function Categories() {
  useEffect(() => {
    document.title = "Product Categories | VD Supplies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Explore our radiology and medical supplies categories, including Contrast, Radiation Protection, Ultrasound, and Custom Procedure Packs.'
      );
    }
  }, []);

  return (
    <>
      <main className="categories-page">
        {/* Hero */}
        <section className="categories-page__hero">
          <div className="container">
            <span className="categories-page__badge">Browse by Category</span>
            <h1 className="categories-page__title">Product Categories</h1>
            <p className="categories-page__subtitle">
              Explore our full range of radiology and medical supplies, organised by department need.
              Find exactly what your facility requires.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <section className="categories-page__grid-section">
          <div className="container">
            <div className="categories-page__grid">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="categories-page__cta">
          <div className="container categories-page__cta-inner">
            <div>
              <h2 className="categories-page__cta-title">Can't find what you need?</h2>
              <p className="categories-page__cta-desc">
                Our team can source specialised radiology equipment on request. Get in touch for a custom quote.
              </p>
            </div>
            <Button as={Link} to="/request-quote" variant="primary" size="lg" iconRight={ArrowRight}>
              Request Quote
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
