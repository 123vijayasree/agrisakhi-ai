export interface Treatment {
  name: string;
  type: 'organic' | 'chemical';
  ingredient: string;
  dosage: string;
  frequency: string;
  application: string;
  safetyNote?: string;
  ecoFriendlyRating: number; // 1 to 5 scale
}

export interface Disease {
  id: string;
  name: string;
  scientificName?: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'deficiency';
  crop: string;
  symptoms: string[];
  description: string;
  favorableWeather: string;
  weatherTriggers: {
    minTemp?: number;
    maxTemp?: number;
    minHumidity?: number;
    maxHumidity?: number;
  };
  treatments: Treatment[];
  prevention: string[];
}

export interface WeatherCondition {
  temp: number;
  humidity: number;
  rainfall: number; // mm
  windSpeed: number; // km/h
}

export interface MandiPrice {
  crop: string;
  priceRange: string;
  avgPrice: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  markets: { name: string; distance: string; price: number }[];
}

export interface SoilRecommender {
  crop: string;
  optimalPh: string;
  optimalNpk: string;
  deficiencySymptoms: {
    N: string;
    P: string;
    K: string;
  };
  remedies: {
    lowPh: string;
    highPh: string;
    lowN: string;
    lowP: string;
    lowK: string;
  };
}

export const CROPS = ['Tomato', 'Wheat', 'Rice', 'Cotton', 'Potato', 'Sugarcane', 'Onion', 'Chilli', 'Mustard', 'Soybean'];

export const AGRICULTURAL_DB: Disease[] = [
  // TOMATO DISEASES
  {
    id: 'tom-early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    type: 'fungal',
    crop: 'Tomato',
    symptoms: ['dark spots', 'brown spots', 'concentric rings', 'yellow halos on leaves', 'lower leaves falling'],
    description: 'A very common fungal disease affecting foliage, stems, and fruits. It starts as small black or brown spots on older leaves, developing concentric rings like a target.',
    favorableWeather: 'Warm temperatures (24-29°C) and high humidity or frequent rainfall.',
    weatherTriggers: {
      minTemp: 22,
      maxTemp: 30,
      minHumidity: 80
    },
    treatments: [
      {
        name: 'Neem Oil & Trichoderma Viride Spray',
        type: 'organic',
        ingredient: 'Cold-pressed Neem oil (10,000 PPM) + Trichoderma viride formulation',
        dosage: '5 ml Neem oil + 5g Trichoderma per liter of water',
        frequency: 'Every 7-10 days in early morning or late evening',
        application: 'Spray thoroughly on both upper and lower leaf surfaces, covering stems.',
        ecoFriendlyRating: 5
      },
      {
        name: 'Mancozeb 75% WP Fungicide',
        type: 'chemical',
        ingredient: 'Mancozeb',
        dosage: '2-2.5 g per liter of water',
        frequency: 'Every 10-12 days at first sign of disease',
        application: 'Foliar spray. Ensure uniform coverage. Do not spray within 7 days of harvest.',
        safetyNote: 'Wear mask, goggles, and protective gloves. Keep honeybees safe by spraying when active flight is low.',
        ecoFriendlyRating: 1
      }
    ],
    prevention: [
      'Maintain proper plant spacing for air circulation.',
      'Mulch the soil surface to prevent soil-borne spores from splashing onto leaves.',
      'Water at the base of the plant using drip irrigation rather than overhead sprinklers.',
      'Prune lower leaves up to 12 inches off the ground once the plant matures.'
    ]
  },
  {
    id: 'tom-leaf-curl',
    name: 'Tomato Leaf Curl Virus',
    scientificName: 'Begomovirus',
    type: 'viral',
    crop: 'Tomato',
    symptoms: ['curling leaves', 'yellow leaf edges', 'stunted growth', 'wrinkled leaves', 'puckered leaves', 'tiny leaves'],
    description: 'A destructive viral disease transmitted by the Sweetpotato Whitefly (Bemisia tabaci). Infected plants exhibit severe leaf curling, chlorosis, and highly reduced yield.',
    favorableWeather: 'Dry, warm weather (30-38°C) which leads to high Whitefly populations.',
    weatherTriggers: {
      minTemp: 30,
      maxTemp: 40,
      maxHumidity: 60
    },
    treatments: [
      {
        name: 'Organic Whitefly Control (Neem Spray & Yellow Sticky Traps)',
        type: 'organic',
        ingredient: 'Neem seed kernel extract (NSKE) 5% & Soap water',
        dosage: '50ml NSKE per liter of water',
        frequency: 'Once a week, especially under leaf surfaces',
        application: 'Install yellow sticky cards at canopy height to capture adult whiteflies. Spray plants during early mornings.',
        ecoFriendlyRating: 5
      },
      {
        name: 'Systemic Insecticide Spray (Imidacloprid 17.8% SL)',
        type: 'chemical',
        ingredient: 'Imidacloprid',
        dosage: '0.5 ml per liter of water',
        frequency: 'Max 2 sprays per crop cycle, spaced 15 days apart',
        application: 'Apply on young plants to control vector population. Do not apply during peak flowering.',
        safetyNote: 'Highly toxic to bees. Spray only in late evenings. Observe a 15-day pre-harvest safety interval.',
        ecoFriendlyRating: 1
      }
    ],
    prevention: [
      'Use nylon nets or mesh (40-60 mesh) to shield seedlings in nursery beds.',
      'Remove and destroy infected plants immediately to prevent the virus from spreading.',
      'Keep field borders free of weeds that host whiteflies.'
    ]
  },
  // WHEAT DISEASES
  {
    id: 'wht-stem-rust',
    name: 'Stem Rust (Black Rust)',
    scientificName: 'Puccinia graminis',
    type: 'fungal',
    crop: 'Wheat',
    symptoms: ['rust spots', 'orange pustules', 'reddish brown powder', 'damaged stems', 'broken stems', 'shriveled grains'],
    description: 'A devastating fungal disease producing brick-red to black elongated pustules on wheat stems and leaf sheaths. It causes lodging (stem breaking) and severe shriveling of grains.',
    favorableWeather: 'Mild temperatures (18-28°C) with wet conditions (dew or light rain) and warm wind.',
    weatherTriggers: {
      minTemp: 18,
      maxTemp: 29,
      minHumidity: 75
    },
    treatments: [
      {
        name: 'Botanical Eucalyptus & Garlic Extract',
        type: 'organic',
        ingredient: 'Aqueous extracts of garlic bulbs and eucalyptus leaves',
        dosage: '10% concentration (100ml extract per liter of water)',
        frequency: 'Every 7 days at early vegetative stages',
        application: 'Spray thoroughly as a preventive measure during humid periods.',
        ecoFriendlyRating: 4
      },
      {
        name: 'Propiconazole 25% EC (Tilt)',
        type: 'chemical',
        ingredient: 'Propiconazole',
        dosage: '1 ml per liter of water (approx 500 ml/hectare)',
        frequency: 'At first appearance of rust, repeat after 15 days if humidity persists',
        application: 'Uniform foliar spray using a flat fan nozzle.',
        safetyNote: 'Wear full body protection. Avoid skin contact. Toxic to aquatic life, prevent run-off.',
        ecoFriendlyRating: 1
      }
    ],
    prevention: [
      'Sow rust-resistant varieties approved for your region.',
      'Adopt early sowing schedules to escape peak rust infection window.',
      'Avoid high Nitrogen fertilizer overdoses, which create dense, humid leaf canopies.'
    ]
  },
  // RICE DISEASES
  {
    id: 'rice-blast',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    type: 'fungal',
    crop: 'Rice',
    symptoms: ['spindle shaped spots', 'diamond spots', 'gray centers on leaves', 'rotted neck', 'empty grains', 'drying leaves'],
    description: 'One of the most destructive diseases of rice. It causes diamond-shaped lesions with gray centers on leaves, and breaks necks of panicles (neck blast), causing complete crop failure.',
    favorableWeather: 'High relative humidity (>90%), cool nights (18-22°C), and wet leaves.',
    weatherTriggers: {
      minTemp: 16,
      maxTemp: 24,
      minHumidity: 85
    },
    treatments: [
      {
        name: 'Pseudomonas Fluorescens Bio-control',
        type: 'organic',
        ingredient: 'Pseudomonas fluorescens (powder formulation)',
        dosage: '10g per liter of water for foliar spray; 25g/kg for seed treatment',
        frequency: 'Spray at tillering and panicle initiation stages',
        application: 'Mix with water, spray on plants, and apply to nursery bed soil.',
        ecoFriendlyRating: 5
      },
      {
        name: 'Tricyclazole 75% WP Fungicide',
        type: 'chemical',
        ingredient: 'Tricyclazole',
        dosage: '0.6 g per liter of water',
        frequency: '2 sprays: one at tillering stage and second at boot leaf stage',
        application: 'Foliar spray. Excellent systemic action; absorbed quickly by roots and leaves.',
        safetyNote: 'Ensure protective wear. Keep out of reach of domestic animals.',
        ecoFriendlyRating: 2
      }
    ],
    prevention: [
      'Sow certified disease-free seeds.',
      'Avoid excessive application of Nitrogenous fertilizers; split the dose into 3-4 stages.',
      'Destruction of diseased straw and stubble from previous harvests.'
    ]
  },
  // COTTON DISEASES
  {
    id: 'cot-bollworm',
    name: 'American Bollworm',
    scientificName: 'Helicoverpa armigera',
    type: 'pest',
    crop: 'Cotton',
    symptoms: ['bored holes in squares', 'chewed bolls', 'caterpillars present', 'boll dropping', 'yellowing bolls', 'holes in leaves'],
    description: 'A major chewing pest that attacks squares, flowers, and bolls of cotton plants. Caterpillars feed inside the bolls, destroying lint and seeds, leaving telltale circular holes.',
    favorableWeather: 'Humid, moderately warm weather (25-32°C) with low rainfall.',
    weatherTriggers: {
      minTemp: 24,
      maxTemp: 33,
      minHumidity: 50,
      maxHumidity: 80
    },
    treatments: [
      {
        name: 'Bt Formulation & Neem Spray',
        type: 'organic',
        ingredient: 'Bacillus thuringiensis var. kurstaki (Btk) + Neem seed kernel extract',
        dosage: '2g Btk powder + 5ml soap solution per liter of water',
        frequency: 'Spray at 5-7 day intervals when young larvae are noticed',
        application: 'Foliar spray focusing on terminal shoots and squares. Best sprayed at dusk.',
        ecoFriendlyRating: 5
      },
      {
        name: 'Spinosad 45% SC Insecticide',
        type: 'chemical',
        ingredient: 'Spinosad',
        dosage: '0.4 ml per liter of water',
        frequency: 'Apply once pest population crosses economic threshold (ETL)',
        application: 'Ensure thorough coverage of flowers and bolls.',
        safetyNote: 'Extremely toxic to bees when wet. Do not apply during active foraging hours.',
        ecoFriendlyRating: 3
      }
    ],
    prevention: [
      'Grow Bt-cotton hybrids which carry resistance against bollworms.',
      'Plant trap crops like Okra or Marigold around the cotton plot boundary (ratio of 1:10).',
      'Encourage natural predators like ladybird beetles and lacewings.'
    ]
  },
  // POTATO DISEASES
  {
    id: 'pot-late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    type: 'fungal',
    crop: 'Potato',
    symptoms: ['water soaked lesions', 'white growth under leaves', 'rotting tubers', 'brown leaf edges', 'rapid dying', 'foul odor'],
    description: 'The historical disease responsible for the Irish Potato Famine. It causes rapid collapse of leaves, white moldy growth on leaf undersides under wet conditions, and rotting of tubers with a characteristic foul smell.',
    favorableWeather: 'Cool, wet weather (15-20°C) with continuous high humidity (>90%).',
    weatherTriggers: {
      minTemp: 12,
      maxTemp: 21,
      minHumidity: 90
    },
    treatments: [
      {
        name: 'Copper Hydroxide Bio-spray',
        type: 'organic',
        ingredient: 'Copper hydroxide (permitted in organic farming with limits)',
        dosage: '2 g per liter of water',
        frequency: 'Every 7 days during high disease risk weather',
        application: 'Apply as a protective shield coating on all foliage before heavy rains.',
        ecoFriendlyRating: 4
      },
      {
        name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)',
        type: 'chemical',
        ingredient: 'Metalaxyl + Mancozeb',
        dosage: '2.5 g per liter of water',
        frequency: 'Foliar spray at first warning; repeat after 10 days if wet weather continues',
        application: 'Double action systemic and contact spray. Ensure complete foliage coverage.',
        safetyNote: 'Do not harvest for 14 days after spraying. Dispose empty packets safely away from water bodies.',
        ecoFriendlyRating: 1
      }
    ],
    prevention: [
      'Sow certified, disease-free seed tubers.',
      'Ensure proper hilling (earthing up) of soil around plants to protect tubers from spores.',
      'Harvest tubers only when vines are completely dry or defoliated.'
    ]
  },

  // SUGARCANE DISEASES
  {
    id: 'sug-red-rot',
    name: 'Red Rot',
    scientificName: 'Colletotrichum falcatum',
    type: 'fungal',
    crop: 'Sugarcane',
    symptoms: ['red internal stalk', 'white patches inside cane', 'wilting', 'dead heart', 'sour smell', 'yellowing top leaves'],
    description: 'The most destructive disease of sugarcane in India, called the "cancer of sugarcane". The internal stalk tissue turns red with white transverse patches when split open, and emits a faint alcoholic odour.',
    favorableWeather: 'High temperature (26-32°C) with high humidity and water-logging.',
    weatherTriggers: { minTemp: 26, maxTemp: 34, minHumidity: 80 },
    treatments: [
      { name: 'Hot Water Seed Treatment', type: 'organic', ingredient: 'Hot water at 50°C', dosage: 'Soak setts for 2 hours', frequency: 'Pre-planting seed treatment', application: 'Dip setts in hot water at exactly 50°C for 120 minutes. Cool before planting.', ecoFriendlyRating: 5 },
      { name: 'Carbendazim 50% WP', type: 'chemical', ingredient: 'Carbendazim', dosage: '1 g per liter — soak setts for 30 minutes', frequency: 'Pre-planting sett treatment', application: 'Soak seed setts in solution before planting. Do not use stalks from infected fields.', safetyNote: 'Avoid runoff into water bodies. Wear gloves and mask.', ecoFriendlyRating: 2 }
    ],
    prevention: ['Use disease-resistant varieties like Co-86032, Co-0238.', 'Rogue out and burn infected clumps immediately.', 'Avoid water-logging — ensure proper drainage in the field.', 'Practice 3-year crop rotation with legumes or wheat.']
  },

  // ONION DISEASES
  {
    id: 'oni-purple-blotch',
    name: 'Purple Blotch',
    scientificName: 'Alternaria porri',
    type: 'fungal',
    crop: 'Onion',
    symptoms: ['purple lesions on leaves', 'white centre spots', 'leaf tip die-back', 'brown lesions', 'yellowing leaves'],
    description: 'A very common and destructive foliar disease of onion in India, especially during the Rabi season. Initial small white spots with purple centres expand to form large brown/purple lesions that girdle and kill the leaf.',
    favorableWeather: 'Moderate temperature (25-30°C) with high humidity and dew.',
    weatherTriggers: { minTemp: 22, maxTemp: 30, minHumidity: 75 },
    treatments: [
      { name: 'Neem Oil Spray', type: 'organic', ingredient: 'Neem oil 1500 ppm', dosage: '4 ml per liter with 1 ml soap emulsifier', frequency: 'Every 7-10 days during wet weather', application: 'Spray in the early morning to coat all leaf surfaces evenly.', ecoFriendlyRating: 5 },
      { name: 'Mancozeb 75% WP', type: 'chemical', ingredient: 'Mancozeb', dosage: '2.5 g per liter of water', frequency: 'Spray at 10-day intervals starting at disease appearance', application: 'Foliar spray. Add sticker-spreader for adhesion on waxy onion leaves.', safetyNote: 'Pre-harvest interval: 15 days. Avoid during flowering.', ecoFriendlyRating: 2 }
    ],
    prevention: ['Use certified disease-free seed from reputed source (e.g., NHRDF varieties).', 'Avoid excessive nitrogen — it promotes lush growth favourable for disease.', 'Ensure good field drainage and avoid overhead irrigation.', 'Rotate onion with cereals or legumes every 2-3 years.']
  },

  // CHILLI DISEASES
  {
    id: 'chi-anthracnose',
    name: 'Anthracnose / Fruit Rot',
    scientificName: 'Colletotrichum capsici',
    type: 'fungal',
    crop: 'Chilli',
    symptoms: ['sunken dark spots on fruit', 'orange spore masses on lesions', 'fruit shrivelling', 'stem lesions', 'defoliation'],
    description: 'Called "die-back" in chilli, it is the most destructive disease causing up to 50% yield loss. Infected fruits show dark, sunken, water-soaked lesions with orange-coloured spore masses visible in concentric rings.',
    favorableWeather: 'Warm humid weather (27-32°C) with frequent rains or prolonged leaf wetness.',
    weatherTriggers: { minTemp: 25, maxTemp: 32, minHumidity: 80 },
    treatments: [
      { name: 'Trichoderma viride Bio-spray', type: 'organic', ingredient: 'Trichoderma viride spore suspension', dosage: '10 g per liter of water', frequency: 'Every 10 days during fruiting', application: 'Spray in the evening. Cover fruit surface completely.', ecoFriendlyRating: 5 },
      { name: 'Propineb 70% WP (Antracol)', type: 'chemical', ingredient: 'Propineb', dosage: '2 g per liter of water', frequency: 'Spray every 10 days starting at fruit formation', application: 'Protective contact fungicide — apply before infection period during rains.', safetyNote: 'PHI: 7 days. Avoid skin contact.', ecoFriendlyRating: 2 }
    ],
    prevention: ['Use resistant varieties: LCA 305, G4, Pusa Jwala for Anthracnose tolerance.', 'Treat seed with Thiram 3g/kg seed before sowing.', 'Destroy and burn infected crop debris after harvest.', 'Avoid waterlogging and ensure raised bed planting for good drainage.']
  },

  // MUSTARD DISEASES
  {
    id: 'mus-white-rust',
    name: 'White Rust / White Blister',
    scientificName: 'Albugo candida',
    type: 'fungal',
    crop: 'Mustard',
    symptoms: ['white pustules on leaves', 'white blisters on pods', 'distorted flower head', 'staghead symptom', 'creamy white lesions'],
    description: 'A major disease of mustard in the Indo-Gangetic plains, causing up to 80% yield loss in severe seasons. Infected plants show chalky white pustules on lower leaf surface and the inflorescence becomes distorted into a "staghead" structure.',
    favorableWeather: 'Cool, moist weather (10-20°C) with heavy dew and fog.',
    weatherTriggers: { minTemp: 8, maxTemp: 20, minHumidity: 85 },
    treatments: [
      { name: 'Potassium Phosphonate Spray', type: 'organic', ingredient: 'Potassium phosphonate 0.3%', dosage: '3 ml per liter of water', frequency: 'Spray at rosette stage and again at bud emergence', application: 'Systemic action — induces plant resistance. Apply as foliar spray.', ecoFriendlyRating: 4 },
      { name: 'Metalaxyl 8% + Mancozeb 64% WP', type: 'chemical', ingredient: 'Metalaxyl + Mancozeb', dosage: '2.5 g per liter of water', frequency: '2 sprays — first at rosette stage, second at early flowering', application: 'Systemic + contact combination spray. Full coverage of both leaf surfaces.', safetyNote: 'PHI: 10 days. Rotate with other fungicides to prevent resistance.', ecoFriendlyRating: 1 }
    ],
    prevention: ['Grow resistant varieties: Varuna, Kranti, RH-8812, Pusa Tarak.', 'Adjust sowing time — early October sowing avoids peak disease period.', 'Remove and destroy infected staghead plant parts immediately.', 'Maintain wider row spacing (30 cm) for better aeration.']
  },

  // SOYBEAN DISEASES
  {
    id: 'soy-yellow-mosaic',
    name: 'Yellow Mosaic Virus',
    scientificName: 'Bean Yellow Mosaic Virus (BYMV)',
    type: 'viral',
    crop: 'Soybean',
    symptoms: ['bright yellow patches on leaves', 'mosaic pattern', 'stunted plants', 'small pods', 'leaf curling', 'yellowing interveinal areas'],
    description: 'A devastating viral disease of soybean across India, transmitted by whitefly (Bemisia tabaci). Infected plants show characteristic bright yellow mosaic pattern on leaves, reduced pod set, and severe yield loss of 40-100%.',
    favorableWeather: 'Hot and dry weather (28-35°C) that favours high whitefly populations.',
    weatherTriggers: { minTemp: 28, maxTemp: 36, maxHumidity: 60 },
    treatments: [
      { name: 'Sticky Yellow Traps + Neem Oil', type: 'organic', ingredient: 'Yellow sticky traps + Neem oil 2%', dosage: '10 traps per acre + 20 ml neem oil per liter', frequency: 'Set traps at sowing; spray neem oil every 7 days', application: 'Traps monitor and capture whitefly vectors. Neem oil spray repels and kills nymphs.', ecoFriendlyRating: 5 },
      { name: 'Thiamethoxam 25 WG (Actara)', type: 'chemical', ingredient: 'Thiamethoxam', dosage: '0.5 g per liter of water', frequency: 'Spray at first whitefly appearance; repeat after 15 days', application: 'Systemic insecticide — effective against whitefly vector. Do not spray near flowering.', safetyNote: 'Highly toxic to bees. Do not spray during flowering. PHI: 14 days.', ecoFriendlyRating: 1 }
    ],
    prevention: ['Use resistant varieties: JS-335 (partially resistant), MAUS-162, NRC-37.', 'Uproot and destroy infected plants immediately — no cure once infected.', 'Maintain border crop of maize or sorghum to deter whitefly movement.', 'Avoid planting near other legume crops like mung bean or urd bean.']
  }
];

export const MANDI_PRICES: MandiPrice[] = [
  {
    crop: 'Tomato',
    priceRange: '₹1,500 - ₹3,200',
    avgPrice: 2350,
    trend: 'up',
    change: '+12% this week',
    markets: [
      { name: 'Pimpalgaon Mandi (Nashik)', distance: '42 km', price: 2450 },
      { name: 'Kalyan APMC', distance: '120 km', price: 2800 },
      { name: 'Pune Gultekdi Market', distance: '150 km', price: 2300 }
    ]
  },
  {
    crop: 'Wheat',
    priceRange: '₹2,300 - ₹2,750',
    avgPrice: 2540,
    trend: 'stable',
    change: '+0.5% this week',
    markets: [
      { name: 'Indore APMC (M.P.)', distance: '65 km', price: 2600 },
      { name: 'Kota Mandi (Rajasthan)', distance: '110 km', price: 2520 },
      { name: 'Khanna Grain Market (Punjab)', distance: '340 km', price: 2650 }
    ]
  },
  {
    crop: 'Rice',
    priceRange: '₹3,200 - ₹5,400',
    avgPrice: 4100,
    trend: 'up',
    change: '+4.2% this week',
    markets: [
      { name: 'Gondia APMC (Maharashtra)', distance: '35 km', price: 3950 },
      { name: 'Karnal Grain Market (Haryana)', distance: '280 km', price: 4600 },
      { name: 'Burdwan Mandi (W. Bengal)', distance: '450 km', price: 4200 }
    ]
  },
  {
    crop: 'Cotton',
    priceRange: '₹6,800 - ₹7,900',
    avgPrice: 7250,
    trend: 'down',
    change: '-3.1% this week',
    markets: [
      { name: 'Yavatmal APMC (Vidarbha)', distance: '18 km', price: 7300 },
      { name: 'Amravati Cotton Yard', distance: '55 km', price: 7150 },
      { name: 'Rajkot Mandi (Gujarat)', distance: '220 km', price: 7400 }
    ]
  },
  {
    crop: 'Potato',
    priceRange: '₹1,200 - ₹1,950',
    avgPrice: 1550,
    trend: 'stable',
    change: '-1.0% this week',
    markets: [
      { name: 'Agra APMC (U.P.)', distance: '85 km', price: 1650 },
      { name: 'Hooghly Mandi (W. Bengal)', distance: '190 km', price: 1500 },
      { name: 'Lasalgaon Market', distance: '50 km', price: 1520 }
    ]
  },
  {
    crop: 'Onion',
    priceRange: '₹800 - ₹2,400',
    avgPrice: 1600,
    trend: 'up',
    change: '+18% this week',
    markets: [
      { name: 'Lasalgaon APMC (Nashik)', distance: '30 km', price: 1800 },
      { name: 'Pimpalgaon Baswant Mandi', distance: '45 km', price: 1650 },
      { name: 'Mahuva Market (Gujarat)', distance: '210 km', price: 1500 }
    ]
  },
  {
    crop: 'Chilli',
    priceRange: '₹6,000 - ₹14,000',
    avgPrice: 9500,
    trend: 'up',
    change: '+8% this week',
    markets: [
      { name: 'Guntur APMC (Andhra Pradesh)', distance: '25 km', price: 10500 },
      { name: 'Khammam Chilli Yard', distance: '80 km', price: 9200 },
      { name: 'Warangal Market', distance: '110 km', price: 8800 }
    ]
  },
  {
    crop: 'Sugarcane',
    priceRange: '₹3,100 - ₹3,600',
    avgPrice: 3350,
    trend: 'stable',
    change: '+0.8% this week',
    markets: [
      { name: 'Kolhapur Sugar Factory Gate', distance: '12 km', price: 3500 },
      { name: 'Pune Shirur Cooperative', distance: '55 km', price: 3300 },
      { name: 'Muzaffarnagar Mandi (U.P.)', distance: '380 km', price: 3400 }
    ]
  },
  {
    crop: 'Mustard',
    priceRange: '₹5,200 - ₹6,800',
    avgPrice: 5950,
    trend: 'down',
    change: '-4.2% this week',
    markets: [
      { name: 'Alwar APMC (Rajasthan)', distance: '60 km', price: 6200 },
      { name: 'Bharatpur Mandi', distance: '85 km', price: 5800 },
      { name: 'Kota Grain Market', distance: '200 km', price: 6100 }
    ]
  },
  {
    crop: 'Soybean',
    priceRange: '₹4,200 - ₹5,100',
    avgPrice: 4650,
    trend: 'stable',
    change: '+1.1% this week',
    markets: [
      { name: 'Indore APMC (M.P.)', distance: '40 km', price: 4800 },
      { name: 'Akola Soybean Yard (Maharashtra)', distance: '120 km', price: 4600 },
      { name: 'Latur Market', distance: '180 km', price: 4550 }
    ]
  }
];

export const SOIL_RECOMMENDER: SoilRecommender[] = [
  {
    crop: 'Tomato',
    optimalPh: '6.0 - 6.8 (Slightly Acidic to Neutral)',
    optimalNpk: '120:80:60 kg/ha',
    deficiencySymptoms: {
      N: 'Older leaves turn pale green/yellow; stunted plant growth.',
      P: 'Leaves turn dark green with purplish tints on the veins and undersides.',
      K: 'Leaf margins turn yellow/brown and dry out (marginal scorch); weak stems.'
    },
    remedies: {
      lowPh: 'Apply agricultural lime (calcium carbonate) at 500 kg/acre to raise pH.',
      highPh: 'Apply elemental sulfur (50 kg/acre) or organic compost to lower pH.',
      lowN: 'Incorporate well-rotted farmyard manure (FYM) or apply Urea/Ammonium Phosphate.',
      lowP: 'Apply Single Super Phosphate (SSP) or Rock Phosphate close to root zones.',
      lowK: 'Apply Muriate of Potash (MOP) or Potassium Sulfate during soil preparation.'
    }
  },
  {
    crop: 'Wheat',
    optimalPh: '6.0 - 7.5 (Neutral)',
    optimalNpk: '120:60:40 kg/ha',
    deficiencySymptoms: {
      N: 'Erect, spindly growth, uniform chlorosis starting from lower leaf tips.',
      P: 'Reduced tillering, thin stems, purple coloration on older leaves.',
      K: 'Tip burning of older leaves, leaf splitting, lodging susceptibility.'
    },
    remedies: {
      lowPh: 'Apply Dolomite limestone during tillage.',
      highPh: 'Apply Gypsum (1.5 - 2 tons/acre depending on sodicity) and irrigate.',
      lowN: 'Apply Neem-coated Urea in split doses (sowing, tillering, jointing stages).',
      lowP: 'Apply Diammonium Phosphate (DAP) at sowing time.',
      lowK: 'Apply Potassium Chloride (MOP) at sowing or along with first irrigation.'
    }
  },
  {
    crop: 'Rice',
    optimalPh: '5.5 - 6.5 (Moderately Acidic)',
    optimalNpk: '100:50:50 kg/ha',
    deficiencySymptoms: {
      N: 'Yellowing of leaves starting from tips, small thin leaves, low tillering.',
      P: 'Dark green leaves, erect and narrow, slow maturity, empty panicles.',
      K: 'Rust-colored spots on leaves, dirty dark green color, grain chalkiness.'
    },
    remedies: {
      lowPh: 'Generally, flooding raises acidic soil pH naturally. Add lime only if pH < 5.0.',
      highPh: 'Apply ammonium sulfate as a Nitrogen source; add organic manure.',
      lowN: 'Apply Urea under deep-placement or use green manuring (dhaincha).',
      lowP: 'Apply Single Super Phosphate (SSP) in muddy soils before puddling.',
      lowK: 'Apply Muriate of Potash in split doses: 50% at transplanting, 50% at panicle stage.'
    }
  },
  {
    crop: 'Cotton',
    optimalPh: '6.5 - 8.0 (Neutral to Alkaline)',
    optimalNpk: '100:50:50 kg/ha',
    deficiencySymptoms: {
      N: 'Light green canopy, early flowering and shedding of squares, small bolls.',
      P: 'Stunted seedlings, dark green leaves, delayed boll opening.',
      K: 'Cotton Rust: Yellow-white mottling, leaf edges curl downwards, turn reddish-brown.'
    },
    remedies: {
      lowPh: 'Add Hydrated Lime or Dolomite if pH is below 6.0.',
      highPh: 'Apply organic compost, gypsum, or iron sulfate to alkaline soils.',
      lowN: 'Top dress with Urea or Ammonium Nitrate at squaring and flowering stages.',
      lowP: 'Apply DAP or SSP during sowing; spray DAP 2% during dry spells.',
      lowK: 'Foliar spray of Potassium Nitrate 2% at weekly intervals during boll development.'
    }
  },
  {
    crop: 'Potato',
    optimalPh: '5.2 - 6.2 (Acidic, helps prevent Potato Scab disease)',
    optimalNpk: '150:100:120 kg/ha',
    deficiencySymptoms: {
      N: 'Light green leaves, reduced foliage size, premature vine death.',
      P: 'Leaves cup upwards, plants stunted, tubers with brown necrotic spots.',
      K: 'Dark green leaves with bronzing, marginal necrosis, poor tuber storage life.'
    },
    remedies: {
      lowPh: 'Potato tolerates low pH. Do not lime unless pH drops below 4.8.',
      highPh: 'Do NOT apply lime. Apply ammonium sulfate, sulfur, and organic matter.',
      lowN: 'Apply Nitrogen in splits: 50% at planting, 50% at earthing up.',
      lowP: 'Incorporate DAP or SSP thoroughly in the furrow rows.',
      lowK: 'Apply Potassium Sulfate (SOP) instead of MOP for better starch content.'
    }
  }
];

export const VERNACULAR_TEXTS: Record<string, Record<string, string>> = {
  en: {
    title: 'AgriSakhi AI',
    subtitle: 'Smart Farming Companion Agent',
    doctor: 'Sakhi Doctor',
    doctorSub: 'Diagnose crop diseases instantly',
    weather: 'Weather Watcher',
    weatherSub: 'Climate metrics & risk warnings',
    treatments: 'Treatment Finder',
    treatmentsSub: 'Organic vs. Chemical protocols',
    calendar: 'Farming Calendar',
    calendarSub: 'Seasonal preventive planner',
    chat: 'Ask AgriSakhi',
    chatSub: 'Natural language farming expert',
    soil: 'Soil Health Companion',
    soilSub: 'PH & NPK fertilizer optimization',
    mandi: 'Mandi prices',
    mandiSub: 'Mandi Prices & Trends',
    diagnoseBtn: 'Diagnose Crop Issue',
    inputPlaceholder: 'Describe your crop symptoms here... e.g. "my tomato leaves have yellow halos and dark spots with rings"',
    cropLabel: 'Select Crop',
    symptomsLabel: 'Describe Symptoms',
    resultsTitle: 'Diagnostic Diagnosis Results',
    confidenceScore: 'Confidence Score',
    organicSol: 'Organic/Bio Protocol',
    chemicalSol: 'Chemical Control Protocol',
    preventiveSteps: 'Preventive Measures',
    mandiTitle: 'Live Mandi Price Tracker',
    mandiTrend: 'Price Trend',
    mandiDistance: 'Distance',
    soilTitle: 'Soil Analyzer & Fertilizer Advisor',
    optimalPh: 'Optimal pH',
    optimalNpk: 'Optimal NPK Ratio',
    soilSymptoms: 'Nutrient Deficiency Symptoms',
    remedies: 'Soil and Nutrient Remedies',
    apiPlaceholder: 'Paste your Gemini API Key here...'
  },
  hi: {
    title: 'कृषि सखी AI',
    subtitle: 'स्मार्ट खेती मित्र एजेंट',
    doctor: 'सखी डॉक्टर',
    doctorSub: 'फसल की बीमारी का तुरंत निदान करें',
    weather: 'मौसम रक्षक',
    weatherSub: 'जलवायु आंकड़े और जोखिम चेतावनी',
    treatments: 'उपचार खोजक',
    treatmentsSub: 'जैविक बनाम रासायनिक समाधान',
    calendar: 'खेती कैलेंडर',
    calendarSub: 'मौसमी रोकथाम योजनाकार',
    chat: 'कृषि सखी से पूछें',
    chatSub: 'प्राकृतिक भाषा खेती विशेषज्ञ',
    soil: 'मिट्टी स्वास्थ्य साथी',
    soilSub: 'पीएच और एनपीके उर्वरक अनुकूलन',
    mandi: 'मंडी भाव',
    mandiSub: 'मंडी भाव और रुझान',
    diagnoseBtn: 'फसल की समस्या का निदान करें',
    inputPlaceholder: 'अपनी फसल के लक्षणों का वर्णन करें... जैसे "मेरे टमाटर के पत्तों पर पीले घेरे और छल्ले के साथ काले धब्बे हैं"',
    cropLabel: 'फसल चुनें',
    symptomsLabel: 'लक्षणों का वर्णन करें',
    resultsTitle: 'निदान परिणाम',
    confidenceScore: 'विश्वास स्कोर',
    organicSol: 'जैविक/बायो प्रोटोकॉल',
    chemicalSol: 'रासायनिक नियंत्रण प्रोटोकॉल',
    preventiveSteps: 'रोकथाम के उपाय',
    mandiTitle: 'लाइव मंडी भाव ट्रैकर',
    mandiTrend: 'भाव का रुझान',
    mandiDistance: 'दूरी',
    soilTitle: 'मिट्टी विश्लेषक और उर्वरक सलाहकार',
    optimalPh: 'इष्टतम पीएच',
    optimalNpk: 'इष्टtum एनपीके अनुपात',
    soilSymptoms: 'पोषक तत्वों की कमी के लक्षण',
    remedies: 'मिट्टी और पोषक तत्व सुधार',
    apiPlaceholder: 'अपनी जेमिनी एपीआई कुंजी यहाँ पेस्ट करें...'
  },
  mr: {
    title: 'कृषी सखी AI',
    subtitle: 'स्मार्ट शेती मित्र',
    doctor: 'सखी डॉक्टर',
    doctorSub: 'पिकांच्या रोगांचे त्वरित निदान',
    weather: 'हवामान रक्षक',
    weatherSub: 'हवामान अंदाज आणि जोखीम चेतावणी',
    treatments: 'उपचार शोधक',
    treatmentsSub: 'सेंद्रिय वि. रासायनिक उपाय',
    calendar: 'शेती दिनदर्शिका',
    calendarSub: 'हंगामावर आधारित नियोजन',
    chat: 'कृषी सखीला विचारा',
    chatSub: 'कृषी सल्लागार चॅट',
    soil: 'माती आरोग्य सखी',
    soilSub: 'पीएच आणि खत नियोजन',
    mandi: 'बाजार भाव',
    mandiSub: 'मंडीचे भाव आणि कल',
    diagnoseBtn: 'पिकाच्या समस्येचे निदान करा',
    inputPlaceholder: 'तुमच्या पिकाच्या लक्षणांचे वर्णन करा... उदा. "माझ्या टोमॅटोच्या पानांवर काळे गोल ठिपके आले आहेत"',
    cropLabel: 'पीक निवडा',
    symptomsLabel: 'लक्षणांचे वर्णन करा',
    resultsTitle: 'निदान अहवाल',
    confidenceScore: 'अंदाज अचूकता',
    organicSol: 'सेंद्रिय उपचार पद्धती',
    chemicalSol: 'रासायनिक नियंत्रण पद्धती',
    preventiveSteps: 'प्रतिबंधात्मक उपाय',
    mandiTitle: 'थेट बाजार भाव (मंडी भाव)',
    mandiTrend: 'भाव दिशा',
    mandiDistance: 'अंतर',
    soilTitle: 'माती परीक्षण आणि खत सल्लागार',
    optimalPh: 'योग्य पीएच प्रमाण',
    optimalNpk: 'योग्य एनपीके प्रमाण',
    soilSymptoms: 'अन्नांशाच्या कमतरतेची लक्षणे',
    remedies: 'माती आणि अन्नाश सुधारणा उपाय',
    apiPlaceholder: 'तुमची जेमिनी एपीआई की येथे पेस्ट करा...'
  },
  ta: {
    title: 'விவசாய சகி AI',
    subtitle: 'ஸ்மார்ட் விவசாய துணை முகவர்',
    doctor: 'சகி டாக்டர்',
    doctorSub: 'பயிர் நோய்களை உடனே கண்டறியுங்கள்',
    weather: 'வானிலை காவலர்',
    weatherSub: 'காலநிலை அளவீடுகள் மற்றும் அபாய எச்சரிக்கைகள்',
    treatments: 'சிகிச்சை தேடி',
    treatmentsSub: 'இயற்கை எதிராக இரசாயன தீர்வுகள்',
    calendar: 'விவசாய நாட்காட்டி',
    calendarSub: 'பருவகால தடுப்பு திட்டமிடல்',
    chat: 'விவசாய சகியிடம் கேளுங்கள்',
    chatSub: 'இயற்கை மொழி விவசாய நிபுணர்',
    soil: 'மண் ஆரோக்கிய துணை',
    soilSub: 'pH மற்றும் NPK உரம் மேம்படுத்தல்',
    mandi: 'சந்தை விலை',
    mandiSub: 'மண்டி விலைகள் மற்றும் போக்குகள்',
    diagnoseBtn: 'பயிர் பிரச்சனையை கண்டறியுங்கள்',
    inputPlaceholder: 'உங்கள் பயிரின் அறிகுறிகளை விவரிக்கவும்... எ.கா. "என் தக்காளி இலைகளில் மஞ்சள் வளையங்கள் மற்றும் கருப்பு புள்ளிகள் உள்ளன"',
    cropLabel: 'பயிரை தேர்வு செய்யுங்கள்',
    symptomsLabel: 'அறிகுறிகளை விவரிக்கவும்',
    resultsTitle: 'நோய் கண்டறிதல் முடிவுகள்',
    confidenceScore: 'நம்பகத்தன்மை மதிப்பெண்',
    organicSol: 'இயற்கை/உயிர் நெறிமுறை',
    chemicalSol: 'இரசாயன கட்டுப்பாட்டு நெறிமுறை',
    preventiveSteps: 'தடுப்பு நடவடிக்கைகள்',
    mandiTitle: 'நேரடி மண்டி விலை கண்காணிப்பு',
    mandiTrend: 'விலை போக்கு',
    mandiDistance: 'தூரம்',
    soilTitle: 'மண் பகுப்பாய்வு மற்றும் உர ஆலோசகர்',
    optimalPh: 'உகந்த pH மதிப்பு',
    optimalNpk: 'உகந்த NPK விகிதம்',
    soilSymptoms: 'ஊட்டச்சத்து குறைபாட்டு அறிகுறிகள்',
    remedies: 'மண் மற்றும் ஊட்டச்சத்து சரிசெய்தல் தீர்வுகள்',
    apiPlaceholder: 'உங்கள் ஜெமினி API விசையை இங்கே ஒட்டவும்...'
  },
  te: {
    title: 'అగ్రిసఖి AI',
    subtitle: 'స్మార్ట్ వ్యవసాయ సహాయక ఏజెంట్',
    doctor: 'సఖి డాక్టర్',
    doctorSub: 'పంట వ్యాధులను వెంటనే నిర్ధారించండి',
    weather: 'వాతావరణ రక్షకుడు',
    weatherSub: 'వాతావరణ కొలమానాలు మరియు హెచ్చరికలు',
    treatments: 'చికిత్స వెతుకు',
    treatmentsSub: 'సేంద్రియ vs రసాయన పరిష్కారాలు',
    calendar: 'వ్యవసాయ క్యాలెండర్',
    calendarSub: 'కాల-ఆధారిత నివారణ ప్రణాళిక',
    chat: 'అగ్రిసఖిని అడగండి',
    chatSub: 'సహజ భాషా వ్యవసాయ నిపుణుడు',
    soil: 'మట్టి ఆరోగ్య సహాయకుడు',
    soilSub: 'pH మరియు NPK ఎరువు ఆప్టిమైజేషన్',
    mandi: 'మార్కెట్ ధర',
    mandiSub: 'మండీ ధరలు మరియు పోకడలు',
    diagnoseBtn: 'పంట సమస్యను నిర్ధారించండి',
    inputPlaceholder: 'మీ పంట లక్షణాలను వివరించండి... ఉదా. "నా టమాటా ఆకులపై పసుపు వలయాలు మరియు నల్లని మచ్చలు ఉన్నాయి"',
    cropLabel: 'పంటను ఎంచుకోండి',
    symptomsLabel: 'లక్షణాలను వివరించండి',
    resultsTitle: 'వ్యాధి నిర్ధారణ ఫలితాలు',
    confidenceScore: 'నమ్మకత స్కోరు',
    organicSol: 'సేంద్రీయ/బయో ప్రోటోకాల్',
    chemicalSol: 'రసాయన నియంత్రణ ప్రోటోకాల్',
    preventiveSteps: 'నివారణ చర్యలు',
    mandiTitle: 'లైవ్ మండీ ధర ట్రాకర్',
    mandiTrend: 'ధర ధోరణి',
    mandiDistance: 'దూరం',
    soilTitle: 'మట్టి విశ్లేషణ మరియు ఎరువు సలహాదారు',
    optimalPh: 'సరైన pH విలువ',
    optimalNpk: 'సరైన NPK నిష్పత్తి',
    soilSymptoms: 'పోషకాహార లోపం లక్షణాలు',
    remedies: 'మట్టి మరియు పోషకాహార సవరణ పరిష్కారాలు',
    apiPlaceholder: 'మీ జెమిని API కీని ఇక్కడ పేస్ట్ చేయండి...'
  },
  gu: {
    title: 'એગ્રી સખી AI',
    subtitle: 'સ્માર્ટ ખેતી સહાયક એજન્ટ',
    doctor: 'સખી ડૉક્ટર',
    doctorSub: 'પાકના રોગોનું તાત્કાલિક નિદાન',
    weather: 'હવામાન રક્ષક',
    weatherSub: 'આબોહવા માપ અને જોખમ ચેતવણી',
    treatments: 'સારવાર શોધ',
    treatmentsSub: 'જૈવિક vs રાસાયણિક ઉકેલ',
    calendar: 'ખેતી કૅલેન્ડર',
    calendarSub: 'ઋતુ-આધારિત નિવારણ આયોજન',
    chat: 'એગ્રી સખીને પૂછો',
    chatSub: 'કૃષિ નિષ્ણાત ચૅટ',
    soil: 'માટી આરોગ્ય સખી',
    soilSub: 'pH અને NPK ખાતર ઑપ્ટિમાઇઝેશન',
    mandi: 'બજાર ભાવ',
    mandiSub: 'મંડી ભાવ અને ટ્રેન્ડ',
    diagnoseBtn: 'પાકની સમસ્યાનું નિદાન કરો',
    inputPlaceholder: 'તમારા પાકના લક્ષણો વર્ણવો... ઉદા. "મારા ટામેટાંના પાંદડા પર પીળા ઘેરા અને કાળા ટપકાં છે"',
    cropLabel: 'પાક પસંદ કરો',
    symptomsLabel: 'લક્ષણો વર્ણવો',
    resultsTitle: 'રોગ નિદાન પરિણામ',
    confidenceScore: 'વિશ્વાસ સ્કોર',
    organicSol: 'જૈવિક/બાયો પ્રોટોકૉલ',
    chemicalSol: 'રાસાયણિક નિયંત્રણ પ્રોટોકૉલ',
    preventiveSteps: 'નિવારણ પગલાં',
    mandiTitle: 'લાઇવ મંડી ભાવ ટ્રૅકર',
    mandiTrend: 'ભાવ ટ્રેન્ડ',
    mandiDistance: 'અંતર',
    soilTitle: 'માટી વિશ્લેષણ અને ખાતર સલાહ',
    optimalPh: 'ઉત્તમ pH મૂલ્ય',
    optimalNpk: 'ઉત્તમ NPK ગુણોત્તર',
    soilSymptoms: 'પોષણ ઉણપ લક્ષણો',
    remedies: 'માટી અને પોષણ સુધારો',
    apiPlaceholder: 'તમારી Gemini API ચાવી અહીં પેસ્ટ કરો...'
  },
  bn: {
    title: 'কৃষি সখী AI',
    subtitle: 'স্মার্ট কৃষি সহায়ক এজেন্ট',
    doctor: 'সখী ডাক্তার',
    doctorSub: 'ফসলের রোগ তাৎক্ষণিকভাবে নির্ণয় করুন',
    weather: 'আবহাওয়া রক্ষক',
    weatherSub: 'জলবায়ু তথ্য ও ঝুঁকি সতর্কতা',
    treatments: 'চিকিৎসা অনুসন্ধান',
    treatmentsSub: 'জৈব বনাম রাসায়নিক সমাধান',
    calendar: 'কৃষি ক্যালেন্ডার',
    calendarSub: 'মৌসুমী প্রতিরোধ পরিকল্পনা',
    chat: 'কৃষি সখীকে জিজ্ঞেস করুন',
    chatSub: 'স্বাভাবিক ভাষা কৃষি বিশেষজ্ঞ',
    soil: 'মাটি স্বাস্থ্য সখী',
    soilSub: 'pH ও NPK সার অপ্টিমাইজেশন',
    mandi: 'বাজার মূল্য',
    mandiSub: 'মান্ডি মূল্য ও প্রবণতা',
    diagnoseBtn: 'ফসলের সমস্যা নির্ণয় করুন',
    inputPlaceholder: 'আপনার ফসলের লক্ষণ বর্ণনা করুন... যেমন "আমার টমেটো পাতায় হলুদ বলয় এবং কালো দাগ রয়েছে"',
    cropLabel: 'ফসল বেছে নিন',
    symptomsLabel: 'লক্ষণ বর্ণনা করুন',
    resultsTitle: 'রোগ নির্ণয় ফলাফল',
    confidenceScore: 'আস্থা স্কোর',
    organicSol: 'জৈব/বায়ো প্রোটোকল',
    chemicalSol: 'রাসায়নিক নিয়ন্ত্রণ প্রোটোকল',
    preventiveSteps: 'প্রতিরোধমূলক ব্যবস্থা',
    mandiTitle: 'লাইভ মান্ডি মূল্য ট্র্যাকার',
    mandiTrend: 'মূল্য প্রবণতা',
    mandiDistance: 'দূরত্ব',
    soilTitle: 'মাটি বিশ্লেষণ ও সার পরামর্শদাতা',
    optimalPh: 'আদর্শ pH মান',
    optimalNpk: 'আদর্শ NPK অনুপাত',
    soilSymptoms: 'পুষ্টির অভাবের লক্ষণ',
    remedies: 'মাটি ও পুষ্টি সংশোধন সমাধান',
    apiPlaceholder: 'আপনার Gemini API কী এখানে পেস্ট করুন...'
  }
};
