// ==========================================
// 1. BASE DE DONNÉES PRODUITS (PRODUITS_LOCAUX)
// ==========================================
const PRODUITS_LOCAUX = [
    // --- TEXTILE / MODE (18 Articles) ---
    { id: 1, name: "Lot de 3 T-Shirts Coton Basiques", category: "Textile-Mode", tag: "Bas Prix", price: 4500, desc: "Ensemble de 3 t-shirts 100% coton de qualité supérieure, confortables au quotidien.", imageUrl: "https://i.pinimg.com/1200x/b0/94/02/b09402ecfc2c948f2e8782a5a68bdfe2.jpg" },
    { id: 2, name: "Robe de Soirée Élégante Chic", category: "Textile-Mode", tag: "Tendance", price: 18500, desc: "Robe longue fluide portée par notre mannequin, idéale pour vos événements.", imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Jean Slim Stretch Quotidien", category: "Textile-Mode", tag: "meilleures-ventes", price: 7500, desc: "Coupe moderne et ajustée, idéal pour les sorties décontractées.", imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Costume 3 Pièces Homme Modern Fit", category: "Textile-Mode", tag: "Premium", price: 35000, desc: "Costume complet porté par notre mannequin, une coupe impeccable pour grandes occasions.", imageUrl: "https://i.pinimg.com/736x/cb/a1/38/cba138e3a241680a653ddbc7d1fa8b88.jpg" },
    { id: 5, name: "Chemise Bleue Classique Homme", category: "Textile-Mode", tag: "Bas Prix", price: 5000, desc: "Chemise bleu ciel repassage facile, coupe ajustée idéale pour le bureau ou événements.", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Veste en Cuir Style Biker", category: "Textile-Mode", tag: "Tendance", price: 19000, desc: "Blouson en cuir de qualité sur cintre avec finitions métalliques soignées.", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Robe d'Été Fleurie Légère", category: "Textile-Mode", tag: "Tendance", price: 6500, desc: "Robe fluide avec imprimé floral coloré, parfaite pour le quotidien.", imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Manteau Veste Légère Laine", category: "Textile-Mode", tag: "Tendance", price: 16000, desc: "Veste courte élégante offrant confort et raffinement.", imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80" },
    { id: 9, name: "Short de Sport Respirant Quick-Dry", category: "Textile-Mode", tag: "Bas Prix", price: 3000, desc: "Short ultra-léger avec poche zippée, parfait pour le running et le fitness.", imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Boubou Traditionnel VIP Brodé", category: "Textile-Mode", tag: "Exclusif", price: 28000, desc: "Magnifique ensemble tradition porté par notre mannequin, broderies artisanales.", imageUrl: "https://i.pinimg.com/1200x/b8/e8/68/b8e868eb071829bfc1d294ab8ace641b.jpg" },
    { id: 11, name: "Sweat à Capuche Oversize Cotton", category: "Textile-Mode", tag: "Streetwear", price: 7500, desc: "Hoodie molletonné coupe confortable style urbain.", imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Kimono Imprimé Satiné", category: "Textile-Mode", tag: "Promo", price: 8000, desc: "Kimono élégant à porter en veste légère ou tenue d'intérieur.", imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Ensemble Polo & Short Casual", category: "Textile-Mode", tag: "Bas Prix", price: 6500, desc: "Ensemble deux pièces d'été moderne et décontracté.", imageUrl: "https://i.pinimg.com/736x/88/c9/b0/88c9b0ea9e4e7c6cc43401a2ad40f1f1.jpg" },
    { id: 14, name: "Jupe Plissée Longue Satinée", category: "Textile-Mode", tag: "Tendance", price: 7000, desc: "Jupe tendance taille élastique avec reflets brillants.", imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Gilet en Maille Douce", category: "Textile-Mode", tag: "Nouveauté", price: 8500, desc: "Cardigan boutonné doux au toucher et très agréable à porter.", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "Pyjama 2 Pièces Sensation Soie", category: "Textile-Mode", tag: "Confort", price: 9000, desc: "Ensemble nuit fluide et léger pour un sommeil confortable.", imageUrl: "https://images.unsplash.com/photo-1616885827725-7b567d288d44?auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "Pantalon Cargo Multi-Poches", category: "Textile-Mode", tag: "Bas Prix", price: 7500, desc: "Style street robuste avec multiples poches de rangement.", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80" },
    { id: 18, name: "Maillot de Bain Design Été", category: "Textile-Mode", tag: "Tendance", price: 6000, desc: "Maillot une pièce tendance avec finitions soignées.", imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80" },

    // --- BEAUTÉ & SOINS (16 Articles) ---
    { id: 19, name: "Baume à Lèvres Hydratant Karité", category: "Beaute-Soins", tag: "Bas Prix", price: 1000, desc: "Soin protecteur naturel enrichi en vitamine E et karité pur.", imageUrl: "https://images.unsplash.com/photo-1625101902621-2e6462719522?auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Parfum d'Ambiance Royale 100ml", category: "Beaute-Soins", tag: "Populaire", price: 12000, desc: "Fragrance envoûtante aux notes d'Oud et d'Ambre précieux.", imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80" },
    { id: 21, name: "Savon Noir Purifiant Charbon Actif", category: "Beaute-Soins", tag: "Nouveau", price: 1500, desc: "Nettoie en profondeur, élimine l'excès de sébum et les impuretés.", imageUrl: "https://images.unsplash.com/photo-1607006482170-137b02c8e310?auto=format&fit=crop&w=600&q=80" },
    { id: 22, name: "Sérum Hydratant Éclat Visage", category: "Beaute-Soins", tag: "Tendance", price: 6500, desc: "Sérum concentré à l'acide hyaluronique pour un teint frais.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80" },
    { id: 23, name: "Crème Hydratante Quotidienne 50ml", category: "Beaute-Soins", tag: "Bas Prix", price: 3000, desc: "Hydratation 24h texture légère pour tous types de peaux.", imageUrl: "https://static.wixstatic.com/media/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png" },
    { id: 24, name: "Coffret Maquillage Complete Palette", category: "Beaute-Soins", tag: "meilleures-ventes", price: 9500, desc: "Palette complète fards à paupières, blush et rouges à lèvres.", imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80" },
    { id: 25, name: "Huile Nourrissante Cheveux & Argan", category: "Beaute-Soins", tag: "Bas Prix", price: 2500, desc: "Mélange d'huiles d'Argan et de Jojoba pour des cheveux brillants.", imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80" },
    { id: 26, name: "Coffret Soin Visage Spa Hydratation", category: "Beaute-Soins", tag: "Pack-Eco", price: 14000, desc: "Routine complète : nettoyant, sérum, crème et masque soin.", imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" },
    { id: 27, name: "Gel Douche Énergisant Aloe Vera", category: "Beaute-Soins", tag: "Bas Prix", price: 2000, desc: "Aux extraits d'agrumes et d'aloe vera pour rafraîchir la peau.", imageUrl: "https://images.unsplash.com/photo-1585232351009-aa87416fec90?auto=format&fit=crop&w=600&q=80" },
    { id: 28, name: "Lisseur Céramique Professionnel", category: "Beaute-Soins", tag: "Pro", price: 12000, desc: "Chauffe rapide et technologie protectrice pour la fibre capillaire.", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
    { id: 29, name: "Vernis à Ongles Gel Longue Tenue", category: "Beaute-Soins", tag: "Bas Prix", price: 1000, desc: "Finition brillante tenue longue durée sans lampe.", imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80" },
    { id: 30, name: "Rouge à Lèvres Mat Longue Tenue", category: "Beaute-Soins", tag: "Tendance", price: 2500, desc: "Couleur haute pigmentation qui ne dessèche pas les lèvres.", imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80" },
    { id: 31, name: "Sèche-Cheveux Ionique Silencieux", category: "Beaute-Soins", tag: "Pratique", price: 15000, desc: "Séchage ultra-rapide avec contrôle de la chaleur.", imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80" },
    { id: 32, name: "Masque Argile Purifiant Visage", category: "Beaute-Soins", tag: "Bas Prix", price: 1500, desc: "Resserre les pores et affine le grain de peau.", imageUrl: "https://images.unsplash.com/photo-1567928269937-ae146e45b428?auto=format&fit=crop&w=600&q=80" },
    { id: 33, name: "Eau de Toilette Fraîcheur Marine 100ml", category: "Beaute-Soins", tag: "Populaire", price: 8500, desc: "Senteur dynamique et fraîche idéale pour la journée.", imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80" },
    { id: 34, name: "Kit Pinceaux de Maquillage (12 pcs)", category: "Beaute-Soins", tag: "Bas Prix", price: 3500, desc: "Poils synthétiques très doux pour un maquillage réussi.", imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" },

    // --- ACCESSOIRES / ÉQUIPEMENT (16 Articles) ---
    { id: 35, name: "Casquette Urban Street Coton", category: "Equipement", tag: "Bas Prix", price: 2500, desc: "Casquette ajustable 100% coton avec broderie discrète.", imageUrl: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg" },
    { id: 36, name: "Montre Chronographe Bracelet Acier", category: "Equipement", tag: "Tendance", price: 14500, desc: "Cadran élégant avec verre résistant et bracelet réglable.", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { id: 37, name: "Lunettes de Soleil UV400 Style", category: "Equipement", tag: "meilleures-ventes", price: 3500, desc: "Monture légère et verres protecteurs anti-éblouissement.", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600" },
    { id: 38, name: "Sac à Main Élégant Maroquinerie", category: "Equipement", tag: "Tendance", price: 12500, desc: "Sac structuré finitions soignées avec bandoulière.", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
    { id: 39, name: "Ceinture Reversible Noir & Marron", category: "Equipement", tag: "Bas Prix", price: 2500, desc: "Double face avec boucle classique argentée résistant.", imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80" },
    { id: 40, name: "Baskets Sneakers Urban Fashion", category: "Equipement", tag: "Streetwear", price: 13500, desc: "Baskets légères et confortables au style dynamique.", imageUrl: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg" },
    { id: 41, name: "Portefeuille Compact Mince Anti-RFID", category: "Equipement", tag: "Bas Prix", price: 2000, desc: "Protège vos cartes bancaires avec plusieurs rangements.", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
    { id: 42, name: "Collier Pendentif Fin Argent 925", category: "Equipement", tag: "Élégance", price: 5500, desc: "Chaine fine avec pendentif scintillant.", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80" },
    { id: 43, name: "Sac à Dos Voyage & Ordinateur USB", category: "Equipement", tag: "Pratique", price: 8500, desc: "Sac renforcé imperméable idéal pour trajets et voyages.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80" },
    { id: 44, name: "Lunettes de Soleil Cadre Doré", category: "Equipement", tag: "Tendance", price: 4500, desc: "Style vintage chic avec monture dorée et verres teintés.", imageUrl: "https://i.pinimg.com/1200x/16/26/ad/1626adbfdb78ffee1c87ea8d6b6f8bf2.jpg" },
    { id: 45, name: "Chapeau de Paille Plage & Été", category: "Equipement", tag: "Bas Prix", price: 3000, desc: "Protection solaire élégante pour la plage et promenades.", imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80" },
    { id: 46, name: "Montre Homme Business Cadran Noir", category: "Equipement", tag: "Tendance", price: 9500, desc: "Monture en acier inoxydable noire avec affichage date.", imageUrl: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg" },
    { id: 47, name: "Mocassins Homme Style Suédé", category: "Equipement", tag: "Style", price: 11000, desc: "Mocassins souples et élégants pour tenue décontractée.", imageUrl: "https://i.pinimg.com/736x/dd/6f/8e/dd6f8e15d9d0cdac861883f68635292f.jpg" },
    { id: 48, name: "Sandales Plates Légères", category: "Equipement", tag: "Bas Prix", price: 4500, desc: "Sandales de ville très confortables pour les chaudes journées.", imageUrl: "https://i.pinimg.com/736x/19/6a/aa/196aaa7740e1ae0ce8307ebbe3cbad38.jpg" },
    { id: 49, name: "Gants Souples en Cuir Fin", category: "Equipement", tag: "Accessoire", price: 6000, desc: "Accessoire élégant au toucher doux et finitions soignées.", imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=600&q=80" },
    { id: 50, name: "Bracelet Perles Pierres Naturelles", category: "Equipement", tag: "Bas Prix", price: 2000, desc: "Bracelet élastique mixte très tendance.", imageUrl: "https://i.pinimg.com/736x/b6/e0/9e/b6e09e5c7f64645d63effe981b5e2732.jpg" }
];

// Variable globale du panier
let panier = [];

// Numéro Marchand / Téléphone du Service Client Doux-Doux
const MON_NUMERO_TEL = "771234567"; // À remplacer par votre numéro réel

// ==========================================
// 2. AFFICHAGE DES PRODUITS SUR LA PAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    afficherProduits(PRODUITS_LOCAUX);
    creerStructureModal();
});

function afficherProduits(liste) {
    const grille = document.getElementById("grid-produits");
    if (!grille) return;
    
    grille.innerHTML = "";

    liste.forEach(prod => {
        const carte = document.createElement("div");
        carte.className = "carte-produit";
        carte.setAttribute("data-id", prod.id);

        carte.innerHTML = `
            <div class="image-box">
                <span class="tag-badge">${prod.tag}</span>
                <img src="${prod.imageUrl}" alt="${prod.name}" loading="lazy">
            </div>
            <div class="info-box">
                <small class="categorie">${prod.category}</small>
                <h3 class="titre-produit">${prod.name}</h3>
                <p class="prix">${prod.price.toLocaleString('fr-FR')} FCFA</p>
                <button class="btn-voir-produit" onclick="ouvrirModalProduit(${prod.id})">Voir l'article</button>
            </div>
        `;

        // Rendre toute la carte cliquable
        carte.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-voir-produit')) {
                ouvrirModalProduit(prod.id);
            }
        });

        grille.appendChild(carte);
    });
}

// ==========================================
// 3. CRÉATION DYNAMIQUE DE LA MODALE
// ==========================================
function creerStructureModal() {
    if (document.getElementById("modal-produit-container")) return;

    const modalHTML = `
    <div id="modal-produit-container" class="modal-backdrop" onclick="fermerModalProduit(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
            <button class="modal-close" onclick="fermerModalProduit()">&times;</button>
            <div class="modal-body">
                <div class="modal-img-col">
                    <img id="modal-img" src="" alt="Produit">
                </div>
                <div class="modal-info-col">
                    <span id="modal-tag" class="tag-badge"></span>
                    <h2 id="modal-titre"></h2>
                    <p id="modal-prix" class="prix-modal"></p>
                    <p id="modal-desc" class="desc-modal"></p>
                    
                    <div class="quantite-selector">
                        <label for="modal-qte">Quantité :</label>
                        <div class="qte-controls">
                            <button onclick="changerQuantite(-1)">-</button>
                            <input type="number" id="modal-qte" value="1" min="1" readonly>
                            <button onclick="changerQuantite(1)">+</button>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button class="btn-ajouter-panier" onclick="ajouterAuPanierDepuisModal()">
                            🛒 Ajouter au Panier
                        </button>
                        <hr class="separateur">
                        <p class="texte-achat-rapide">Achat rapide via mobile money :</p>
                        <div class="btn-group-mobile">
                            <button class="btn-wave" onclick="payerPaiementDirect('Wave')">
                                Payer avec Wave
                            </button>
                            <button class="btn-om" onclick="payerPaiementDirect('Orange Money')">
                                Payer avec Orange Money
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ==========================================
// 4. GESTION DE LA MODALE ET DU CLIC
// ==========================================
let produitActuelModal = null;

function ouvrirModalProduit(id) {
    const produit = PRODUITS_LOCAUX.find(p => p.id === id);
    if (!produit) return;

    produitActuelModal = produit;

    document.getElementById("modal-img").src = produit.imageUrl;
    document.getElementById("modal-tag").textContent = produit.tag;
    document.getElementById("modal-titre").textContent = produit.name;
    document.getElementById("modal-prix").textContent = `${produit.price.toLocaleString('fr-FR')} FCFA`;
    document.getElementById("modal-desc").textContent = produit.desc;
    document.getElementById("modal-qte").value = 1;

    document.getElementById("modal-produit-container").classList.add("active");
}

function fermerModalProduit(event) {
    const container = document.getElementById("modal-produit-container");
    if (container) {
        container.classList.remove("active");
    }
}

function changerQuantite(valeur) {
    const input = document.getElementById("modal-qte");
    let nouvelleValeur = parseInt(input.value) + valeur;
    if (nouvelleValeur >= 1) {
        input.value = nouvelleValeur;
    }
}

// ==========================================
// 5. ACHAT & PANIER
// ==========================================
function ajouterAuPanierDepuisModal() {
    if (!produitActuelModal) return;

    const quantite = parseInt(document.getElementById("modal-qte").value) || 1;
    
    // Vérifier si déjà dans le panier
    const existant = panier.find(item => item.id === produitActuelModal.id);
    if (existant) {
        existant.quantite += quantite;
    } else {
        panier.push({
            ...produitActuelModal,
            quantite: quantite
        });
    }

    alert(`✅ ${quantite} x "${produitActuelModal.name}" ajouté(s) au panier !`);
    fermerModalProduit();
    mettreAJourBadgePanier();
}

function mettreAJourBadgePanier() {
    const badge = document.getElementById("panier-count");
    if (badge) {
        const totalArticles = panier.reduce((sum, item) => sum + item.quantite, 0);
        badge.textContent = totalArticles;
    }
}

// Paiement direct via Wave ou Orange Money (Redirection / WhatsApp)
function payerPaiementDirect(moyenPaiement) {
    if (!produitActuelModal) return;

    const qte = parseInt(document.getElementById("modal-qte").value) || 1;
    const total = produitActuelModal.price * qte;

    const message = `Bonjour Doux-Doux 👋, je souhaite commander :
- *Produit* : ${produitActuelModal.name}
- *Quantité* : ${qte}
- *Prix Total* : ${total.toLocaleString('fr-FR')} FCFA
- *Moyen de Paiement* : ${moyenPaiement}

Merci de me fournir les instructions pour valider la commande.`;

    const urlWhatsApp = `https://wa.me/221${MON_NUMERO_TEL}?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, "_blank");
}
