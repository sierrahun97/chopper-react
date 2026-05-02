export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export type BlogPost = {
  id: number;
  title: string;
  text: string;
  image: string;
};

export const HERO_BANNERS = [
  {
    id: 1,
    image: "/img/Banner_bff_1.1.png",
    alt: "Banner principal 1",
  },
  {
    id: 2,
    image: "/img/Banner_bff_2.1.png",
    alt: "Banner principal 2",
  },
  {
    id: 3,
    image: "/img/banner bff 3.png",
    alt: "Banner principal 3",
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Go! Solutions Carnivore",
    category: "Categoría Cachorros",
    description: "Con proteína animal para crecimiento.",
    price: 120000,
    image: "/img/product-img/1.png",
  },
  {
    id: 2,
    name: "Hill's Perro Adulto Mature",
    category: "Categoría Perro Adulto",
    description: "Nutrición balanceada para adultos.",
    price: 110000,
    image: "/img/product-img/2.png",
  },
  {
    id: 3,
    name: "Go! Solutions Control de Pesos",
    category: "Categoría Gatos Adultos",
    description: "Control nutricional para peso saludable.",
    price: 130000,
    image: "/img/product-img/3.png",
  },
  {
    id: 4,
    name: "Hill's Perfecta Digestion",
    category: "Categoría Perro Adulto",
    description: "Soporte digestivo para adultos.",
    price: 110000,
    image: "/img/product-img/4.png",
  },
  {
    id: 5,
    name: "Go! Solutions Digestion",
    category: "Categoría Perro Adulto",
    description: "Ayuda al sistema digestivo.",
    price: 115000,
    image: "/img/product-img/5.png",
  },
  {
    id: 6,
    name: "Royal Canin Mediano Adulto",
    category: "Categoría Perros Adultos",
    description: "Fórmula para perros medianos.",
    price: 145000,
    image: "/img/product-img/6.png",
  },
  {
    id: 7,
    name: "Pro Plan raza Cachorros",
    category: "Categoría Cachorros",
    description: "Desarrollo de cachorros.",
    price: 132000,
    image: "/img/product-img/7.png",
  },
  {
    id: 8,
    name: "Royal Canin Exigente Mini",
    category: "Perros Pequeños",
    description: "Para perros pequeños exigentes.",
    price: 132000,
    image: "/img/product-img/8.png",
  },
  {
    id: 9,
    name: "Hill's Gato Adulto Mature",
    category: "Categoría Gatos Adultos",
    description: "Nutrición senior para gatos.",
    price: 154000,
    image: "/img/product-img/9.png",
  },
  {
    id: 10,
    name: "Pro Plan Adulto Mature",
    category: "Categoría Perros Adultos",
    description: "Alimento premium para adulto.",
    price: 144000,
    image: "/img/product-img/10.png",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Ejercita a tu gato mediante el juego",
    text: "Recuerda que tu gato es un felino, así que debes estimular sus instintos jugando con él para que no se frustre.",
    image: "/img/Bienestar.png",
  },
  {
    id: 2,
    title: "Agua fresca siempre disponible",
    text: "Asegura acceso constante a agua limpia y fresca. La hidratación es clave para riñones saludables.",
    image: "/img/Alimentoo.png",
  },
  {
    id: 3,
    title: "Higiene bucal en tus mascotas",
    text: "Cepilla sus dientes o usa juguetes dentales para prevenir problemas bucales.",
    image: "/img/salud.png",
  },
];

export const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
