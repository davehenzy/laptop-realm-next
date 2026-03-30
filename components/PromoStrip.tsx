import React from 'react';
import { optimizeImage } from '../constants';

interface PromoItem {
  label: string;
  image: string;
  hoverImage?: string;
  isBrand?: boolean;
}

const PromoStrip: React.FC = () => {
  // Data for the Blue Section (Careers/Types)
  const blueSection: PromoItem[] = [
    { 
      label: 'Data Analyst Computers', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      hoverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
    },
    { 
      label: 'Curved Monitors', 
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
      hoverImage: 'https://images.unsplash.com/photo-1551739440-5dd934d3a95a'
    },
    { 
      label: 'Cyber Security', 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      hoverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3'
    },
    { 
      label: 'Graphics Designers', 
      image: 'https://images.unsplash.com/photo-1626785774583-b61d526e3c32',
      hoverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
    },
    { 
      label: 'Students Laptops', 
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      hoverImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2'
    },
  ];

  // Data for the Teal Section (Categories)
  const tealSection: PromoItem[] = [
    { 
      label: 'Laptops', 
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      hoverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'
    },
    { 
      label: 'Printers', 
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6',
      hoverImage: 'https://images.unsplash.com/photo-1561642048-b35d8239b874'
    },
    { 
      label: 'Desktops & Monitors', 
      image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6',
      hoverImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5'
    },
    { 
      label: 'Servers', 
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      hoverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
    },
    { 
      label: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      hoverImage: 'https://images.unsplash.com/photo-1461151304267-3a968e733884'
    },
  ];

  // Data for the Pink Section (Specialized Use)
  const pinkSection: PromoItem[] = [
    { 
      label: 'Music Production', 
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
      hoverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'
    },
    { 
      label: 'Architects Laptops', 
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
      hoverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb'
    },
    { 
      label: 'Programming Computers', 
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
      hoverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    },
    { 
      label: 'Gaming Computers', 
      image: 'https://images.unsplash.com/photo-1603481588233-fa6e1d22e03d',
      hoverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e'
    },
    { 
      label: 'Business Machine', 
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf'
    },
  ];

  // Data for the Purple Section (Brands)
  const purpleSection: PromoItem[] = [
    { 
      label: 'Hp Brand', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/200px-HP_logo_2012.svg.png', 
      hoverImage: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50',
      isBrand: true 
    },
    { 
      label: 'Dell Brand', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png', 
      hoverImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5',
      isBrand: true 
    },
    { 
      label: 'Lenovo Brand', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png', 
      hoverImage: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5',
      isBrand: true 
    },
    { 
      label: 'Apple Brand', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png', 
      hoverImage: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
      isBrand: true 
    },
    { 
      label: 'Asus & Microsoft', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/200px-ASUS_Logo.svg.png', 
      hoverImage: 'https://images.unsplash.com/photo-1555618568-15635442996d',
      isBrand: true 
    },
  ];

  const renderSection = (items: PromoItem[], bgColor: string) => (
    <div className={`${bgColor} rounded-lg p-6 h-full shadow-md`}>
      <div className="flex flex-wrap justify-between items-start gap-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-pointer w-1/5 min-w-[80px]">
            {/* Circle Container with Overflow Hidden for Sliding Effect */}
            <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-yellow-400 overflow-hidden mb-3 bg-white shadow-md`}>
              {/* Primary Image */}
              <img 
                src={item.isBrand ? item.image : optimizeImage(item.image, 150)} 
                alt={item.label} 
                loading="lazy"
                className={`absolute inset-0 w-full h-full ${item.isBrand ? 'object-contain p-3' : 'object-cover'} transition-transform duration-500 ease-in-out transform group-hover:-translate-x-full`}
              />
              {/* Secondary/Hover Image (Slides in from right) */}
              <img 
                src={item.hoverImage ? optimizeImage(item.hoverImage, 150) : (item.isBrand ? item.image : optimizeImage(item.image, 150))} 
                alt={item.label} 
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform translate-x-full group-hover:translate-x-0`}
              />
            </div>
            <span className="text-white text-center text-[10px] md:text-xs font-semibold leading-tight px-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-8 mb-16">
      {/* Header Strip */}
      <div className="bg-[#333399] text-white py-3 px-6 rounded-t-lg font-bold text-lg mb-0 shadow-sm">
        Browse By Careers, Top Categories & Brands
      </div>
      
      {/* 2x2 Grid Layout with Vibrant Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {renderSection(blueSection, 'bg-[#1e3a8a]')} {/* Darker Blue */}
        {renderSection(tealSection, 'bg-[#0e7490]')} {/* Cyan/Teal */}
        {renderSection(pinkSection, 'bg-[#e11d48]')} {/* Vibrant Rose/Pink */}
        {renderSection(purpleSection, 'bg-[#7e22ce]')} {/* Purple */}
      </div>
    </div>
  );
};

export default PromoStrip;