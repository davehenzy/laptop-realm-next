import React from 'react';
import { Product, Category, Brand, BlogPost } from './types';
import { Laptop, Monitor, Smartphone, Printer, Server, Camera, Headphones, Speaker, Watch, Gamepad } from 'lucide-react';

// Utility to optimize images (Unsplash specific)
export const optimizeImage = (url: string, width: number = 400) => {
  if (!url) return '';
  // Check if it's an Unsplash image
  if (url.includes('images.unsplash.com')) {
     const baseUrl = url.split('?')[0];
     // Use WebP format, 80% quality, and dynamic width
     return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80&fm=webp`;
  }
  return url;
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Computers', slug: 'computers', icon: <Laptop size={16} /> },
  { id: '2', name: 'Electronics', slug: 'electronics', icon: <Monitor size={16} /> },
  { id: '3', name: 'Phone & Tablet', slug: 'phone-tablet', icon: <Smartphone size={16} /> },
  { id: '4', name: 'Home Appliances', slug: 'home-appliances', icon: <Speaker size={16} /> },
  { id: '5', name: 'Games & Consoles', slug: 'games-consoles', icon: <Gamepad size={16} /> },
  { id: '6', name: 'Accessories', slug: 'accessories', icon: <Headphones size={16} /> },
  { id: '7', name: 'Multimedia', slug: 'multimedia', icon: <Camera size={16} /> },
  { id: '8', name: 'Printers', slug: 'printers', icon: <Printer size={16} /> },
];

export const BRANDS: Brand[] = [
  { id: 'hp', name: 'HP', logo: 'HP' },
  { id: 'dell', name: 'Dell', logo: 'DELL' },
  { id: 'lenovo', name: 'Lenovo', logo: 'Lenovo' },
  { id: 'apple', name: 'Apple', logo: 'Apple' },
  { id: 'asus', name: 'Asus', logo: 'Asus' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302', // Laptop workspace
    title: 'Start with Tech!',
    subtitle: 'Laptops | Desktops | Monitors',
    badge: 'Start Smart',
    badgeColor: 'bg-yellow-400',
    discount: 'UP TO 30% OFF',
    buttonText: 'SHOP NOW',
    buttonColor: 'bg-[#ef4444]'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531297461136-82lw9z173e03', // Tech/Cyber
    title: 'Next Gen Gaming',
    subtitle: 'Consoles | VR | High Performance',
    badge: 'New Arrival',
    badgeColor: 'bg-green-400',
    discount: 'BEST PRICES',
    buttonText: 'EXPLORE',
    buttonColor: 'bg-[#333399]'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', // MacBook
    title: 'Apple Ecosystem',
    subtitle: 'MacBook Pro | iPad | iPhone',
    badge: 'Premium',
    badgeColor: 'bg-gray-200',
    discount: 'M3 CHIPS',
    buttonText: 'BUY NOW',
    buttonColor: 'bg-black'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108', // Office/Server
    title: 'Office Solutions',
    subtitle: 'Printers | Servers | Networking',
    badge: 'Business',
    badgeColor: 'bg-blue-400',
    discount: 'BULK DEALS',
    buttonText: 'GET QUOTE',
    buttonColor: 'bg-blue-600'
  }
];

export const LATEST_ARRIVALS: Product[] = [
  {
    id: '1',
    title: 'Dell Tower Plus EBT2250 Desktop with Intel...',
    price: 4600000,
    originalPrice: 5000000,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b', // Desktop
    category: 'Computers',
    slug: 'dell-tower-plus-ebt2250',
    specs: { brand: 'Dell', os: 'Windows 11', ram: '32GB', storageType: 'SSD', storageCapacity: '1TB', screenSize: 'N/A' }
  },
  {
    id: '2',
    title: 'Dell 14 PLUS Laptop (DB14250) - Intel Ultra...',
    price: 2300000,
    originalPrice: 2500000,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5', // Dell Laptop
    category: 'Computers',
    slug: 'dell-14-plus-laptop',
    specs: { brand: 'Dell', os: 'Windows 11', ram: '16GB', storageType: 'SSD', storageCapacity: '512GB', screenSize: '14-inch' }
  },
  {
    id: '3',
    title: '2025 Microsoft Surface Laptop 13-Inch -...',
    price: 2300000,
    originalPrice: 2500000,
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f', // Surface
    category: 'Computers',
    slug: 'microsoft-surface-laptop-13-inch',
    specs: { brand: 'Microsoft', os: 'Windows 11', ram: '16GB', storageType: 'SSD', storageCapacity: '512GB', screenSize: '13-inch' }
  },
  {
    id: '4',
    title: '2025 Microsoft Surface Laptop 13-Inch -...',
    price: 1955000,
    originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1605493666690-a6a3b2b9187a', // Surface 2
    category: 'Computers',
    slug: 'microsoft-surface-laptop-13-inch-base',
    specs: { brand: 'Microsoft', os: 'Windows 11', ram: '8GB', storageType: 'SSD', storageCapacity: '256GB', screenSize: '13-inch' }
  },
  {
    id: '5',
    title: 'ACSL Inc. SOTEN Drone Survey Bundle',
    price: 24337500,
    originalPrice: 25000000,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f', // Drone
    category: 'Multimedia',
    slug: 'acsl-soten-drone',
    specs: { brand: 'ACSL', os: 'Linux', ram: 'N/A', storageType: 'SSD', storageCapacity: 'N/A', screenSize: 'N/A' }
  },
  {
    id: '6',
    title: 'FLIR SIRAS Professional Drone with Thermal...',
    price: 17415200,
    originalPrice: 18000000,
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384', // Drone 2
    category: 'Multimedia',
    slug: 'flir-siras-drone',
    specs: { brand: 'FLIR', os: 'Linux', ram: 'N/A', storageType: 'SSD', storageCapacity: 'N/A', screenSize: 'N/A' }
  },
];

export const NEW_YEAR_SPECIALS: Product[] = [
  {
    id: '7',
    title: 'HIKVISION 5MP ANALOGUE DOME...',
    price: 46000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19', // CCTV/Camera
    category: 'Electronics',
    slug: 'hikvision-5mp-dome',
    specs: { brand: 'Hikvision', os: 'N/A', ram: 'N/A', storageType: 'N/A', storageCapacity: 'N/A', screenSize: 'N/A' }
  },
  {
    id: '8',
    title: 'ASUS VivoBook Pro 15 (K3500PH-KJ470W) -...',
    price: 977500,
    originalPrice: 1005000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', // Laptop
    category: 'Computers',
    slug: 'asus-vivobook-pro-15',
    specs: { brand: 'Asus', os: 'Windows 11', ram: '16GB', storageType: 'SSD', storageCapacity: '512GB', screenSize: '15-inch' }
  },
  {
    id: '9',
    title: 'Corsair Vengeance a5100 Gaming PC -...',
    price: 13702445,
    originalPrice: 13850000,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7', // Gaming PC
    category: 'Computers',
    slug: 'corsair-vengeance-a5100',
    specs: { brand: 'Corsair', os: 'Windows 11', ram: '64GB', storageType: 'SSD', storageCapacity: '2TB', screenSize: 'N/A' }
  },
  {
    id: '10',
    title: 'Dell Curved Bezel Monitor, 32, 4K...',
    price: 758425,
    originalPrice: 819500,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf', // Monitor
    category: 'Computers',
    slug: 'dell-curved-monitor-32',
    specs: { brand: 'Dell', os: 'N/A', ram: 'N/A', storageType: 'N/A', storageCapacity: 'N/A', screenSize: '32-inch' }
  },
  {
    id: '11',
    title: 'Mercury VM 2.4KW Off-Grid Inverter 24V',
    price: 302795,
    originalPrice: 328100,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03', // Tech/Circuit
    category: 'Electronics',
    slug: 'mercury-inverter-2-4kw'
  },
  {
    id: '15',
    title: 'Sony PlayStation 5 Console',
    price: 450000,
    originalPrice: 500000,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3',
    category: 'Games & Consoles',
    slug: 'ps5-console',
    specs: { brand: 'Sony', os: 'N/A', ram: '16GB', storageType: 'SSD', storageCapacity: '1TB', screenSize: 'N/A' }
  },
  {
    id: '16',
    title: 'Samsung 55" 4K Smart TV',
    price: 350000,
    originalPrice: 400000,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    category: 'Electronics',
    slug: 'samsung-55-4k-tv',
    specs: { brand: 'Samsung', os: 'Tizen', ram: 'N/A', storageType: 'N/A', storageCapacity: 'N/A', screenSize: '55-inch' }
  },
  {
    id: '17',
    title: 'Apple iPad Air 5th Gen',
    price: 420000,
    originalPrice: 450000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    category: 'Phone & Tablet',
    slug: 'ipad-air-5th-gen',
    specs: { brand: 'Apple', os: 'iOS', ram: '8GB', storageType: 'SSD', storageCapacity: '64GB', screenSize: '10.9-inch' }
  },
  {
    id: '18',
    title: 'Logitech MX Master 3S Mouse',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    category: 'Accessories',
    slug: 'logitech-mx-master-3s'
  },
  {
    id: '19',
    title: 'JBL Flip 6 Bluetooth Speaker',
    price: 75000,
    originalPrice: 90000,
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3',
    category: 'Multimedia',
    slug: 'jbl-flip-6'
  }
];

export const APPLE_STORE: Product[] = [
  {
    id: '12',
    title: 'Apple MacBook Pro 14.2inch | 11C GPU | 14C...',
    price: 3277500,
    originalPrice: 4500000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', // MacBook
    category: 'Computers',
    slug: 'macbook-pro-14-m3',
    specs: { brand: 'Apple', os: 'macOS', ram: '16GB', storageType: 'SSD', storageCapacity: '512GB', screenSize: '14-inch' }
  },
  {
    id: '13',
    title: 'Apple MacBook Pro M3 Pro 16.2inch | 12C GPU |...',
    price: 3450000,
    originalPrice: 3700000,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9', // MacBook
    category: 'Computers',
    slug: 'macbook-pro-16-m3-pro',
    specs: { brand: 'Apple', os: 'macOS', ram: '18GB', storageType: 'SSD', storageCapacity: '512GB', screenSize: '16-inch' }
  },
  {
    id: '14',
    title: 'Apple MacBook Pro 18C GPU MRW23LL/A | 16-in...',
    price: 4370000,
    originalPrice: 5000000,
    image: 'https://images.unsplash.com/photo-1531297461136-82lw9z173e03', // MacBook
    category: 'Computers',
    slug: 'macbook-pro-16-m3-max',
    specs: { brand: 'Apple', os: 'macOS', ram: '36GB', storageType: 'SSD', storageCapacity: '1TB', screenSize: '16-inch' }
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Personal Computing",
    excerpt: "Artificial Intelligence is no longer just a buzzword; it's reshaping how we interact with our devices daily. From Copilot in Windows to Apple Intelligence...",
    content: "Full content would be fetched from WP API...",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    author: "Tech Editor",
    category: "Technology",
    slug: "future-of-ai-computing"
  },
  {
    id: 2,
    title: "M3 vs M2 Chips: Is the Upgrade Worth It?",
    excerpt: "Apple's latest silicon has arrived. We dive deep into the benchmarks and real-world performance to see if you should upgrade your MacBook Pro.",
    content: "Full content would be fetched from WP API...",
    date: "May 10, 2024",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    author: "Hardware Reviewer",
    category: "Reviews",
    slug: "m3-vs-m2-chips"
  },
  {
    id: 3,
    title: "Top 5 Gaming Laptops for 2024",
    excerpt: "Whether you are a casual gamer or an e-sports pro, these machines deliver the best frame rates and thermal performance for your budget.",
    content: "Full content would be fetched from WP API...",
    date: "May 05, 2024",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5",
    author: "Gaming Expert",
    category: "Buying Guides",
    slug: "top-5-gaming-laptops-2024"
  },
  {
    id: 4,
    title: "Understanding SSD Speeds: Gen 4 vs Gen 5",
    excerpt: "Storage speed affects everything from boot times to game loading. Here is everything you need to know about the latest PCIe generations.",
    content: "Full content would be fetched from WP API...",
    date: "April 28, 2024",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    author: "Tech Editor",
    category: "Hardware",
    slug: "ssd-speeds-gen4-vs-gen5"
  },
  {
    id: 5,
    title: "How to Extend Your Laptop Battery Life",
    excerpt: "Simple tips and tricks to squeeze a few extra hours out of your machine when you are away from a power outlet.",
    content: "Full content would be fetched from WP API...",
    date: "April 20, 2024",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    author: "Support Team",
    category: "How To",
    slug: "extend-laptop-battery-life"
  },
  {
    id: 6,
    title: "The Rise of Foldable Screens",
    excerpt: "Are foldable screens the future of productivity or just a passing fad? We explore the durability and utility of the latest foldable tech.",
    content: "Full content would be fetched from WP API...",
    date: "April 15, 2024",
    image: "https://images.unsplash.com/photo-1618418386120-1a7776b637d7",
    author: "Tech Editor",
    category: "Trends",
    slug: "rise-of-foldable-screens"
  }
];
