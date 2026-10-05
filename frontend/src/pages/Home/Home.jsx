import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchFeaturedProducts } from '../../data/products';
import './Home.css';
import disinfectorImg from '../../assets/disinfector.webp';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setFeatured).catch(console.error);
  }, []);

  useEffect(() => {
    document.title = "VDS | Victoria Diagnostic Supplies — Medical Consumables & Radiology Equipment, Australia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Medical consumables and radiology equipment supplied to Australian clinics, hospitals and imaging departments — with manufacturer relationships behind the range for anything more specific.'
      );
    }
  }, []);



  return (
    <>
      <main className="home">


        {/* ── Hero Section ── */}
        <header className="home__hero">
          <div className="container home__hero-inner">
            <div className="home__hero-content">

              <h1 className="home__hero-title">
                Your Direct Partner in Medical Supplies
              </h1>
              <p className="home__hero-subtitle">
                Certified medical consumables and equipment, ready for same-day dispatch from Australian warehouses. Whether you need standard products, custom solutions, or hard-to-source items, we build supply chains that work around your business, not the other way around.

              </p>
              <div className="home__hero-actions">
                <Button as={Link} to="/products" variant="primary" size="lg" iconRight={ArrowRight}>
                  Browse the range
                </Button>
                <Button as={Link} to="/about" variant="secondary" size="lg">
                  Why we are different
                </Button>
              </div>

              <div className="home__hero-stats">
                <div><strong>48 hr</strong> Metro ETA Guarantee</div>
                {/* <div><strong>100%</strong> TGA Validation</div> */}
                <div><strong>Direct</strong> Manufacturer Connection</div>
              </div>
            </div>

            {/* Premium 3D Disinfector Render Display */}
            <div className="home__hero-media">
              <div className="hero-disinfector-float">
                <div className="hero-disinfector-card">
                  <div className="hero-disinfector-glow"></div>
                  
                  {/* Tech Bracket/Corners HUD Overlay */}
                  <div className="hero-disinfector-hud">
                    <div className="hud-corner top-left"></div>
                    <div className="hud-corner top-right"></div>
                    <div className="hud-corner bottom-left"></div>
                    <div className="hud-corner bottom-right"></div>
                  </div>

                  <div className="hero-disinfector-chamber">
                    {/* Technical Crosshair Reticle Overlay */}
                    <div className="hero-hud-crosshair"></div>

                    {/* Glowing Laser Scan Line */}
                    <div className="hero-laser-line"></div>
                    
                    {/* Floating Aerosol Mist Particles */}
                    <div className="hero-mist-particles">
                      <span className="hp1"></span>
                      <span className="hp2"></span>
                      <span className="hp3"></span>
                      <span className="hp4"></span>
                      <span className="hp5"></span>
                    </div>

                    {/* Sweeping Glass Reflection Shine */}
                    <div className="hero-disinfector-shine"></div>

                    <img 
                      src={disinfectorImg} 
                      alt="3D Render of Aerosol High-Level Disinfector Decontamination Chamber" 
                      className="hero-disinfector-image"
                    />
                  </div>

                  <div className="hero-disinfector-badge">
                    <span className="live-dot font-blink"></span>
                    ACTIVE CYCLES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>




        {/* ── Why Practices Switch ── */}
        <section id="customer-value" className="home__section switching-section">
          <div className="container">
            <div className="home__section-header text-center">
              <span className="section-badge">Customer Value</span>
              <h2 className="home__section-title">Why practices switch to VDS</h2>
              <p className="home__section-subtitle">
                Clinical managers deserve straightforward logistics without hidden distributor brokerage fees.
              </p>
            </div>

            <div className="process-flow-container">
              {/* Horizontal connecting line behind cards */}
              <div className="process-flow-line"></div>

              <div className="process-flow-grid">
                {/* Step 1 */}
                <div className="process-flow-card">
                  <div className="process-step-badge step-1">
                    <span>01</span>
                  </div>
                  <h4>Direct</h4>
                  <p>
                    We import straight from the manufacturer. Fewer hands between the factory and your room means a better price and a clearer trail.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="process-flow-card">
                  <div className="process-step-badge step-2">
                    <span>02</span>
                  </div>
                  <h4>Compliant</h4>
                  <p>
                    We're the Australian sponsor on the ARTG, not a reseller of someone else's listing. Ask us for the paperwork and you get it same day.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="process-flow-card">
                  <div className="process-step-badge step-3">
                    <span>03</span>
                  </div>
                  <h4>Clinical</h4>
                  <p>
                    VDS was founded by a nurse who has stocked wards and run clinical teams. We choose products the way you'd use them.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="process-flow-card">
                  <div className="process-step-badge step-4">
                    <span>04</span>
                  </div>
                  <h4>Responsive</h4>
                  <p>
                    Instant Quotes. Urgent stock after hours in Metro Melbourne and nearby suburbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Categories Section ── */}
        {/*
        <section className="home__section categories-section">
          <div className="container">
            <div className="home__section-header">
              <div>
                <span className="section-badge">Departments We Equip</span>
                <h2 className="home__section-title">Browse standard categories</h2>
                <p className="home__section-subtitle">
                  Clinical equipment and consumables held in Melbourne and Sydney warehouses.
                </p>
              </div>
              <Button as={Link} to="/categories" variant="ghost" size="sm" iconRight={ChevronRight}>
                All Categories
              </Button>
            </div>

            <div className="home__categories-grid">
              {categories.slice(0, 4).map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>
        */}

        {/* ── Featured Solutions & Services ── */}
        {featured.length > 0 && (
          <section className="home__section featured-section">
            <div className="container">
              <div className="home__section-header">
                <div>
                  <span className="section-badge">Solutions</span>
                  <h2 className="home__section-title">Featured Solution &amp; Service</h2>
                  <p className="home__section-subtitle">
                    Tailored medical supply solutions and services engineered for modern clinical environments.
                  </p>
                </div>
                <Button as={Link} to="/products" variant="ghost" size="sm" iconRight={ChevronRight}>
                  Full Catalog
                </Button>
              </div>
              <div className="home__products-grid">
                {featured.slice(0, 4).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showPrice={false} 
                    showBadge={false} 
                    showStock={false} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
