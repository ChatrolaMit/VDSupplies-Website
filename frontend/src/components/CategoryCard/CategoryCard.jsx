import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldAlert,
  Move,
  Radio,
  Tags,
  Heart,
  Cpu,
  Briefcase,
  ExternalLink,
  Package,
  Clock,
  Sparkles,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import './CategoryCard.css';

const iconMap = {
  Activity,
  ShieldAlert,
  Move,
  Radio,
  Tags,
  Heart,
  Cpu,
  Briefcase,
};

const subIconMap = {
  'contrast-injector': Cpu,
  'radiation-protection': Heart,
  'positioning-immobilisation': Activity,
  'ultrasound-consumables': Package,
  'markers-accessories': Sparkles,
  'patient-care': ShieldAlert,
  'qa-test': Clock,
  'custom-packs': TrendingDown,
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || Package;
  const SubIconComponent = subIconMap[category.id] || Cpu;

  return (
    <Link to={`/catalog?cat=${category.id}`} className="category-card">
      <div className="category-card__icon-container">
        <div className="category-card__icon-main-box">
          <IconComponent className="category-card__icon-main" size={22} />
        </div>
        <div className="category-card__icon-sub-box">
          <SubIconComponent className="category-card__icon-sub" size={10} />
        </div>
      </div>
      <div className="category-card__arrow-wrapper">
        <ArrowRight className="category-card__arrow" size={18} />
      </div>
      <div className="category-card__content">
        <h3 className="category-card__title">{category.name}</h3>
        <p className="category-card__desc">{category.description}</p>
      </div>
      <div className="category-card__indicator-bar"></div>
    </Link>
  );
}
