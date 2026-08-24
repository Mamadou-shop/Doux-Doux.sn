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
// BASE DE DONNÉES LOCALE (50 PRODUITS - FALLBACK DU BACKEND)
// ==========================================
const produitsFallbackLocal = [
    // --- TEXTILE / MODE (18 Articles) ---
    { id: 1, name: "Lot de 3 T-Shirts Coton Basiques", category: "Textile-Mode", tag: "Bas Prix", price: 6500, desc: "Ensemble de 3 t-shirts 100% coton de qualité supérieure, confortables au quotidien.", imageUrl: "https://i.pinimg.com/1200x/b0/94/02/b09402ecfc2c948f2e8782a5a68bdfe2.jpg" },
    { id: 2, name: "Robe de Soirée Haute Couture en Soie", category: "Textile-Mode", tag: "Luxe", price: 145000, desc: "Robe longue élégante en soie naturelle avec broderies délicates faites à la main.", imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Jean Slim Stretch Quotidien", category: "Textile-Mode", tag: "meilleures-ventes", price: 9500, desc: "Coupe moderne et ajustée, idéal pour les sorties décontractées.", imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Costume 3 Pièces Homme Italienne Slim-Fit", category: "Textile-Mode", tag: "Premium", price: 185000, desc: "Costume de cérémonie confectionné dans de la laine fine italienne. Élégance absolue.", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Chemise Blanche Classique Homme", category: "Textile-Mode", tag: "Bas Prix", price: 7000, desc: "Chemise repassage facile, coupe droite idéale pour le bureau ou événements.", imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Veste en Cuir Véritable Agneau", category: "Textile-Mode", tag: "Luxe", price: 120000, desc: "Blouson biker en cuir véritable ultra souple avec finitions métalliques haut de gamme.", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Robe d'Été Fleurie Légère", category: "Textile-Mode", tag: "Tendance", price: 8500, desc: "Robe fluide avec imprimé floral coloré, parfaite pour le climat tropical.", imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Manteau Long en Laine & Cachemire", category: "Textile-Mode", tag: "Luxe", price: 160000, desc: "Manteau structuré de qualité supérieure offrant chaleur et raffinement.", imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80" },
    { id: 9, name: "Short de Sport Respirant Quick-Dry", category: "Textile-Mode", tag: "Bas Prix", price: 4500, desc: "Short ultra-léger avec poche zippée, parfait pour le running et le fitness.", imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Boubou Traditionnel VIP Brodé Main", category: "Textile-Mode", tag: "Exclusif", price: 95000, desc: "Bazin riche de première qualité avec broderies complexes artisanales.", imageUrl: "https://i.pinimg.com/1200x/b8/e8/68/b8e868eb071829bfc1d294ab8ace641b.jpg" },
    { id: 11, name: "Sweat à Capuche Oversize Cotton", category: "Textile-Mode", tag: "Streetwear", price: 11000, desc: "Hoodie molletonné coupe confortable style urbain.", imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Kimono en Satin Imprimé", category: "Textile-Mode", tag: "Promo", price: 12500, desc: "Kimono élégant à porter en veste légère ou tenue d'intérieur.", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Ensemble Polo & Short Casual", category: "Textile-Mode", tag: "Bas Prix", price: 8900, desc: "Ensemble deux pièces d'été moderne et décontracté.", imageUrl: "https://i.pinimg.com/736x/88/c9/b0/88c9b0ea9e4e7c6cc43401a2ad40f1f1.jpg" },
    { id: 14, name: "Jupe Plissée Longue Satinée", category: "Textile-Mode", tag: "Tendance", price: 10500, desc: "Jupe tendance taille élastique avec reflets brillants.", imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Gilet en Maille Douce Cashmere-Touch", category: "Textile-Mode", tag: "Nouveauté", price: 14000, desc: "Cardigan boutonné doux au toucher et très agréable à porter.", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "Pyjama 2 Pièces en Soie Véritable", category: "Textile-Mode", tag: "Luxe", price: 48000, desc: "Ensemble nuit haut de gamme pour un confort absolu et élégant.", imageUrl: "https://images.unsplash.com/photo-1616885827725-7b567d288d44?auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "Pantalon Cargo Multi-Poches", category: "Textile-Mode", tag: "Bas Prix", price: 9900, desc: "Style street robuste avec multiples poches de rangement.", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80" },
    { id: 18, name: "Maillot de Bain Design Haute Élégance", category: "Textile-Mode", tag: "Premium", price: 22000, desc: "Maillot de bain une pièce sculptant avec découpes dorées.", imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80" },

    // --- BEAUTÉ & SOINS / ALIMENTATION (16 Articles) ---
    { id: 19, name: "Baume à Lèvres Hydratant Beurre de Karité", category: "Alimentation", tag: "Bas Prix", price: 1500, desc: "Soin protecteur naturel enrichi en vitamine E et karité pur.", imageUrl: "https://images.unsplash.com/photo-1625101902621-2e6462719522?auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Parfum d'Exception Nuit Royale 100ml", category: "Alimentation", tag: "Luxe", price: 135000, desc: "Fragrance envoûtante aux notes d'Oud, Ambre précieux et Rose de Damas.", imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80" },
    { id: 21, name: "Savon Noir Purifiant au Charbon Actif", category: "Alimentation", tag: "Nouveau", price: 2500, desc: "Nettoie en profondeur, élimine l'excès de sébum et les impuretés.", imageUrl: "https://images.unsplash.com/photo-1607006482170-137b02c8e310?auto=format&fit=crop&w=600&q=80" },
    { id: 22, name: "Sérum Anti-Âge Fondamental à l'Or 24K", category: "Alimentation", tag: "Luxe", price: 89000, desc: "Sérum concentré raffermissant enrichi en particules d'or et acide hyaluronique.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
    { id: 23, name: "Crème Hydratante Quotidienne Visage 50ml", category: "Alimentation", tag: "Bas Prix", price: 4500, desc: "Hydratation 24h texture légère pour tous types de peaux.", imageUrl: "https://static.wixstatic.com/media/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png" },
    { id: 24, name: "Coffret Maquillage Pro 48 Couleurs", category: "Alimentation", tag: "meilleures-ventes", price: 18500, desc: "Palette complète fards à paupières, blush et rouges à lèvres.", imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80" },
    { id: 25, name: "Huile Botanique Restructurante Cheveux", category: "Alimentation", tag: "Bas Prix", price: 3800, desc: "Mélange d'huiles d'Argan et de Jojoba pour des cheveux brillants.", imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80" },
    { id: 26, name: "Coffret Soin Visage Spa Prestige (5 Produits)", category: "Alimentation", tag: "Luxe", price: 110000, desc: "Routine complète haut de gamme : nettoyant, sérum, crème, masque et contour des yeux.", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
    { id: 27, name: "Gel Douche Bio Énergisant 500ml", category: "Alimentation", tag: "Bas Prix", price: 2900, desc: "Aux extraits d'agrumes et d'aloe vera pour réveiller la peau.", imageUrl: "https://images.unsplash.com/photo-1585232351009-aa87416fec90?auto=format&fit=crop&w=600&q=80" },
    { id: 28, name: "Lisseur Professionnel Vapeur Titane", category: "Alimentation", tag: "Pro", price: 35000, desc: "Technologie vapeur ionique protégeant la fibre capillaire.", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { id: 29, name: "Vernis à Ongles Longue Tenue (Rouge Intense)", category: "Alimentation", tag: "Bas Prix", price: 1200, desc: "Finition brillante effet gel sans lampe UV.", imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80" },
    { id: 30, name: "Rouge à Lèvres Mat Velours Velvet", category: "Alimentation", tag: "Tendance", price: 4900, desc: "Couleur haute pigmentation qui ne dessèche pas les lèvres.", imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
    { id: 31, name: "Sèche-Cheveux Supersonique Ionique", category: "Alimentation", tag: "Luxe", price: 98000, desc: "Séchage ultra-rapide avec contrôle intelligent de la chaleur.", imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80" },
    { id: 32, name: "Masque Argile Verte Detox 100g", category: "Alimentation", tag: "Bas Prix", price: 2000, desc: "Resserre les pores et affine le grain de peau.", imageUrl: "https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&w=600&q=80" },
    { id: 33, name: "Eau de Toilette Homme Fraîcheur Marine 100ml", category: "Alimentation", tag: "Populaire", price: 14500, desc: "Senteur dynamique idéale pour l'été et le sport.", imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
    { id: 34, name: "Kit Pinceaux de Maquillage Ultra Doux (12 pcs)", category: "Alimentation", tag: "Bas Prix", price: 6000, desc: "Poils synthétiques haute densité pour un teint parfait.", imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" },

    // --- ACCESSOIRES / ÉQUIPEMENT (16 Articles) ---
    { id: 35, name: "Casquette Urban Street Style", category: "Equipement", tag: "Bas Prix", price: 3500, desc: "Casquette ajustable 100% coton avec broderie frontale.", imageUrl: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg" },
    { id: 36, name: "Montre Chronographe Suisse en Or Rose", category: "Equipement", tag: "Luxe", price: 320000, desc: "Mouvement automatique d'exception, verre saphir inrayable et bracelet cuir noble.", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { id: 37, name: "Lunettes de Soleil Polarisées UV400", category: "Equipement", tag: "meilleures-ventes", price: 5500, desc: "Monture légère et verres protecteurs anti-éblouissement.", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600" },
    { id: 38, name: "Sac à Main Haute Maroquinerie Cuir It-Bag", category: "Equipement", tag: "Luxe", price: 210000, desc: "Sac de designer assemblé à la main, fermoir plaqué or.", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
    { id: 39, name: "Ceinture Homme Simili Cuir Reversible", category: "Equipement", tag: "Bas Prix", price: 4000, desc: "Double face noir et marron avec boucle classique argentée.", imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },
    { id: 40, name: "Baskets Sneakers Designer Édition Limitée", category: "Equipement", tag: "Collector", price: 140000, desc: "Sneakers de collection aux finitions rares et confort coussin d'air.", imageUrl: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg" },
    { id: 41, name: "Portefeuille Compact Mince Anti-RFID", category: "Equipement", tag: "Bas Prix", price: 3000, desc: "Protège vos cartes bancaires contre le piratage à distance.", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
    { id: 42, name: "Collier Diamant Synthétique & Argent 925", category: "Equipement", tag: "Élégance", price: 45000, desc: "Pendentif scintillant monté sur une chaîne fine en argent sterling.", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
    { id: 43, name: "Sac à Dos Voyage Waterproof avec Port USB", category: "Equipement", tag: "Pratique", price: 12500, desc: "Sac ordinateur renforcé pour voyages et déplacements professionnels.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { id: 44, name: "Lunettes de Soleil De Designer Cadre Or", category: "Equipement", tag: "Luxe", price: 85000, desc: "Style iconique avec monture dorée et verres teintés haut de gamme.", imageUrl: "https://i.pinimg.com/1200x/16/26/ad/1626adbfdb78ffee1c87ea8d6b6f8bf2.jpg" },
    { id: 45, name: "Chapeau de Paille d'Été Wide-Brim", category: "Equipement", tag: "Bas Prix", price: 4800, desc: "Protection solaire élégante pour la plage et les promenades.", imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80" },
    { id: 46, name: "Montre Homme Business Cadran Noir", category: "Equipement", tag: "Tendance", price: 16500, desc: "Monture en acier inoxydable noire avec affichage de la date.", imageUrl: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg" },
    { id: 47, name: "Chaussures Mocassins Homme en Cuir Suédé", category: "Equipement", tag: "Style", price: 28000, desc: "Mocassins confortables et chic pour un look casual chic.", imageUrl: "https://i.pinimg.com/736x/dd/6f/8e/dd6f8e15d9d0cdac861883f68635292f.jpg" },
    { id: 48, name: "Sandales Élégantes Cuir & Strass", category: "Equipement", tag: "Bas Prix", price: 8500, desc: "Sandales plates légères ornées de pierres scintillantes.", imageUrl: "https://i.pinimg.com/736x/19/6a/aa/196aaa7740e1ae0ce8307ebbe3cbad38.jpg" },
    { id: 49, name: "Gants en Cuir Véritable Doublés Soie", category: "Equipement", tag: "Luxe", price: 38000, desc: "Accessoire d'hiver ultra chic au toucher d'une douceur incomparable.", imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=600&q=80" },
    { id: 50, name: "Bracelet Homme Perles de Pierre de Lave & Argent", category: "Equipement", tag: "Bas Prix", price: 3500, desc: "Bracelet élastique tendance aux vertus apaisantes.", imageUrl: "https://i.pinimg.com/736x/b6/e0/9e/b6e09e5c7f64645d63effe981b5e2732.jpg" }
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
            console.warn("Backend vide ou indisponible. Utilisation du catalogue local de secours (50 produits).");
            produitsStockesLocale = produitsFallbackLocal;
            return produitsFallbackLocal;
        }
    } catch (error) {
        console.warn("Serveur backend indisponible. Activation des 50 produits locaux :", error);
        produitsStockesLocale = produitsFallbackLocal;
        return produitsFallbackLocal; 
    }
}

// ==========================================
// 3. FONCTIONS D'AFFICHAGE ET FILTRAGE
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
        if (grille) grille.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Impossible de charger les produits. Vérifiez le serveur backend.</p>";
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
        const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
        const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
            ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
            : imageBrute;

        const nomProduit = p.name || p.nom || p.titre || "Produit sans nom";
        const prixProduit = p.price || p.prix || 0;
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

                    if (indexBlockGlobal === ) {
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

    const nomProduit = produit.name || produit.nom || produit.titre || "Produit sans nom";
    const prixProduit = produit.price || produit.prix || 0;
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
        row.style.cssText = "display:flex; justify-space-between; align-items:center; border-bottom:1px solid #e7e7e7; padding-bottom:10px; margin-bottom:10px;";
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
            const nom = (p.name || p.nom || p.titre || "").toLowerCase();
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

            const nomProduit = p.name || p.nom || p.titre || "Produit sans nom";
            const prixProduit = p.price || p.prix || 0;
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
