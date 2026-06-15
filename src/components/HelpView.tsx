import { BookOpen, Wand2, Download, Save, Type, Keyboard } from 'lucide-react';

const tips = [
  {
    icon: <Type size={20} className="text-yellow-400" />,
    title: "عناصر کی اقسام",
    urduTitle: "اسکرپٹ عناصر",
    items: [
      { name: "منظر کا عنوان", desc: "ہر نئے مقام یا وقت کے لیے - اندرونی/بیرونی، مقام، وقت" },
      { name: "عمل/تفصیل", desc: "پردے پر کیا نظر آتا ہے - بصری تفصیل" },
      { name: "کردار کا نام", desc: "جو بولنے والا ہے - بڑے حروف میں درمیان میں" },
      { name: "مکالمہ", desc: "کردار کی بات - کردار نام کے نیچے" },
      { name: "قوسین", desc: "بولنے کا انداز - (آہستہ سے) (غصے میں)" },
      { name: "منتقلی", desc: "دو مناظر کے درمیان - کٹ ٹو، فیڈ آؤٹ" },
      { name: "شاٹ", desc: "کیمرے کا زاویہ - کلوز اپ، وائڈ شاٹ" },
      { name: "مصنف کا نوٹ", desc: "ذاتی یادداشت - PDF میں شامل نہیں" },
    ]
  },
  {
    icon: <Wand2 size={20} className="text-blue-400" />,
    title: "رومن سے اردو",
    urduTitle: "ترجمہ خودکار",
    items: [
      { name: "رومن اردو لکھیں", desc: "مثال: 'mujhe aap se pyaar hai'" },
      { name: "خودکار ترجمہ", desc: "ویب سائٹ خود اردو میں تبدیل کرتی ہے" },
      { name: "پیش نظارہ", desc: "لکھتے وقت اردو ترجمہ نیچے نظر آتا ہے" },
      { name: "Enter دبائیں", desc: "ترجمہ شدہ متن اسکرپٹ میں شامل ہو جاتا ہے" },
    ]
  },
  {
    icon: <Save size={20} className="text-green-400" />,
    title: "محفوظ کرنا",
    urduTitle: "سیو اور لوڈ",
    items: [
      { name: "محفوظ کریں", desc: "Ctrl+S - اسکرپٹ براؤزر میں محفوظ ہوتی ہے" },
      { name: "JSON ڈاؤن لوڈ", desc: "فائل کے طور پر محفوظ کریں" },
      { name: "JSON کھولیں", desc: "پہلے سے محفوظ فائل دوبارہ کھولیں اور ترمیم کریں" },
      { name: "PDF برآمد", desc: "پرنٹ کے قابل PDF بنائیں" },
    ]
  },
  {
    icon: <Keyboard size={20} className="text-purple-400" />,
    title: "شارٹ کٹس",
    urduTitle: "کی بورڈ شارٹ کٹ",
    items: [
      { name: "Ctrl + S", desc: "اسکرپٹ محفوظ کریں" },
      { name: "Enter", desc: "رومن موڈ میں - ترجمہ شامل کریں" },
      { name: "Shift + Enter", desc: "نئی لائن (رومن موڈ میں)" },
      { name: "Double Click", desc: "کسی عنصر کو ترمیم کریں" },
      { name: "Escape", desc: "ترمیم منسوخ کریں" },
    ]
  },
];

const scriptStructure = [
  { urdu: "پہلا عمل (۱-۳۰ صفحات)", desc: "کہانی کا آغاز، کردار متعارف، مسئلہ" },
  { urdu: "دوسرا عمل (۳۰-۹۰ صفحات)", desc: "کہانی کا ارتقاء، رکاوٹیں، بحران" },
  { urdu: "تیسرا عمل (۹۰-۱۲۰ صفحات)", desc: "عروج، حل، اختتام" },
];

export default function HelpView() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
        <h2 className="text-white font-bold text-lg font-urdu text-right mb-1">مدد اور رہنمائی</h2>
        <p className="text-zinc-500 text-sm text-right font-urdu">اسکرپٹ رائٹنگ کا مکمل گائیڈ</p>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/5 border border-yellow-400/20 rounded-xl p-6 mb-6 text-right">
          <h3 className="text-yellow-400 font-bold text-xl font-urdu mb-2">حرفِ آخر میں خوش آمدید! 🎬</h3>
          <p className="text-zinc-300 font-urdu leading-loose text-sm">
            یہ اردو زبان کا پہلا مکمل اسکرپٹ رائٹنگ پلیٹ فارم ہے۔ آپ رومن اردو میں لکھ سکتے ہیں 
            اور یہ خودکار طور پر اردو رسم الخط میں تبدیل ہو جائے گا۔
          </p>
        </div>

        {/* Script Structure */}
        <div className="bg-zinc-900 rounded-xl p-5 mb-6 border border-zinc-800">
          <h3 className="text-white font-bold font-urdu text-right mb-4 flex items-center justify-end gap-2">
            <BookOpen size={18} className="text-yellow-400" />
            فلمی اسکرپٹ کی ساخت
          </h3>
          <div className="space-y-3">
            {scriptStructure.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-zinc-800/50 rounded-lg p-3">
                <div className="w-8 h-8 bg-yellow-400/10 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-white font-urdu text-sm font-bold">{item.urdu}</p>
                  <p className="text-zinc-500 font-urdu text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tips.map((section, i) => (
            <div key={i} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-white font-bold font-urdu text-right mb-4 flex items-center justify-end gap-2">
                {section.icon}
                {section.urduTitle}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="text-right">
                    <span className="text-yellow-400 font-urdu text-xs font-bold">{item.name}: </span>
                    <span className="text-zinc-400 font-urdu text-xs">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Writing Tips */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700 mb-6">
          <h3 className="text-white font-bold font-urdu text-right text-lg mb-4">✍️ اسکرپٹ رائٹنگ کے اصول</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { tip: "دکھائیں، بتائیں نہیں", desc: "بصری زبان میں لکھیں" },
              { tip: "مختصر مناظر", desc: "ہر منظر ضروری ہو" },
              { tip: "مضبوط کردار", desc: "ہر کردار منفرد آواز" },
              { tip: "تنازعہ ضروری", desc: "ہر صفحے پر کچھ نہ کچھ" },
              { tip: "مکالمہ فطری", desc: "لوگ جیسے بولتے ہیں" },
              { tip: "صفحہ = ایک منٹ", desc: "۱۲۰ صفحے = ۲ گھنٹے" },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-3 text-right">
                <p className="text-yellow-400 font-urdu text-sm font-bold">{item.tip}</p>
                <p className="text-zinc-500 font-urdu text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Info */}
        <div className="bg-green-400/5 border border-green-400/20 rounded-xl p-5 text-right">
          <h3 className="text-green-400 font-bold font-urdu mb-2 flex items-center justify-end gap-2">
            <Download size={16} />
            PDF برآمد کرنا
          </h3>
          <p className="text-zinc-400 font-urdu text-sm leading-loose">
            اپنی مکمل اسکرپٹ PDF کے طور پر محفوظ کریں۔ PDF میں مصنف کے نوٹ شامل نہیں ہوتے۔ 
            آپ JSON فائل بھی ڈاؤن لوڈ کر سکتے ہیں جسے دوبارہ کھول کر ترمیم کی جا سکتی ہے۔
          </p>
        </div>
      </div>
    </div>
  );
}
