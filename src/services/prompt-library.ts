// Определение типов для нашей библиотеки
export type Outfit = {
  id: string;
  name: string;
  description: string; // То самое описание для AI
};

export type Scene = {
  id: string;
  description: string;
};

// --- OUTFIT LIBRARY (Перенесено из tet_creative_pipeline_mix_match.md) ---

export const OUTFITS = {
  // 👵 Elderly Woman
  elder_woman: [
    {
      id: 'noble_maroon',
      name: 'Noble Maroon',
      description: "A noble, deep-maroon velvet Áo dài. Heavy, soft fabric. High collar, pearl necklace. Hand-stitched gold phoenix embroidery."
    },
    {
      id: 'emerald_velvet',
      name: 'Emerald Velvet',
      description: "A regal deep emerald green velvet Áo dài. Smooth texture. A string of jade beads. Subtle lotus flower embroidery in silver thread."
    },
    {
      id: 'royal_gold',
      name: 'Royal Gold',
      description: "A dark bronze-gold silk Áo dài with a brocade texture (gấm). It looks antique and precious. Simple jewelry, dignified style."
    }
  ],

  // 👴 Elderly Man
  elder_man: [
    {
      id: 'classic_indigo',
      name: 'Classic Indigo',
      description: "A traditional ceremonial Áo Ngũ Thân in textured dark indigo fabric. Wearing a black neatly wrapped turban (Khăn đóng). Stiff premium fabric."
    },
    {
      id: 'bronze_brocade',
      name: 'Bronze Brocade',
      description: "A rich copper/bronze colored Áo dài with subtle circular patterns woven into the fabric. Traditional turban. Looks like a scholar."
    }
  ],

  // 👩 Adult Woman
  adult_woman: [
    {
      id: 'vibrant_red',
      name: 'Vibrant Red',
      description: "A vibrant red silk Áo dài with long flowing panels. Smooth lustrous silk. Intricate embroidery of yellow Mai flowers winding up the bodice."
    },
    {
      id: 'pastel_pink',
      name: 'Pastel Pink',
      description: "A soft pastel pink Áo dài made of delicate chiffon or thin silk. Very airy and feminine. Embroidered with peach blossoms (Hoa Đào)."
    },
    {
      id: 'turquoise_gold',
      name: 'Turquoise & Gold',
      description: "A striking teal/turquoise Áo dài. Satin finish. Minimalist but bold gold geometric patterns inspired by Vietnamese drums."
    },
    {
      id: 'white_purity',
      name: 'White Purity',
      description: "A pure white Áo dài with textured patterns (jacquard). Worn with red silk trousers for contrast. Elegant and fresh."
    }
  ],

  // 👨 Adult Man
  adult_man: [
    {
      id: 'linen_beige',
      name: 'Linen Beige',
      description: "A modern linen Áo dài (Cách Tân) in a calm beige/oatmeal color. Relaxed but tailored fit. Raw natural texture. Minimalist."
    },
    {
      id: 'deep_teal',
      name: 'Deep Teal',
      description: "A dark teal modern tunic. Clean lines, hidden buttons. Matte cotton-silk blend. Sophisticated look."
    }
  ],

  // 👶 Child (Универсально или можно разделить на boy/girl)
  child: [
    {
      id: 'lucky_red',
      name: 'Lucky Red',
      description: "A bright red satin Áo dài with gold coin patterns (đồng tiền). Traditional headwear (khăn xếp) in matching red. Cute and chubby fit."
    },
    {
      id: 'sunshine_yellow',
      name: 'Sunshine Yellow',
      description: "A vibrant yellow silk outfit with embroidered dragons or carps. Very shiny and festive."
    },
    {
      id: 'floral_blue',
      name: 'Floral Blue',
      description: "A bright blue Áo dài with colorful floral patterns. Looks playful and energetic. Soft cotton fabric for comfort."
    }
  ]
};

// --- SCENE LIBRARY ---

export const SCENES: Scene[] = [
  {
    id: 'ancestral_altar',
    description: "Sitting in a dim traditional room. Background shows a blurred ancestral altar glowing with candlelight and incense smoke. A vase of Peach Blossoms."
  },
  {
    id: 'tea_table',
    description: "Sitting at a carved wooden table with a ceramic tea set and a plate of candied fruits (Mứt Tết). Warm cozy interior."
  },
  {
    id: 'ochna_garden',
    description: "Standing in a dreamlike garden filled with an explosion of yellow Ochna flowers (Hoa Mai). A surreal tunnel of yellow bokeh."
  },
  {
    id: 'lantern_street',
    description: "Standing on a balcony in the Old Quarter. Below is a river of blurred red lanterns. Textured old yellow walls."
  },
  {
    id: 'temple_gate',
    description: "Standing in front of an ancient temple gate with weathered stone and red flags fluttering. Spiritual atmosphere."
  }
];

// --- MAGIC & ATMOSPHERE ---

export const MAGIC_EFFECTS = [
  "Golden light rays piercing through incense haze or dust. Floating gold particles. Spiritual and timeless.",
  "Magical backlighting (contre-jour). The sun creates a halo effect around the hair. Soft, airy flares.",
  "Deep cinematic dusk. The warm glow of a nearby lantern illuminates the face. The background dissolves into a magical dark bokeh.",
  "High-key, bright and happy lighting. Sunlight glitters on the fabric. The air feels crisp and filled with spring energy."
];

// Функция-помощник: Получить случайный элемент
export function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

