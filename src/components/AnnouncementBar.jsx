// components/AnnouncementBar.jsx
// Clean top utility bar with contact info and trust badge
import { Phone, MapPin, ShieldCheck } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-primary-dark text-white/90 text-xs py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a href="tel:8999539204" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone size={12} /> 8999 539 204
          </a>
          <a href="tel:7058151143" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone size={12} /> 7058 151 143
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> Malshiras, Solapur, Maharashtra
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-accent-light" />
          <span>Govt. Approved Hi-Tech Nursery</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
