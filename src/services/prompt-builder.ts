import { OUTFITS, SCENES, MAGIC_EFFECTS, getRandom, Outfit } from './prompt-library';

interface UserAttributes {
  gender: string; // 'man' | 'woman'
  age: string;    // 'child' | 'adult' | 'elder'
}

export function buildNanoPrompt(attributes: UserAttributes): string {
  const { gender, age } = attributes;

  // 1. Выбираем категорию одежды
  let outfitCategory: Outfit[] = [];

  if (age === 'child') {
    outfitCategory = OUTFITS.child;
  } else if (age === 'elder') {
    outfitCategory = gender === 'man' ? OUTFITS.elder_man : OUTFITS.elder_woman;
  } else {
    // Adult
    outfitCategory = gender === 'man' ? OUTFITS.adult_man : OUTFITS.adult_woman;
  }

  // 2. Случайный выбор (Mix & Match)
  const selectedOutfit = getRandom(outfitCategory);
  const selectedScene = getRandom(SCENES);
  const selectedMagic = getRandom(MAGIC_EFFECTS);

  // 3. Сборка по шаблону (Canonical Template)
  // Используем ваш шаблон из tet_prompt_template_canonical.md
  
  const prompt = `
### [ROLE & CONTEXT]
Act as a world-class art photographer creating a **Magical Realism** portrait for Vietnamese Lunar New Year (Tết). The goal is a cinematic, dreamlike image that feels like a cherished memory or a spiritual moment.

### [IDENTITY PROTOCOL: HEAD-BODY SEPARATION]
Reference: Use the person provided in [Image 1] as the main subject.
FACE (IMMUTABLE): Keep the facial features, skin texture, age, and head structure EXACTLY as in the reference photo. Do not beautify, do not smooth skin to plastic.
BODY (MUTABLE): Completely IGNORE the original clothing. Digitally "dress" the subject in the outfit described below.

### [VISUAL NARRATIVE]
Subject: A ${age} ${gender} dressed in ${selectedOutfit.name}.
OUTFIT DESCRIPTION: ${selectedOutfit.description}
SCENE DESCRIPTION: ${selectedScene.description}

### [ATMOSPHERE & OPTICAL MAGIC]
Lighting: ${selectedMagic}
Effects: Use volume rendering. The air should feel thick with festive spirit (incense haze, floating gold dust particles, soft glow). The boundary between reality and memory is blurred.

### [TECHNICAL AESTHETICS]
Camera: 85mm lens, f/1.2 (dreamy bokeh).
Materiality: High-end texture rendering. Fabric must look woven, skin must have pores.
Style: Cinematic, deeply emotional, warm, nostalgic. NOT a plain documentary photo. NOT a 3D render.
Composition: Vertical framing, subject in the center-third.
  `;

  return prompt.trim();
}
