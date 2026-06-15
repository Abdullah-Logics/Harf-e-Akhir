export interface ScriptTemplate {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  urduCategory: string;
  icon: string;
  description: string;
  content: string;
}

export const scriptTemplates: ScriptTemplate[] = [
  {
    id: "feature-film",
    title: "Feature Film",
    urduTitle: "فیچر فلم",
    category: "Film",
    urduCategory: "فلم",
    icon: "🎬",
    description: "Complete feature film screenplay template",
    content: `عنوان: [فلم کا نام]
مصنف: [مصنف کا نام]
تاریخ: [تاریخ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پہلا عمل - آغاز

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۱ - اندرونی / گھر - دن

[مقام کی تفصیل: ایک سادہ گھر کا کمرہ۔ دیواروں پر پرانی تصویریں لٹکی ہیں۔ صبح کی روشنی کھڑکی سے آ رہی ہے۔]

احمد (۳۵ سال، متوسط طبقے کا آدمی، تھکا ہوا چہرہ) میز پر بیٹھا ہے۔

احمد
(آہستہ سے)
یہ زندگی کیا ہے؟ صرف ایک خواب...

[احمد اٹھتا ہے اور کھڑکی کے پاس جاتا ہے]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۲ - بیرونی / بازار - دوپہر

[ہجوم بھرا بازار۔ آوازیں، شور، رنگ - سب کچھ ایک ساتھ۔]

[احمد بازار میں چل رہا ہے جب...]

`,
  },
  {
    id: "tv-drama",
    title: "TV Drama Episode",
    urduTitle: "ٹی وی ڈرامہ قسط",
    category: "Drama",
    urduCategory: "ڈرامہ",
    icon: "📺",
    description: "Pakistani TV drama episode format",
    content: `ڈرامہ: [ڈرامے کا نام]
قسط: [نمبر]
عنوان: [قسط کا عنوان]
مصنف: [مصنف کا نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پہلا حصہ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۱ - اندرونی / حویلی - رات

[ایک بڑی حویلی۔ دیواریں اونچی، چراغ کی روشنی میں سائے لہراتے ہیں۔]

زینب (۲۵ سال، خوبصورت، پریشان آنکھیں) صحن میں کھڑی ہے۔

زینب
(رو کر)
امی جان... میں کیا کروں؟

امی جان (۵۵ سال، سخت چہرہ) اندر سے آتی ہیں۔

امی جان
(تیز آواز میں)
جو میں کہوں وہ کرو! سمجھی؟

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

کٹ ٹو:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۲ - اندرونی / دفتر - دن

`,
  },
  {
    id: "short-film",
    title: "Short Film",
    urduTitle: "مختصر فلم",
    category: "Film",
    urduCategory: "فلم",
    icon: "🎥",
    description: "Short film screenplay (5-15 minutes)",
    content: `عنوان: [مختصر فلم کا نام]
مدت: [تقریباً ۱۰ منٹ]
صنف: [ڈرامہ / کامیڈی / تھرلر]
مصنف: [مصنف کا نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۱ - [مقام] - [وقت]

[مختصر تعارف]

[مرکزی کردار کا داخلہ]

کردار
(جذبات)
مکالمہ یہاں لکھیں...

[عمل کی تفصیل]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

اختتام:

[فلم کا آخری منظر - جذباتی یا فکر انگیز]

فیڈ آؤٹ

`,
  },
  {
    id: "web-series",
    title: "Web Series Episode",
    urduTitle: "ویب سیریز قسط",
    category: "Digital",
    urduCategory: "ڈیجیٹل",
    icon: "🌐",
    description: "OTT/Streaming web series episode",
    content: `سیریز: [سیریز کا نام]
سیزن: [نمبر] | قسط: [نمبر]
عنوان: [قسط کا عنوان]
مدت: [۲۵-۳۰ منٹ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پہلے سے: [گزشتہ قسط کا خلاصہ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

کولڈ اوپن

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۱ - اندرونی / [مقام] - [وقت]

[منظر کی تفصیل]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ٹائٹل کارڈ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`,
  },
  {
    id: "telefilm",
    title: "Telefilm",
    urduTitle: "ٹیلی فلم",
    category: "Drama",
    urduCategory: "ڈرامہ",
    icon: "🎭",
    description: "Pakistani telefilm format (90 minutes)",
    content: `ٹیلی فلم: [نام]
مدت: [تقریباً ۹۰ منٹ]
چینل: [چینل کا نام]
مصنف: [مصنف کا نام]
ہدایتکار: [ہدایتکار کا نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

کردار:
• [کردار ۱] - [اداکار کا نام] - [تفصیل]
• [کردار ۲] - [اداکار کا نام] - [تفصیل]
• [کردار ۳] - [اداکار کا نام] - [تفصیل]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پہلا حصہ

منظر ۱ - اندرونی / [مقام] - [وقت]

[منظر کا آغاز]

`,
  },
  {
    id: "documentary",
    title: "Documentary",
    urduTitle: "دستاویزی فلم",
    category: "Documentary",
    urduCategory: "دستاویزی",
    icon: "📰",
    description: "Documentary script format",
    content: `دستاویزی فلم: [عنوان]
موضوع: [موضوع]
مدت: [تقریباً ۴۵ منٹ]
ہدایتکار: [نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

تعارف (وائس اوور)

راوی (وی او)
[تاریخی یا حقیقی واقعے کا تعارف]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

منظر ۱ - بیرونی / [مقام] - دن

[فلم بندی کی تفصیل]

انٹرویو - [شخص کا نام]

[شخص کا نام]
(انٹرویو میں)
[گفتگو]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`,
  },
  {
    id: "radio-drama",
    title: "Radio Drama",
    urduTitle: "ریڈیو ڈرامہ",
    category: "Radio",
    urduCategory: "ریڈیو",
    icon: "📻",
    description: "Radio play/drama script",
    content: `ریڈیو ڈرامہ: [عنوان]
مدت: [۳۰ منٹ]
مصنف: [نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[موسیقی: ابتدائی دھن بجتی ہے]

راوی
السلام علیکم سامعین۔ آج کی کہانی ہے...

[موسیقی: دھیمی ہوتی ہے]

کردار ۱
(آواز کے ساتھ جذبات)
مکالمہ...

[آواز کا اثر: پس منظر کی آواز]

کردار ۲
جواب میں...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[موسیقی: اختتامی دھن]

`,
  },
  {
    id: "stage-play",
    title: "Stage Play",
    urduTitle: "اسٹیج ڈرامہ",
    category: "Theatre",
    urduCategory: "تھیٹر",
    icon: "🎪",
    description: "Theatre/Stage play script",
    content: `اسٹیج ڈرامہ: [عنوان]
ایکٹ: [تعداد]
مصنف: [نام]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

کردار:
• [کردار ۱] - [تفصیل]
• [کردار ۲] - [تفصیل]

مقام: [اسٹیج کی ترتیب]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پہلا ایکٹ

[پردہ اٹھتا ہے]

[اسٹیج کی ترتیب کی تفصیل]

کردار ۱
(داخل ہوتے ہوئے)
مکالمہ یہاں...

[لائٹس کا اثر]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[پردہ گرتا ہے]

`,
  },
];

export interface ScriptReference {
  id: string;
  title: string;
  urduTitle: string;
  writer: string;
  year: string;
  type: string;
  genre: string;
  urduGenre: string;
  description: string;
  excerpt: string;
  tags: string[];
}

export const scriptReferences: ScriptReference[] = [
  {
    id: "khuda-ke-liye",
    title: "Khuda Kay Liye",
    urduTitle: "خدا کے لیے",
    writer: "Shoaib Mansoor",
    year: "2007",
    type: "Feature Film",
    genre: "Drama/Social",
    urduGenre: "ڈرامہ/سماجی",
    description: "A groundbreaking Pakistani film exploring religious extremism and identity",
    excerpt: `منظر - اندرونی / عدالت - دن

جج (بزرگ، سنجیدہ) منصف کی کرسی پر بیٹھے ہیں۔

جج
(گہری آواز میں)
اسلام میں موسیقی حرام ہے یا حلال؟
یہ سوال نہیں... سوال یہ ہے کہ
انسانیت حرام ہے یا حلال؟`,
    tags: ["مذہب", "شناخت", "سماج", "موسیقی"],
  },
  {
    id: "waar",
    title: "Waar",
    urduTitle: "وار",
    writer: "Hassan Rana",
    year: "2013",
    type: "Feature Film",
    genre: "Action/Thriller",
    urduGenre: "ایکشن/تھرلر",
    description: "Pakistan's blockbuster action thriller about counter-terrorism",
    excerpt: `منظر - بیرونی / پہاڑ - رات

[دھماکہ۔ گولیاں چلتی ہیں۔ دھواں چاروں طرف]

میجر سلطان (۴۰ سال، مضبوط جسم، پرعزم نگاہیں) گولی چلاتا ہے۔

میجر سلطان
(چلاتے ہوئے)
پاکستان زندہ باد!

[دشمن گرتا ہے]`,
    tags: ["ایکشن", "دہشت گردی", "فوج", "پاکستان"],
  },
  {
    id: "humsafar",
    title: "Humsafar",
    urduTitle: "ہمسفر",
    writer: "Farhat Ishtiaq",
    year: "2011",
    type: "TV Drama",
    genre: "Romance/Drama",
    urduGenre: "رومانس/ڈرامہ",
    description: "The most iconic Pakistani drama exploring love and betrayal",
    excerpt: `منظر - اندرونی / گھر - رات

خرم (۳۰ سال، خوبصورت، غمزدہ) کھڑکی کے پاس کھڑا ہے۔

خرم
(دھیمی آواز میں)
خاہش... تم نے مجھے غلط سمجھا۔

خاہش (۲۵ سال، آنسو بھری آنکھیں) پلٹتی ہے۔

خاہش
(ٹوٹی ہوئی آواز میں)
کیا میں نے غلط سمجھا؟
یا آپ نے مجھے غلط سمجھایا؟`,
    tags: ["محبت", "دھوکہ", "خاندان", "رومانس"],
  },
  {
    id: "bin-roye",
    title: "Bin Roye",
    urduTitle: "بن روئے",
    writer: "Farhat Ishtiaq",
    year: "2015",
    type: "Film/Drama",
    genre: "Romance",
    urduGenre: "رومانس",
    description: "Story of unrequited love and sacrifice",
    excerpt: `منظر - اندرونی / کمرہ - شام

سامیہ (۲۸ سال، اداس چہرہ) آئینے کے سامنے بیٹھی ہے۔

سامیہ
(خود سے)
کیوں... کیوں میں محبت کرتی ہوں اس سے
جو کبھی میرا نہیں ہو سکتا؟

[آنسو گالوں پر بہتے ہیں]`,
    tags: ["محبت", "قربانی", "رومانس", "جذبات"],
  },
  {
    id: "mann-mayal",
    title: "Mann Mayal",
    urduTitle: "من مایل",
    writer: "Samira Fazal",
    year: "2016",
    type: "TV Drama",
    genre: "Social Drama",
    urduGenre: "سماجی ڈرامہ",
    description: "Drama depicting class differences and social pressures",
    excerpt: `منظر - اندرونی / دفتر - دن

مائرہ (۲۷ سال، خود مختار، مضبوط) فائلیں دیکھ رہی ہے۔

جمال (۳۲ سال، امیر گھرانے کا) داخل ہوتا ہے۔

جمال
تم سمجھتی نہیں...

مائرہ
(آنکھیں اٹھا کر)
میں سمجھتی ہوں۔ بہت اچھی طرح سمجھتی ہوں۔
پیسہ سب کچھ نہیں ہوتا، جمال صاحب۔`,
    tags: ["طبقاتی فرق", "عورت", "آزادی", "سماج"],
  },
  {
    id: "jawani-phir-nahi-ani",
    title: "Jawani Phir Nahi Ani",
    urduTitle: "جوانی پھر نہیں آنی",
    writer: "Vasay Chaudhry",
    year: "2015",
    type: "Feature Film",
    genre: "Comedy",
    urduGenre: "کامیڈی",
    description: "Biggest Pakistani comedy blockbuster",
    excerpt: `منظر - اندرونی / ہوٹل کمرہ - رات

شیر خان (۴۰ سال، موٹا، پریشان) بستر پر بیٹھا ہے۔

شیر خان
(مصیبت میں)
یار... ہم نے کیا کر لیا؟

صدیق (۳۸ سال، پتلا، گھبرایا ہوا)
(چیختے ہوئے)
کیا کر لیا؟ تم نے کیا کر لیا!
میں تو بس ساتھ آیا تھا!`,
    tags: ["کامیڈی", "دوستی", "مزاح", "پاکستان"],
  },
];
