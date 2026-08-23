/* ==========================================================================
   DOUX-DOUX E-COMMERCE - SCRIPT PRINCIPAL (script.js)
   ========================================================================== */

// 1. DONNÉES DU CATALOGUE (50 Produits issus du CSV)
// --------------------------------------------------------------------------
const produits = [
    { id: 1, nom: "Lot de 3 T-Shirts Coton Basiques", categorie: "Textile-Mode", tag: "Bas Prix", prix: 4500, description: "Ensemble de 3 t-shirts 100% coton de qualité supérieure, confortables au quotidien.", image: "https://i.pinimg.com/1200x/b0/94/02/b09402ecfc2c948f2e8782a5a68bdfe2.jpg" },
    { id: 2, nom: "Robe de Soirée Élégante Chic", categorie: "Textile-Mode", tag: "Tendance", prix: 18500, description: "Robe longue fluide portée par notre mannequin, idéale pour vos événements.", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" },
    { id: 3, nom: "Jean Slim Stretch Quotidien", categorie: "Textile-Mode", tag: "meilleures-ventes", prix: 7500, description: "Coupe moderne et ajustée, idéal pour les sorties décontractées.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { id: 4, nom: "Costume 3 Pièces Homme Modern Fit", categorie: "Textile-Mode", tag: "Premium", prix: 35000, description: "Costume complet porté par notre mannequin, une coupe impeccable pour grandes occasions.", image: "https://i.pinimg.com/736x/cb/a1/38/cba138e3a241680a653ddbc7d1fa8b88.jpg" },
    { id: 5, nom: "Chemise Bleue Classique Homme", categorie: "Textile-Mode", tag: "Bas Prix", prix: 5000, description: "Chemise repassage facile, coupe droite idéale pour le bureau ou événements.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
    { id: 6, nom: "Veste en Cuir Style Biker", categorie: "Textile-Mode", tag: "Tendance", prix: 19000, description: "Blouson en cuir de qualité sur cintre avec finitions métalliques soignées.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
    { id: 7, nom: "Robe d'Été Fleurie Légère", categorie: "Textile-Mode", tag: "Tendance", prix: 6500, description: "Robe fluide avec imprimé floral coloré, parfaite pour le quotidien.", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
    { id: 8, nom: "Manteau Veste Légère Laine", categorie: "Textile-Mode", tag: "Tendance", prix: 16000, description: "Veste courte élégante offrant confort et raffinement.", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80" },
    { id: 9, nom: "Short de Sport Respirant Quick-Dry", categorie: "Textile-Mode", tag: "Bas Prix", prix: 3000, description: "Short ultra-léger avec poche zippée, parfait pour le running et le fitness.", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80" },
    { id: 10, nom: "Boubou Traditionnel VIP Brodé", categorie: "Textile-Mode", tag: "Exclusif", prix: 28000, description: "Magnifique ensemble tradition porté par notre mannequin, broderies artisanales.", image: "https://i.pinimg.com/1200x/b8/e8/68/b8e868eb071829bfc1d294ab8ace641b.jpg" },
    { id: 11, nom: "Sweat à Capuche Oversize Cotton", categorie: "Textile-Mode", tag: "Streetwear", prix: 7500, description: "Hoodie molletonné coupe confortable style urbain.", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
    { id: 12, nom: "Kimono Imprimé Satiné", categorie: "Textile-Mode", tag: "Promo", prix: 8000, description: "Kimono élégant à porter en veste légère ou tenue d'intérieur.", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { id: 13, nom: "Ensemble Polo & Short Casual", categorie: "Textile-Mode", tag: "Bas Prix", prix: 6500, description: "Ensemble deux pièces d'été moderne et décontracté.", image: "https://i.pinimg.com/736x/88/c9/b0/88c9b0ea9e4e7c6cc43401a2ad40f1f1.jpg" },
    { id: 14, nom: "Jupe Plissée Longue Satinée", categorie: "Textile-Mode", tag: "Tendance", prix: 7000, description: "Jupe tendance taille élastique avec reflets brillants.", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80" },
    { id: 15, nom: "Gilet en Maille Douce", categorie: "Textile-Mode", tag: "Nouveauté", prix: 8500, description: "Cardigan boutonné doux au toucher et très agréable à porter.", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" },
    { id: 16, nom: "Pyjama 2 Pièces Sensation Soie", categorie: "Textile-Mode", tag: "Confort", prix: 9000, description: "Ensemble nuit fluide et léger pour un sommeil confortable.", image: "https://images.unsplash.com/photo-1616885827725-7b567d288d44?auto=format&fit=crop&w=600&q=80" },
    { id: 17, nom: "Pantalon Cargo Multi-Poches", categorie: "Textile-Mode", tag: "Bas Prix", prix: 7500, description: "Style street robuste avec multiples poches de rangement.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80" },
    { id: 18, nom: "Maillot de Bain Design Été", categorie: "Textile-Mode", tag: "Tendance", prix: 6000, description: "Maillot une pièce tendance avec finitions soignées.", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80" },
    { id: 19, nom: "Baume à Lèvres Hydratant Karité", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 1000, description: "Soin protecteur naturel enrichi en vitamine E et karité pur.", image: "https://images.unsplash.com/photo-1625101902621-2e6462719522?auto=format&fit=crop&w=600&q=80" },
    { id: 20, nom: "Parfum d'Ambiance Royale 100ml", categorie: "Beaute-Soins", tag: "Populaire", prix: 12000, description: "Fragrance envoûtante aux notes d'Oud et d'Ambre précieux.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80" },
    { id: 21, nom: "Savon Noir Purifiant Charbon Actif", categorie: "Beaute-Soins", tag: "Nouveau", prix: 1500, description: "Nettoie en profondeur, élimine l'excès de sébum et les impuretés.", image: "https://images.unsplash.com/photo-1607006482170-137b02c8e310?auto=format&fit=crop&w=600&q=80" },
    { id: 22, nom: "Sérum Hydratant Éclat Visage", categorie: "Beaute-Soins", tag: "Tendance", prix: 6500, description: "Sérum concentré à l'acide hyaluronique pour un teint frais.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
    { id: 23, nom: "Crème Hydratante Quotidienne 50ml", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 3000, description: "Hydratation 24h texture légère pour tous types de peaux.", image: "https://static.wixstatic.com/media/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png" },
    { id: 24, nom: "Coffret Maquillage Complete Palette", categorie: "Beaute-Soins", tag: "meilleures-ventes", prix: 9500, description: "Palette complète fards à paupières, blush et rouges à lèvres.", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80" },
    { id: 25, nom: "Huile Nourrissante Cheveux & Argan", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 2500, description: "Mélange d'huiles d'Argan et de Jojoba pour des cheveux brillants.", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80" },
    { id: 26, nom: "Coffret Soin Visage Spa Hydratation", categorie: "Beaute-Soins", tag: "Pack-Eco", prix: 14000, description: "Routine complète : nettoyant, sérum, crème et masque soin.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
    { id: 27, nom: "Gel Douche Énergisant Aloe Vera", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 2000, description: "Aux extraits d'agrumes et d'aloe vera pour rafraîchir la peau.", image: "https://images.unsplash.com/photo-1585232351009-aa87416fec90?auto=format&fit=crop&w=600&q=80" },
    { id: 28, nom: "Lisseur Céramique Professionnel", categorie: "Beaute-Soins", tag: "Pro", prix: 12000, description: "Chauffe rapide et technologie protectrice pour la fibre capillaire.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { id: 29, nom: "Vernis à Ongles Gel Longue Tenue", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 1000, description: "Finition brillante tenue longue durée sans lampe.", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80" },
    { id: 30, nom: "Rouge à Lèvres Mat Longue Tenue", categorie: "Beaute-Soins", tag: "Tendance", prix: 2500, description: "Couleur haute pigmentation qui ne dessèche pas les lèvres.", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
    { id: 31, nom: "Sèche-Cheveux Ionique Silencieux", categorie: "Beaute-Soins", tag: "Pratique", prix: 15000, description: "Séchage ultra-rapide avec contrôle de la chaleur.", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80" },
    { id: 32, nom: "Masque Argile Purifiant Visage", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 1500, description: "Resserre les pores et affine le grain de peau.", image: "https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&w=600&q=80" },
    { id: 33, nom: "Eau de Toilette Fraîcheur Marine 100ml", categorie: "Beaute-Soins", tag: "Populaire", prix: 8500, description: "Senteur dynamique et fraîche idéale pour la journée.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
    { id: 34, nom: "Kit Pinceaux de Maquillage (12 pcs)", categorie: "Beaute-Soins", tag: "Bas Prix", prix: 3500, description: "Poils synthétiques très doux pour un maquillage réussi.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" },
    { id: 35, nom: "Casquette Urban Street Coton", categorie: "Equipement", tag: "Bas Prix", prix: 2500, description: "Casquette ajustable 100% coton avec broderie discrète.", image: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg" },
    { id: 36, nom: "Montre Chronographe Bracelet Acier", categorie: "Equipement", tag: "Tendance", prix: 14500, description: "Cadran élégant avec verre résistant et bracelet réglable.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { id: 37, nom: "Lunettes de Soleil UV400 Style", categorie: "Equipement", tag: "meilleures-ventes", prix: 3500, description: "Monture légère et verres protecteurs anti-éblouissement.", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600" },
    { id: 38, nom: "Sac à Main Élégant Maroquinerie", categorie: "Equipement", tag: "Tendance", prix: 12500, description: "Sac structuré finitions soignées avec bandoulière.", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
    { id: 39, nom: "Ceinture Reversible Noir & Marron", categorie: "Equipement", tag: "Bas Prix", prix: 2500, description: "Double face avec boucle classique argentée résistant.", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },
    { id: 40, nom: "Baskets Sneakers Urban Fashion", categorie: "Equipement", tag: "Streetwear", prix: 13500, description: "Baskets légères et confortables au style dynamique.", image: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg" },
    { id: 41, nom: "Portefeuille Compact Mince Anti-RFID", categorie: "Equipement", tag: "Bas Prix", prix: 2000, description: "Protège vos cartes bancaires avec plusieurs rangements.", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
    { id: 42, nom: "Collier Pendentif Fin Argent 925", categorie: "Equipement", tag: "Élégance", prix: 5500, description: "Chaine fine avec pendentif scintillant.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
    { id: 43, nom: "Sac à Dos Voyage & Ordinateur USB", categorie: "Equipement", tag: "Pratique", prix: 8500, description: "Sac renforcé imperméable idéal pour trajets et voyages.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { id: 44, nom: "Lunettes de Soleil Cadre Doré", categorie: "Equipement", tag: "Tendance", prix: 4500, description: "Style vintage chic avec monture dorée et verres teintés.", image: "https://i.pinimg.com/1200x/16/26/ad/1626adbfdb78ffee1c87ea8d6b6f8bf2.jpg" },
    { id: 45, nom: "Chapeau de Paille Plage & Été", categorie: "Equipement", tag: "Bas Prix", prix: 3000, description: "Protection solaire élégante pour la plage et promenades.", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80" },
    { id: 46, nom: "Montre Homme Business Cadran Noir", categorie: "Equipement", tag: "Tendance", prix: 9500, description: "Monture en acier inoxydable noire avec affichage date.", image: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg" },
    { id: 47, nom: "Mocassins Homme Style Suédé", categorie: "Equipement", tag: "Style", prix: 11000, description: "Mocassins souples et élégants pour tenue décontractée.", image: "https://i.pinimg.com/736x/dd/6f/8e/dd6f8e15d9d0cdac861883f68635292f.jpg" },
    { id: 48, nom: "Sandales Plates Légères", categorie: "Equipement", tag: "Bas Prix", prix: 4500, description: "Sandales de ville très confortables pour les chaudes journées.", image: "https://i.pinimg.com/736x/19/6a/aa/196aaa7740e1ae0ce8307ebbe3cbad38.jpg" },
    { id: 49, nom: "Gants Souples en Cuir Fin", categorie: "Equipement", tag: "Accessoire", prix: 6000, description: "Accessoire élégant au toucher doux et finitions soignées.", image: "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=600&q=80" },
    { id: 50, nom: "Bracelet Perles Pierres Naturelles", categorie: "Equipement", tag: "Bas Prix", prix: 2000, description: "Bracelet élastique mixte très tendance.", image: "https://i.pinimg.com/736x/b6/e0/9e/b6e09e5c7f64645d63effe981b5e2732.jpg" }
];

// Tarifs de livraison par région (Sénégal)
const fraisLivraison = {
    "Dakar": 1500,
    "Thies": 2500,
    "Diourbel": 3000,
    "Fatick": 3500,
    "Kaolack": 3500,
    "Kolda": 4500,
    "Louga": 3500,
    "Matam": 5000,
    "Saint-Louis": 4000,
    "Sedhiou": 4500,
    "Tambacounda": 5000,
    "Ziguinchor": 4500,
    "Kaffrine": 4000,
    "Kedougou": 5000
};

let panier = JSON.parse(localStorage.getItem('doux_panier')) || [];
let currentSlide = 0;
let slideInterval = null;


// 2. GESTION DU CATALOGUE ET FILTRES
// --------------------------------------------------------------------------
function afficherProduits(listeProduits) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (listeProduits.length === 0) {
        grid.innerHTML = `<div class="no-results"><p>Aucun produit ne correspond à votre recherche.</p></div>`;
        return;
    }

    grid.innerHTML = listeProduits.map(prod => `
        <div class="product-card">
            <span class="product-badge">${prod.tag}</span>
            <div class="product-image" onclick="ouvrirDetailModal(${prod.id})">
                <img src="${prod.image}" alt="${prod.nom}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${prod.categorie}</span>
                <h3 class="product-title" onclick="ouvrirDetailModal(${prod.id})">${prod.nom}</h3>
                <p class="product-price">${prod.prix.toLocaleString('fr-FR')} FCFA</p>
                <button class="btn-add-cart" onclick="ajouterAuPanier(${prod.id})">
                    <i class="fas fa-shopping-bag"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

function filtrerProduits(categorie) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categorie);
    });

    if (categorie === 'Toutes' || !categorie) {
        afficherProduits(produits);
    } else {
        const filtrés = produits.filter(p => p.categorie === categorie);
        afficherProduits(filtrés);
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('search-category');
    
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categorySelect ? categorySelect.value : 'Toutes';

    const resultats = produits.filter(p => {
        const matchQuery = p.nom.toLowerCase().includes(query) || 
                           p.description.toLowerCase().includes(query) || 
                           p.tag.toLowerCase().includes(query);
        const matchCategory = (category === 'Toutes' || p.categorie === category);
        return matchQuery && matchCategory;
    });

    afficherProduits(resultats);
}


// 3. GESTION DU PANIER (LOCALSTORAGE)
// --------------------------------------------------------------------------
function sauvegarderPanier() {
    localStorage.setItem('doux_panier', JSON.stringify(panier));
    mettreAJourPanierUI();
}

function ajouterAuPanier(idProduit, quantite = 1) {
    const produit = produits.find(p => p.id === idProduit);
    if (!produit) return;

    const itemExistant = panier.find(item => item.id === idProduit);
    if (itemExistant) {
        itemExistant.quantite += quantite;
    } else {
        panier.push({ ...produit, quantite: quantite });
    }

    sauvegarderPanier();
    ouvrirPanierSide();
}

function modifierQuantite(idProduit, changement) {
    const item = panier.find(p => p.id === idProduit);
    if (!item) return;

    item.quantite += changement;
    if (item.quantite <= 0) {
        supprimerDuPanier(idProduit);
    } else {
        sauvegarderPanier();
    }
}

function supprimerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    sauvegarderPanier();
}

function viderPanier() {
    if (panier.length === 0) return;
    if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
        panier = [];
        sauvegarderPanier();
    }
}

function calculerSousTotal() {
    return panier.reduce((total, item) => total + (item.prix * item.quantite), 0);
}

function mettreAJourPanierUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    
    // Compteur global
    const totalArticles = panier.reduce((sum, item) => sum + item.quantite, 0);
    if (cartCount) cartCount.textContent = totalArticles;

    // Mise à jour des sous-totaux
    const sousTotal = calculerSousTotal();
    if (subtotalEl) subtotalEl.textContent = `${sousTotal.toLocaleString('fr-FR')} FCFA`;

    // Affichage des éléments dans la barre latérale du panier
    if (cartItemsContainer) {
        if (panier.length === 0) {
            cartItemsContainer.innerHTML = `<div class="cart-empty"><p>Votre panier est vide</p></div>`;
        } else {
            cartItemsContainer.innerHTML = panier.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.nom}">
                    <div class="cart-item-details">
                        <h4>${item.nom}</h4>
                        <p class="cart-item-price">${(item.prix * item.quantite).toLocaleString('fr-FR')} FCFA</p>
                        <div class="quantity-controls">
                            <button onclick="modifierQuantite(${item.id}, -1)">-</button>
                            <span>${item.quantite}</span>
                            <button onclick="modifierQuantite(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="supprimerDuPanier(${item.id})">&times;</button>
                </div>
            `).join('');
        }
    }

    calculerTotalCommande();
}


// 4. LIVRAISON ET TOTAL
// --------------------------------------------------------------------------
function calculerTotalCommande() {
    const selectRegion = document.getElementById('select-region');
    const displayFrais = document.getElementById('frais-livraison-display');
    const displayTotal = document.getElementById('total-final-display');

    const sousTotal = calculerSousTotal();
    let frais = 0;

    if (selectRegion && selectRegion.value && fraisLivraison[selectRegion.value]) {
        frais = fraisLivraison[selectRegion.value];
    }

    if (displayFrais) {
        displayFrais.textContent = frais > 0 ? `${frais.toLocaleString('fr-FR')} FCFA` : "Sélectionnez une région";
    }

    if (displayTotal) {
        const total = sousTotal + frais;
        displayTotal.textContent = `${total.toLocaleString('fr-FR')} FCFA`;
    }
}


// 5. COMMANDE ET INTÉGRATION WHATSAPP
// --------------------------------------------------------------------------
function ouvrirTunnelPaiement() {
    if (panier.length === 0) {
        alert("Votre panier est vide. Ajoutez des articles avant de commander !");
        return;
    }
    fermerPanierSide();
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'flex';
        calculerTotalCommande();
    }
}

function closePayment() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) paymentModal.style.display = 'none';
}

function traiterCommande(e) {
    if (e) e.preventDefault();

    const nom = document.getElementById('client-nom')?.value.trim();
    const telephone = document.getElementById('client-tel')?.value.trim();
    const region = document.getElementById('select-region')?.value;
    const adresse = document.getElementById('client-adresse')?.value.trim();
    const modePaiement = document.querySelector('input[name="payment-method"]:checked')?.value;

    if (!nom || !telephone || !region || !adresse || !modePaiement) {
        alert("Veuillez remplir tous les champs obligatoires du formulaire.");
        return;
    }

    const frais = fraisLivraison[region] || 0;
    const sousTotal = calculerSousTotal();
    const totalNet = sousTotal + frais;

    let resumeArticles = panier.map(i => `- ${i.nom} x${i.quantite} (${(i.prix * i.quantite).toLocaleString('fr-FR')} FCFA)`).join('\n');

    if (modePaiement === 'Wave') {
        alert(`Redirection vers le paiement Wave pour un montant de ${totalNet.toLocaleString('fr-FR')} FCFA...`);
    } else if (modePaiement === 'Orange Money') {
        alert(`Pour finaliser par Orange Money, effectuez un transfert au 77 722 63 59 ou composez le #144#.`);
    }

    envoyerViaWhatsApp(nom, telephone, region, adresse, modePaiement, totalNet, resumeArticles);

    // Réinitialisation après validation
    panier = [];
    sauvegarderPanier();
    closePayment();
}

function envoyerViaWhatsApp(nom, tel, region, adresse, paiement, total, details) {
    const numeroWhatsApp = "221777226359";
    const textMessage = `🛍️ *NOUVELLE COMMANDE - DOUX-DOUX.SN*\n\n` +
                        `👤 *Client :* ${nom}\n` +
                        `📞 *Téléphone :* ${tel}\n` +
                        `📍 *Lieu :* ${region} - ${adresse}\n` +
                        `💳 *Mode de paiement :* ${paiement}\n\n` +
                        `📦 *Détails de la commande :*\n${details}\n\n` +
                        `💰 *TOTAL À PAYER :* ${total.toLocaleString('fr-FR')} FCFA`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textMessage)}`;
    window.open(url, '_blank');
}


// 6. GESTION DES MODALES ET SIDEBAR
// --------------------------------------------------------------------------
function ouvrirPanierSide() {
    const sideNav = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sideNav) sideNav.classList.add('open');
    if (overlay) overlay.classList.add('active');
}

function fermerPanierSide() {
    const sideNav = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sideNav) sideNav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

function ouvrirDetailModal(idProduit) {
    const produit = produits.find(p => p.id === idProduit);
    if (!produit) return;

    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-modal-body');

    if (modal && content) {
        content.innerHTML = `
            <div class="modal-product-detail">
                <img src="${produit.image}" alt="${produit.nom}">
                <div class="modal-product-info">
                    <h2>${produit.nom}</h2>
                    <span class="badge-cat">${produit.categorie} - ${produit.tag}</span>
                    <p class="modal-price">${produit.prix.toLocaleString('fr-FR')} FCFA</p>
                    <p class="modal-desc">${produit.description}</p>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="ajouterAuPanier(${produit.id}); fermerDetailModal();">
                            <i class="fas fa-shopping-bag"></i> Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function fermerDetailModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) modal.style.display = 'none';
}

function fermerInfo() {
    const infoModal = document.getElementById('info-modal');
    if (infoModal) infoModal.style.display = 'none';
}


// 7. HERO SLIDER
// --------------------------------------------------------------------------
function initSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
}


// 8. INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Initialisation
    afficherProduits(produits);
    mettreAJourPanierUI();
    initSlider();

    // Recherche en temps réel
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchProducts();
            }
        });
    }

    const categorySelect = document.getElementById('search-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', searchProducts);
    }

    // Filtres boutons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtrerProduits(btn.dataset.category);
        });
    });

    // Événement changement région
    const selectRegion = document.getElementById('select-region');
    if (selectRegion) {
        selectRegion.addEventListener('change', calculerTotalCommande);
    }

    // Soumission du formulaire
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', traiterCommande);
    }

    // Fermeture des modales au clic externe
    window.addEventListener('click', (event) => {
        const paymentModal = document.getElementById('payment-modal');
        const infoModal = document.getElementById('info-modal');
        const detailModal = document.getElementById('detail-modal');

        if (event.target === paymentModal) closePayment();
        if (event.target === infoModal) fermerInfo();
        if (event.target === detailModal) fermerDetailModal();
    });
});


// 9. SUPPORT CLIENT
// --------------------------------------------------------------------------
function contacterSupportWhatsApp() {
    const message = encodeURIComponent("Bonjour Doux-Doux, j'ai une question concernant vos produits.");
    window.open(`https://wa.me/221777226359?text=${message}`, '_blank');
}
