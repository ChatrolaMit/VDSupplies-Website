import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  Globe,
  Package,
  Send,
  CheckCircle,
} from 'lucide-react';
import Button from '../../components/Button/Button';
import { fetchProductById } from '../../data/products';
import './RequestQuote.css';

export default function RequestQuote() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const qtyParam = searchParams.get('qty') || '1';
  const [submitted, setSubmitted] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    interest: '',
    quantity: qtyParam,
    message: '',
  });

  useEffect(() => {
    document.title = "Request a Quote | VDS — Victoria Diagnostic Supplies";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Request a B2B quote for clinical radiology consumables and equipment from VDS (Victoria Diagnostic Supplies).'
      );
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductById(productId).then(prod => {
        if (prod) {
          setForm((prev) => ({
            ...prev,
            interest: prod.category || '',
            message: `Inquiry for Product: ${prod.name} (SKU: ${prod.sku}, ${prod.artgNumber || ''})`,
            quantity: qtyParam,
          }));
        }
      }).catch(console.error);
    }
  }, [productId, qtyParam]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main className="rq">
        <div className="container rq__inner">
          {/* Left — Info */}
          <div className="rq__info">
            <h1 className="rq__title">Clinical Equipment Procurement</h1>
            <p className="rq__desc">
              Connect with our specialized radiology technical team for precision-grade quotes,
              supply chain optimization, and custom OEM requests. Sourcing, customisation and delivery are what we do.
            </p>

            <div className="rq__contact-cards">
              <div className="rq__contact-card">
                <MapPin size={20} />
                <div>
                  <strong>National Supply Nodes</strong>
                  <span>Warehouses and dispatch locations in Sydney, Melbourne, and Brisbane, Australia. Same-day dispatch.</span>
                </div>
              </div>

              <div className="rq__contact-card">
                <MessageCircle size={20} />
                <div>
                  <strong>Hotline (Mon–Fri 8:00–18:00 AEST)</strong>
                  <span className="mono">+61 422 228 496</span>
                  <span className="rq__response-time">
                    <Clock size={12} /> Average clinical callback: 15 mins
                  </span>
                </div>
              </div>

              <div className="rq__contact-card">
                <Mail size={20} />
                <div>
                  <strong>B2B Account Inquiries</strong>
                  <span>info@vdsupplies.com.au</span>
                </div>
              </div>
            </div>



            <p className="rq__note">
              * Required fields. All corporate communications are protected and processed via secure data pipelines in compliance with medical data privacy guidelines.
            </p>
          </div>

          {/* Right — Form */}
          <div className="rq__form-wrap">
            {submitted ? (
              <div className="rq__success">
                <CheckCircle size={48} style={{ color: 'var(--cyan)' }} />
                <h2>Inquiry Proposal Submitted</h2>
                <p>Thank you. Our radiology supply specialist will contact you with a formal quote or contract proposal shortly.</p>
                <Button as={Link} to="/" variant="primary" size="md">
                  Back to Home
                </Button>
              </div>
            ) : (
              <form className="rq__form" onSubmit={handleSubmit}>
                <h2 className="rq__form-title">Request a Quote</h2>

                <div className="rq__field">
                  <label htmlFor="rq-name">Full Name *</label>
                  <input
                    id="rq-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="rq__field">
                  <label htmlFor="rq-org">Facility / Organization *</label>
                  <input
                    id="rq-org"
                    name="organization"
                    type="text"
                    required
                    placeholder="e.g. Melbourne General Hospital"
                    value={form.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="rq__field-row">
                  <div className="rq__field">
                    <label htmlFor="rq-email">Work Email *</label>
                    <input
                      id="rq-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. jane@hospital.org.au"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                   <div className="rq__field">
                    <label htmlFor="rq-phone">Phone *</label>
                    <input
                      id="rq-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. 0400 000 000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="rq__field-row">
                   <div className="rq__field">
                    <label htmlFor="rq-interest">Equipment Interest</label>
                    <select
                      id="rq-interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>
                      <option value="contrast-injector">Contrast & Injector Consumables</option>
                      <option value="radiation-protection">Radiation Protection</option>
                      <option value="positioning-immobilisation">Positioning & Immobilisation</option>
                      <option value="ultrasound-consumables">Ultrasound Consumables</option>
                      <option value="markers-accessories">Markers & X-ray Accessories</option>
                      <option value="patient-care">Patient Care & Infection Control</option>
                      <option value="qa-test">QA & Test Tools</option>
                      <option value="custom-packs">Custom Procedure Packs</option>
                      <option value="other">Other / Custom Concept</option>
                    </select>
                  </div>
                  <div className="rq__field">
                    <label htmlFor="rq-qty">Quantity</label>
                    <input
                      id="rq-qty"
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={form.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="rq__field">
                  <label htmlFor="rq-message">Additional Requirements</label>
                  <textarea
                    id="rq-message"
                    name="message"
                    rows="4"
                    placeholder="Describe your facility specifications, custom SKU requirements, or hard-to-source concepts..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" iconRight={Send} fullWidth>
                  Submit Procurement Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
