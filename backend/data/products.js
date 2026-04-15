const products = [
  {
    name: 'Nova Wireless Headphones',
    slug: 'nova-wireless-headphones',
    brand: 'Nova',
    category: 'Audio',
    description:
      'Premium over-ear wireless headphones with active noise cancellation, 30-hour battery life, and balanced studio sound.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
    ],
    price: 199.99,
    countInStock: 24,
    rating: 4.7,
    numReviews: 124,
    featured: true
  },
  {
    name: 'Flux Smartwatch X',
    slug: 'flux-smartwatch-x',
    brand: 'Flux',
    category: 'Wearables',
    description:
      'A modern smartwatch with fitness tracking, GPS, AMOLED display, and up to 7 days of battery life.',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80'
    ],
    price: 249.99,
    countInStock: 18,
    rating: 4.5,
    numReviews: 84,
    featured: true
  },
  {
    name: 'Terra Leather Backpack',
    slug: 'terra-leather-backpack',
    brand: 'Terra',
    category: 'Bags',
    description:
      'Handcrafted leather backpack built for daily commuting with padded laptop storage and water-resistant lining.',
    image:
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 139.99,
    countInStock: 30,
    rating: 4.6,
    numReviews: 56,
    featured: false
  },
  {
    name: 'Luma Desk Lamp',
    slug: 'luma-desk-lamp',
    brand: 'Luma',
    category: 'Home',
    description:
      'Minimal LED desk lamp with touch dimming, USB-C charging port, and warm to cool color temperature presets.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    ],
    price: 69.99,
    countInStock: 42,
    rating: 4.4,
    numReviews: 41,
    featured: true
  },
  {
    name: 'Orbit Mechanical Keyboard',
    slug: 'orbit-mechanical-keyboard',
    brand: 'Orbit',
    category: 'Accessories',
    description:
      'Compact mechanical keyboard with hot-swappable switches, RGB backlighting, and aluminum chassis.',
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80'
    ],
    price: 119.99,
    countInStock: 27,
    rating: 4.8,
    numReviews: 152,
    featured: true
  },
  {
    name: 'Aero Running Shoes',
    slug: 'aero-running-shoes',
    brand: 'Aero',
    category: 'Footwear',
    description:
      'Breathable performance running shoes with responsive cushioning for long-distance comfort and speed.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    ],
    price: 109.99,
    countInStock: 36,
    rating: 4.3,
    numReviews: 67,
    featured: false
  },
  {
    name: 'Summit Insulated Bottle',
    slug: 'summit-insulated-bottle',
    brand: 'Summit',
    category: 'Outdoor',
    description:
      'Double-wall stainless steel bottle that keeps drinks cold for 24 hours and hot for 12 hours.',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80'
    ],
    price: 34.99,
    countInStock: 65,
    rating: 4.6,
    numReviews: 90,
    featured: false
  },
  {
    name: 'Canvas Weekend Duffel',
    slug: 'canvas-weekend-duffel',
    brand: 'Harbor',
    category: 'Travel',
    description:
      'Spacious weekender bag with reinforced straps, shoe compartment, and waxed canvas finish.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    price: 89.99,
    countInStock: 22,
    rating: 4.5,
    numReviews: 49,
    featured: false
  },
  {
    name: 'BrewMaster Pour Over Kit',
    slug: 'brewmaster-pour-over-kit',
    brand: 'BrewMaster',
    category: 'Kitchen',
    description:
      'Complete pour over coffee kit with glass dripper, reusable filter, kettle, and server.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
    ],
    price: 79.99,
    countInStock: 31,
    rating: 4.7,
    numReviews: 103,
    featured: true
  },
  {
    name: 'Sora Linen Shirt',
    slug: 'sora-linen-shirt',
    brand: 'Sora',
    category: 'Clothing',
    description:
      'Lightweight breathable linen shirt designed for warm-weather layering and everyday comfort.',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80'
    ],
    price: 54.99,
    countInStock: 40,
    rating: 4.2,
    numReviews: 34,
    featured: false
  },
  {
    name: 'Balance Yoga Mat Pro',
    slug: 'balance-yoga-mat-pro',
    brand: 'Balance',
    category: 'Fitness',
    description:
      'Extra-grip yoga mat with dense support, alignment marks, and sweat-resistant surface.',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80'
    ],
    price: 49.99,
    countInStock: 58,
    rating: 4.8,
    numReviews: 120,
    featured: true
  },
  {
    name: 'Mira Ceramic Vase Set',
    slug: 'mira-ceramic-vase-set',
    brand: 'Mira',
    category: 'Decor',
    description:
      'Neutral-toned ceramic vase set crafted to elevate shelves, dining tables, and entry consoles.',
    image:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80'
    ],
    price: 64.99,
    countInStock: 26,
    rating: 4.4,
    numReviews: 38,
    featured: false
  },
  {
    name: 'Pixel Portable Speaker',
    slug: 'pixel-portable-speaker',
    brand: 'Pixel',
    category: 'Audio',
    description:
      'Compact Bluetooth speaker with rich bass, waterproof shell, and 14-hour portable playback.',
    image:
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80'
    ],
    price: 89.99,
    countInStock: 47,
    rating: 4.5,
    numReviews: 76,
    featured: false
  },
  {
    name: 'Aria Skin Care Set',
    slug: 'aria-skin-care-set',
    brand: 'Aria',
    category: 'Beauty',
    description:
      'Daily skincare routine set including cleanser, hydrating serum, moisturizer, and facial mist.',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    ],
    price: 72.99,
    countInStock: 33,
    rating: 4.6,
    numReviews: 58,
    featured: false
  },
  {
    name: 'Studio Monitor Stand',
    slug: 'studio-monitor-stand',
    brand: 'Studio',
    category: 'Office',
    description:
      'Solid wood monitor stand with hidden drawer space to clean up desks and improve posture.',
    image:
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=900&q=80'
    ],
    price: 59.99,
    countInStock: 29,
    rating: 4.3,
    numReviews: 27,
    featured: false
  },
  {
    name: 'Pulse Dumbbell Pair',
    slug: 'pulse-dumbbell-pair',
    brand: 'Pulse',
    category: 'Fitness',
    description:
      'Rubber-coated adjustable dumbbell pair for home strength training and daily exercise sessions.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'
    ],
    price: 129.99,
    countInStock: 21,
    rating: 4.7,
    numReviews: 63,
    featured: false
  },
  {
    name: 'Cove Scented Candle Trio',
    slug: 'cove-scented-candle-trio',
    brand: 'Cove',
    category: 'Home',
    description:
      'A trio of soy candles with sea salt, cedarwood, and vanilla scents in reusable glass jars.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80'
    ],
    price: 39.99,
    countInStock: 54,
    rating: 4.4,
    numReviews: 72,
    featured: false
  },
  {
    name: 'Drift Polarized Sunglasses',
    slug: 'drift-polarized-sunglasses',
    brand: 'Drift',
    category: 'Accessories',
    description:
      'Classic polarized sunglasses with lightweight frame, UV protection, and all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80'
    ],
    price: 44.99,
    countInStock: 39,
    rating: 4.2,
    numReviews: 31,
    featured: false
  },
  {
    name: 'Roam Carry-On Suitcase',
    slug: 'roam-carry-on-suitcase',
    brand: 'Roam',
    category: 'Travel',
    description:
      'Hard-shell carry-on suitcase with silent spinner wheels, TSA lock, and compression interior.',
    image:
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80'
    ],
    price: 189.99,
    countInStock: 16,
    rating: 4.8,
    numReviews: 92,
    featured: true
  },
  {
    name: 'Glow Bedside Alarm Clock',
    slug: 'glow-bedside-alarm-clock',
    brand: 'Glow',
    category: 'Home',
    description:
      'Digital alarm clock with sunrise wake light, USB charging, and dimmable bedside display.',
    image:
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 57.99,
    countInStock: 44,
    rating: 4.5,
    numReviews: 46,
    featured: false
  }
];

export default products;
