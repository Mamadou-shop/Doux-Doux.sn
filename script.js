// ==========================================
// 1. VARIABLES, ÉTAT GLOBAL ET CONFIGURATION
// ==========================================
let panier = [];
let indexSlide = 0;
let modeAchatDirect = false;
let produitDirectEnCours = null;

let produitsStockesLocale = [
  {
    id: "1",
    name: "Lot de 3 T-Shirts Coton Basiques",
    category: "Textile-Mode",
    tag: "Bas Prix",
    price: 4500,
    desc: "Ensemble de 3 t-shirts 100% coton de qualité supérieure, confortables au quotidien.",
    imageUrl: "https://i.pinimg.com/1200x/b0/94/02/b09402ecfc2c948f2e8782a5a68bdfe2.jpg"
  },
  {
    id: "2",
    name: "Robe de Soirée Élégante Chic",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 18500,
    desc: "Robe longue fluide portée par notre mannequin, idéale pour vos événements.",
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Jean Slim Stretch Quotidien",
    category: "Textile-Mode",
    tag: "meilleures-ventes",
    price: 7500,
    desc: "Coupe moderne et ajustée, idéal pour les sorties décontractées.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    name: "Costume 3 Pièces Homme Modern Fit",
    category: "Textile-Mode",
    tag: "Premium",
    price: 35000,
    desc: "Costume complet porté par notre mannequin, une coupe impeccable pour grandes occasions.",
    imageUrl: "https://i.pinimg.com/736x/cb/a1/38/cba138e3a241680a653ddbc7d1fa8b88.jpg"
  },
  {
    id: "5",
    name: "Chemise Bleue Classique Homme",
    category: "Textile-Mode",
    tag: "Bas Prix",
    price: 5000,
    desc: "Chemise repassage facile, coupe droite idéale pour le bureau ou événements.",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    name: "Veste en Cuir Style Biker",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 19000,
    desc: "Blouson en cuir de qualité sur cintre avec finitions métalliques soignées.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "7",
    name: "Robe d'Été Fleurie Légère",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 6500,
    desc: "Robe fluide avec imprimé floral coloré, parfaite pour le quotidien.",
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "8",
    name: "Manteau Veste Légère Laine",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 16000,
    desc: "Veste courte élégante offrant confort et raffinement.",
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "9",
    name: "Short de Sport Respirant Quick-Dry",
    category: "Textile-Mode",
    tag: "Bas Prix",
    price: 3000,
    desc: "Short ultra-léger avec poche zippée, parfait pour le running et le fitness.",
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "10",
    name: "Boubou Traditionnel VIP Brodé",
    category: "Textile-Mode",
    tag: "Exclusif",
    price: 28000,
    desc: "Magnifique ensemble tradition porté par notre mannequin, broderies artisanales.",
    imageUrl: "https://i.pinimg.com/1200x/b8/e8/68/b8e868eb071829bfc1d294ab8ace641b.jpg"
  },
  {
    id: "11",
    name: "Sweat à Capuche Oversize Cotton",
    category: "Textile-Mode",
    tag: "Streetwear",
    price: 7500,
    desc: "Hoodie molletonné coupe confortable style urbain.",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "12",
    name: "Kimono Imprimé Satiné",
    category: "Textile-Mode",
    tag: "Promo",
    price: 8000,
    desc: "Kimono élégant à porter en veste légère ou tenue d'intérieur.",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "13",
    name: "Ensemble Polo & Short Casual",
    category: "Textile-Mode",
    tag: "Bas Prix",
    price: 6500,
    desc: "Ensemble deux pièces d'été moderne et décontracté.",
    imageUrl: "https://i.pinimg.com/736x/88/c9/b0/88c9b0ea9e4e7c6cc43401a2ad40f1f1.jpg"
  },
  {
    id: "14",
    name: "Jupe Plissée Longue Satinée",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 7000,
    desc: "Jupe tendance taille élastique avec reflets brillants.",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "15",
    name: "Gilet en Maille Douce",
    category: "Textile-Mode",
    tag: "Nouveauté",
    price: 8500,
    desc: "Cardigan boutonné doux au toucher et très agréable à porter.",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "16",
    name: "Pyjama 2 Pièces Sensation Soie",
    category: "Textile-Mode",
    tag: "Confort",
    price: 9000,
    desc: "Ensemble nuit fluide et léger pour un sommeil confortable.",
    imageUrl: "https://images.unsplash.com/photo-1616885827725-7b567d288d44?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "17",
    name: "Pantalon Cargo Multi-Poches",
    category: "Textile-Mode",
    tag: "Bas Prix",
    price: 7500,
    desc: "Style street robuste avec multiples poches de rangement.",
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "18",
    name: "Maillot de Bain Design Été",
    category: "Textile-Mode",
    tag: "Tendance",
    price: 6000,
    desc: "Maillot une pièce tendance avec finitions soignées.",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "19",
    name: "Baume à Lèvres Hydratant Karité",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 1000,
    desc: "Soin protecteur naturel enrichi en vitamine E et karité pur.",
    imageUrl: "https://images.unsplash.com/photo-1625101902621-2e6462719522?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "20",
    name: "Parfum d'Ambiance Royale 100ml",
    category: "Beaute-Soins",
    tag: "Populaire",
    price: 12000,
    desc: "Fragrance envoûtante aux notes d'Oud et d'Ambre précieux.",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "21",
    name: "Savon Noir Purifiant Charbon Actif",
    category: "Beaute-Soins",
    tag: "Nouveau",
    price: 1500,
    desc: "Nettoie en profondeur, élimine l'excès de sébum et les impuretés.",
    imageUrl: "https://images.unsplash.com/photo-1607006482170-137b02c8e310?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "22",
    name: "Sérum Hydratant Éclat Visage",
    category: "Beaute-Soins",
    tag: "Tendance",
    price: 6500,
    desc: "Sérum concentré à l'acide hyaluronique pour un teint frais.",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "23",
    name: "Crème Hydratante Quotidienne 50ml",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 3000,
    desc: "Hydratation 24h texture légère pour tous types de peaux.",
    imageUrl: "https://static.wixstatic.com/media/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png"
  },
  {
    id: "24",
    name: "Coffret Maquillage Complete Palette",
    category: "Beaute-Soins",
    tag: "meilleures-ventes",
    price: 9500,
    desc: "Palette complète fards à paupières, blush et rouges à lèvres.",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "25",
    name: "Huile Nourrissante Cheveux & Argan",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 2500,
    desc: "Mélange d'huiles d'Argan et de Jojoba pour des cheveux brillants.",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "26",
    name: "Coffret Soin Visage Spa Hydratation",
    category: "Beaute-Soins",
    tag: "Pack-Eco",
    price: 14000,
    desc: "Routine complète : nettoyant, sérum, crème et masque soin.",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "27",
    name: "Gel Douche Énergisant Aloe Vera",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 2000,
    desc: "Aux extraits d'agrumes et d'aloe vera pour rafraîchir la peau.",
    imageUrl: "https://images.unsplash.com/photo-1585232351009-aa87416fec90?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "28",
    name: "Lisseur Céramique Professionnel",
    category: "Beaute-Soins",
    tag: "Pro",
    price: 12000,
    desc: "Chauffe rapide et technologie protectrice pour la fibre capillaire.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "29",
    name: "Vernis à Ongles Gel Longue Tenue",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 1000,
    desc: "Finition brillante tenue longue durée sans lampe.",
    imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "30",
    name: "Rouge à Lèvres Mat Longue Tenue",
    category: "Beaute-Soins",
    tag: "Tendance",
    price: 2500,
    desc: "Couleur haute pigmentation qui ne dessèche pas les lèvres.",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "31",
    name: "Sèche-Cheveux Ionique Silencieux",
    category: "Beaute-Soins",
    tag: "Pratique",
    price: 15000,
    desc: "Séchage ultra-rapide avec contrôle de la chaleur.",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "32",
    name: "Masque Argile Purifiant Visage",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 1500,
    desc: "Resserre les pores et affine le grain de peau.",
    imageUrl: "https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "33",
    name: "Eau de Toilette Fraîcheur Marine 100ml",
    category: "Beaute-Soins",
    tag: "Populaire",
    price: 8500,
    desc: "Senteur dynamique et fraîche idéale pour la journée.",
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "34",
    name: "Kit Pinceaux de Maquillage (12 pcs)",
    category: "Beaute-Soins",
    tag: "Bas Prix",
    price: 3500,
    desc: "Poils synthétiques très doux pour un maquillage réussi.",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "35",
    name: "Casquette Urban Street Coton",
    category: "Equipement",
    tag: "Bas Prix",
    price: 2500,
    desc: "Casquette ajustable 100% coton avec broderie discrète.",
    imageUrl: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg"
  },
  {
    id: "36",
    name: "Montre Chronographe Bracelet Acier",
    category: "Equipement",
    tag: "Tendance",
    price: 14500,
    desc: "Cadran élégant avec verre résistant et bracelet réglable.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "37",
    name: "Lunettes de Soleil UV400 Style",
    category: "Equipement",
    tag: "meilleures-ventes",
    price: 3500,
    desc: "Monture légère et verres protecteurs anti-éblouissement.",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"
  },
  {
    id: "38",
    name: "Sac à Main Élégant Maroquinerie",
    category: "Equipement",
    tag: "Tendance",
    price: 12500,
    desc: "Sac structuré finitions soignées avec bandoulière.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "39",
    name: "Ceinture Reversible Noir & Marron",
    category: "Equipement",
    tag: "Bas Prix",
    price: 2500,
    desc: "Double face avec boucle classique argentée résistant.",
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "40",
    name: "Baskets Sneakers Urban Fashion",
    category: "Equipement",
    tag: "Streetwear",
    price: 13500,
    desc: "Baskets légères et confortables au style dynamique.",
    imageUrl: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg"
  },
  {
    id: "41",
    name: "Portefeuille Compact Mince Anti-RFID",
    category: "Equipement",
    tag: "Bas Prix",
    price: 2000,
    desc: "Protège vos cartes bancaires avec plusieurs rangements.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "42",
    name: "Collier Pendentif Fin Argent 925",
    category: "Equipement",
    tag: "Élégance",
    price: 5500,
    desc: "Chaine fine avec pendentif scintillant.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "43",
    name: "Sac à Dos Voyage & Ordinateur USB",
    category: "Equipement",
    tag: "Pratique",
    price: 8500,
    desc: "Sac renforcé imperméable idéal pour trajets et voyages.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "44",
    name: "Lunettes de Soleil Cadre Doré",
    category: "Equipement",
    tag: "Tendance",
    price: 4500,
    desc: "Style vintage chic avec monture dorée et verres teintés.",
    imageUrl: "https://i.pinimg.com/1200x/16/26/ad/1626adbfdb78ffee1c87ea8d6b6f8bf2.jpg"
  },
  {
    id: "45",
    name: "Chapeau de Paille Plage & Été",
    category: "Equipement",
    tag: "Bas Prix",
    price: 3000,
    desc: "Protection solaire élégante pour la plage et promenades.",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "46",
    name: "Montre Homme Business Cadran Noir",
    category: "Equipement",
    tag: "Tendance",
    price: 9500,
    desc: "Monture en acier inoxydable noire avec affichage date.",
    imageUrl: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg"
  },
  {
    id: "47",
    name: "Mocassins Homme Style Suédé",
    category: "Equipement",
    tag: "Style",
    price: 11000,
    desc: "Mocassins souples et élégants pour tenue décontractée.",
    imageUrl: "https://i.pinimg.com/736x/dd/6f/8e/dd6f8e15d9d0cdac861883f68635292f.jpg"
  },
  {
    id: "48",
    name: "Sandales Plates Légères",
    category: "Equipement",
    tag: "Bas Prix",
    price: 4500,
    desc: "Sandales de ville très confortables pour les chaudes journées.",
    imageUrl: "https://i.pinimg.com/736x/19/6a/aa/196aaa7740e1ae0ce8307ebbe3cbad38.jpg"
  },
  {
    id: "49",
    name: "Gants Souples en Cuir Fin",
    category: "Equipement",
    tag: "Accessoire",
    price: 6000,
    desc: "Accessoire élégant au toucher doux et finitions soignées.",
    imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "50",
    name: "Bracelet Perles Pierres Naturelles",
    category: "Equipement",
    tag: "Bas Prix",
    price: 2000,
    desc: "Bracelet élastique mixte très tendance.",
    imageUrl: "https://i.pinimg.com/736x/b6/e0/9e/b6e09e5c7f64645d63effe981b5e2732.jpg"
  }
];

// ==========================================
// 2. DÉCOUPAGE TERRITORIAL SÉNÉGAL (14 RÉGIONS)
// ==========================================
const senegalMap = {
    "Dakar": {
        tarifs: { "Dakar": 1500, "Pikine": 2000, "Guédiawaye": 2000, "Rufisque": 2500 },
        departements: {
            "Dakar": ["Plateau", "Médina", "Fann-Point E-Amitié", "Gorée", "Yoff", "Ngor", "Ouakam", "Almadies", "Grand Dakar", "Parcelles Assainies", "Patte d'Oie", "Hann Bel-Air"],
            "Pikine": ["Pikine Est", "Pikine Ouest", "Pikine Nord", "Dagoudane", "Dalifort", "Djiddah Thiaroye Kao", "Thiaroye sur Mer", "Tivaouane Diacksao", "Mbao", "Keur Massar Nord", "Keur Massar Sud", "Malika", "Yeumbeul Nord", "Yeumbeul Sud"],
            "Guédiawaye": ["Golf Sud", "Sam Notaire", "Ndiarème Limamoulaye", "Wakhinane Nimzatt", "Médina Gounass"],
            "Rufisque": ["Rufisque Est", "Rufisque Ouest", "Rufisque Nord", "Bargny", "Sébikotane", "Diamniadio", "Sendou", "Sangalkam", "Jaxaay-Parcelles-Niakoul Rap"]
        }
    },
    "Thiès": {
        tarifs: { "Thiès": 3000, "Mbour": 3500, "Tivaouane": 3500 },
        departements: {
            "Thiès": ["Thiès Nord", "Thiès Sud", "Thiès Ouest", "Fandène", "Pout"],
            "Mbour": ["Mbour Commune", "Saly Portudal", "Ngapparou", "Somone", "Joal-Fadiouth", "Popenguine"],
            "Tivaouane": ["Tivaouane Commune", "Mékhé", "Pire Goureye"]
        }
    },
    "Diourbel": {
        tarifs: { "Diourbel": 3500, "Bambey": 3500, "Mbacké": 4000 },
        departements: {
            "Diourbel": ["Diourbel Commune", "Ndoulo"],
            "Bambey": ["Bambey Commune", "Ngoye"],
            "Mbacké": ["Mbacké Commune", "Touba Mosquée", "Touba Ville"]
        }
    },
    "Saint-Louis": {
        tarifs: { "Saint-Louis": 4000, "Dagana": 4500, "Podor": 5000 },
        departements: {
            "Saint-Louis": ["Sor", "Ndar Tille", "Goxu Mbathie", "Hydrobase", "Ndiolofène"],
            "Dagana": ["Dagana Commune", "Richard-Toll", "Rosso Sénégal"],
            "Podor": ["Podor Commune", "Ndioum", "Tarédji"]
        }
    },
    "Fatick": {
        tarifs: { "Fatick": 4000, "Foundiougne": 4500, "Gossas": 4000 },
        departements: {
            "Fatick": ["Fatick Commune", "Diofior"],
            "Foundiougne": ["Foundiougne Commune", "Sokone", "Passy", "Toubacouta"],
            "Gossas": ["Gossas Commune"]
        }
    },
    "Kaolack": {
        tarifs: { "Kaolack": 3500, "Guinguinéo": 4000, "Nioro du Rip": 4000 },
        departements: {
            "Kaolack": ["Kaolack Commune", "Ndoffane", "Kahone"],
            "Guinguinéo": ["Guinguinéo Commune"],
            "Nioro du Rip": ["Nioro Commune", "Keur Madiabel"]
        }
    },
    "Kolda": {
        tarifs: { "Kolda": 5000, "Vélingara": 5500, "Médina Yoro Foulah": 6000 },
        departements: {
            "Kolda": ["Kolda Commune", "Saré Yidda"],
            "Vélingara": ["Vélingara Commune", "Kounkané"],
            "Médina Yoro Foulah": ["Médina Yoro Foulah Commune"]
        }
    },
    "Louga": {
        tarifs: { "Louga": 4000, "Kébémer": 4000, "Linguère": 4500 },
        departements: {
            "Louga": ["Louga Commune", "Nguidile"],
            "Kébémer": ["Kébémer Commune", "Gueoul"],
            "Linguère": ["Linguère Commune", "Dahra Djoloff"]
        }
    },
    "Matam": {
        tarifs: { "Matam": 5000, "Kanel": 5500, "Ranérou": 6000 },
        departements: {
            "Matam": ["Matam Commune", "Ourossogui"],
            "Kanel": ["Kanel Commune", "Waoundé", "Semmé"],
            "Ranérou": ["Ranérou Commune"]
        }
    },
    "Sedhiou": {
        tarifs: { "Sedhiou": 5000, "Bounkiling": 5500, "Goudomp": 5500 },
        departements: {
            "Sedhiou": ["Sédhiou Commune", "Marsassoum"],
            "Bounkiling": ["Bounkiling Commune", "Boga"],
            "Goudomp": ["Goudomp Commune", "Tanaff"]
        }
    },
    "Tambacounda": {
        tarifs: { "Tambacounda": 5000, "Bakel": 6000, "Goudiry": 6000, "Koumpentoum": 5500 },
        departements: {
            "Tambacounda": ["Tambacounda Commune"],
            "Bakel": ["Bakel Commune", "Kidira"],
            "Goudiry": ["Goudiry Commune"],
            "Koumpentoum": ["Koumpentoum Commune"]
        }
    },
    "Ziguinchor": {
        tarifs: { "Ziguinchor": 5000, "Bignona": 5000, "Oussouye": 5500 },
        departements: {
            "Ziguinchor": ["Ziguinchor Commune", "Elinkine"],
            "Bignona": ["Bignona Commune", "Thionck-Essyl"],
            "Oussouye": ["Oussouye Commune", "Cap Skirring"]
        }
    },
    "Kaffrine": {
        tarifs: { "Kaffrine": 4000, "Birkelane": 4000, "Koungheul": 4500, "Malem Hodar": 4500 },
        departements: {
            "Kaffrine": ["Kaffrine Commune"],
            "Birkelane": ["Birkelane Commune"],
            "Koungheul": ["Koungheul Commune"],
            "Malem Hodar": ["Malem Hodar Commune"]
        }
    },
    "Kédougou": {
        tarifs: { "Kédougou": 6000, "Salemata": 6500, "Saraya": 6500 },
        departements: {
            "Kédougou": ["Kédougou Commune"],
            "Salemata": ["Salémata Commune"],
            "Saraya": ["Saraya Commune"]
        }
    }
};

// ==========================================
// 3. FONCTIONS D'AFFICHAGE ET DE FILTRAGE
// ==========================================
function traiterUrlImage(url) {
    if (!url) return 'https://via.placeholder.com/400x400?text=Produit+Doux-Doux';
    if (url.includes('pinimg.com')) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    }
    return url;
}

function filtrerProduits(tagFiltre, elementClique) {
    if (elementClique) {
        document.querySelectorAll('.btn-tag').forEach(btn => btn.classList.remove('active'));
        elementClique.classList.add('active');
    }

    const grille = document.getElementById('produits-grid');
    if (!grille) return;
    
    grille.innerHTML = '';

    let produitsFiltres = produitsStockesLocale;
    if (tagFiltre && tagFiltre !== 'toutes') {
        produitsFiltres = produitsStockesLocale.filter(p => 
            (p.tag && p.tag.toLowerCase() === tagFiltre.toLowerCase()) || 
            (p.category && p.category.toLowerCase() === tagFiltre.toLowerCase())
        );
    }

    if (produitsFiltres.length === 0) {
        grille.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
            <i class="fas fa-box-open" style="font-size: 40px; margin-bottom: 10px; color: #ccc;"></i>
            <p>Aucun article trouvé pour cette catégorie.</p>
        </div>`;
        return;
    }

    produitsFiltres.forEach(prod => {
        const imageFinale = traiterUrlImage(prod.imageUrl);
        const carteHTML = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${imageFinale}" alt="${prod.name}" class="product-image" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x400?text=Image+Non+Disponible';">
                    ${prod.tag ? `<span class="product-tag">${prod.tag}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${prod.name}</h3>
                    <p class="product-desc">${prod.desc || ''}</p>
                    <div class="product-price-row">
                        <span class="product-price">${Number(prod.price).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-ajouter" onclick="ajouterAuPanier('${prod.id}')">
                            <i class="fas fa-shopping-bag"></i> Panier
                        </button>
                        <button class="btn-acheter-direct" onclick="acheterDirectement('${prod.id}')">
                            <i class="fas fa-bolt"></i> Acheter
                        </button>
                    </div>
                </div>
            </div>
        `;
        grille.innerHTML += carteHTML;
    });
}

// ==========================================
// 4. GESTION DU PANIER & ACHAT DIRECT
// ==========================================
function ajouterAuPanier(idProduit) {
    const produit = produitsStockesLocale.find(p => p.id === idProduit);
    if (!produit) return;

    const itemExistant = panier.find(item => item.id === idProduit);
    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }
    
    maintienCompteurPanier();
    afficherNotification(`${produit.name} ajouté au panier !`);
}

function acheterDirectement(idProduit) {
    const produit = produitsStockesLocale.find(p => p.id === idProduit);
    if (!produit) return;

    modeAchatDirect = true;
    produitDirectEnCours = { ...produit, quantite: 1 };
    
    ouvrirModalCommande();
}

function maintienCompteurPanier() {
    const totalArticles = panier.reduce((acc, item) => acc + item.quantite, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(b => b.textContent = totalArticles);
}

function afficherNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'toast-notification';
    notif.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.classList.add('show');
    }, 100);

    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}

// ==========================================
// 5. MODALE DE PANIER ET RÉCAPITULATIF
// ==========================================
function ouvrirModalPanier() {
    modeAchatDirect = false;
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    
    rendrePanierHTML();
    modal.style.display = 'flex';
}

function fermerModalPanier() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.style.display = 'none';
}

function modifierQuantite(idProduit, changement) {
    const item = panier.find(i => i.id === idProduit);
    if (!item) return;

    item.quantite += changement;
    if (item.quantite <= 0) {
        panier = panier.filter(i => i.id !== idProduit);
    }
    
    maintienCompteurPanier();
    rendrePanierHTML();
}

function rendrePanierHTML() {
    const conteneur = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total-price');
    if (!conteneur) return;

    if (panier.length === 0) {
        conteneur.innerHTML = `<div style="text-align:center; padding:30px; color:#777;">
            <i class="fas fa-shopping-cart" style="font-size:40px; color:#ddd; margin-bottom:10px;"></i>
            <p>Votre panier est vide.</p>
        </div>`;
        if (totalElem) totalElem.textContent = "0 FCFA";
        return;
    }

    let total = 0;
    conteneur.innerHTML = panier.map(item => {
        const st = item.price * item.quantite;
        total += st;
        return `
            <div class="cart-item">
                <img src="${traiterUrlImage(item.imageUrl)}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">${Number(item.price).toLocaleString('fr-FR')} FCFA</span>
                    <div class="cart-item-qty">
                        <button onclick="modifierQuantite('${item.id}', -1)">-</button>
                        <span>${item.quantite}</span>
                        <button onclick="modifierQuantite('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="modifierQuantite('${item.id}', -${item.quantite})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    if (totalElem) totalElem.textContent = `${Number(total).toLocaleString('fr-FR')} FCFA`;
}

// ==========================================
// 6. PROCESSUS DE COMMANDE ET CASCADES RÉGIONS
// ==========================================
function ouvrirModalCommande() {
    fermerModalPanier();
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    initialiserCascadesAdresse();
    mettreAjourRecapitulatifCommande();
    modal.style.display = 'flex';
}

function fermerModalCommande() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.style.display = 'none';
}

function initialiserCascadesAdresse() {
    const selectRegion = document.getElementById('checkout-region');
    const selectDept = document.getElementById('checkout-dept');
    const selectCommune = document.getElementById('checkout-commune');

    if (!selectRegion) return;

    selectRegion.innerHTML = '<option value="">Sélectionnez votre Région</option>';
    Object.keys(senegalMap).forEach(reg => {
        selectRegion.innerHTML += `<option value="${reg}">${reg}</option>`;
    });

    selectRegion.onchange = () => {
        const regionChoisie = selectRegion.value;
        selectDept.innerHTML = '<option value="">Sélectionnez votre Département</option>';
        selectCommune.innerHTML = '<option value="">Sélectionnez votre Commune / Quartier</option>';
        selectCommune.disabled = true;

        if (regionChoisie && senegalMap[regionChoisie]) {
            selectDept.disabled = false;
            Object.keys(senegalMap[regionChoisie].departements).forEach(dept => {
                selectDept.innerHTML += `<option value="${dept}">${dept}</option>`;
            });
        } else {
            selectDept.disabled = true;
        }
        mettreAjourRecapitulatifCommande();
    };

    selectDept.onchange = () => {
        const regionChoisie = selectRegion.value;
        const deptChoisi = selectDept.value;
        selectCommune.innerHTML = '<option value="">Sélectionnez votre Commune / Quartier</option>';

        if (regionChoisie && deptChoisi && senegalMap[regionChoisie].departements[deptChoisi]) {
            selectCommune.disabled = false;
            senegalMap[regionChoisie].departements[deptChoisi].forEach(com => {
                selectCommune.innerHTML += `<option value="${com}">${com}</option>`;
            });
        } else {
            selectCommune.disabled = true;
        }
        mettreAjourRecapitulatifCommande();
    };
}

function calculerFraisLivraison() {
    const reg = document.getElementById('checkout-region')?.value;
    const dept = document.getElementById('checkout-dept')?.value;

    if (reg && dept && senegalMap[reg] && senegalMap[reg].tarifs[dept]) {
        return senegalMap[reg].tarifs[dept];
    }
    return 2000;
}

function mettreAjourRecapitulatifCommande() {
    const conteneurArticles = document.getElementById('checkout-summary-items');
    const sousTotalElem = document.getElementById('summary-subtotal');
    const livraisonElem = document.getElementById('summary-shipping');
    const totalElem = document.getElementById('summary-total');

    if (!conteneurArticles) return;

    const itemsAchetes = modeAchatDirect ? [produitDirectEnCours] : panier;
    let sousTotal = 0;

    conteneurArticles.innerHTML = itemsAchetes.map(item => {
        const st = item.price * item.quantite;
        sousTotal += st;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:13px;">
            <span>${item.name} x ${item.quantite}</span>
            <strong>${Number(st).toLocaleString('fr-FR')} FCFA</strong>
        </div>`;
    }).join('');

    const fraisLivraison = calculerFraisLivraison();
    const grandTotal = sousTotal + fraisLivraison;

    if (sousTotalElem) sousTotalElem.textContent = `${Number(sousTotal).toLocaleString('fr-FR')} FCFA`;
    if (livraisonElem) livraisonElem.textContent = `${Number(fraisLivraison).toLocaleString('fr-FR')} FCFA`;
    if (totalElem) totalElem.textContent = `${Number(grandTotal).toLocaleString('fr-FR')} FCFA`;
}

// ==========================================
// 7. SOUMISSION ET COMMANDES WHATSAPP
// ==========================================
function traiterSoumissionCommande(event) {
    event.preventDefault();

    const nom = document.getElementById('checkout-name')?.value;
    const telephone = document.getElementById('checkout-phone')?.value;
    const region = document.getElementById('checkout-region')?.value;
    const dept = document.getElementById('checkout-dept')?.value;
    const commune = document.getElementById('checkout-commune')?.value;
    const modePaiement = document.querySelector('input[name="payment_method"]:checked')?.value || 'Wave';

    const itemsAchetes = modeAchatDirect ? [produitDirectEnCours] : panier;
    const fraisLivraison = calculerFraisLivraison();
    const sousTotal = itemsAchetes.reduce((acc, item) => acc + (item.price * item.quantite), 0);
    const totalGeneral = sousTotal + fraisLivraison;

    const payloadCommande = {
        client: { nom, telephone, region, departement: dept, commune },
        articles: itemsAchetes,
        tarification: { sousTotal, fraisLivraison, totalGeneral },
        modePaiement
    };

    envoyerViaWhatsApp(payloadCommande);
}

function envoyerViaWhatsApp(commande) {
    const numeroWhatsApp = "221770000000";
    let texteWhatsApp = `*NOUVELLE COMMANDE DOUX-DOUX*\n\n`;
    texteWhatsApp += `*Client :* ${commande.client.nom}\n`;
    texteWhatsApp += `*Téléphone :* ${commande.client.telephone}\n`;
    texteWhatsApp += `*Adresse :* ${commande.client.commune}, ${commande.client.departement}, ${commande.client.region}\n\n`;
    texteWhatsApp += `*Articles :*\n`;

    commande.articles.forEach(art => {
        texteWhatsApp += `- ${art.name} (x${art.quantite}) : ${Number(art.price * art.quantite).toLocaleString('fr-FR')} FCFA\n`;
    });

    texteWhatsApp += `\n*Sous-total :* ${Number(commande.tarification.sousTotal).toLocaleString('fr-FR')} FCFA\n`;
    texteWhatsApp += `*Frais livraison :* ${Number(commande.tarification.fraisLivraison).toLocaleString('fr-FR')} FCFA\n`;
    texteWhatsApp += `*TOTAL À PAYER :* ${Number(commande.tarification.totalGeneral).toLocaleString('fr-FR')} FCFA\n`;
    texteWhatsApp += `*Mode de paiement :* ${commande.modePaiement}\n`;

    const urlFinale = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texteWhatsApp)}`;
    window.open(urlFinale, '_blank');
    
    reinitialiserApresCommande();
}

function reinitialiserApresCommande() {
    if (!modeAchatDirect) {
        panier = [];
        maintienCompteurPanier();
    }
    modeAchatDirect = false;
    produitDirectEnCours = null;
    fermerModalCommande();
}

// ==========================================
// 8. MODALES D'INFORMATION ET MENUS
// ==========================================
function ouvrirInfo(type) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    if (!modal || !modalBody) return;
    
    let contenu = '';

    if (type === 'commandes') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-box-open" style="font-size: 40px; color: #f97316; margin-bottom: 15px;"></i>
                <h3>Suivi de commande Doux-Doux</h3>
                <p>Retrouvez vos livraisons programmées à Dakar et dans toutes les régions du Sénégal.</p>
                <button style="background:#ffd814; border:1px solid #fcd200; padding:10px 20px; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="window.location.href='login.html'">Mon compte</button>
            </div>`;
    } else if (type === 'vendre') {
        contenu = `
            <div>
                <h3 style="text-align: center;">Devenir Vendeur sur Doux-Doux</h3>
                <p style="font-size:14px; text-align:center; color:#555;">Exposez vos créations et vêtements auprès de milliers de clients au Sénégal.</p>
                <form id="form-vendeur" style="display:flex; flex-direction:column; gap:12px; margin-top:15px;">
                    <input type="text" placeholder="Nom de votre boutique / marque" required style="padding:10px; border:1px solid #ccc; border-radius:4px;">
                    <input type="tel" placeholder="Numéro Téléphone (Wave / OM)" required style="padding:10px; border:1px solid #ccc; border-radius:4px;">
                    <select style="padding:10px; border:1px solid #ccc; border-radius:4px;" required>
                        <option value="">Sélectionnez votre activité principale</option>
                        <option value="couture">Couture / Stylisme (Bazin, Wax, Boubou)</option>
                        <option value="pret-a-porter">Prêt-à-porter & Accessoires</option>
                        <option value="grossiste">Vente en Gros / Haul</option>
                    </select>
                    <button type="button" onclick="alert('Demande envoyée ! Notre équipe vous contactera.')" style="background:#11998e; color:white; border:none; padding:12px; border-radius:4px; font-weight:bold; cursor:pointer;">Soumettre ma candidature</button>
                </form>
            </div>`;
    } else if (type === 'aide') {
        contenu = `
            <div>
                <h3 style="text-align:center;"><i class="fas fa-headset" style="color:#007185;"></i> Centre d'Aide Doux-Doux</h3>
                <p style="font-size:14px; color:#444; line-height:1.5;">Besoin d'assistance pour passer commande ou suivre une livraison ?</p>
                <ul style="font-size:13px; color:#333; padding-left:20px; line-height:1.8;">
                    <li><strong>Paiements acceptés :</strong> Wave & Orange Money (OM).</li>
                    <li><strong>Délais Dakar :</strong> Livraison en 24h.</li>
                    <li><strong>Délais Régions :</strong> 48h à 72h via nos réseaux de transport partenaires.</li>
                </ul>
            </div>`;
    }

    modalBody.innerHTML = contenu;
    modal.style.display = 'flex';
}

function fermerInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = 'none';
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    filtrerProduits('toutes');
});
