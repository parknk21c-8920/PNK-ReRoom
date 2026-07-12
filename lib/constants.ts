// 공간 유형 · 인테리어 스타일 정의 (클라이언트 UI와 서버 프롬프트가 공유)

export type RoomType = {
  id: string;
  label: string;
  /** Gemini 프롬프트에 들어갈 영문 명칭 */
  prompt: string;
};

export type StyleOption = {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  /** Gemini 프롬프트에 들어갈 스타일 지시문 */
  prompt: string;
};

export const ROOM_TYPES: RoomType[] = [
  { id: "living_room", label: "거실", prompt: "living room" },
  { id: "bedroom", label: "침실", prompt: "bedroom" },
  { id: "kitchen", label: "주방", prompt: "kitchen" },
  { id: "bathroom", label: "욕실", prompt: "bathroom" },
  { id: "study", label: "서재", prompt: "home office / study room" },
  { id: "studio", label: "원룸", prompt: "studio apartment" },
];

export const STYLES: StyleOption[] = [
  {
    id: "modern",
    label: "모던",
    emoji: "🖤",
    desc: "깔끔하고 정돈된 분위기",
    prompt:
      "sleek modern style: clean lines, neutral palette with charcoal and greige, low-profile furniture, matte finishes, statement lighting",
  },
  {
    id: "minimal",
    label: "미니멀",
    emoji: "⬜",
    desc: "단순함과 절제의 미학",
    prompt:
      "minimalist style: pared-down furnishings, warm white walls, hidden storage, soft diffuse light, generous negative space",
  },
  {
    id: "scandinavian",
    label: "북유럽",
    emoji: "🌿",
    desc: "따뜻하고 내추럴한 감성",
    prompt:
      "Scandinavian style: light oak wood, cozy wool and linen textiles, white and sage accents, hygge atmosphere, potted greenery",
  },
  {
    id: "industrial",
    label: "인더스트리얼",
    emoji: "🏗️",
    desc: "콘크리트와 철제의 조화",
    prompt:
      "industrial loft style: exposed concrete texture, black steel frames, leather and reclaimed wood furniture, Edison bulb lighting",
  },
  {
    id: "japandi",
    label: "재팬디",
    emoji: "🍵",
    desc: "동양적 미와 서양식 실용성",
    prompt:
      "Japandi style: low wooden furniture, wabi-sabi ceramics, rice-paper lighting, muted earth tones, calm uncluttered balance",
  },
  {
    id: "mid_century",
    label: "미드센추리",
    emoji: "🪑",
    desc: "레트로한 컬러와 나무 질감",
    prompt:
      "mid-century modern style: walnut furniture with tapered legs, mustard and teal accent colors, geometric patterns, retro lighting",
  },
  {
    id: "hanok",
    label: "한옥",
    emoji: "🏛️",
    desc: "전통적인 선과 나무의 편안함",
    prompt:
      "modern Korean hanok style: warm wooden beams, hanji paper screens, low traditional furniture, natural linen, serene earthy palette",
  },
  {
    id: "hotel_lounge",
    label: "호텔 라운지",
    emoji: "✨",
    desc: "고급스럽고 웅장한 디자인",
    prompt:
      "luxury hotel lounge style: plush velvet seating, brass and marble details, layered ambient lighting, dark sophisticated palette",
  },
];

