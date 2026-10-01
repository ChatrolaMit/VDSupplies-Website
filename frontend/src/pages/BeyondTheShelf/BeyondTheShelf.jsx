import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Settings, Factory, Truck, HelpCircle } from 'lucide-react';
import Button from '../../components/Button/Button';
import './BeyondTheShelf.css';

export default function BeyondTheShelf() {
  useEffect(() => {
    document.title = "Custom & OEM Medical Products | VD Supplies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        "Need something beyond our standard range? VD Supplies' manufacturer and OEM relationships can help source, customise or develop it."
      );
    }
  }, []);

  return (
    <>
      <main className="bts">
        {/* Hero Section */}
        <section className="bts__hero">
          <div className="container">
            <div className="bts__hero-content">
              <span className="bts__badge">Sourcing &amp; OEM Solutions</span>
              <h1 className="bts__title">When you need more than what's on the shelf</h1>
              <p className="bts__lead">
                Traditional suppliers sell from a catalogue. <strong>VD Supplies builds solutions</strong>. 
                Traditional distributors work within limitations. We build supply chains around our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bts__philosophy">
          <div className="container bts__philosophy-inner">
            <div className="bts__philosophy-text">
              <h2>We ask: "What do you need?"</h2>
              <p>
                Traditional procurement asks, "What do we stock?" We ask, "What do you need?" 
                Whether that's an existing product, something hard to source, a customised variant, 
                an OEM-branded line, or a concept that doesn't exist yet — sourcing, customisation and 
                delivery are what we do, not services we bolt on.
              </p>
              <p>
                By bypassing layers of distributors and brokerage fees, we link you directly to verified 
                ISO-certified manufacturing plants, optimizing both clinical outcomes and budget constraints.
              </p>
            </div>
            <div className="bts__philosophy-quote">
              <blockquote className="clinical-quote">
                "We don't limit your healthcare facility to a static catalog. If a radiology consumable or 
                imaging configuration does not exist, we co-develop it with our international manufacturing base."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Capabilities / Ways we solve supply problems */}
        <section className="bts__capabilities">
          <div className="container">
            <div className="bts__section-header text-center">
              <span className="section-badge">How We Solve Supply Problems</span>
              <h2>Four ways we solve supply problems</h2>
              <p className="bts__section-subtitle">
                We leverage direct manufacturer and OEM integrations to bypass standard distributor limitations.
              </p>
            </div>

            <div className="bts__capabilities-grid">
              {/* Capability 1: Source it */}
              <div className="capability-card">
                <div className="capability-card__icon-wrap">
                  <Globe size={24} />
                </div>
                <h3 className="capability-card__title">Source it</h3>
                <p className="capability-card__desc">
                  Access to a global network of manufacturers and OEM partners means we can find products outside a standard Australian distributor's catalogue.
                </p>
              </div>

              {/* Capability 2: Customise it */}
              <div className="capability-card">
                <div className="capability-card__icon-wrap">
                  <Settings size={24} />
                </div>
                <h3 className="capability-card__title">Customise it</h3>
                <p className="capability-card__desc">
                  Pack sizes, configurations, private-label and OEM-branded versions — built to your specification, not a fixed SKU list.
                </p>
              </div>

              {/* Capability 3: Manufacture it */}
              <div className="capability-card">
                <div className="capability-card__icon-wrap">
                  <Factory size={24} />
                </div>
                <h3 className="capability-card__title">Manufacture it</h3>
                <p className="capability-card__desc">
                  If the right product doesn't exist yet, we can work with our manufacturing partners to bring a new concept to life.
                </p>
              </div>

              {/* Capability 4: Deliver it */}
              <div className="capability-card">
                <div className="capability-card__icon-wrap">
                  <Truck size={24} />
                </div>
                <h3 className="capability-card__title">Deliver it</h3>
                <p className="capability-card__desc">
                  Once sourced or built, we manage the logistics so it lands where you need it, priced clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section className="bts__cta">
          <div className="container bts__cta-inner">
            <div className="bts__cta-content">
              <h2>Discuss a Sourcing or OEM Request</h2>
              <p>
                Tell us what you need. Our clinical category intelligence team is ready to analyze your requirements and build a direct manufacturer connection.
              </p>
              <div className="bts__cta-buttons">
                <Button as={Link} to="/request-quote?product=custom" variant="primary" size="lg" iconRight={ArrowRight}>
                  Initiate OEM / Sourcing Proposal
                </Button>
                <Button as={Link} to="/about" variant="secondary" size="lg">
                  Learn About Our Process
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
