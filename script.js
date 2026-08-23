// ==========================================
// 1. VARIABLES, ÉTAT GLOBAL ET CONFIGURATION API
// ==========================================
const API_URL = "https://doux-doux-backend.onrender.com/api";
let panier = [];
let slideIndex = 0;
let indexSlide = 0;
let produitsStockesLocale = []; 
let modeAchatDirect = false; 
let produitDirectEnCours = null;

// ==========================================
// BASE DE DONNÉES LOCALE (50 PRODUITS AVEC NOMS & PRIX RÉELS)
// ==========================================
const PRODUITS_LOCAUX = [
    // --- TEXTILE / MODE (18 Articles) ---
    { id: 1, name: "Lot de 3 T-Shirts Coton Basiques", category: "Textile-Mode", tag: "Bas Prix", price: 4500, desc: "Ensemble de 3 t-shirts 100% coton de qualité supérieure, confortables au quotidien.", imageUrl: "https://images.pexels.com/photos/8434641/pexels-photo-8434641.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Robe de Soirée Élégante Chic", category: "Textile-Mode", tag: "Tendance", price: 18500, desc: "Robe longue fluide portée par notre mannequin, idéale pour vos événements.", imageUrl: "https://images.pexels.com/photos/2811088/pexels-photo-2811088.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Jean Slim Stretch Quotidien", category: "Textile-Mode", tag: "meilleures-ventes", price: 7500, desc: "Coupe moderne et ajustée, idéal pour les sorties décontractées.", imageUrl: "https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Costume 3 Pièces Homme Modern Fit", category: "Textile-Mode", tag: "Premium", price: 35000, desc: "Costume complet porté par notre mannequin, une coupe impeccable pour grandes occasions.", imageUrl: "https://i.pinimg.com/736x/cb/a1/38/cba138e3a241680a653ddbc7d1fa8b88.jpg" },
    { id: 5, name: "Chemise Bleue Classique Homme", category: "Textile-Mode", tag: "Bas Prix", price: 5000, desc: "Chemise repassage facile, coupe droite idéale pour le bureau ou événements.", imageUrl: "https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "Veste en Cuir Style Biker", category: "Textile-Mode", tag: "Tendance", price: 19000, desc: "Blouson en cuir de qualité avec finitions métalliques soignées.", imageUrl: "https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 7, name: "Robe d'Été Fleurie Légère", category: "Textile-Mode", tag: "Tendance", price: 6500, desc: "Robe fluide avec imprimé floral coloré, parfaite pour le quotidien.", imageUrl: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, name: "Manteau Veste Légère Laine", category: "Textile-Mode", tag: "Tendance", price: 16000, desc: "Veste courte élégante offrant confort et raffinement.", imageUrl: "https://images.pexels.com/photos/2709563/pexels-photo-2709563.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, name: "Short de Sport Respirant Quick-Dry", category: "Textile-Mode", tag: "Bas Prix", price: 3000, desc: "Short ultra-léger avec poche zippée, parfait pour le running et le fitness.", imageUrl: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 10, name: "Boubou Traditionnel VIP Brodé", category: "Textile-Mode", tag: "Exclusif", price: 28000, desc: "Magnifique ensemble tradition porté par notre mannequin, broderies artisanales.", imageUrl: "https://i.pinimg.com/1200x/b8/e8/68/b8e868eb071829bfc1d294ab8ace641b.jpg" },
    { id: 11, name: "Sweat à Capuche Oversize Cotton", category: "Textile-Mode", tag: "Streetwear", price: 7500, desc: "Hoodie molletonné coupe confortable style urbain.", imageUrl: "https://images.pexels.com/photos/2007891/pexels-photo-2007891.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 12, name: "Kimono Imprimé Satiné", category: "Textile-Mode", tag: "Promo", price: 8000, desc: "Kimono élégant à porter en veste légère ou tenue d'intérieur.", imageUrl: "https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 13, name: "Ensemble Polo & Short Casual", category: "Textile-Mode", tag: "Bas Prix", price: 6500, desc: "Ensemble deux pièces d'été moderne et décontracté.", imageUrl: "https://i.pinimg.com/736x/88/c9/b0/88c9b0ea9e4e7c6cc43401a2ad40f1f1.jpg" },
    { id: 14, name: "Jupe Plissée Longue Satinée", category: "Textile-Mode", tag: "Tendance", price: 7000, desc: "Jupe tendance taille élastique avec reflets brillants.", imageUrl: "https://images.pexels.com/photos/2229490/pexels-photo-2229490.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 15, name: "Gilet en Maille Douce", category: "Textile-Mode", tag: "Nouveauté", price: 8500, desc: "Cardigan boutonné doux au toucher et très agréable à porter.", imageUrl: "https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 16, name: "Pyjama 2 Pièces Sensation Soie", category: "Textile-Mode", tag: "Confort", price: 9000, desc: "Ensemble nuit fluide et léger pour un sommeil confortable.", imageUrl: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 17, name: "Pantalon Cargo Multi-Poches", category: "Textile-Mode", tag: "Bas Prix", price: 7500, desc: "Style street robuste avec multiples poches de rangement.", imageUrl: "https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 18, name: "Maillot de Bain Design Été", category: "Textile-Mode", tag: "Tendance", price: 6000, desc: "Maillot une pièce tendance avec finitions soignées.", imageUrl: "https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg?auto=compress&cs=tinysrgb&w=600" },

    // --- BEAUTÉ & SOINS (16 Articles) ---
    { id: 19, name: "Baume à Lèvres Hydratant Karité", category: "Beaute-Soins", tag: "Bas Prix", price: 1000, desc: "Soin protecteur naturel enrichi en vitamine E et karité pur.", imageUrl: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 20, name: "Parfum d'Ambiance Royale 100ml", category: "Beaute-Soins", tag: "Populaire", price: 12000, desc: "Fragrance envoûtante aux notes d'Oud et d'Ambre précieux.", imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80" },
    { id: 21, name: "Savon Noir Purifiant Charbon Actif", category: "Beaute-Soins", tag: "Nouveau", price: 1500, desc: "Nettoie en profondeur, élimine l'excès de sébum et les impuretés.", imageUrl: "https://images.pexels.com/photos/6621185/pexels-photo-6621185.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 22, name: "Sérum Hydratant Éclat Visage", category: "Beaute-Soins", tag: "Tendance", price: 6500, desc: "Sérum concentré à l'acide hyaluronique pour un teint frais.", imageUrl: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 23, name: "Crème Hydratante Quotidienne 50ml", category: "Beaute-Soins", tag: "Bas Prix", price: 3000, desc: "Hydratation 24h texture légère pour tous types de peaux.", imageUrl: "https://images.pexels.com/photos/3762871/pexels-photo-3762871.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 24, name: "Coffret Maquillage Complete Palette", category: "Beaute-Soins", tag: "meilleures-ventes", price: 9500, desc: "Palette complète fards à paupières, blush et rouges à lèvres.", imageUrl: "https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 25, name: "Huile Nourrissante Cheveux & Argan", category: "Beaute-Soins", tag: "Bas Prix", price: 2500, desc: "Mélange d'huiles d'Argan et de Jojoba pour des cheveux brillants.", imageUrl: "https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 26, name: "Coffret Soin Visage Spa Hydratation", category: "Beaute-Soins", tag: "Pack-Eco", price: 14000, desc: "Routine complète : nettoyant, sérum, crème et masque soin.", imageUrl: "https://images.pexels.com/photos/3762873/pexels-photo-3762873.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 27, name: "Gel Douche Énergisant Aloe Vera", category: "Beaute-Soins", tag: "Bas Prix", price: 2000, desc: "Aux extraits d'agrumes et d'aloe vera pour rafraîchir la peau.", imageUrl: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 28, name: "Lisseur Céramique Professionnel", category: "Beaute-Soins", tag: "Pro", price: 12000, desc: "Chauffe rapide et technologie protectrice pour la fibre capillaire.", imageUrl: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 29, name: "Vernis à Ongles Gel Longue Tenue", category: "Beaute-Soins", tag: "Bas Prix", price: 1000, desc: "Finition brillante tenue longue durée sans lampe.", imageUrl: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 30, name: "Rouge à Lèvres Mat Longue Tenue", category: "Beaute-Soins", tag: "Tendance", price: 2500, desc: "Couleur haute pigmentation qui ne dessèche pas les lèvres.", imageUrl: "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 31, name: "Sèche-Cheveux Ionique Silencieux", category: "Beaute-Soins", tag: "Pratique", price: 15000, desc: "Séchage ultra-rapide avec contrôle de la chaleur.", imageUrl: "https://images.pexels.com/photos/3762877/pexels-photo-3762877.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 32, name: "Masque Argile Purifiant Visage", category: "Beaute-Soins", tag: "Bas Prix", price: 1500, desc: "Resserre les pores et affine le grain de peau.", imageUrl: "https://images.pexels.com/photos/3762880/pexels-photo-3762880.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 33, name: "Eau de Toilette Fraîcheur Marine 100ml", category: "Beaute-Soins", tag: "Populaire", price: 8500, desc: "Senteur dynamique et fraîche idéale pour la journée.", imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
    { id: 34, name: "Kit Pinceaux de Maquillage (12 pcs)", category: "Beaute-Soins", tag: "Bas Prix", price: 3500, desc: "Poils synthétiques très doux pour un maquillage réussi.", imageUrl: "https://images.pexels.com/photos/3762867/pexels-photo-3762867.jpeg?auto=compress&cs=tinysrgb&w=600" },

    // --- ACCESSOIRES / ÉQUIPEMENT (16 Articles) ---
    { id: 35, name: "Casquette Urban Street Coton", category: "Equipement", tag: "Bas Prix", price: 2500, desc: "Casquette ajustable 100% coton avec broderie discrète.", imageUrl: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg" },
    { id: 36, name: "Montre Chronographe Bracelet Acier", category: "Equipement", tag: "Tendance", price: 14500, desc: "Cadran élégant avec verre résistant et bracelet réglable.", imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 37, name: "Lunettes de Soleil UV400 Style", category: "Equipement", tag: "meilleures-ventes", price: 3500, desc: "Monture légère et verres protecteurs anti-éblouissement.", imageUrl: "https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 38, name: "Sac à Main Élégant Maroquinerie", category: "Equipement", tag: "Tendance", price: 12500, desc: "Sac structuré finitions soignées avec bandoulière.", imageUrl: "https://images.pexels.com/photos/2811088/pexels-photo-2811088.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 39, name: "Ceinture Reversible Noir & Marron", category: "Equipement", tag: "Bas Prix", price: 2500, desc: "Double face avec boucle classique argentée résistant.", imageUrl: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 40, name: "Baskets Sneakers Urban Fashion", category: "Equipement", tag: "Streetwear", price: 13500, desc: "Baskets légères et confortables au style dynamique.", imageUrl: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg" },
    { id: 41, name: "Portefeuille Compact Mince Anti-RFID", category: "Equipement", tag: "Bas Prix", price: 2000, desc: "Protège vos cartes bancaires avec plusieurs rangements.", imageUrl: "https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 42, name: "Collier Pendentif Fin Argent 925", category: "Equipement", tag: "Élégance", price: 5500, desc: "Chaine fine avec pendentif scintillant.", imageUrl: "https://images.pexels.com/photos/2709563/pexels-photo-2709563.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 43, name: "Sac à Dos Voyage & Ordinateur USB", category: "Equipement", tag: "Pratique", price: 8500, desc: "Sac renforcé imperméable idéal pour trajets et voyages.", imageUrl: "https://images.pexels.com/photos/2007891/pexels-photo-2007891.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 44, name: "Lunettes de Soleil Cadre Doré", category: "Equipement", tag: "Tendance", price: 4500, desc: "Style vintage chic avec monture dorée et verres teintés.", imageUrl: "https://i.pinimg.com/1200x/16/26/ad/1626adbfdb78ffee1c87ea8d6b6f8bf2.jpg" },
    { id: 45, name: "Chapeau de Paille Plage & Été", category: "Equipement", tag: "Bas Prix", price: 3000, desc: "Protection solaire élégante pour la plage et promenades.", imageUrl: "https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 46, name: "Montre Homme Business Cadran Noir", category: "Equipement", tag: "Tendance", price: 9500, desc: "Monture en acier inoxydable noire avec affichage date.", imageUrl: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg" },
    { id: 47, name: "Mocassins Homme Style Suédé", category: "Equipement", tag: "Style", price: 11000, desc: "Mocassins souples et élégants pour tenue décontractée.", imageUrl: "https://i.pinimg.com/736x/dd/6f/8e/dd6f8e15d9d0cdac861883f68635292f.jpg" },
    { id: 48, name: "Sandales Plates Légères", category: "Equipement", tag: "Bas Prix", price: 4500, desc: "Sandales de ville très confortables pour les chaudes journées.", imageUrl: "https://i.pinimg.com/736x/19/6a/aa/196aaa7740e1ae0ce8307ebbe3cbad38.jpg" },
    { id: 49, name: "Gants Souples en Cuir Fin", category: "Equipement", tag: "Accessoire", price: 6000, desc: "Accessoire élégant au toucher doux et finitions soignées.", imageUrl: "https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 50, name: "Bracelet Perles Pierres Naturelles", category: "Equipement", tag: "Bas Prix", price: 2000, desc: "Bracelet élastique mixte très tendance.", imageUrl: "https://i.pinimg.com/736x/b6/e0/9e/b6e09e5c7f64645d63effe981b5e2732.jpg" }
];

// ==========================================
// 2. CHARGEMENT DYNAMIQUE DEPUIS LE BACKEND
// ==========================================
async function fetchProductsFromBackend() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Réponse réseau non OK");
        const products = await response.json();
        
        if (products && Array.isArray(products) && products.length > 0) {
            produitsStockesLocale = products; 
            return products;
        } else {
            console.warn("Backend vide ou indisponible. Activation du catalogue local de secours.");
            produitsStockesLocale = PRODUITS_LOCAUX;
            return PRODUITS_LOCAUX;
        }
    } catch (error) {
        console.warn("Serveur backend indisponible. Activation des 50 produits locaux :", error);
        produitsStockesLocale = PRODUITS_LOCAUX;
        return PRODUITS_LOCAUX; 
    }
}

// ==========================================
// 3. FONCTIONS D'AFFICHAGE ET FILTRAGE (AVEC SÉCURISATION DES NOMS ET PRIX)
// ==========================================
async function filtrerProduits(categorie) {
    const grille = document.getElementById("productGrid");
    const grilleVenteFlash = document.getElementById("venteFlashGrid");
    const grilleHaul = document.getElementById("haulGrid");

    if (grille) grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Chargement du catalogue Doux-Doux...</p>";
    if (grilleVenteFlash) grilleVenteFlash.innerHTML = "";
    if (grilleHaul) grilleHaul.innerHTML = "";

    const catalogue = await fetchProductsFromBackend();

    if (!catalogue || catalogue.length === 0) {
        if (grille) grille.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Impossible de charger les produits.</p>";
        return;
    }

    if (grille) grille.innerHTML = ""; 

    const titreSection = document.getElementById('section-title');
    if (titreSection) {
        titreSection.scrollIntoView({ behavior: 'smooth' });
        if (categorie === 'Toutes' || categorie === 'all' || !categorie) {
            titreSection.innerText = "Notre Catalogue Complet";
            gererZoneBanniereSpeciale(null);
        } else if (categorie.toLowerCase() === 'doux-doux-basics' || categorie.toLowerCase() === 'basics') {
            titreSection.innerText = "✨ Gamme Doux-Doux Basics";
            gererZoneBanniereSpeciale('basics');
        } else if (categorie.toLowerCase() === 'doux-doux-haul' || categorie.toLowerCase() === 'haul') {
            titreSection.innerText = "📦 Collection Doux-Doux Haul";
            gererZoneBanniereSpeciale('haul');
        } else if (categorie.toLowerCase() === 'ventes-flash' || categorie.toLowerCase() === 'flash') {
            titreSection.innerText = "⚡ Ventes Flash (Offres limitées)";
            gererZoneBanniereSpeciale(null);
        } else if (categorie.toLowerCase() === 'meilleures-ventes' || categorie.toLowerCase() === 'meilleures') {
            titreSection.innerText = "🔥 Meilleures Ventes";
            gererZoneBanniereSpeciale(null);
        } else {
            titreSection.innerText = `Catégorie : ${categorie}`;
            gererZoneBanniereSpeciale(null);
        }
    }

    const produitsAffiches = (categorie === 'Toutes' || categorie === 'Toutes les catégories' || categorie === 'all' || !categorie) 
        ? catalogue 
        : catalogue.filter(p => {
            const cat = (p.category || p.cat || p.categorie || "").toLowerCase().trim();
            const tag = (p.tag || "").toLowerCase().trim();
            const cible = categorie.toLowerCase().trim();
            return cat === cible || cat.includes(cible) || cible.includes(cat) || tag === cible || (p.tags && p.tags.includes(cible));
        });

    let blockActuel = null;
    let compteurDansBlock = 0;
    let indexBlockGlobal = 0;

    produitsAffiches.forEach(p => {
        // Extraction sécurisée des images, noms et prix réels
        const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
        const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
            ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
            : imageBrute;

        // VÉRIFICATION CORRIGÉE : Évite l'affichage d'un numéro d'index ou d'un 0
        const nomProduit = p.name || p.nom || p.title || p.titre || "Article Doux-Doux";
        const prixProduit = p.price || p.prix || p.tarif || 0;
        const categorieProduit = p.category || p.cat || p.categorie || 'Général';
        const uniqueId = p._id || p.id;

        const carte = document.createElement('div');
        carte.className = "product-card";
        carte.setAttribute("data-name", nomProduit);
        carte.style.cursor = "pointer";
        carte.onclick = () => ouvrirDetailProduit(uniqueId);

        carte.innerHTML = `
            <div class="product-image">
                <img src="${imageAffichage}" alt="${nomProduit}">
            </div>
            <div class="product-info">
                <span class="category-tag">${categorieProduit}</span>
                <h3 class="product-title">${nomProduit}</h3>
                <p class="product-price"><strong>${Number(prixProduit).toLocaleString()} FCFA</strong></p>
            </div>`;
            
        if (categorieProduit === "Vente Flash") {
            if (grilleVenteFlash) grilleVenteFlash.appendChild(carte);
        } else if (categorieProduit === "Haul") {
            if (grilleHaul) grilleHaul.appendChild(carte);
        } else {
            if (grille) {
                if (compteurDansBlock === 0) {
                    blockActuel = document.createElement('div');
                    blockActuel.className = "product-block-4";
                    grille.appendChild(blockActuel);
                }

                blockActuel.appendChild(carte);
                compteurDansBlock++;

                if (compteurDansBlock === 4) {
                    compteurDansBlock = 0;
                    indexBlockGlobal++;

                    if (indexBlockGlobal === 1) {
                        const sponsorise = document.createElement('div');
                        sponsorise.className = "sponsored-block";
                        sponsorise.innerHTML = `
                            <div class="sponsored-card" onclick="ouvrirDetailProduit('${uniqueId}')">
                                <div class="sponsored-badge">Sponsorisé ℹ</div>
                                <img src="https://images.weserv.nl/?url=https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600" alt="Huile de Baobab">
                                <div class="sponsored-info">
                                    <h4>Huile de Baobab Purifiante - Doux-Doux</h4>
                                    <p class="sponsored-desc font-text">Soin naturel pressé à froid pour nourrir votre peau.</p>
                                </div>
                            </div>`;
                        grille.appendChild(sponsorise);
                    } else if (indexBlockGlobal === 2) {
                        const infoBlock = document.createElement('div');
                        infoBlock.className = "info-block-separator";
                        infoBlock.innerHTML = `
                            <div class="info-box-delivery">
                                <span class="delivery-icon">🇸🇳</span>
                                <p><strong>Paiement à la livraison :</strong> Commandez en toute sécurité et payez une fois votre colis entre vos mains !</p>
                            </div>`;
                        grille.appendChild(infoBlock);
                    } else if (indexBlockGlobal === 3) {
                        const infoBlock2 = document.createElement('div');
                        infoBlock2.className = "info-block-separator";
                        infoBlock2.innerHTML = `
                            <div class="info-box-delivery help-whatsapp">
                                <span class="delivery-icon">💬</span>
                                <p><strong>Besoin d'aide ?</strong> Des questions sur un produit ? Écrivez-nous directement sur WhatsApp !</p>
                            </div>`;
                        grille.appendChild(infoBlock2);
                    } else {
                        const espaceur = document.createElement('div');
                        espaceur.className = "block-spacer";
                        grille.appendChild(espaceur);
                    }
                }
            }
        }
    });
}

// ==========================================
// 4. INJECTION DE BANNIÈRES DE SOUS-PAGES
// ==========================================
function gererZoneBanniereSpeciale(boutique) {
    const zone = document.getElementById('zone-banniere-speciale');
    if (!zone) return;

    if (boutique === 'basics') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #3a7bd5, #3a6073); color: white; padding: 25px; border-radius: 4px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">👕 Boutique Doux-Doux Basics</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #f0f4f8;">Vos vêtements essentiels de tous les jours au meilleur prix au Sénégal.</p>
                <div style="display: flex; gap: 15px; font-size: 13px;">
                    <span style="font-weight: bold; cursor: pointer; border-bottom: 2px solid white;" onclick="filtrerProduits('basics')">Tout voir</span>
                    <span style="cursor: pointer; opacity: 0.8;" onclick="filtrerProduits('Hommes')">Hommes</span>
                    <span style="cursor: pointer; opacity: 0.8;" onclick="filtrerProduits('Femmes')">Femmes</span>
                    <span style="cursor: pointer; opacity: 0.8;" onclick="filtrerProduits('Enfants')">Enfants</span>
                </div>
            </div>`;
    } else if (boutique === 'haul') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #f12711, #f5af19); color: white; padding: 25px; border-radius: 4px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">📦 Doux-Doux Haul - Super Packs</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #fff3e0;">Achetez en gros volumes et faites d'immenses économies sur vos cartons de livraison.</p>
                <div style="display: flex; gap: 15px; font-size: 13px;">
                    <span style="font-weight: bold; cursor: pointer; border-bottom: 2px solid white;" onclick="filtrerProduits('haul')">Packs Populaires</span>
                    <span style="cursor: pointer; opacity: 0.8;" onclick="filtrerProduits('Alimentation')">Packs Épicerie</span>
                    <span style="cursor: pointer; opacity: 0.8;" onclick="filtrerProduits('Equipement')">Packs Maison</span>
                </div>
            </div>`;
    } else {
        zone.innerHTML = "";
    }
}

// ==========================================
// 5. SYSTÈME DE VUE DÉTAILLÉE (MODALE PRODUIT)
// ==========================================
function ouvrirDetailProduit(id) {
    const produit = produitsStockesLocale.find(p => (p._id === id || p.id === id));
    if (!produit) return;

    const imageBrute = produit.imageUrl || produit.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
    const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
        : imageBrute;

    const nomProduit = produit.name || produit.nom || produit.title || produit.titre || "Article Doux-Doux";
    const prixProduit = produit.price || produit.prix || produit.tarif || 0;
    const descProduit = produit.desc || produit.description || "Aucune description disponible pour cet article Doux-Doux.";
    const tagProduit = (produit.tag || "").toLowerCase();

    if (document.getElementById('modal-product-img')) document.getElementById('modal-product-img').src = imageAffichage;
    if (document.getElementById('modal-product-title')) document.getElementById('modal-product-title').innerText = nomProduit;
    if (document.getElementById('modal-product-category')) document.getElementById('modal-product-category').innerText = `Catégorie : ${produit.category || produit.cat || produit.categorie || 'Général'}`;
    if (document.getElementById('modal-product-price')) document.getElementById('modal-product-price').innerText = `${Number(prixProduit).toLocaleString()} FCFA`;
    if (document.getElementById('modal-product-desc')) document.getElementById('modal-product-desc').innerText = descProduit;
    
    const badge = document.getElementById('modal-product-badge');
    if (badge) {
        if (tagProduit === 'flash' || tagProduit === 'ventes-flash') {
            badge.innerText = "⚡ Vente Flash";
            badge.style.background = "#e47911";
        } else if (tagProduit === 'meilleures' || tagProduit === 'meilleures-ventes') {
            badge.innerText = "🔥 Top Ventes";
            badge.style.background = "#b12704";
        } else {
            badge.innerText = "Nouveau";
            badge.style.background = "#007185";
        }
    }

    const btnModalPanier = document.getElementById('modal-add-to-cart-btn');
    if (btnModalPanier) {
        btnModalPanier.onclick = () => {
            ajouterAuPanier(nomProduit, prixProduit);
            fermerDetailProduit();
        };
    }

    const btnDirectBuy = document.getElementById('modal-direct-buy-btn');
    if (btnDirectBuy) {
        btnDirectBuy.onclick = () => {
            fermerDetailProduit();
            ouvrirPaiementDirect(nomProduit, prixProduit);
        };
    }

    const modalDetail = document.getElementById('product-detail-modal');
    if (modalDetail) modalDetail.style.display = "flex";
}

function fermerDetailProduit() {
    const modalDetail = document.getElementById('product-detail-modal');
    if (modalDetail) modalDetail.style.display = "none";
}

// ==========================================
// 6. PANIER LATÉRAL COULISSANT
// ==========================================
function toggleCartSidebar() {
    const sidebar = document.getElementById("cartSidebar");
    if (!sidebar) return;
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-400px";
    } else {
        sidebar.style.right = "0px";
        renderCartSidebar();
    }
}

function ajouterAuPanier(titre, prix) {
    panier.push({ titre: titre, prix: Number(prix) });
    moteurMettreAJourBadgesPanier();
    renderCartSidebar();
    alert(`${titre} ajouté au panier ! 🛒`);
}

function moteurMettreAJourBadgesPanier() {
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = panier.length;

    const tousLesCompteurs = document.querySelectorAll('.cart-badge-count');
    tousLesCompteurs.forEach(badge => {
        badge.innerText = panier.length;
    });
}

function renderCartSidebar() {
    const container = document.getElementById("cartSidebarItems");
    const totalLabel = document.getElementById("cartSidebarTotal");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    if (panier.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#565959; margin-top:40px;'>Votre panier Doux-Doux est vide.</p>";
        if (totalLabel) totalLabel.innerText = "0 FCFA";
        return;
    }

    panier.forEach((item, index) => {
        total += item.prix;
        const row = document.createElement("div");
        row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e7e7e7; padding-bottom:10px; margin-bottom:10px;";
        row.innerHTML = `
            <div style="max-width:220px;">
                <p style="margin:0; font-size:13px; font-weight:bold; color:#111; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${item.titre}</p>
                <p style="margin:3px 0 0 0; font-size:13px; color:#B12704; font-weight:bold;">${item.prix.toLocaleString()} FCFA</p>
            </div>
            <button onclick="retirerDuPanier(${index})" style="background:none; border:none; color:#007185; cursor:pointer; font-size:12px;"><i class="fas fa-trash"></i> Supprimer</button>
        `;
        container.appendChild(row);
    });

    if (totalLabel) totalLabel.innerText = `${total.toLocaleString()} FCFA`;
}

function retirerDuPanier(index) {
    panier.splice(index, 1);
    moteurMettreAJourBadgesPanier();
    renderCartSidebar();
}

function viderLePanierComplete() {
    panier = [];
    moteurMettreAJourBadgesPanier();
    renderCartSidebar();
}

// ==========================================
// 7. TUNNEL DE COMMANDE INTÉGRÉ
// ==========================================
function ouvrirPaiementDirect(titre, prix) {
    modeAchatDirect = true;
    produitDirectEnCours = { titre, prix };
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        if (document.getElementById('modal-product-name')) document.getElementById('modal-product-name').innerText = titre;
        if (document.getElementById('modal-order-total-price')) document.getElementById('modal-order-total-price').innerText = `${Number(prix).toLocaleString()} FCFA`;
    }
}

function procederAuPaiementPanier() {
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }
    modeAchatDirect = false;
    toggleCartSidebar(); 
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        const listeTitres = panier.map(p => p.titre).join(', ');
        let totalPanier = panier.reduce((sum, item) => sum + item.prix, 0);

        if (document.getElementById('modal-product-name')) document.getElementById('modal-product-name').innerText = `Commande groupée (${panier.length} articles : ${listeTitres})`;
        if (document.getElementById('modal-order-total-price')) document.getElementById('modal-order-total-price').innerText = `${totalPanier.toLocaleString()} FCFA`;
    }
}

function closePayment() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 8. CARTE ET LOCALISATION DU SÉNÉGAL (14 RÉGIONS)
// ==========================================
const senegalMap = {
    "Dakar": {
        "Dakar": ["Plateau", "Médina", "Fass-Colobane", "Fann-Point E", "Gorée", "Grand Dakar", "Biscuiterie", "HLM", "Hann Bel-Air", "Sicap Liberté", "Dieuppeul-Derklé", "Grand Yoff", "Patte d'Oie", "Parcelles Assainies", "Cambérène", "Ngor", "Ouakam", "Yoff", "Mermoz-Sacré-Cœur"],
        "Guédiawaye": ["Golf Sud", "Sam Notaire", "Ndiarème Limamoulaye", "Wakhinane Nimzatt", "Médina Gounass"],
        "Pikine": ["Pikine Est", "Pikine Nord", "Pikine Ouest", "Dalifort", "Djidah Thiaroye Kao", "Guinaw Rail Nord", "Guinaw Rail Sud", "Tivaouane Diacksao", "Diamaguène Sicap Mbao", "Mbao", "Thiaroye-sur-Mer", "Thiaroye Gare"],
        "Rufisque": ["Rufisque Est", "Rufisque Nord", "Rufisque Ouest", "Bargny", "Sendou", "Diamniadio", "Sébikotane", "Sangalkam", "Bambylor", "Yène", "Tivaouane Peulh-Niaga"],
        "Keur Massar": ["Keur Massar Nord", "Keur Massar Sud", "Malika", "Yeumbeul Nord", "Yeumbeul Sud", "Jaxaay-Parcelles"]
    },
    "Thiès": {
        "Thiès": ["Thiès Est", "Thiès Nord", "Thiès Ouest", "Khombole", "Pout", "Keur Moussa", "Fandène"],
        "Mbour": ["Mbour", "Joal-Fadiouth", "Saly Portudal", "Ngaparou", "Somone", "Nguékhokh", "Diass", "Sindia", "Malicounda"],
        "Tivaouane": ["Tivaouane", "Mékhé", "Mboro", "Darou Khoudoss", "Taïba Ndiaye"]
    },
    "Diourbel": {
        "Diourbel": ["Diourbel", "Ndindy", "Ndoulo", "Tocky Gare"],
        "Bambey": ["Bambey", "Baba Garage", "Lambaye", "Ngogom", "Réfane"],
        "Mbacké": ["Mbacké", "Touba Mosquée", "Touba Fall", "Taïf", "Sadio"]
    },
    "Saint-Louis": {
        "Saint-Louis": ["Saint-Louis", "Mpal", "Gandon", "Fass Ngom"],
        "Dagana": ["Dagana", "Richard-Toll", "Rosso Sénégal", "Ross Béthio", "Mbane"],
        "Podor": ["Podor", "Ndioum", "Mboumba", "Guédé Chantier", "Aéré Lao"]
    },
    "Fatick": {
        "Fatick": ["Fatick", "Diofior", "Niakhar", "Fimela", "Tattaguine"],
        "Foundiougne": ["Foundiougne", "Passy", "Sokone", "Karang Poste", "Toubacouta"],
        "Gossas": ["Gossas", "Colobane", "Mbar"]
    },
    "Kaolack": {
        "Kaolack": ["Kaolack", "Gandiaye", "Kahone", "Ndoffane"],
        "Nioro du Rip": ["Nioro du Rip", "Keur Madiabel", "Porokhane", "Médina Sabakh"],
        "Guinguinéo": ["Guinguinéo", "Mboss", "Fass"]
    },
    "Ziguinchor": {
        "Ziguinchor": ["Ziguinchor", "Niaguis", "Adéane", "Enampore"],
        "Bignona": ["Bignona", "Thionck-Essyl", "Diouloulou", "Kafountine", "Abéné"],
        "Oussouye": ["Oussouye", "Cap Skirring", "Mlomp"]
    },
    "Louga": {
        "Louga": ["Louga", "Coki", "Sakal", "Léona"],
        "Kébémer": ["Kébémer", "Guéoul", "Ndande", "Sagatta Gueth"],
        "Linguère": ["Linguère", "Dahra", "Barkédji", "Yang-Yang"]
    },
    "Tambacounda": {
        "Tambacounda": ["Tambacounda", "Missirah", "Sinthiou Malème"],
        "Bakel": ["Bakel", "Kidira", "Diawara"],
        "Goudiry": ["Goudiry", "Bala", "Koussan"],
        "Koumpentoum": ["Koumpentoum", "Malem Niani"]
    },
    "Matam": {
        "Matam": ["Matam", "Ourossogui", "Thilogne", "Agnam Civol"],
        "Kanel": ["Kanel", "Waoundé", "Semmé", "Orkadiéré"],
        "Ranérou": ["Ranérou", "Vélingara Ferlo"]
    },
    "Kolda": {
        "Kolda": ["Kolda", "Dabo", "Salikégné", "Saré Bidji"],
        "Vélingara": ["Vélingara", "Kounkané", "Diaobé-Kabendou", "Médina Gounass"],
        "Médina Yoro Foulah": ["Médina Yoro Foulah", "Pata"]
    },
    "Kaffrine": {
        "Kaffrine": ["Kaffrine", "Nganda", "Birkelane"],
        "Koungheul": ["Koungheul", "Missirah Wadène"],
        "Malem Hodar": ["Malem Hodar", "Sagna"]
    },
    "Sédhiou": {
        "Sédhiou": ["Sédhiou", "Marsassoum", "Bambali"],
        "Bounkiling": ["Bounkiling", "Madina Wandifa"],
        "Goudomp": ["Goudomp", "Tanaff"]
    },
    "Kédougou": {
        "Kédougou": ["Kédougou", "Bandafassi", "Salémata"],
        "Saraya": ["Saraya", "Sabodala", "Bembou"]
    }
};

function chargerDepartements() {
    const regionSelect = document.getElementById('select-region');
    const deptSelect = document.getElementById('select-departement');
    const commSelect = document.getElementById('select-commune');

    if (!regionSelect || !deptSelect || !commSelect) return;

    const region = regionSelect.value;
    deptSelect.innerHTML = '<option value="">-- Département --</option>';
    commSelect.innerHTML = '<option value="">-- Commune --</option>';
    commSelect.style.display = "none";

    if (region && senegalMap[region]) {
        deptSelect.style.display = "inline-block"; 
        for (let dept in senegalMap[region]) {
            let opt = document.createElement("option");
            opt.value = dept;
            opt.textContent = dept;
            deptSelect.appendChild(opt);
        }
    } else {
        deptSelect.style.display = "none";
    }
}

function chargerCommunes() {
    const regionSelect = document.getElementById('select-region');
    const deptSelect = document.getElementById('select-departement');
    const commSelect = document.getElementById('select-commune');

    if (!regionSelect || !deptSelect || !commSelect) return;

    const region = regionSelect.value;
    const dept = deptSelect.value;

    commSelect.innerHTML = '<option value="">-- Commune / Quartier --</option>';

    if (dept && senegalMap[region] && senegalMap[region][dept]) {
        commSelect.style.display = "inline-block";
        senegalMap[region][dept].forEach(commune => {
            let opt = document.createElement("option");
            opt.value = commune;
            opt.textContent = commune;
            commSelect.appendChild(opt);
        });
    } else {
        commSelect.style.display = "none";
    }
}

// ==========================================
// 9. SLIDERS D'ACCUEIL
// ==========================================
function moveSlide(n) {
    const slidesContainer = document.querySelector('.slides');
    const allSlides = document.querySelectorAll('.slide');
    if (!slidesContainer || allSlides.length === 0) return;

    slideIndex += n;
    if (slideIndex >= allSlides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = allSlides.length - 1;

    slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function afficherSlide(index) {
    const slidesContainer = document.getElementById("sliderSlides");
    if (!slidesContainer) return;

    const totalSlides = 3; 
    if (index >= totalSlides) indexSlide = 0;
    if (index < 0) indexSlide = totalSlides - 1;

    slidesContainer.style.transform = `translateX(-${indexSlide * (100 / totalSlides)}%)`;
}

function slideSuivante() {
    if (!document.getElementById("sliderSlides")) return;
    indexSlide++;
    afficherSlide(indexSlide);
}

function slidePrecedente() {
    if (!document.getElementById("sliderSlides")) return;
    indexSlide--;
    afficherSlide(indexSlide);
}

setInterval(() => { slideSuivante(); }, 5000);

// ==========================================
// 10. MENUS BURGER ET CONFIGURATION MODALES
// ==========================================
function openNav() {
    const nav = document.getElementById("mySidenav");
    const overlay = document.getElementById("side-overlay");
    if (nav) nav.style.width = "350px";
    if (overlay) overlay.style.display = "block";
}

function closeNav() {
    const nav = document.getElementById("mySidenav");
    const overlay = document.getElementById("side-overlay");
    if (nav) nav.style.width = "0";
    if (overlay) overlay.style.display = "none";
}

function ouvrirInfo(type) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    if (!modal || !modalBody) return;
    
    let contenu = '';

    if (type === 'commandes') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-box-open" style="font-size: 40px; color: #f97316; margin-bottom: 15px;"></i>
                <h3>Suivi des commandes & Retours</h3>
                <p>Connectez-vous à votre espace client pour gérer vos livraisons en cours au Sénégal.</p>
                <button style="background:#ffd814; border:1px solid #fcd200; padding:10px 20px; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="window.location.href='login.html'">Accéder à mon espace</button>
            </div>`;
    } else if (type === 'vendre') {
        contenu = `
            <div>
                <h3 style="text-align: center;">Devenir Vendeur Doux-Doux</h3>
                <form id="sellerForm" onsubmit="event.preventDefault(); alert('Demande reçue !'); fermerInfo();">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Nom de la boutique</label>
                    <input type="text" required style="width:100%; padding:8px; margin-bottom:12px; box-sizing:border-box;">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Téléphone</label>
                    <input type="tel" required style="width:100%; padding:8px; margin-bottom:15px; box-sizing:border-box;">
                    <button type="submit" style="width:100%; background:#ffd814; border:none; padding:10px; font-weight:bold; cursor:pointer; border-radius:4px;">Envoyer</button>
                </form>
            </div>`;
    } else if (type === 'guide') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-book-open" style="font-size:40px; color:#0066c0; margin-bottom:15px;"></i>
                <h3>Guide de l'acheteur</h3>
                <p style="font-size:13px; text-align:left; color:#4b5563;">1. Sélectionnez vos articles.<br>2. Validez le panier.<br>3. Payez via Wave ou Orange Money.</p>
            </div>`;
    }
    modalBody.innerHTML = contenu;
    modal.style.display = "flex";
}

function fermerInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = "none";
}

// ==========================================
// 11. GESTION DES REQUÊTES ET COMMANDE
// ==========================================
async function finaliserEtEnvoyerCommande(methodePaiement) {
    const nom = document.getElementById('client-name')?.value.trim();
    const telephone = document.getElementById('client-phone')?.value.trim();
    const region = document.getElementById('select-region')?.value;
    const departement = document.getElementById('select-departement')?.value;
    const commune = document.getElementById('select-commune')?.value;

    if (!nom || !telephone || !region || !departement || !commune) {
        alert("Veuillez remplir l'intégralité des informations de livraison locale.");
        return;
    }

    const articleLabel = modeAchatDirect ? produitDirectEnCours.titre : panier.map(x => x.titre).join(" + ");
    const totalFacture = modeAchatDirect ? produitDirectEnCours.prix : panier.reduce((a, b) => a + b.prix, 0);
    const adresseLivraison = `${region}, Dept: ${departement}, Quartier: ${commune}`;

    const texteWhatsApp = encodeURIComponent(
        `Bonjour Doux-Doux.sn ! Je souhaite commander :\n\n` +
        `• Articles : ${articleLabel}\n` +
        `• Total : ${totalFacture.toLocaleString()} F CFA\n` +
        `• Mode de paiement : ${methodePaiement}\n\n` +
        `👉 Infos de livraison :\n` +
        `- Nom : ${nom}\n` +
        `- Tél : ${telephone}\n` +
        `- Localisation : ${adresseLivraison}`
    );
    
    const lienWhatsApp = `https://wa.me/221777226359?text=${texteWhatsApp}`; 

    if (methodePaiement === 'Wave') {
        window.open(lienWhatsApp, '_blank');
        window.location.href = "https://pay.wave.com/m/M_sn_oPpmOm67pxb4/c/sn/";
    } else if (methodePaiement === 'Orange Money') {
        window.open(lienWhatsApp, '_blank');
        window.location.href = "tel:#144#";
    } else {
        window.location.href = lienWhatsApp;
    }
    
    fermerInfo();
    if (typeof closePayment === "function") closePayment();
}

// ==========================================
// 12. MOTEUR DE RECHERCHE DYNAMIQUE
// ==========================================
async function searchProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const saisie = input.value.toLowerCase().trim();

    const grille = document.getElementById("productGrid");
    if (!grille) return;
    
    grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Recherche en cours...</p>";

    try {
        const catalogueBackend = await fetchProductsFromBackend();
        const selectCategorie = document.getElementById("search-category");
        const categorieSelectionnee = selectCategorie ? selectCategorie.value : "Toutes";

        const resultats = catalogueBackend.filter(p => {
            const nom = (p.name || p.nom || p.title || p.titre || "").toLowerCase();
            const desc = (p.desc || p.description || "").toLowerCase();
            const categorieProduit = (p.category || p.cat || p.categorie || "").toLowerCase();

            const correspondCategorie = (categorieSelectionnee === "Toutes") || 
                                         (categorieProduit === categorieSelectionnee.toLowerCase()) || 
                                         categorieProduit.includes(categorieSelectionnee.toLowerCase());
                                         
            const correspondMotCle = (saisie === "") || nom.includes(saisie) || desc.includes(saisie);

            return correspondCategorie && correspondMotCle;
        });

        grille.innerHTML = "";
        
        if (resultats.length === 0) {
            grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Aucun produit ne correspond à votre recherche.</p>";
            return;
        }

        resultats.forEach(p => {
            const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
            const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
                ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
                : imageBrute;

            const nomProduit = p.name || p.nom || p.title || p.titre || "Article Doux-Doux";
            const prixProduit = p.price || p.prix || p.tarif || 0;
            const categorieProduit = p.category || p.cat || p.categorie || 'Général';
            const uniqueId = p._id || p.id;

            const carte = document.createElement('div');
            carte.className = "product-card";
            carte.setAttribute("data-name", nomProduit);
            carte.style.cursor = "pointer";
            carte.onclick = () => ouvrirDetailProduit(uniqueId);

            carte.innerHTML = `
                <div class="product-image">
                    <img src="${imageAffichage}" alt="${nomProduit}">
                </div>
                <div class="product-info">
                    <span class="category-tag">${categorieProduit}</span>
                    <h3 class="product-title">${nomProduit}</h3>
                    <p class="product-price"><strong>${Number(prixProduit).toLocaleString()} FCFA</strong></p>
                </div>`;

            grille.appendChild(carte);
        });
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Erreur lors de la recherche.</p>";
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    filtrerProduits('Toutes');
});
