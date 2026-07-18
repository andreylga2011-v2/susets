import { useState, useMemo } from "react";
import {
  Search, ShoppingCart, User, Phone, ChevronLeft, ChevronRight,
  Heart, Truck, CreditCard, FileText, CheckCircle, Mail, MapPin, Send,
  Home, PersonStanding, ChevronDown, SlidersHorizontal, Grid3X3, LayoutList, Eye,
  Award, Users, Factory, Globe, Package, Clock, Banknote, Building2,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ── Constants ─────────────────────────────────────────────────────────────────

const PINK = "#D4237A";

const TOP_NAV = ["Компания", "Оплата и доставка", "Условия работы", "Вакансии", "Контакты"];

const PINK_NAV = [
  { label: "Главная", Icon: Home },
  { label: "Женская одежда", Icon: PersonStanding },
  { label: "Мужская одежда", Icon: User },
];

const SLIDE = {
  tag: "Для холодной поры",
  headline: "#ТЁПЛЫЙСТИЛЬ",
  sub: "Новая коллекция утеплённой одежды",
  cta: "Смотреть коллекцию",
  image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1400&h=600&fit=crop&auto=format",
};

// Real products from mado-style.ru — prices hidden (B2B: login required)
const IMG = {
  robe:     "https://images.unsplash.com/photo-1617952385897-5e7c793ea836?w=400&h=520&fit=crop&auto=format",
  tunic1:   "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=520&fit=crop&auto=format",
  tunic2:   "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=520&fit=crop&auto=format",
  blouse1:  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=520&fit=crop&auto=format",
  blouse2:  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=520&fit=crop&auto=format",
  suit1:    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=520&fit=crop&auto=format",
  suit2:    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=520&fit=crop&auto=format",
  suit3:    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&auto=format",
  dress1:   "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=520&fit=crop&auto=format",
  dress2:   "https://images.unsplash.com/photo-1585632362395-7e15f66f0f5b?w=400&h=520&fit=crop&auto=format",
  pants:    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=520&fit=crop&auto=format",
  tshirt:   "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=520&fit=crop&auto=format",
  hero:     "https://images.unsplash.com/photo-1713519379759-29583a545923?w=1400&h=500&fit=crop&auto=format",
  cat_robe: "https://images.unsplash.com/photo-1617952385897-5e7c793ea836?w=600&h=900&fit=crop&auto=format",
  cat_suit: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=900&fit=crop&auto=format",
  cat_dress:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=900&fit=crop&auto=format",
  cat_tunic:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=900&fit=crop&auto=format",
  cat_blouse:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=900&fit=crop&auto=format",
};

const NEW_PRODUCTS = [
  { id: 1, art: "44119", sub: "Футболки, майки", name: "Футболка женская", badge: "Новинка", colors: ["#F5F0E8", "#2C2C2C", "#8FA3B1", "#9CAF88"], image: IMG.tshirt },
  { id: 2, art: "44106", sub: "Блузки, рубашки, джемперы", name: "Блуза женская", badge: "Новинка", colors: ["#F5F0E8", "#E8D5C4", "#2C2C2C"], image: IMG.blouse1 },
  { id: 3, art: "44118", sub: "Футболки, майки", name: "Футболка женская", badge: "Новинка", colors: ["#fce8f2", "#2C2C2C", "#9CAF88"], image: IMG.blouse2 },
  { id: 4, art: "44007", sub: "Блузки, рубашки, джемперы", name: "Блуза без рукава", badge: "Новинка", colors: ["#2C2C2C", "#4A6FA5", "#F5F0E8"], image: IMG.tunic2 },
  { id: 5, art: "7304", sub: "Туники", name: "Туника женская", badge: "Новинка", colors: ["#4A6FA5", "#F5F0E8", "#9CAF88"], image: IMG.tunic1 },
  { id: 6, art: "4841", sub: "Туники", name: "Туника женская", badge: null, colors: ["#fce8f2", "#E8D5C4", "#F5F0E8"], image: IMG.robe },
];

const HIT_PRODUCTS = [
  { id: 7, art: "34200", sub: "Костюмы", name: "Костюм женский", badge: "Хит", colors: ["#F5C518", "#2C2C2C", "#F5F0E8"], image: IMG.suit1 },
  { id: 8, art: "34308", sub: "Костюмы", name: "Костюм женский", badge: "Хит", colors: ["#8E7AB5", "#2C2C2C", "#F5F0E8"], image: IMG.suit2 },
  { id: 9, art: "32306", sub: "Костюмы", name: "Костюм женский", badge: "Хит", colors: ["#8FA3B1", "#2C2C2C"], image: IMG.suit3 },
  { id: 10, art: "4845", sub: "Платья, сарафаны", name: "Платье женское", badge: "Хит", colors: ["#4A7A5A", "#2C2C2C", "#F5F0E8"], image: IMG.dress1 },
  { id: 11, art: "4840", sub: "Платья, сарафаны", name: "Платье женское", badge: null, colors: ["#C19A6B", "#F5F0E8", "#2C2C2C"], image: IMG.dress2 },
  { id: 12, art: "17300", sub: "Брюки, бриджи, шорты", name: "Брюки женские", badge: "Хит", colors: ["#C19A6B", "#2C2C2C"], image: IMG.pants },
];

const CATEGORY_TILES = [
  { label: "Халаты", sub: "Халаты", image: IMG.cat_robe, count: "12 моделей" },
  { label: "Туники", sub: "Туники", image: IMG.cat_tunic, count: "8 моделей" },
  { label: "Костюмы", sub: "Костюмы", image: IMG.cat_suit, count: "14 моделей" },
  { label: "Платья", sub: "Платья, сарафаны", image: IMG.cat_dress, count: "10 моделей" },
  { label: "Блузы", sub: "Блузки, рубашки, джемперы", image: IMG.cat_blouse, count: "9 моделей" },
];

const MARQUEE_ITEMS = [
  "50 000+ изделий в месяц", "Более 1 000 партнёров", "С 1997 года",
  "Доставка по всей России", "Минимальный заказ от 100 000 ₽",
  "Гарантия качества", "Гипоаллергенные материалы", "Размеры до 72",
];

// ── Catalog data ──────────────────────────────────────────────────────────────

const CATEGORY_GROUPS = [
  {
    group: "Женская одежда",
    items: [
      "Халаты",
      "Туники",
      "Нижнее бельё",
      "Костюмы",
      "Блузки, рубашки, джемпера",
      "Футболки, майки",
      "Брюки, бриджи, шорты",
      "Платья, сарафаны",
      "Жилеты",
      "Кардиганы",
    ],
  },
  {
    group: "Мужская одежда",
    items: [
      "Джинсы мужские",
      "Футболки мужские",
      "Рубашки мужские",
      "Куртки, жакеты",
      "Брюки мужские",
      "Спортивные костюмы",
    ],
  },
];

const CATALOG_PRODUCTS = [
  { id: 101, group: "Женская одежда", sub: "Халаты", name: "Халат банный махровый", price: 1890, oldPrice: 2400, badge: "−21%", colors: ["#E8D5C4", "#2C2C2C"], image: "https://images.unsplash.com/photo-1617952385897-5e7c793ea836?w=400&h=520&fit=crop&auto=format" },
  { id: 102, group: "Женская одежда", sub: "Туники", name: "Туника летняя свободная", price: 990, oldPrice: null, badge: "Новинка", colors: ["#F5F0E8", "#8FA3B1"], image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=520&fit=crop&auto=format" },
  { id: 103, group: "Женская одежда", sub: "Костюмы", name: "Костюм спортивный женский", price: 2490, oldPrice: 2920, badge: "−15%", colors: ["#F5C518", "#2C2C2C", "#9CAF88"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&auto=format" },
  { id: 104, group: "Женская одежда", sub: "Блузки, рубашки, джемпера", name: "Блузка шифоновая", price: 1350, oldPrice: null, badge: null, colors: ["#F5F0E8", "#C0392B"], image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=520&fit=crop&auto=format" },
  { id: 105, group: "Женская одежда", sub: "Футболки, майки", name: "Футболка базовая женская", price: 790, oldPrice: null, badge: "Хит", colors: ["#F5F0E8", "#2C2C2C", "#8FA3B1", "#9CAF88"], image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=520&fit=crop&auto=format" },
  { id: 106, group: "Женская одежда", sub: "Платья, сарафаны", name: "Платье нарядное миди", price: 4100, oldPrice: 5200, badge: "−21%", colors: ["#C0392B", "#2C2C2C"], image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=520&fit=crop&auto=format" },
  { id: 107, group: "Женская одежда", sub: "Брюки, бриджи, шорты", name: "Брюки клёш женские", price: 2100, oldPrice: null, badge: "Новинка", colors: ["#2C2C2C", "#C19A6B"], image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=520&fit=crop&auto=format" },
  { id: 108, group: "Женская одежда", sub: "Кардиганы", name: "Кардиган удлинённый", price: 2890, oldPrice: null, badge: null, colors: ["#F5F0E8", "#C19A6B"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=520&fit=crop&auto=format" },
  { id: 109, group: "Женская одежда", sub: "Костюмы", name: "Костюм тройка женский", price: 5490, oldPrice: 6900, badge: "Хит", colors: ["#C19A6B", "#2C2C2C"], image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=520&fit=crop&auto=format" },
  { id: 110, group: "Женская одежда", sub: "Жилеты", name: "Жилет стёганый тёплый", price: 1750, oldPrice: null, badge: "Новинка", colors: ["#8FA3B1", "#2C2C2C"], image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&h=520&fit=crop&auto=format" },
  { id: 111, group: "Женская одежда", sub: "Нижнее бельё", name: "Комплект нижнего белья", price: 890, oldPrice: null, badge: null, colors: ["#F5F0E8", "#D4237A", "#2C2C2C"], image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=520&fit=crop&auto=format" },
  { id: 112, group: "Женская одежда", sub: "Туники", name: "Туника с принтом", price: 1190, oldPrice: 1490, badge: "−20%", colors: ["#E8793A", "#F5F0E8"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&auto=format" },
  { id: 201, group: "Мужская одежда", sub: "Футболки мужские", name: "Футболка базовая мужская", price: 890, oldPrice: null, badge: "Хит", colors: ["#F5F0E8", "#2C2C2C", "#8FA3B1"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=520&fit=crop&auto=format" },
  { id: 202, group: "Мужская одежда", sub: "Брюки мужские", name: "Брюки карго мужские", price: 3200, oldPrice: null, badge: "Новинка", colors: ["#2C2C2C", "#C19A6B", "#8FA3B1"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=520&fit=crop&auto=format" },
  { id: 203, group: "Мужская одежда", sub: "Куртки, жакеты", name: "Жакет стёганый мужской", price: 3750, oldPrice: null, badge: "Хит", colors: ["#C87941", "#2C2C2C"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=520&fit=crop&auto=format" },
  { id: 204, group: "Мужская одежда", sub: "Рубашки мужские", name: "Рубашка оксфорд мужская", price: 1890, oldPrice: null, badge: null, colors: ["#F5F0E8", "#8FA3B1", "#2C2C2C"], image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=520&fit=crop&auto=format" },
  { id: 205, group: "Мужская одежда", sub: "Спортивные костюмы", name: "Костюм спортивный мужской", price: 2990, oldPrice: 3500, badge: "−14%", colors: ["#2C2C2C", "#8FA3B1"], image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=520&fit=crop&auto=format" },
  { id: 206, group: "Мужская одежда", sub: "Джинсы мужские", name: "Джинсы прямые классика", price: 2400, oldPrice: null, badge: "Новинка", colors: ["#4A6FA5", "#2C2C2C"], image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=520&fit=crop&auto=format" },
];

const SORT_OPTIONS = [
  "По дате обновления товара",
  "По цене (возрастание)",
  "По цене (убывание)",
  "По популярности",
];

const HOW_STEPS = [
  {
    num: 1,
    icon: FileText,
    title: "Оставьте заявку",
    desc: "Выберите товары и оформите заявку на сайте или позвоните нам",
  },
  {
    num: 2,
    icon: CreditCard,
    title: "Оплатите заказ",
    desc: "Оплатите заказ удобным способом: картой, наличными или по счёту",
  },
  {
    num: 3,
    icon: Truck,
    title: "Получите товар",
    desc: "Мы отправим заказ транспортной компанией или курьером",
  },
  {
    num: 4,
    icon: CheckCircle,
    title: "Радуйтесь покупке",
    desc: "Получите качественную одежду по выгодным оптовым ценам",
  },
];

// ── Company Page ─────────────────────────────────────────────────────────────

function CompanyPage() {
  const advantages = [
    { icon: Package, title: "Широкий ассортимент", desc: "Регулярно обновляемая коллекция женской и мужской одежды — более 50 000 изделий в месяц" },
    { icon: CheckCircle, title: "Гарантия качества", desc: "Вся продукция сертифицирована и проходит контроль качества перед отправкой" },
    { icon: Truck, title: "Быстрая отправка", desc: "Отгрузка в течение 2–3 рабочих дней. Доставка по всей России и Казахстану" },
    { icon: Award, title: "Индивидуальные скидки", desc: "Персональные условия для постоянных и крупных покупателей" },
    { icon: Globe, title: "Экологичные материалы", desc: "Гипоаллергенные ткани: кулирка, вискоза, штапель, велсофт, капитоний" },
    { icon: Users, title: "Более 1 000 партнёров", desc: "Компании по всей России и СНГ, многие из которых работают с нами годами" },
  ];

  const stats = [
    { value: "1997", label: "год основания" },
    { value: "27+", label: "лет на рынке" },
    { value: "50 000+", label: "изделий в месяц" },
    { value: "1 000+", label: "компаний-партнёров" },
  ];

  const materials = ["Кулирка", "Вискоза", "Штапель", "Футер", "Велсофт", "Капитоний"];
  const decorations = ["Шелкография", "Стразы", "Вышивка"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 320, background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a17 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,35,122,0.15) 40px, rgba(212,35,122,0.15) 80px)" }} />
        <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase mb-3">С 1997 года</p>
          <h1 className="text-white text-4xl lg:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            О компании
          </h1>
          <p className="text-white/70 text-[15px] max-w-xl leading-relaxed">
            Российский бренд домашней и спортивной одежды. Производство и оптовая продажа — более 27 лет на рынке трикотажа.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((s) => (
              <div key={s.value} className="py-8 px-6 text-center">
                <p className="text-3xl lg:text-4xl font-light mb-1" style={{ color: PINK, fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</p>
                <p className="text-[12px] text-muted-foreground uppercase tracking-[0.1em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About text + production */}
      <section className="py-16 max-w-[1320px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Кто мы
            </h2>
            <div className="space-y-4 text-[14px] text-muted-foreground leading-relaxed">
              <p>
                МаДо — российский бренд домашней и досуговой одежды, основанный в <strong className="text-foreground">1997 году</strong> в Омске. За более чем 20 лет мы стали одним из ведущих производителей и оптовых поставщиков трикотажных изделий в России.
              </p>
              <p>
                Мы производим женскую и мужскую одежду широкого ассортимента — от халатов и туник до спортивных костюмов и нижнего белья. Размерный ряд — до <strong className="text-foreground">72-го размера</strong>.
              </p>
              <p>
                Наша продукция продаётся в десятках регионов России и за рубежом. С нами сотрудничали более <strong className="text-foreground">1 000 компаний</strong>, многие из которых остаются постоянными партнёрами.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Производство
            </h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#fce8f2" }}>
                  <Factory size={16} style={{ color: PINK }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground mb-1">Мощность</p>
                  <p className="text-[13px] text-muted-foreground">Более 50 000 готовых изделий в месяц</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#fce8f2" }}>
                  <Package size={16} style={{ color: PINK }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground mb-1">Материалы</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {materials.map((m) => (
                      <span key={m} className="text-[11px] border border-border px-2 py-0.5 rounded-sm text-muted-foreground">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#fce8f2" }}>
                  <Award size={16} style={{ color: PINK }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground mb-1">Декорирование</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {decorations.map((d) => (
                      <span key={d} className="text-[11px] border border-border px-2 py-0.5 rounded-sm text-muted-foreground">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16" style={{ backgroundColor: "#F5F3EE" }}>
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8">
          <h2 className="text-3xl font-light text-foreground mb-10 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Почему выбирают МаДо
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="bg-white p-6 rounded-sm border border-border hover:border-[#f0c4da] hover:shadow-md transition-all duration-200 group">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: "#fce8f2" }}>
                    <Icon size={20} style={{ color: PINK }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contacts block */}
      <section className="py-14 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8">
          <h2 className="text-3xl font-light text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Реквизиты и контакты
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Phone, label: "Телефоны", lines: ["+7 (3812) 73-07-28", "+7 (908) 103-51-23"] },
              { icon: Mail, label: "Email", lines: ["manager@mado-style.ru"] },
              { icon: MapPin, label: "Адрес склада", lines: ["г. Омск, ул. Лукашевича, 21а"] },
              { icon: Clock, label: "Режим работы", lines: ["Пн–Пт: 8:00–16:30"] },
              { icon: Building2, label: "Юридический адрес", lines: ["г. Омск, ул. Красный Путь, д. 143"] },
              { icon: Globe, label: "Сайт", lines: ["mado-style.ru"] },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#fce8f2" }}>
                    <Icon size={15} style={{ color: PINK }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-foreground mb-0.5">{item.label}</p>
                    {item.lines.map((l) => <p key={l} className="text-[13px] text-muted-foreground">{l}</p>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Payment Page ──────────────────────────────────────────────────────────────

function PaymentPage() {
  const carriers = [
    { name: "СДЭК", color: "#00B140" },
    { name: "Деловые Линии", color: "#E63312" },
    { name: "ПЭК", color: "#F7931D" },
    { name: "Байкал СР", color: "#003087" },
    { name: "GTD", color: "#2C2C2C" },
    { name: "DPD", color: "#E31837" },
    { name: "NRG", color: "#FF6600" },
    { name: "FTE", color: "#005BAA" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: 240, background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a17 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,35,122,0.15) 40px, rgba(212,35,122,0.15) 80px)" }} />
        <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase mb-3">Оптовые условия</p>
          <h1 className="text-white text-4xl lg:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Оплата и доставка
          </h1>
        </div>
      </section>

      <section className="py-16 max-w-[1320px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce8f2" }}>
                <Banknote size={16} style={{ color: PINK }} />
              </span>
              Оплата
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Наличные",
                  desc: "Только при самовывозе со склада в Омске. Оплата в момент получения заказа.",
                  icon: "💵",
                },
                {
                  title: "Безналичный расчёт",
                  desc: "Банковский перевод или оплата картой. Возможна отсрочка платежа — срок прописывается в договоре.",
                  icon: "💳",
                },
              ].map((item) => (
                <div key={item.title} className="border border-border rounded-sm p-5 hover:border-[#f0c4da] hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-foreground mb-1">{item.title}</p>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-sm text-[12px] text-muted-foreground" style={{ backgroundColor: "#F5F3EE" }}>
                Все расчёты ведутся в российских рублях.
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce8f2" }}>
                <Truck size={16} style={{ color: PINK }} />
              </span>
              Доставка
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Самовывоз",
                  desc: "г. Омск, ул. Лукашевича, 21а. Бесплатно. Пн–Пт: 8:00–16:30.",
                  icon: Building2,
                },
                {
                  title: "Доставка по России и Казахстану",
                  desc: "Отправка до терминала транспортной компании — бесплатно. Стоимость доставки до вашего города — по тарифам ТК.",
                  icon: Globe,
                },
                {
                  title: "Срок обработки",
                  desc: "2–3 рабочих дня после подтверждения заказа.",
                  icon: Clock,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border border-border rounded-sm p-5 hover:border-[#f0c4da] hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#fce8f2" }}>
                        <Icon size={15} style={{ color: PINK }} />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carriers */}
        <div className="mt-14">
          <h2 className="text-2xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Транспортные компании
          </h2>
          <p className="text-[13px] text-muted-foreground mb-6">
            Вы можете рассчитать стоимость доставки на сайте любой из транспортных компаний, с которыми мы работаем:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {carriers.map((c) => (
              <div
                key={c.name}
                className="border border-border rounded-sm py-3 px-2 flex items-center justify-center text-center text-[12px] font-semibold hover:border-[#f0c4da] hover:shadow-sm transition-all duration-200 cursor-pointer"
                style={{ color: c.color }}
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ backgroundColor: "#fce8f2" }}>
          <div>
            <p className="text-[15px] font-semibold text-foreground mb-1">Остались вопросы?</p>
            <p className="text-[13px] text-muted-foreground">Менеджеры работают в будние дни с 8:00 до 16:30</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href="tel:+73812730728" className="flex items-center gap-2 text-[13px] font-medium" style={{ color: PINK }}>
              <Phone size={14} /> +7 (3812) 73-07-28
            </a>
            <a href="mailto:manager@mado-style.ru" className="flex items-center gap-2 text-[13px] font-medium" style={{ color: PINK }}>
              <Mail size={14} /> manager@mado-style.ru
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Auth Page ─────────────────────────────────────────────────────────────────

function AuthPage({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"login" | "register" | "forgot">("login");
  const [remember, setRemember] = useState(false);
  const [loginSent, setLoginSent] = useState(false);
  const [regSent, setRegSent] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [reg, setReg] = useState({
    fio: "", phone: "", email: "", inn: "", company: "",
    country: "Россия", region: "", city: "", address: "",
    password: "", password2: "",
  });
  const [forgot, setForgot] = useState({ email: "" });

  const inputCls = "w-full border border-border px-3 py-2.5 text-[13px] outline-none rounded-sm bg-background transition-colors";
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = PINK);
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.target.style.borderColor = "");

  const COUNTRIES = ["Россия", "Казахстан", "Беларусь", "Кыргызстан", "Армения", "Азербайджан", "Узбекистан", "Таджикистан", "Украина", "Другая"];

  return (
    <div className="min-h-[70vh] flex items-start justify-center py-14 px-4">
      <div className="w-full max-w-[520px]">

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-3 text-[13px] font-medium transition-colors border-b-2 -mb-px"
              style={{
                borderColor: tab === t ? PINK : "transparent",
                color: tab === t ? PINK : undefined,
              }}
            >
              {t === "login" ? "Вход" : "Регистрация"}
            </button>
          ))}
        </div>

        {/* ── LOGIN ── */}
        {tab === "login" && (
          <div>
            <h2 className="text-2xl font-light text-foreground mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Вход в личный кабинет
            </h2>
            <p className="text-[13px] text-muted-foreground mb-7">Введите данные для входа в аккаунт</p>

            {loginSent ? (
              <div className="text-center py-10">
                <CheckCircle size={44} className="mx-auto mb-4" style={{ color: PINK }} />
                <p className="text-[16px] font-medium text-foreground mb-1">Добро пожаловать!</p>
                <p className="text-[13px] text-muted-foreground mb-6">Вы успешно вошли в систему.</p>
                <button onClick={onClose} className="text-white px-8 py-2.5 text-[13px] font-medium rounded-sm hover:opacity-90" style={{ backgroundColor: PINK }}>
                  На главную
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-5">
                  <div>
                    <label className="text-[12px] font-medium text-foreground block mb-1.5">Email <span style={{ color: PINK }}>*</span></label>
                    <input value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })}
                      type="email" placeholder="example@mail.ru" className={inputCls} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[12px] font-medium text-foreground">Пароль <span style={{ color: PINK }}>*</span></label>
                      <button onClick={() => setTab("forgot")} className="text-[11px] hover:underline" style={{ color: PINK }}>
                        Забыли пароль?
                      </button>
                    </div>
                    <input value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })}
                      type="password" placeholder="••••••••" className={inputCls} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                <label className="flex items-center gap-2 mb-6 cursor-pointer select-none">
                  <div
                    onClick={() => setRemember(!remember)}
                    className="w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shrink-0"
                    style={{ backgroundColor: remember ? PINK : "transparent", borderColor: remember ? PINK : "#ccc" }}
                  >
                    {remember && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className="text-[12px] text-muted-foreground">Запомнить меня</span>
                </label>

                <button
                  onClick={() => setLoginSent(true)}
                  className="w-full text-white py-3 text-[13px] font-medium rounded-sm hover:opacity-90 transition-opacity mb-4"
                  style={{ backgroundColor: PINK }}
                >
                  Войти
                </button>

                <p className="text-center text-[12px] text-muted-foreground">
                  Нет аккаунта?{" "}
                  <button onClick={() => setTab("register")} className="font-medium hover:underline" style={{ color: PINK }}>
                    Зарегистрироваться
                  </button>
                </p>
              </>
            )}
          </div>
        )}

        {/* ── REGISTER ── */}
        {tab === "register" && (
          <div>
            <h2 className="text-2xl font-light text-foreground mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Регистрация оптового клиента
            </h2>
            <p className="text-[13px] text-muted-foreground mb-7">После проверки данных менеджер активирует аккаунт и откроет доступ к ценам</p>

            {regSent ? (
              <div className="text-center py-10">
                <CheckCircle size={44} className="mx-auto mb-4" style={{ color: PINK }} />
                <p className="text-[16px] font-medium text-foreground mb-1">Заявка отправлена!</p>
                <p className="text-[13px] text-muted-foreground mb-2">
                  Менеджер проверит данные и активирует ваш аккаунт в рабочее время.
                </p>
                <p className="text-[12px] text-muted-foreground mb-6">Пн–Пт: 8:00–16:30</p>
                <button onClick={onClose} className="text-white px-8 py-2.5 text-[13px] font-medium rounded-sm hover:opacity-90" style={{ backgroundColor: PINK }}>
                  На главную
                </button>
              </div>
            ) : (
              <>
                {/* Basic info */}
                <div className="mb-5">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PINK }}>
                    Основные данные
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[12px] font-medium text-foreground block mb-1.5">ФИО</label>
                      <input value={reg.fio} onChange={(e) => setReg({ ...reg, fio: e.target.value })}
                        placeholder="Иванов Иван Иванович" className={inputCls} onFocus={focus} onBlur={blur} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">Телефон</label>
                        <input value={reg.phone} onChange={(e) => setReg({ ...reg, phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">Email</label>
                        <input value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })}
                          type="email" placeholder="example@mail.ru" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">ИНН</label>
                        <input value={reg.inn} onChange={(e) => setReg({ ...reg, inn: e.target.value })}
                          placeholder="000000000000" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">Наименование</label>
                        <input value={reg.company} onChange={(e) => setReg({ ...reg, company: e.target.value })}
                          placeholder="ООО «Компания»" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal address */}
                <div className="mb-5">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PINK }}>
                    Юридический адрес
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[12px] font-medium text-foreground block mb-1.5">Страна</label>
                      <select value={reg.country} onChange={(e) => setReg({ ...reg, country: e.target.value })}
                        className={inputCls + " appearance-none cursor-pointer"} onFocus={focus} onBlur={blur}>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">Регион / Область</label>
                        <input value={reg.region} onChange={(e) => setReg({ ...reg, region: e.target.value })}
                          placeholder="Омская область" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <label className="text-[12px] font-medium text-foreground block mb-1.5">Город / Село</label>
                        <input value={reg.city} onChange={(e) => setReg({ ...reg, city: e.target.value })}
                          placeholder="Омск" className={inputCls} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-foreground block mb-1.5">Юридический адрес</label>
                      <input value={reg.address} onChange={(e) => setReg({ ...reg, address: e.target.value })}
                        placeholder="ул. Примерная, д. 1, оф. 101" className={inputCls} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: PINK }}>
                    Пароль
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12px] font-medium text-foreground block mb-1.5">Пароль</label>
                      <input value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })}
                        type="password" placeholder="••••••••" className={inputCls} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-foreground block mb-1.5">Подтвердить пароль</label>
                      <input value={reg.password2} onChange={(e) => setReg({ ...reg, password2: e.target.value })}
                        type="password" placeholder="••••••••" className={inputCls} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setRegSent(true)}
                  className="w-full text-white py-3 text-[13px] font-medium rounded-sm hover:opacity-90 transition-opacity mb-4"
                  style={{ backgroundColor: PINK }}
                >
                  Отправить заявку на регистрацию
                </button>

                <div className="p-3 rounded-sm text-[11px] text-muted-foreground leading-relaxed" style={{ backgroundColor: "#F5F3EE" }}>
                  После проверки данных менеджер активирует аккаунт. Заказы принимаются по почте:{" "}
                  <a href="mailto:manager@mado-style.ru" className="font-medium hover:underline" style={{ color: PINK }}>manager@mado-style.ru</a>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── FORGOT PASSWORD ── */}
        {tab === "forgot" && (
          <div>
            <h2 className="text-2xl font-light text-foreground mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Восстановление пароля
            </h2>
            <p className="text-[13px] text-muted-foreground mb-7">Укажите email — мы отправим ссылку для сброса пароля</p>

            {forgotSent ? (
              <div className="text-center py-10">
                <Mail size={44} className="mx-auto mb-4" style={{ color: PINK }} />
                <p className="text-[16px] font-medium text-foreground mb-1">Письмо отправлено!</p>
                <p className="text-[13px] text-muted-foreground mb-6">Проверьте почту и перейдите по ссылке в письме.</p>
                <button onClick={() => setTab("login")} className="text-[13px] font-medium hover:underline" style={{ color: PINK }}>
                  Вернуться ко входу
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <label className="text-[12px] font-medium text-foreground block mb-1.5">Email</label>
                  <input value={forgot.email} onChange={(e) => setForgot({ email: e.target.value })}
                    type="email" placeholder="example@mail.ru" className={inputCls} onFocus={focus} onBlur={blur} />
                </div>
                <button
                  onClick={() => setForgotSent(true)}
                  className="w-full text-white py-3 text-[13px] font-medium rounded-sm hover:opacity-90 transition-opacity mb-4"
                  style={{ backgroundColor: PINK }}
                >
                  Восстановить пароль
                </button>
                <p className="text-center text-[12px] text-muted-foreground">
                  <button onClick={() => setTab("login")} className="hover:underline" style={{ color: PINK }}>
                    ← Назад ко входу
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Working Conditions Page ───────────────────────────────────────────────────

function WorkingConditionsPage() {
  const timeline = [
    { stage: "Стандартная сборка и отгрузка", time: "5 рабочих дней" },
    { stage: "При задержке оплаты", time: "до 10 рабочих дней" },
    { stage: "Срок действия счёта", time: "3 рабочих дня" },
  ];

  const steps = [
    { num: 1, icon: FileText, title: "Регистрация", desc: "Зарегистрируйтесь на сайте. После подтверждения аккаунта вам откроются цены и возможность оформления заказа." },
    { num: 2, icon: ShoppingCart, title: "Первый заказ", desc: "Минимальная сумма первого заказа — 100 000 ₽. Для клиентов из Казахстана и города Омска — уточняйте у менеджера." },
    { num: 3, icon: CreditCard, title: "Оплата", desc: "Наличными при самовывозе или безналичным переводом. Счёт действует 3 рабочих дня." },
    { num: 4, icon: Truck, title: "Получение", desc: "Самовывоз: ул. Лукашевича, 21а. Или бесплатная отправка до терминала выбранной ТК." },
  ];

  return (
    <div>
      <section className="relative overflow-hidden" style={{ height: 240, background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a17 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,35,122,0.15) 40px, rgba(212,35,122,0.15) 80px)" }} />
        <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase mb-3">Оптовые продажи</p>
          <h1 className="text-white text-4xl lg:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Условия работы
          </h1>
        </div>
      </section>

      <section className="py-16 max-w-[1320px] mx-auto px-5 lg:px-8">
        {/* How to start */}
        <h2 className="text-3xl font-light text-foreground mb-10 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Как начать сотрудничество
        </h2>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="absolute top-[52px] left-[12%] right-[12%] h-px hidden lg:block" style={{ backgroundColor: "#f0c4da" }} />
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex flex-col items-center text-center relative">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center bg-white" style={{ borderColor: "#f0c4da" }}>
                    <Icon size={28} style={{ color: PINK }} strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: PINK }}>{s.num}</span>
                </div>
                <h3 className="text-[14px] font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[180px]">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Key conditions */}
          <div>
            <h2 className="text-2xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Ключевые условия</h2>
            <div className="space-y-3">
              {[
                { label: "Формат", value: "Только оптовые продажи" },
                { label: "Минимальный первый заказ", value: "100 000 ₽" },
                { label: "Скидки", value: "Накопительная система для постоянных клиентов" },
                { label: "Способы оплаты", value: "Наличные (самовывоз) / Безналичный расчёт" },
                { label: "Доставка", value: "Бесплатно до терминала ТК" },
                { label: "Самовывоз", value: "г. Омск, ул. Лукашевича, 21а" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-start py-3 border-b border-border gap-4">
                  <span className="text-[13px] text-muted-foreground shrink-0">{row.label}</span>
                  <span className="text-[13px] font-medium text-foreground text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-2xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Сроки обработки</h2>
            <div className="space-y-3 mb-6">
              {timeline.map((t) => (
                <div key={t.stage} className="flex items-center justify-between p-4 border border-border rounded-sm hover:border-[#f0c4da] transition-colors">
                  <span className="text-[13px] text-foreground">{t.stage}</span>
                  <span className="text-[13px] font-semibold ml-4 shrink-0" style={{ color: PINK }}>{t.time}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-sm text-[12px] text-muted-foreground leading-relaxed" style={{ backgroundColor: "#F5F3EE" }}>
              ⚠️ При несвоевременной оплате счёт может быть аннулирован, наличие товара на складе не гарантируется.
            </div>

            <div className="mt-6 p-5 rounded-sm" style={{ backgroundColor: "#fce8f2" }}>
              <p className="text-[14px] font-semibold text-foreground mb-3">Менеджеры ответят на все вопросы</p>
              <div className="space-y-2">
                <a href="tel:+79331857555" className="flex items-center gap-2 text-[13px] font-medium" style={{ color: PINK }}><Phone size={13} /> +7 (933) 185-75-55</a>
                <a href="mailto:manager@mado-style.ru" className="flex items-center gap-2 text-[13px] font-medium" style={{ color: PINK }}><Mail size={13} /> manager@mado-style.ru</a>
                <p className="flex items-center gap-2 text-[12px] text-muted-foreground"><Clock size={13} /> Пн–Пт: 8:00–16:30</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Vacancies Page ────────────────────────────────────────────────────────────

function VacanciesPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  return (
    <div>
      <section className="relative overflow-hidden" style={{ height: 240, background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a17 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,35,122,0.15) 40px, rgba(212,35,122,0.15) 80px)" }} />
        <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase mb-3">Карьера в МаДо</p>
          <h1 className="text-white text-4xl lg:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Вакансии
          </h1>
        </div>
      </section>

      <section className="py-16 max-w-[1320px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Открытые позиции
            </h2>
            <p className="text-[14px] text-muted-foreground mb-8 leading-relaxed">
              Сейчас активных вакансий нет, но мы всегда рады знакомству с инициативными людьми. Оставьте резюме — мы свяжемся при появлении подходящей позиции.
            </p>

            <div className="p-6 border border-dashed rounded-sm text-center" style={{ borderColor: "#f0c4da" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#fce8f2" }}>
                <Users size={24} style={{ color: PINK }} strokeWidth={1.5} />
              </div>
              <p className="text-[15px] font-medium text-foreground mb-2">Нет открытых вакансий</p>
              <p className="text-[13px] text-muted-foreground">Следите за обновлениями или оставьте контакты — мы напишем первыми</p>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-[14px] font-semibold text-foreground">Связаться с HR-отделом</h3>
              <a href="tel:+73812730728" className="flex items-center gap-3 text-[13px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}>
                <Phone size={14} /> +7 (3812) 73-07-28
              </a>
              <a href="tel:+79081035123" className="flex items-center gap-3 text-[13px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}>
                <Phone size={14} /> +7 (908) 103-51-23
              </a>
              <a href="mailto:manager@mado-style.ru" className="flex items-center gap-3 text-[13px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}>
                <Mail size={14} /> manager@mado-style.ru
              </a>
              <p className="flex items-center gap-3 text-[12px] text-muted-foreground">
                <Clock size={14} /> Пн–Пт: 8:00–16:30
              </p>
            </div>
          </div>

          <div className="border border-border rounded-sm p-8">
            <h3 className="text-2xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Оставить резюме
            </h3>
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: PINK }} />
                <p className="text-[15px] font-medium text-foreground mb-2">Резюме отправлено!</p>
                <p className="text-[13px] text-muted-foreground">Мы свяжемся с вами при появлении подходящей вакансии.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { key: "name", label: "Имя", placeholder: "Иван Иванов" },
                  { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__" },
                  { key: "email", label: "Email", placeholder: "example@mail.ru" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-[12px] font-medium text-foreground block mb-1.5">{f.label}</label>
                    <input
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-border px-3 py-2.5 text-[13px] outline-none transition-colors bg-background rounded-sm"
                      onFocus={(e) => (e.target.style.borderColor = PINK)}
                      onBlur={(e) => (e.target.style.borderColor = "")}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[12px] font-medium text-foreground block mb-1.5">Сопроводительное письмо</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите о себе и желаемой должности..."
                    rows={4}
                    className="w-full border border-border px-3 py-2.5 text-[13px] outline-none transition-colors resize-none bg-background rounded-sm"
                    onFocus={(e) => (e.target.style.borderColor = PINK)}
                    onBlur={(e) => (e.target.style.borderColor = "")}
                  />
                </div>
                <button
                  onClick={() => setSent(true)}
                  className="w-full text-white py-3 text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity rounded-sm"
                  style={{ backgroundColor: PINK }}
                >
                  <Send size={14} /> Отправить резюме
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Contacts Page ─────────────────────────────────────────────────────────────

function ContactsPage() {
  const managers = [
    { name: "Юлия Иващенко", phone: "+7 (908) 103-51-23", email: "Mado-region@mail.ru", role: "Региональные продажи" },
    { name: "Юлия Неклюдова", phone: "+7 (904) 320-83-64", email: "Mado-manager@mail.ru", role: "Менеджер" },
    { name: "Ольга Федорова", phone: "+7 (908) 312-49-58", email: "olga-omsk10@yandex.ru", role: "Менеджер" },
    { name: "Светлана Садовская", phone: "+7 (933) 185-75-55", email: "manager@mado-style.ru", role: "Омск / Казахстан" },
    { name: "Дина Сафонова", phone: "+7 (904) 326-24-01", email: "—", role: "Торговая точка" },
  ];

  const locations = [
    {
      title: "Региональный отдел продаж",
      address: "г. Омск, 644007, ул. Третьяковская, д. 69",
      hours: "Пн–Пт: 8:00–16:30",
      icon: Building2,
    },
    {
      title: "Отдел Омск / Казахстан",
      address: "г. Омск, 644092, ул. Лукашевича, д. 21а",
      hours: "Пн–Пт: 8:30–17:00, Сб: 8:30–13:00",
      icon: MapPin,
    },
    {
      title: "Торговая точка",
      address: "«Торговый город», ул. 70 лет Октября, 31А",
      hours: "Вт–Вс: 8:00–15:00, Пн — выходной",
      icon: Globe,
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden" style={{ height: 240, background: "linear-gradient(135deg, #1a1a1a 0%, #2d0a17 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,35,122,0.15) 40px, rgba(212,35,122,0.15) 80px)" }} />
        <div className="relative max-w-[1320px] mx-auto px-5 lg:px-8 h-full flex flex-col justify-center">
          <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase mb-3">Всегда на связи</p>
          <h1 className="text-white text-4xl lg:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Контакты
          </h1>
        </div>
      </section>

      {/* Locations */}
      <section className="py-14 max-w-[1320px] mx-auto px-5 lg:px-8">
        <h2 className="text-3xl font-light text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Наши адреса</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {locations.map((loc) => {
            const Icon = loc.icon;
            return (
              <div key={loc.title} className="border border-border rounded-sm p-6 hover:border-[#f0c4da] hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#fce8f2" }}>
                  <Icon size={18} style={{ color: PINK }} />
                </div>
                <h3 className="text-[14px] font-semibold text-foreground mb-2">{loc.title}</h3>
                <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{loc.address}</p>
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Clock size={12} />
                  {loc.hours}
                </div>
              </div>
            );
          })}
        </div>

        {/* Managers */}
        <h2 className="text-3xl font-light text-foreground mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Менеджеры</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {managers.map((m) => (
            <div key={m.name} className="border border-border rounded-sm p-5 hover:border-[#f0c4da] hover:shadow-sm transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#fce8f2" }}>
                  <User size={16} style={{ color: PINK }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-foreground mb-0.5">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground mb-2">{m.role}</p>
                  <a href={`tel:${m.phone.replace(/\D/g, "")}`} className="flex items-center gap-1.5 text-[12px] font-medium mb-1 hover:opacity-75" style={{ color: PINK }}>
                    <Phone size={11} /> {m.phone}
                  </a>
                  {m.email !== "—" && (
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors truncate">
                      <Mail size={11} /> {m.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-light text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Напишите нам</h2>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
              Оставьте заявку — менеджер перезвонит в течение рабочего дня и ответит на все вопросы.
            </p>
            <div className="space-y-3">
              <a href="tel:+73812730728" className="flex items-center gap-3 text-[14px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}><Phone size={16} /> +7 (3812) 73-07-28</a>
              <a href="tel:+79081035123" className="flex items-center gap-3 text-[14px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}><Phone size={16} /> +7 (908) 103-51-23</a>
              <a href="mailto:manager@mado-style.ru" className="flex items-center gap-3 text-[14px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}><Mail size={16} /> manager@mado-style.ru</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  return (
    <div className="border border-border rounded-sm p-8">
      <h3 className="text-xl font-light text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Форма обратной связи</h3>
      {sent ? (
        <div className="text-center py-8">
          <CheckCircle size={40} className="mx-auto mb-3" style={{ color: PINK }} />
          <p className="text-[15px] font-medium text-foreground">Заявка отправлена!</p>
          <p className="text-[13px] text-muted-foreground mt-1">Свяжемся с вами в рабочее время.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[{ k: "name", l: "Имя", p: "Иван Иванов" }, { k: "phone", l: "Телефон", p: "+7 (___) ___-__-__" }].map((f) => (
              <div key={f.k}>
                <label className="text-[12px] font-medium text-foreground block mb-1.5">{f.l}</label>
                <input value={form[f.k as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.p}
                  className="w-full border border-border px-3 py-2.5 text-[13px] outline-none rounded-sm bg-background"
                  onFocus={(e) => (e.target.style.borderColor = PINK)} onBlur={(e) => (e.target.style.borderColor = "")} />
              </div>
            ))}
          </div>
          {[{ k: "email", l: "Email", p: "example@mail.ru" }, { k: "company", l: "Компания", p: "ООО «Название»" }].map((f) => (
            <div key={f.k} className="mb-4">
              <label className="text-[12px] font-medium text-foreground block mb-1.5">{f.l}</label>
              <input value={form[f.k as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} placeholder={f.p}
                className="w-full border border-border px-3 py-2.5 text-[13px] outline-none rounded-sm bg-background"
                onFocus={(e) => (e.target.style.borderColor = PINK)} onBlur={(e) => (e.target.style.borderColor = "")} />
            </div>
          ))}
          <div className="mb-5">
            <label className="text-[12px] font-medium text-foreground block mb-1.5">Сообщение <span style={{ color: PINK }}>*</span></label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Ваш вопрос..." rows={3}
              className="w-full border border-border px-3 py-2.5 text-[13px] outline-none resize-none rounded-sm bg-background"
              onFocus={(e) => (e.target.style.borderColor = PINK)} onBlur={(e) => (e.target.style.borderColor = "")} />
          </div>
          <button onClick={() => setSent(true)} className="w-full text-white py-3 text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity rounded-sm" style={{ backgroundColor: PINK }}>
            <Send size={14} /> Отправить заявку
          </button>
        </>
      )}
    </div>
  );
}

// ── Catalog Card ─────────────────────────────────────────────────────────────

function CatalogCard({
  product,
  onCategoryClick,
}: {
  product: typeof CATALOG_PRODUCTS[0];
  onCategoryClick: (sub: string) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onCategoryClick(product.sub)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden bg-[#F5F3EE] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        style={{ aspectRatio: "3/4", borderRadius: "6px" }}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Pink shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(212,35,122,0.08) 0%, transparent 60%)" }}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: PINK }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:scale-110"
        >
          <Heart size={14} className={liked ? "fill-current text-red-500" : "text-gray-400"} />
        </button>

        {/* Quick view button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-md hover:bg-white transition-colors whitespace-nowrap"
          >
            <Eye size={12} />
            Быстрый просмотр
          </button>
        </div>

        {/* Add to cart — slides up */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 text-white text-[12px] font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: added ? "#28a745" : PINK }}
          >
            <ShoppingCart size={13} />
            {added ? "Добавлено ✓" : "В корзину"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <p
          className="text-[10px] font-medium mb-1 cursor-pointer hover:underline transition-colors"
          style={{ color: PINK }}
          onClick={(e) => { e.stopPropagation(); onCategoryClick(product.sub); }}
        >
          {product.sub}
        </p>
        <p className="text-[13px] text-foreground font-medium leading-snug mb-1.5 line-clamp-2">{product.name}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px] font-semibold text-foreground">{product.price.toLocaleString("ru-RU")} ₽</span>
          {product.oldPrice && (
            <span className="text-[12px] text-muted-foreground line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
          )}
        </div>
        <div className="flex gap-1.5">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Catalog Dropdown ──────────────────────────────────────────────────────────

function CatalogDropdown({
  onSelect,
  onClose,
}: {
  onSelect: (group: string, sub: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        className="absolute left-0 right-0 z-50 bg-white shadow-2xl border-t border-border"
        style={{ top: "100%" }}
      >
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 py-6">
          <div className="grid grid-cols-2 gap-8 max-w-xl">
            {CATEGORY_GROUPS.map((grp) => (
              <div key={grp.group}>
                {/* Pink group header — exactly like image */}
                <div
                  className="px-3 py-2 mb-1 text-white text-[13px] font-semibold"
                  style={{ backgroundColor: PINK }}
                >
                  {grp.group}
                </div>

                <ul>
                  {grp.items.map((sub) => {
                    const hasProducts = CATALOG_PRODUCTS.some((p) => p.sub === sub);
                    return (
                      <li key={sub}>
                        <button
                          onClick={() => onSelect(grp.group, sub)}
                          className="w-full text-left flex items-center justify-between px-3 py-[7px] border-b border-border/60 group/row hover:bg-[#fce8f2] transition-colors duration-100"
                        >
                          <span className="text-[13px] text-foreground group-hover/row:text-[#D4237A] transition-colors">
                            {sub}
                          </span>
                          {hasProducts && (
                            <ChevronRight size={13} className="text-muted-foreground group-hover/row:text-[#D4237A] shrink-0 transition-colors" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Catalog Page ──────────────────────────────────────────────────────────────

function CatalogPage({ initialFilter }: { initialFilter?: string }) {
  const [openGroups, setOpenGroups] = useState<string[]>(["Женская одежда", "Мужская одежда"]);
  const [activeFilters, setActiveFilters] = useState<string[]>(initialFilter ? [initialFilter] : []);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleGroup = (g: string) =>
    setOpenGroups((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const toggleFilter = (sub: string) =>
    setActiveFilters((prev) => prev.includes(sub) ? prev.filter((x) => x !== sub) : [...prev, sub]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return CATALOG_PRODUCTS;
    return CATALOG_PRODUCTS.filter((p) => activeFilters.includes(p.sub) || activeFilters.includes(p.group));
  }, [activeFilters]);

  const breadcrumbSub = activeFilters.length === 1 ? activeFilters[0] : null;
  const breadcrumbGroup = breadcrumbSub
    ? CATEGORY_GROUPS.find((g) => g.items.includes(breadcrumbSub))?.group
    : null;

  return (
    <section className="max-w-[1320px] mx-auto px-5 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6 flex-wrap">
        <span className="hover:text-foreground cursor-pointer transition-colors">Главная</span>
        <span>/</span>
        <span
          className="hover:text-foreground cursor-pointer transition-colors"
          onClick={() => setActiveFilters([])}
        >
          Магазин
        </span>
        {breadcrumbGroup && (
          <>
            <span>/</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">{breadcrumbGroup}</span>
          </>
        )}
        {breadcrumbSub && (
          <>
            <span>/</span>
            <span className="text-foreground font-medium">{breadcrumbSub}</span>
          </>
        )}
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-52 shrink-0">
          <h3 className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground mb-4 flex items-center gap-2">
            <SlidersHorizontal size={13} style={{ color: PINK }} />
            Фильтр
          </h3>

          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="text-[11px] mb-4 font-medium hover:underline"
              style={{ color: PINK }}
            >
              Сбросить фильтры ({activeFilters.length})
            </button>
          )}

          {CATEGORY_GROUPS.map((grp) => {
            const isOpen = openGroups.includes(grp.group);
            const groupActive = activeFilters.includes(grp.group);
            return (
              <div key={grp.group} className="mb-2 border-b border-border pb-2">
                <button
                  onClick={() => toggleGroup(grp.group)}
                  className="w-full flex items-center justify-between py-2 text-left group/btn"
                >
                  <span
                    className="text-[13px] font-semibold transition-colors group-hover/btn:opacity-80"
                    style={{ color: groupActive ? PINK : undefined }}
                  >
                    {grp.group}
                  </span>
                  <ChevronDown
                    size={14}
                    className="text-muted-foreground transition-transform duration-200 shrink-0"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {isOpen && (
                  <ul className="pb-1 space-y-0.5">
                    {grp.items.map((sub) => {
                      const isActive = activeFilters.includes(sub);
                      const count = CATALOG_PRODUCTS.filter((p) => p.sub === sub).length;
                      if (count === 0) return null;
                      return (
                        <li key={sub}>
                          <button
                            onClick={() => toggleFilter(sub)}
                            className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-sm transition-all duration-150 group/item"
                            style={{
                              backgroundColor: isActive ? "#fce8f2" : "transparent",
                            }}
                          >
                            <span
                              className="text-[12px] transition-colors group-hover/item:opacity-80"
                              style={{ color: isActive ? PINK : undefined, fontWeight: isActive ? 600 : undefined }}
                            >
                              {sub}
                            </span>
                            <span
                              className="text-[10px] ml-1 shrink-0"
                              style={{ color: isActive ? PINK : "#aaa" }}
                            >
                              {count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <p className="text-[13px] text-muted-foreground">
              Отображение{" "}
              <span className="text-foreground font-medium">1–{filtered.length}</span>{" "}
              из{" "}
              <span className="text-foreground font-medium">{filtered.length}</span>
            </p>

            {/* Active filter pills */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-1.5 flex-1 px-4">
                {activeFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f)}
                    className="text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: PINK }}
                  >
                    {f} ✕
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 ml-auto">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none border border-border text-[12px] text-foreground px-3 py-1.5 pr-7 bg-background rounded-sm outline-none cursor-pointer hover:border-muted-foreground transition-colors"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              {/* View toggle */}
              <div className="flex border border-border rounded-sm overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-1.5 transition-colors"
                  style={{ backgroundColor: viewMode === "grid" ? PINK : "transparent", color: viewMode === "grid" ? "white" : undefined }}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="p-1.5 transition-colors"
                  style={{ backgroundColor: viewMode === "list" ? PINK : "transparent", color: viewMode === "list" ? "white" : undefined }}
                >
                  <LayoutList size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <CatalogCard
                  key={p.id}
                  product={p}
                  onCategoryClick={toggleFilter}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-5 border border-border rounded-md overflow-hidden group cursor-pointer hover:border-[#f0c4da] transition-all duration-200 hover:shadow-md"
                  onClick={() => toggleFilter(p.sub)}
                >
                  <div className="w-28 h-36 shrink-0 overflow-hidden bg-[#F5F3EE]">
                    <ImageWithFallback
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-medium mb-1 cursor-pointer hover:underline" style={{ color: PINK }} onClick={(e) => { e.stopPropagation(); toggleFilter(p.sub); }}>{p.sub}</p>
                      <p className="text-[14px] text-foreground font-medium mb-2">{p.name}</p>
                      {p.badge && <span className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm mr-2" style={{ backgroundColor: PINK }}>{p.badge}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-semibold text-foreground">{p.price.toLocaleString("ru-RU")} ₽</span>
                        {p.oldPrice && <span className="text-[13px] text-muted-foreground line-through">{p.oldPrice.toLocaleString("ru-RU")} ₽</span>}
                      </div>
                      <button className="text-white text-[12px] font-medium px-4 py-2 rounded-sm flex items-center gap-1.5 hover:opacity-90 transition-opacity" style={{ backgroundColor: PINK }} onClick={(e) => e.stopPropagation()}>
                        <ShoppingCart size={13} /> В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-[16px] mb-2 font-medium">Товары не найдены</p>
              <button onClick={() => setActiveFilters([])} className="text-[13px] underline" style={{ color: PINK }}>Сбросить фильтры</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Marquee Ticker ────────────────────────────────────────────────────────────

function MarqueeTicker() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-border bg-white py-3 select-none">
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6 text-[12px] tracking-[0.08em] uppercase text-muted-foreground font-medium">
            {t}
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: PINK }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Category Grid ─────────────────────────────────────────────────────────────

function CategoryGrid({ onNavigate }: { onNavigate: (sub: string) => void }) {
  return (
    <section className="max-w-[1320px] mx-auto px-5 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-7">
        <h2 className="text-3xl lg:text-4xl font-light text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Категории
        </h2>
        <button onClick={() => onNavigate("")} className="text-[12px] font-medium hover:underline" style={{ color: PINK }}>
          Весь каталог →
        </button>
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ gridTemplateRows: "220px 220px" }}>
        {/* Large tile — spans 2 rows left */}
        <div
          className="lg:row-span-2 relative overflow-hidden cursor-pointer group rounded-sm"
          onClick={() => onNavigate(CATEGORY_TILES[0].sub)}
        >
          <ImageWithFallback src={CATEGORY_TILES[0].image} alt={CATEGORY_TILES[0].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-white text-[11px] tracking-[0.2em] uppercase mb-1 opacity-80">{CATEGORY_TILES[0].count}</p>
            <p className="text-white text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{CATEGORY_TILES[0].label}</p>
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
            <ChevronRight size={14} className="text-white" />
          </div>
        </div>

        {/* Top-middle */}
        <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => onNavigate(CATEGORY_TILES[1].sub)}>
          <ImageWithFallback src={CATEGORY_TILES[1].image} alt={CATEGORY_TILES[1].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white/75 text-[10px] tracking-[0.15em] uppercase mb-0.5">{CATEGORY_TILES[1].count}</p>
            <p className="text-white text-[17px] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{CATEGORY_TILES[1].label}</p>
          </div>
        </div>

        {/* Top-right */}
        <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => onNavigate(CATEGORY_TILES[2].sub)}>
          <ImageWithFallback src={CATEGORY_TILES[2].image} alt={CATEGORY_TILES[2].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white/75 text-[10px] tracking-[0.15em] uppercase mb-0.5">{CATEGORY_TILES[2].count}</p>
            <p className="text-white text-[17px] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{CATEGORY_TILES[2].label}</p>
          </div>
        </div>

        {/* Bottom-middle */}
        <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => onNavigate(CATEGORY_TILES[3].sub)}>
          <ImageWithFallback src={CATEGORY_TILES[3].image} alt={CATEGORY_TILES[3].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white/75 text-[10px] tracking-[0.15em] uppercase mb-0.5">{CATEGORY_TILES[3].count}</p>
            <p className="text-white text-[17px] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{CATEGORY_TILES[3].label}</p>
          </div>
        </div>

        {/* Bottom-right */}
        <div className="relative overflow-hidden cursor-pointer group rounded-sm" onClick={() => onNavigate(CATEGORY_TILES[4].sub)}>
          <ImageWithFallback src={CATEGORY_TILES[4].image} alt={CATEGORY_TILES[4].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white/75 text-[10px] tracking-[0.15em] uppercase mb-0.5">{CATEGORY_TILES[4].count}</p>
            <p className="text-white text-[17px] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{CATEGORY_TILES[4].label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Wholesale Card ────────────────────────────────────────────────────────────

function WholesaleCard({ product, onAuthClick }: { product: typeof NEW_PRODUCTS[0]; onAuthClick: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-[#F8F7F5] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]" style={{ aspectRatio: "3/4", borderRadius: "6px" }}>
        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.05]" />

        {/* Soft pink shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: "linear-gradient(155deg, rgba(212,35,122,0.07) 0%, transparent 55%)" }} />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm" style={{ backgroundColor: PINK }}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:scale-110">
          <Heart size={13} className={liked ? "fill-current text-red-500" : "text-gray-400"} />
        </button>

        {/* Price lock — slides up */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button onClick={(e) => { e.stopPropagation(); onAuthClick(); }}
            className="w-full py-2.5 text-white text-[12px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PINK }}>
            🔒 Войти для цены
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{product.sub}</p>
          <p className="text-[10px] text-muted-foreground font-mono">Арт. {product.art}</p>
        </div>
        <p className="text-[13px] text-foreground font-medium leading-snug mb-2">{product.name}</p>
        <div className="flex gap-1.5">
          {product.colors.map((color, i) => (
            <span key={i} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Wholesale Section ─────────────────────────────────────────────────────────

function WholesaleSection({ title, label, products, onNavigate, onAuthClick }: {
  title: string; label: string; products: typeof NEW_PRODUCTS;
  onNavigate: (sub: string) => void; onAuthClick: () => void;
}) {
  return (
    <section className="py-12 max-w-[1320px] mx-auto px-5 lg:px-8">
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: PINK }}>{label}</p>
          <h2 className="text-3xl font-light text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h2>
        </div>
        <button onClick={() => onNavigate("")} className="text-[12px] font-medium hover:underline hidden md:block" style={{ color: PINK }}>
          Смотреть все →
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((p) => <WholesaleCard key={p.id} product={p} onAuthClick={onAuthClick} />)}
      </div>
    </section>
  );
}

// ── Editorial Feature ─────────────────────────────────────────────────────────

function EditorialFeature({ onNavigate }: { onNavigate: (sub: string) => void }) {
  return (
    <section className="max-w-[1320px] mx-auto px-5 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-sm" style={{ height: 380 }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=500&fit=crop&auto=format"
          alt="Коллекция МаДо"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-16">
          <p className="text-white/60 text-[11px] tracking-[0.3em] uppercase mb-3">Коллекция 2025</p>
          <h2 className="text-white text-4xl lg:text-5xl font-light leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Женская одежда<br />для любого случая
          </h2>
          <p className="text-white/75 text-[14px] mb-7 max-w-sm leading-relaxed">
            408 позиций в актуальном каталоге. Халаты, туники, костюмы, платья — размеры до 72.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("Костюмы")}
              className="text-white text-[12px] font-medium px-6 py-2.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: PINK, borderRadius: "4px" }}
            >
              Костюмы
            </button>
            <button
              onClick={() => onNavigate("Платья, сарафаны")}
              className="text-white text-[12px] font-medium px-6 py-2.5 border border-white/50 hover:bg-white/10 transition-colors rounded-sm"
            >
              Платья
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── B2B Stats Strip ───────────────────────────────────────────────────────────

function B2BStrip({ onAuthClick }: { onAuthClick: () => void }) {
  return (
    <div className="border-y border-border" style={{ backgroundColor: "#F5F3EE" }}>
      <div className="max-w-[1320px] mx-auto px-5 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {[
            { val: "408", unit: "позиций", desc: "в актуальном каталоге" },
            { val: "50 000+", unit: "изделий", desc: "производим каждый месяц" },
            { val: "1 000+", unit: "партнёров", desc: "по всей России и СНГ" },
            { val: "с 1997", unit: "года", desc: "на рынке трикотажа" },
          ].map((s) => (
            <div key={s.val} className="text-center">
              <div className="text-3xl lg:text-4xl font-light mb-1" style={{ color: PINK, fontFamily: "'Cormorant Garamond', serif" }}>{s.val}</div>
              <div className="text-[13px] font-semibold text-foreground">{s.unit}</div>
              <div className="text-[12px] text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[14px] text-muted-foreground mb-4">Цены доступны только зарегистрированным оптовым покупателям</p>
          <button
            onClick={onAuthClick}
            className="text-white text-[13px] font-medium px-8 py-3 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            style={{ backgroundColor: PINK, borderRadius: "4px" }}
          >
            <User size={14} /> Зарегистрироваться как оптовый покупатель
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("Главная");
  const [view, setView] = useState<"home" | "catalog" | "company" | "payment" | "conditions" | "vacancies" | "contacts" | "auth">("home");
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [catalogInitialFilter, setCatalogInitialFilter] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [newsletter, setNewsletter] = useState("");

  const goHome = () => { setView("home"); setActiveNav("Главная"); setCatalogDropdownOpen(false); };

  const openCatalogWith = (sub: string) => {
    setCatalogInitialFilter(sub);
    setView("catalog");
    setCatalogDropdownOpen(false);
    setActiveNav("Каталог");
  };

  const handleTopNav = (item: string) => {
    setCatalogDropdownOpen(false);
    if (item === "Компания") { setView("company"); setActiveNav(item); return; }
    if (item === "Оплата и доставка") { setView("payment"); setActiveNav(item); return; }
    if (item === "Условия работы") { setView("conditions"); setActiveNav(item); return; }
    if (item === "Вакансии") { setView("vacancies"); setActiveNav(item); return; }
    if (item === "Контакты") { setView("contacts"); setActiveNav(item); return; }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── 1. Верхняя строка — навигация ───────────────────────── */}
      <div className="hidden md:block border-b border-border bg-white">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 flex items-center justify-between h-8">
          <nav className="flex items-center gap-6">
            {TOP_NAV.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); handleTopNav(item); }}
                className="text-[11px] transition-colors hover:text-foreground"
                style={{
                  color: activeNav === item ? PINK : undefined,
                  fontWeight: activeNav === item ? 600 : undefined,
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── 2. Белый блок — логотип + телефоны + кнопки ─────────── */}
      <div className="hidden md:block bg-white border-b border-border">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); goHome(); }}
            className="text-[28px] font-light tracking-[0.35em] text-foreground hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MADO
          </a>

          {/* Phones */}
          <div className="flex flex-col gap-0.5">
            <a href="tel:+73812730728" className="flex items-center gap-1.5 text-[13px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}>
              <Phone size={12} strokeWidth={2} />
              +7 (3812) 73-07-28
            </a>
            <a href="tel:+79081035123" className="flex items-center gap-1.5 text-[13px] font-medium hover:opacity-75 transition-opacity" style={{ color: PINK }}>
              <Phone size={12} strokeWidth={2} />
              +7 (908) 103-51-23
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              className="text-white text-[12px] font-medium px-5 py-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: PINK, borderRadius: "4px" }}
            >
              Заказать звонок
            </button>
            <button
              onClick={() => { setView("auth"); setActiveNav(""); setCatalogDropdownOpen(false); }}
              className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-2 rounded-sm"
              style={{ borderColor: view === "auth" ? PINK : undefined, color: view === "auth" ? PINK : undefined }}
            >
              <User size={13} />
              Вход / Регистрация
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Розовая навбар (sticky) ───────────────────────────── */}
      <nav className="sticky top-0 z-50 text-white relative" style={{ backgroundColor: PINK }}>
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 flex items-center justify-between h-10">

          {/* Mobile logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setView("home"); setActiveNav("Главная"); setCatalogDropdownOpen(false); }}
            className="text-base font-light tracking-[0.3em] mr-4 md:hidden"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MADO
          </a>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {PINK_NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setView("home"); setCatalogDropdownOpen(false); }}
                className="flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap px-3 py-2 hover:bg-white/10 transition-colors border-b-2"
                style={{ borderColor: activeNav === item.label && view === "home" ? "white" : "transparent" }}
              >
                <item.Icon size={13} strokeWidth={1.75} />
                {item.label}
              </button>
            ))}

            {/* Каталог — opens dropdown */}
            <button
              onClick={() => setCatalogDropdownOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap px-3 py-2 hover:bg-white/10 transition-colors border-b-2"
              style={{ borderColor: view === "catalog" || catalogDropdownOpen ? "white" : "transparent" }}
            >
              <Grid3X3 size={13} strokeWidth={1.75} />
              Каталог
              <ChevronDown
                size={11}
                className="transition-transform duration-200"
                style={{ transform: catalogDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white/20 rounded-sm overflow-hidden">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="bg-transparent text-white placeholder-white/70 text-[12px] px-3 py-1.5 outline-none w-44"
            />
            <button className="px-2.5 py-1.5 hover:bg-white/10 transition-colors">
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Catalog dropdown */}
        {catalogDropdownOpen && (
          <CatalogDropdown
            onSelect={(_group, sub) => openCatalogWith(sub)}
            onClose={() => setCatalogDropdownOpen(false)}
          />
        )}
      </nav>

      {/* ── Page views ───────────────────────────────────────────── */}
      {view === "catalog" && <CatalogPage key={catalogInitialFilter} initialFilter={catalogInitialFilter} />}
      {view === "company" && <CompanyPage />}
      {view === "payment" && <PaymentPage />}
      {view === "conditions" && <WorkingConditionsPage />}
      {view === "vacancies" && <VacanciesPage />}
      {view === "contacts" && <ContactsPage />}
      {view === "auth" && <AuthPage onClose={goHome} />}

      {view === "home" && <>

      {/* ── Hero slider ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "420px" }}>
        <ImageWithFallback
          src={SLIDE.image}
          alt="Тёплый стиль — новая коллекция"
          className="w-full h-full object-cover"
        />
        {/* Dark left overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

        <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-20">
          <p className="text-white/80 text-[11px] tracking-[0.2em] uppercase mb-2">{SLIDE.tag}</p>
          <h1
            className="text-white text-5xl lg:text-6xl font-light leading-none mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {SLIDE.headline}
          </h1>
          <p className="text-white/85 text-[14px] mb-6">{SLIDE.sub}</p>
          <button
            className="text-white text-[12px] font-medium px-6 py-2.5 self-start hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PINK, borderRadius: "4px" }}
          >
            {SLIDE.cta}
          </button>
        </div>

        {/* Arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-colors rounded-sm">
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-colors rounded-sm">
          <ChevronRight size={18} className="text-foreground" />
        </button>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────── */}
      <MarqueeTicker />

      {/* ── Category tiles ───────────────────────────────────────── */}
      <CategoryGrid onNavigate={(sub) => { setCatalogInitialFilter(sub || undefined); setView("catalog"); setActiveNav("Каталог"); setCatalogDropdownOpen(false); }} />

      {/* ── Новинки ──────────────────────────────────────────────── */}
      <div className="border-t border-border" />
      <WholesaleSection
        title="Новинки сезона"
        label="New Arrivals"
        products={NEW_PRODUCTS}
        onNavigate={(sub) => { setCatalogInitialFilter(sub || undefined); setView("catalog"); setActiveNav("Каталог"); setCatalogDropdownOpen(false); }}
        onAuthClick={() => { setView("auth"); setActiveNav(""); }}
      />

      {/* ── Editorial feature ────────────────────────────────────── */}
      <EditorialFeature onNavigate={(sub) => { setCatalogInitialFilter(sub || undefined); setView("catalog"); setActiveNav("Каталог"); setCatalogDropdownOpen(false); }} />

      {/* ── Хиты продаж ──────────────────────────────────────────── */}
      <div className="border-t border-border" />
      <WholesaleSection
        title="Популярные позиции"
        label="Bestsellers"
        products={HIT_PRODUCTS}
        onNavigate={(sub) => { setCatalogInitialFilter(sub || undefined); setView("catalog"); setActiveNav("Каталог"); setCatalogDropdownOpen(false); }}
        onAuthClick={() => { setView("auth"); setActiveNav(""); }}
      />

      {/* ── B2B strip ────────────────────────────────────────────── */}
      <B2BStrip onAuthClick={() => { setView("auth"); setActiveNav(""); }} />

      {/* ── Как сделать заказ ────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#F5F3EE" }}>
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 text-center">
          <h2
            className="text-3xl lg:text-4xl font-light text-foreground mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Как сделать заказ
          </h2>
          <p className="text-muted-foreground text-[14px] mb-12">Простой и удобный процесс оформления оптового заказа</p>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Connecting line (desktop only) */}
            <div
              className="absolute top-[52px] left-[12%] right-[12%] h-px hidden lg:block"
              style={{ backgroundColor: "#E6E2DB" }}
            />

            {HOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center relative">
                  <div className="relative mb-4">
                    {/* Circle */}
                    <div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center bg-white"
                      style={{ borderColor: "#f0c4da" }}
                    >
                      <Icon size={28} style={{ color: PINK }} strokeWidth={1.5} />
                    </div>
                    {/* Number badge */}
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: PINK }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[180px]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Свяжитесь с нами ─────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: contact info */}
            <div>
              <h2
                className="text-3xl lg:text-4xl font-light text-foreground mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Свяжитесь с нами
              </h2>
              <p className="text-muted-foreground text-[14px] mb-8 leading-relaxed">
                Остались вопросы? Заполните форму обратной связи или свяжитесь с нами любым удобным способом. Мы всегда рады новым партнёрам!
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: "Телефоны",
                    lines: ["+7 (3812) 73-07-28", "+7 (908) 103-51-23"],
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    lines: ["info@mado-style.ru"],
                  },
                  {
                    icon: MapPin,
                    label: "Адрес",
                    lines: ["г. Омск, ул. Красный Путь, д. 143"],
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#fce8f2" }}
                      >
                        <Icon size={16} style={{ color: PINK }} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground mb-0.5">{item.label}</p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-[13px] text-muted-foreground">{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-8 p-4 rounded-sm"
                style={{ backgroundColor: "#F5F3EE", borderRadius: "4px" }}
              >
                <p className="text-[13px] font-semibold text-foreground mb-2">Режим работы</p>
                <p className="text-[12px] text-muted-foreground">Пн–Пт: 9:00 – 18:00</p>
                <p className="text-[12px] text-muted-foreground">Сб: 10:00 – 16:00</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="border border-border p-8" style={{ borderRadius: "4px" }}>
              <h3
                className="text-2xl font-light text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Форма обратной связи
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[12px] font-medium text-foreground block mb-1.5">
                    Ваше имя <span style={{ color: PINK }}>*</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full border border-border px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-current transition-colors bg-background"
                    style={{ borderRadius: "4px" }}
                    onFocus={(e) => (e.target.style.borderColor = PINK)}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E2DB")}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-foreground block mb-1.5">
                    Телефон <span style={{ color: PINK }}>*</span>
                  </label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-border px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-colors bg-background"
                    style={{ borderRadius: "4px" }}
                    onFocus={(e) => (e.target.style.borderColor = PINK)}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E2DB")}
                  />
                </div>
              </div>

              {[
                { key: "email", label: "Email", placeholder: "example@mail.ru" },
                { key: "company", label: "Название компании", placeholder: "ООО «Компания»" },
              ].map((field) => (
                <div key={field.key} className="mb-4">
                  <label className="text-[12px] font-medium text-foreground block mb-1.5">{field.label}</label>
                  <input
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full border border-border px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-colors bg-background"
                    style={{ borderRadius: "4px" }}
                    onFocus={(e) => (e.target.style.borderColor = PINK)}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E2DB")}
                  />
                </div>
              ))}

              <div className="mb-5">
                <label className="text-[12px] font-medium text-foreground block mb-1.5">
                  Сообщение <span style={{ color: PINK }}>*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Напишите ваш вопрос или пожелания..."
                  rows={4}
                  className="w-full border border-border px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none transition-colors resize-none bg-background"
                  style={{ borderRadius: "4px" }}
                  onFocus={(e) => (e.target.style.borderColor = PINK)}
                  onBlur={(e) => (e.target.style.borderColor = "#E6E2DB")}
                />
              </div>

              <button
                className="w-full text-white py-3 text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: PINK, borderRadius: "4px" }}
              >
                <Send size={14} />
                Отправить заявку
              </button>

              <p className="text-center text-[11px] text-muted-foreground mt-3">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="underline" style={{ color: PINK }}>
                  политикой конфиденциальности
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      </>}

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <div className="bg-foreground py-6">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white text-[15px] font-medium">Подпишитесь на рассылку</p>
            <p className="text-white/60 text-[12px]">Узнавайте о новинках и специальных предложениях первыми</p>
          </div>
          <div className="flex items-center gap-0 w-full md:w-80">
            <input
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              placeholder="Ваш email"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 text-[13px] px-4 py-2.5 outline-none focus:border-white/50 transition-colors"
              style={{ borderRadius: "4px 0 0 4px" }}
            />
            <button
              className="text-white px-4 py-2.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: PINK, borderRadius: "0 4px 4px 0" }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-foreground border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <p
                className="text-white text-xl font-light tracking-[0.3em] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                MADO
              </p>
              <p className="text-white/50 text-[12px] leading-relaxed mb-5">
                Оптовая продажа женской и мужской одежды от производителя
              </p>
              <div className="space-y-2">
                {[
                  { icon: Phone, text: "+7 (3812) 73-07-28" },
                  { icon: Phone, text: "+7 (908) 103-51-23" },
                  { icon: Mail, text: "info@mado-style.ru" },
                  { icon: MapPin, text: "г. Омск, ул. Красный Путь, д. 143" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Icon size={12} style={{ color: PINK }} className="mt-0.5 shrink-0" />
                    <span className="text-white/60 text-[12px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalog */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: PINK }}>
                Каталог
              </p>
              {["Женская одежда", "Мужская одежда", "Новинки", "Распродажа"].map((l) => (
                <a key={l} href="#" className="block text-white/60 text-[13px] mb-2.5 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>

            {/* Company */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: PINK }}>
                Компания
              </p>
              {["О компании", "Условия работы", "Оплата и доставка", "Вакансии"].map((l) => (
                <a key={l} href="#" className="block text-white/60 text-[13px] mb-2.5 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>

            {/* Support */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: PINK }}>
                Поддержка
              </p>
              {["Контакты", "FAQ", "Политика конфиденциальности", "Публичная оферта"].map((l) => (
                <a key={l} href="#" className="block text-white/60 text-[13px] mb-2.5 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>

            {/* Social + Payment */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: PINK }}>
                Мы в соцсетях
              </p>
              <div className="flex gap-2 mb-6">
                {["TG", "WA", "VK"].map((s) => (
                  <button
                    key={s}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full text-white text-[11px] font-bold transition-colors flex items-center justify-center"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: PINK }}>
                Способы оплаты
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {["Visa", "MasterCard", "МИР"].map((p) => (
                  <span
                    key={p}
                    className="border border-white/20 text-white/60 text-[10px] px-2 py-1 rounded-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/40 text-[12px]">© 2024 MADO. Все права защищены.</p>
            <p className="text-white/40 text-[12px]">
              Разработка сайта:{" "}
              <a href="#" className="hover:text-white/70 transition-colors" style={{ color: PINK }}>
                mado-style.ru
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
