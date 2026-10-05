import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Settings,
  Factory,
  Truck,
  Heart,
  Target,
  Eye,
  Hospital,
  Stethoscope,
  Activity,
  Award,
  Users,
  Warehouse,
  Cpu,
  Layers,
  Brain,
} from 'lucide-react';
import Button from '../../components/Button/Button';
import './AboutUs.css';
import aboutUsImg from '../../assets/aboutus.jpeg';

export default function AboutUs() {
  useEffect(() => {
    document.title = "About VD Supplies | Medical & Radiology Equipment Supplier";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        "VD Supplies supplies medical consumables and radiology equipment to Australian healthcare providers, backed by manufacturer relationships for anything non-standard."
      );
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el) => el.classList.add('revealed'));
        } else {
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el) => el.classList.remove('revealed'));
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: "0px 0px -60px 0px"
    });

    const container = document.querySelector('.timeline-container');
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <>
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-page__hero">
          <div className="container about-page__hero-inner">
            <div className="about-page__hero-content">
              <span className="about-page__badge">About Us</span>
              <h1 className="about-page__hero-title">A different starting question</h1>
              <p className="about-page__hero-subtitle">
                VD Supplies supplies medical consumables and radiology equipment to Australian clinics, hospitals and imaging departments. 
                That's the core of the business — real product, held and delivered reliably.
              </p>
              <p className="about-page__hero-secondary">
                We've built direct relationships with manufacturers and OEM partners, which means that when a standard product isn't quite the right fit — a configuration, a private-label version, something genuinely hard to find — we're usually able to find a path, rather than turning the request away.
              </p>
              
              <div className="about-page__hero-actions">
                <Button as={Link} to="/products" variant="primary" size="lg" iconRight={ArrowRight}>
                  Browse Range
                </Button>
                <Button as={Link} to="/request-quote" variant="secondary" size="lg">
                  Inquire B2B
                </Button>
              </div>

              <div className="about-page__hero-stats">
                <div>
                  <strong>Direct OEMs</strong>
                  <span>Direct manufacturer connection</span>
                </div>
                <div>
                  <strong>True Stock</strong>
                  <span>Held in Australian warehouses</span>
                </div>
                <div>
                  <strong>Tailored</strong>
                  <span>Custom sizes & solutions</span>
                </div>
              </div>
            </div>

            <div className="about-page__hero-widget">
              <div className="network-card">
                <div className="network-card__glass">
                  {/* Corner accents */}
                  <span className="ncp1"></span>
                  <span className="ncp2"></span>
                  <span className="ncp3"></span>
                  <span className="ncp4"></span>
                  <span className="ncp5"></span>

                  {/* Sweeping Glass Reflection Shine */}
                  <div className="network-card-shine"></div>

                  <div className="network-card__visual">
                    <img 
                      src={aboutUsImg} 
                      alt="VD Supplies Team and Facility" 
                      className="network-card__image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Actually Are Section */}
        <section className="about-page__identity">
          <div className="container">
            <div className="identity-card">
              <div className="identity-card__badge">Defining Our Role</div>
              <h2 className="about-page__section-title">What we actually are</h2>
              <p className="identity-card__main-text">
                A supplier first — with the manufacturer and OEM relationships to go further than a fixed catalogue 
                when a facility needs us to. Not a sourcing broker; a supplier with unusually deep reach. Less 
                "distributor," more "the team you call when the normal channel can't solve it."
              </p>
              <div className="identity-card__features">
                <div className="identity-feature">
                  <span className="dot"></span>
                  <strong>Unusually deep reach</strong>
                </div>
                <div className="identity-feature">
                  <span className="dot"></span>
                  <strong>Direct OEM partnerships</strong>
                </div>
                <div className="identity-feature">
                  <span className="dot"></span>
                  <strong>True Australian inventory</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Actually Do Section */}
        <section className="about-page__capabilities">
          <div className="container">
            <div className="about-page__section-header text-center">
              <span className="section-badge">Capabilities</span>
              <h2 className="about-page__section-title">Four ways we solve supply problems</h2>
              <p className="about-page__section-subtitle">
                How we go further than traditional distributors to optimize your facility's supply chain stability.
              </p>
            </div>

            <div className="capabilities-grid">
              {/* Capability 1: Source it */}
              <div className="capability-card">
                <div className="capability-card__header">
                  <div className="capability-card__icon">
                    <Globe size={24} />
                  </div>
                  <h3>Source it</h3>
                </div>
                <p className="capability-card__text">
                  Access to a global network of manufacturers and OEM partners means we can find products outside a standard Australian distributor's catalogue.
                </p>
              </div>

              {/* Capability 2: Customise it */}
              <div className="capability-card">
                <div className="capability-card__header">
                  <div className="capability-card__icon">
                    <Settings size={24} />
                  </div>
                  <h3>Customise it</h3>
                </div>
                <p className="capability-card__text">
                  Pack sizes, configurations, private-label and OEM-branded versions — built to your specification, not a fixed SKU list.
                </p>
              </div>

              {/* Capability 3: Manufacture it */}
              <div className="capability-card">
                <div className="capability-card__header">
                  <div className="capability-card__icon">
                    <Factory size={24} />
                  </div>
                  <h3>Manufacture it</h3>
                </div>
                <p className="capability-card__text">
                  If the right product doesn't exist yet, we can work with our manufacturing partners to bring a new concept to life.
                </p>
              </div>

              {/* Capability 4: Deliver it */}
              <div className="capability-card">
                <div className="capability-card__header">
                  <div className="capability-card__icon">
                    <Truck size={24} />
                  </div>
                  <h3>Deliver it</h3>
                </div>
                <p className="capability-card__text">
                  Once sourced or built, we manage the logistics so it lands where you need it, priced clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand Pillars Section (Timeline Layout) ── */}
        <section className="about-page__pillars-section">
          <div className="container">
            <div className="about-page__section-header text-center">
              <span className="section-badge">Operational Principles</span>
              <h2 className="about-page__section-title">Brand pillars</h2>
              <p className="about-page__section-subtitle">
                How we operate differently from traditional sales organizations and static catalogue brokers.
              </p>
            </div>

            <div className="timeline-container">
              {/* Central vertical line */}
              <div className="timeline-line"></div>

              {/* Pillar 1 */}
              <div className="timeline-item left reveal-on-scroll delay-1">
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-header-row">
                    <div className="timeline-icon-circle">
                      <Warehouse size={24} />
                    </div>
                  </div>
                  <h3>We're a supplier first</h3>
                  <p>
                    Real stock, real products, real delivery in Melbourne and Sydney — that's the foundation of clinical trust, not a broker's afterthought.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="timeline-item right reveal-on-scroll delay-2">
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-header-row">
                    <div className="timeline-icon-circle">
                      <Cpu size={24} />
                    </div>
                  </div>
                  <h3>Solve, don't just sell</h3>
                  <p>
                    A non-standard clinical requirement is a starting point, not a dead end. We engineer the path forward.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="timeline-item left reveal-on-scroll delay-3">
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-header-row">
                    <div className="timeline-icon-circle">
                      <Layers size={24} />
                    </div>
                  </div>
                  <h3>Fewer layers, real value</h3>
                  <p>
                    Where we can connect a facility directly to a verified manufacturer, we do — eliminating unnecessary distributor markups.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="timeline-item right reveal-on-scroll delay-4">
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-header-row">
                    <div className="timeline-icon-circle">
                      <Brain size={24} />
                    </div>
                  </div>
                  <h3>Category intelligence</h3>
                  <p>
                    We understand radiology consumables, injector specifications, and clinical workflows well enough to consult, not just take orders.
                  </p>
                </div>
              </div>

              {/* Pillar 5 */}
              <div className="timeline-item left reveal-on-scroll delay-5">
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-header-row">
                    <div className="timeline-icon-circle">
                      <Heart size={24} />
                    </div>
                  </div>
                  <h3>Built for the long term</h3>
                  <p>
                    A clinical partnership compounds in value as we understand a facility's exact recurring needs and usage rhythms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="about-page__facilities">
          <div className="container">
            <div className="facilities-box">
              <div className="facilities-box__content">
                <span className="section-badge">Client Ecosystem</span>
                <h2 className="about-page__section-title">Who we work with</h2>
                <p className="facilities-box__desc">
                  Radiology and imaging clinics, hospitals, day surgeries, aged care providers, general practices, 
                  dental and veterinary practices — any healthcare buyer whose need doesn't fit neatly into 
                  someone else's standard catalogue.
                </p>
              </div>

              <div className="facilities-box__grid">
                <div className="facility-item">
                  <div className="facility-icon"><Activity size={20} /></div>
                  <div className="facility-name">Radiology &amp; Imaging Clinics</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><Hospital size={20} /></div>
                  <div className="facility-name">Hospitals (Public &amp; Private)</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><Stethoscope size={20} /></div>
                  <div className="facility-name">Day Surgeries</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><Heart size={20} /></div>
                  <div className="facility-name">Aged Care Providers</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><Users size={20} /></div>
                  <div className="facility-name">General Practices</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><Award size={20} /></div>
                  <div className="facility-name">Dental Practices</div>
                </div>
                <div className="facility-item">
                  <div className="facility-icon"><ShieldCheck size={20} /></div>
                  <div className="facility-name">Veterinary Practices</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="about-page__mv">
          <div className="container mv-grid">
            {/* Mission */}
            <div className="mv-item-card">
              <div className="mv-item-card__header">
                <div className="mv-icon-wrap"><Target size={28} /></div>
                <h2 className="about-page__section-title">Our mission</h2>
              </div>
              <p>
                To be the medical consumables and radiology equipment supplier Australian healthcare providers 
                can rely on for the everyday order — and turn to, with confidence, when they need something 
                a standard catalogue can't cover.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-item-card">
              <div className="mv-item-card__header">
                <div className="mv-icon-wrap"><Eye size={28} /></div>
                <h2 className="about-page__section-title">Our vision</h2>
              </div>
              <p>
                An Australian healthcare sector supplied by partners who know their products properly — and who 
                never have to say "that's not something we can help with" where an unusual requirement, a 
                customisation, or a genuinely new concept can be built and delivered, not just politely declined.
              </p>
            </div>
          </div>
        </section>

        {/* Strategic CTA */}
        <section className="about-page__action-cta">
          <div className="container action-cta-inner">
            <div>
              <h2 className="about-page__section-title">Build a better clinical supply chain</h2>
              <p>Connect directly with our category specialists to design, source, or secure radiology consumables.</p>
            </div>
            <Button as={Link} to="/request-quote" variant="primary" size="lg" iconRight={ArrowRight}>
              Open a facility account
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
