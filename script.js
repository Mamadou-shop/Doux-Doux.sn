// ==========================================
// 1. VARIABLES, ÉTAT GLOBAL ET CONFIGURATION API
// ==========================================
const API_URL = "http://localhost:5000/api";
let panier = [];
let indexSlide = 0;
let produitsStockesLocale = []; 
let modeAchatDirect = false;
let produitDirectEnCours = null;

// ==========================================
// 2. CHARGEMENT DYNAMIQUE DEPUIS LE BACKEND
// ==========================================
async function fetchProductsFromBackend(forceRefresh = false) {
    if (produitsStockesLocale.length > 0 && !forceRefresh) {
        return produitsStockesLocale;
    }
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Réponse réseau non conforme");
        const products = await response.json();
        produitsStockesLocale = products; 
        return products;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        return produitsStockesLocale; 
    }
}

// ==========================================
// 3. AFFICHAGE ET FILTRAGE INTERCONNECTÉ (MANNEQUINS & MODE SÉNÉGALAISE)
// ==========================================
async function filtrerProduits(categorie) {
    const grille = document.getElementById("productGrid"); 
    if (!grille) return;

    grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Chargement de la collection Doux-Doux...</p>"; 

    const catalogueBackend = await fetchProductsFromBackend();

    if (catalogueBackend.length === 0) {
        grille.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Impossible de charger les produits. Vérifiez le serveur backend.</p>";
        return;
    }

    grille.innerHTML = ""; 

    const titreSection = document.getElementById('section-title');
    const catLower = (categorie || '').toLowerCase().trim();

    if (titreSection) {
        titreSection.scrollIntoView({ behavior: 'smooth' });
        
        if (['toutes', 'all', ''].includes(catLower)) {
            titreSection.innerText = "Notre Catalogue Complet";
            gererZoneBanniereSpeciale(null);
        } else if (catLower.includes('basics')) {
            titreSection.innerText = "✨ Gamme Doux-Doux Basics";
            gererZoneBanniereSpeciale('basics');
        } else if (catLower.includes('haul')) {
            titreSection.innerText = "📦 Collection Doux-Doux Haul";
            gererZoneBanniereSpeciale('haul');
        } else if (['homme', 'hommes', 'femme', 'femmes', 'enfant', 'enfants', 'traditionnel', 'bazin', 'wax', 'boubou'].includes(catLower)) {
            let titreMannequin = "🇸🇳 Collection Mode & Mannequins Sénégalais";
            if (catLower.startsWith('homme')) titreMannequin = "👨 Mode Homme - Mannequins & Styles Sénégalais";
            else if (catLower.startsWith('femme')) titreMannequin = "👩 Mode Femme - Mannequins & Styles Sénégalais";
            else if (catLower.startsWith('enfant')) titreMannequin = "🧒 Mode Enfant & Ado";
            else if (['traditionnel', 'bazin', 'wax', 'boubou'].includes(catLower)) titreMannequin = "✨ Tenues Traditionnelles & Grand Boubou";

            titreSection.innerText = titreMannequin;
            gererZoneBanniereSpeciale('mannequins_afro', catLower);
        } else if (catLower.includes('flash')) {
            titreSection.innerText = "⚡ Ventes Flash (Offres limitées)";
            gererZoneBanniereSpeciale(null);
        } else if (catLower.includes('meilleure')) {
            titreSection.innerText = "🔥 Meilleures Ventes";
            gererZoneBanniereSpeciale(null);
        } else {
            titreSection.innerText = `Catégorie : ${categorie}`;
            gererZoneBanniereSpeciale(null);
        }
    }

    // Filtrage enrichi pour la mode et les mannequins sénégalais / africains
    const produitsAffiches = (!categorie || ['toutes', 'toutes les catégories', 'all'].includes(catLower)) 
        ? catalogueBackend 
        : catalogueBackend.filter(p => {
            const cat = (p.category || p.cat || "").toLowerCase().trim();
            const tag = (p.tag || "").toLowerCase().trim();
            const genre = (p.gender || p.genre || p.mannequin || p.style || "").toLowerCase().trim();
            const tagsList = Array.isArray(p.tags) ? p.tags.map(t => t.toLowerCase()) : [];

            return cat === catLower || 
                   cat.includes(catLower) || 
                   tag === catLower || 
                   genre === catLower || 
                   genre.includes(catLower) || 
                   tagsList.includes(catLower);
        });

    if (produitsAffiches.length === 0) {
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #565959;'>Aucun article ne correspond à ce style ou cette catégorie.</p>";
        return;
    }

    produitsAffiches.forEach(p => {
        const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux+Sénégal';
        const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
            ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
            : imageBrute;

        const nomProduit = p.name || p.titre || "Produit sans nom";
        const prixProduit = p.price || p.prix || 0;
        const categorieProduit = p.category || p.cat || 'Général';
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
                <div class="payment-buttons" style="margin-top: 10px; display: flex; flex-direction: column; gap: 5px;">
                    <button class="btn-add-cart" style="width: 100%;">
                        Ajouter au panier
                    </button>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn-pay btn-wave" style="flex: 1;">Wave</button>
                        <button class="btn-pay btn-om" style="flex: 1;">OM</button>
                    </div>
                </div>
            </div>`;

        carte.querySelector('.btn-add-cart').onclick = (e) => {
            e.stopPropagation();
            ajouterAuPanier(nomProduit, prixProduit);
        };
        carte.querySelector('.btn-wave').onclick = (e) => {
            e.stopPropagation();
            ouvrirPaiementDirect(nomProduit, prixProduit);
        };
        carte.querySelector('.btn-om').onclick = (e) => {
            e.stopPropagation();
            ouvrirPaiementDirect(nomProduit, prixProduit);
        };

        grille.appendChild(carte);
    });
}

// ==========================================
// 4. INJECTION DE BANNIÈRES (VALORISATION STYLE SÉNÉGALAIS)
// ==========================================
function gererZoneBanniereSpeciale(boutique, genreActif = '') {
    const zone = document.getElementById('zone-banniere-speciale');
    if (!zone) return;

    if (boutique === 'mannequins_afro') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 22px 25px; border-radius: 6px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 6px 0; font-size: 22px;">🇸🇳 Mode & Modèles Sénégalais</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #f0fff4;">Mettez en valeur votre style avec nos collections présentées par nos mannequins locaux.</p>
                <div style="display: flex; gap: 10px; font-size: 13px; flex-wrap: wrap;">
                    <button style="background: ${genreActif.includes('homme') ? '#111' : 'rgba(0,0,0,0.25)'}; color: white; border: none; padding: 7px 15px; border-radius: 20px; cursor: pointer;" onclick="filtrerProduits('Hommes')">👨 Hommes</button>
                    <button style="background: ${genreActif.includes('femme') ? '#111' : 'rgba(0,0,0,0.25)'}; color: white; border: none; padding: 7px 15px; border-radius: 20px; cursor: pointer;" onclick="filtrerProduits('Femmes')">👩 Femmes</button>
                    <button style="background: ${['traditionnel', 'bazin', 'boubou'].includes(genreActif) ? '#111' : 'rgba(0,0,0,0.25)'}; color: white; border: none; padding: 7px 15px; border-radius: 20px; cursor: pointer;" onclick="filtrerProduits('Traditionnel')">✨ Boubou & Bazin</button>
                    <button style="background: ${genreActif.includes('enfant') ? '#111' : 'rgba(0,0,0,0.25)'}; color: white; border: none; padding: 7px 15px; border-radius: 20px; cursor: pointer;" onclick="filtrerProduits('Enfants')">🧒 Enfants</button>
                    <button style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 7px 15px; border-radius: 20px; cursor: pointer;" onclick="filtrerProduits('Toutes')">Tout afficher</button>
                </div>
            </div>`;
    } else if (boutique === 'basics') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #3a7bd5, #3a6073); color: white; padding: 25px; border-radius: 6px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">👕 Doux-Doux Basics Sénégal</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #f0f4f8;">Vos vêtements essentiels du quotidien adaptés au climat local.</p>
                <div style="display: flex; gap: 15px; font-size: 13px;">
                    <span style="font-weight: bold; cursor: pointer; border-bottom: 2px solid white;" onclick="filtrerProduits('basics')">Tout voir</span>
                    <span style="cursor: pointer; opacity: 0.9;" onclick="filtrerProduits('Hommes')">Hommes</span>
                    <span style="cursor: pointer; opacity: 0.9;" onclick="filtrerProduits('Femmes')">Femmes</span>
                </div>
            </div>`;
    } else if (boutique === 'haul') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #f12711, #f5af19); color: white; padding: 25px; border-radius: 6px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">📦 Doux-Doux Haul - Achats en Gros</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #fff3e0;">Profitez des meilleurs prix pour vos achats groupés partout au Sénégal.</p>
            </div>`;
    } else {
        zone.innerHTML = "";
    }
}

// ==========================================
// 5. MODALE VUE DÉTAILLÉE DU PRODUIT
// ==========================================
function ouvrirDetailProduit(id) {
    const produit = produitsStockesLocale.find(p => (p._id === id || p.id === id));
    if (!produit) return;

    const imageBrute = produit.imageUrl || produit.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
    const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
        : imageBrute;

    const nomProduit = produit.name || produit.titre || "Produit sans nom";
    const prixProduit = produit.price || produit.prix || 0;
    const descProduit = produit.desc || produit.description || "Article disponible chez Doux-Doux Sénégal.";
    const tagProduit = (produit.tag || "").toLowerCase();

    if (document.getElementById('modal-product-img')) document.getElementById('modal-product-img').src = imageAffichage;
    if (document.getElementById('modal-product-title')) document.getElementById('modal-product-title').innerText = nomProduit;
    if (document.getElementById('modal-product-category')) document.getElementById('modal-product-category').innerText = `Style : ${produit.category || produit.cat || 'Général'}`;
    if (document.getElementById('modal-product-price')) document.getElementById('modal-product-price').innerText = `${Number(prixProduit).toLocaleString()} FCFA`;
    if (document.getElementById('modal-product-desc')) document.getElementById('modal-product-desc').innerText = descProduit;
    
    const badge = document.getElementById('modal-product-badge');
    if (badge) {
        if (tagProduit === 'flash' || tagProduit === 'ventes-flash') {
            badge.innerText = "⚡ Offre Spéciale";
            badge.style.background = "#e47911";
        } else if (tagProduit === 'meilleures' || tagProduit === 'meilleures-ventes') {
            badge.innerText = "🔥 Tendance Sénégal";
            badge.style.background = "#b12704";
        } else {
            badge.innerText = "Nouveauté";
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
// 6. PANIER LATÉRAL
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
    panier.push({ titre, prix: Number(prix) });
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = panier.length;
    
    renderCartSidebar();
    alert(`${titre} ajouté au panier ! 🛒`);
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
        row.style.cssText = "display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e7e7e7; padding-bottom:10px;";
        row.innerHTML = `
            <div style="max-width:220px;">
                <p style="margin:0; font-size:13px; font-weight:bold; color:#111; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${item.titre}</p>
                <p style="margin:3px 0 0 0; font-size:13px; color:#B12704; font-weight:bold;">${item.prix.toLocaleString()} FCFA</p>
            </div>
            <button class="btn-remove-item" style="background:none; border:none; color:#007185; cursor:pointer; font-size:12px;"><i class="fas fa-trash"></i> Supprimer</button>
        `;
        row.querySelector('.btn-remove-item').onclick = () => retirerDuPanier(index);
        container.appendChild(row);
    });

    if (totalLabel) totalLabel.innerText = `${total.toLocaleString()} FCFA`;
}

function retirerDuPanier(index) {
    panier.splice(index, 1);
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = panier.length;
    renderCartSidebar();
}

function viderLePanierComplete() {
    panier = [];
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = "0";
    renderCartSidebar();
}

// ==========================================
// 7. TUNNEL DE COMMANDE
// ==========================================
function ouvrirPaiementDirect(titre, prix) {
    modeAchatDirect = true;
    produitDirectEnCours = { titre, prix };
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('modal-product-name').innerText = titre;
        document.getElementById('modal-order-total-price').innerText = `${Number(prix).toLocaleString()} FCFA`;
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
        const totalPanier = panier.reduce((sum, item) => sum + item.prix, 0);

        document.getElementById('modal-product-name').innerText = `Commande (${panier.length} articles : ${listeTitres})`;
        document.getElementById('modal-order-total-price').innerText = `${totalPanier.toLocaleString()} FCFA`;
    }
}

function closePayment() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 8. MOTEUR DE RECHERCHE
// ==========================================
async function searchProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const saisie = input.value.toLowerCase().trim();

    const grille = document.getElementById("productGrid");
    grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Recherche en cours...</p>";

    try {
        const catalogueBackend = await fetchProductsFromBackend();
        const selectCategorie = document.getElementById("search-category");
        const categorieSelectionnee = selectCategorie ? selectCategorie.value : "Toutes";

        const resultats = catalogueBackend.filter(p => {
            const nom = (p.name || p.Nom || p.titre || "").toLowerCase();
            const desc = (p.desc || p.description || "").toLowerCase();
            const categorieProduit = (p.category || p.cat || p.categorie || "").toLowerCase();
            const genre = (p.gender || p.genre || p.mannequin || p.style || "").toLowerCase();

            const correspondCategorie = (categorieSelectionnee === "Toutes") || 
                                         (categorieProduit === categorieSelectionnee.toLowerCase()) || 
                                         categorieProduit.includes(categorieSelectionnee.toLowerCase()) ||
                                         genre.includes(categorieSelectionnee.toLowerCase());
                                         
            const correspondMotCle = (saisie === "") || nom.includes(saisie) || desc.includes(saisie);

            return correspondCategorie && correspondMotCle;
        });

        grille.innerHTML = "";
        
        if (resultats.length === 0) {
            grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Aucun article ne correspond à votre recherche.</p>";
            return;
        }

        resultats.forEach(p => {
            const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
            const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
                ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
                : imageBrute;

            const nomProduit = p.name || p.titre || "Produit sans nom";
            const prixProduit = p.price || p.prix || 0;
            const uniqueId = p._id || p.id;

            const carte = document.createElement('div');
            carte.className = "product-card";
            carte.style.cursor = "pointer";
            carte.onclick = () => ouvrirDetailProduit(uniqueId);

            carte.innerHTML = `
                <div class="product-image"><img src="${imageAffichage}" alt="${nomProduit}"></div>
                <div class="product-info">
                    <h3 class="product-title">${nomProduit}</h3>
                    <p class="product-price"><strong>${Number(prixProduit).toLocaleString()} FCFA</strong></p>
                    <button class="btn-add-cart">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                </div>`;

            carte.querySelector('.btn-add-cart').onclick = (e) => {
                e.stopPropagation();
                ajouterAuPanier(nomProduit, prixProduit);
            };

            grille.appendChild(carte);
        });

    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Une erreur est survenue.</p>";
    }
}

// ==========================================
// 9. ENVOI DE LA COMMANDE ET LIVRAISON LOCALE
// ==========================================
async function finaliserEtEnvoyerCommande(methodePaiement) {
    const nom = document.getElementById('client-name').value.trim();
    const telephone = document.getElementById('client-phone').value.trim();
    const region = document.getElementById('select-region').value;
    const departement = document.getElementById('select-departement').value;
    const commune = document.getElementById('select-commune').value;

    if (!nom || !telephone || !region || !departement || !commune) {
        alert("Veuillez remplir l'intégralité des informations de livraison au Sénégal.");
        return;
    }

    const articleLabel = modeAchatDirect ? produitDirectEnCours.titre : panier.map(x => x.titre).join(" + ");
    const totalFacture = modeAchatDirect ? produitDirectEnCours.prix : panier.reduce((a, b) => a + b.prix, 0);

    const detailCommande = {
        nomClient: nom,
        telephoneClient: telephone,
        adresseLivraison: `${region}, Dept: ${departement}, Quartier: ${commune}`,
        articles: articleLabel,
        montantTotal: totalFacture,
        methode: methodePaiement
    };

    const redirigerVersWhatsApp = () => {
        const texteWhatsApp = encodeURIComponent(`Bonjour Doux-Doux !\nJe souhaite commander : ${articleLabel}\nNom : ${nom}\nTél : ${telephone}\nLivraison : ${region}, ${departement}, ${commune}\nPaiement : ${methodePaiement}\nTotal : ${totalFacture} FCFA`);
        window.open(`https://wa.me/221770000000?text=${texteWhatsApp}`, '_blank');
    };

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detailCommande)
        });

        if (response.ok) {
            alert(`Merci ${nom} ! Votre commande a été enregistrée. Notre service client vous recontacte rapidement.`);
            if (!modeAchatDirect) viderLePanierComplete();
            closePayment();
        } else {
            alert("Redirection vers le service WhatsApp pour finaliser la commande...");
            redirigerVersWhatsApp();
        }
    } catch (err) {
        redirigerVersWhatsApp();
    }
}

// ==========================================
// 10. DECOUPAGE TERRITORIAL DU SÉNÉGAL (14 RÉGIONS)
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
    const region = document.getElementById('select-region').value;
    const deptSelect = document.getElementById('select-departement');
    const commSelect = document.getElementById('select-commune');

    if (!deptSelect || !commSelect) return;

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
    const region = document.getElementById('select-region').value;
    const dept = document.getElementById('select-departement').value;
    const commSelect = document.getElementById('select-commune');

    if (!commSelect) return;
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
// 11. CARROUSEL D'ACCUEIL
// ==========================================
function afficherSlide(index) {
    const slidesContainer = document.getElementById("sliderSlides");
    if (!slidesContainer) return;
    
    const slides = slidesContainer.querySelectorAll('.slide');
    const totalSlides = slides.length || 4; 

    if (index >= totalSlides) indexSlide = 0;
    else if (index < 0) indexSlide = totalSlides - 1;
    else indexSlide = index;
    
    slidesContainer.style.transform = `translateX(-${indexSlide * (100 / totalSlides)}%)`;
}

function slideSuivante() {
    afficherSlide(indexSlide + 1);
}

function slidePrecedente() {
    afficherSlide(indexSlide - 1);
}

setInterval(() => { slideSuivante(); }, 5000);

// ==========================================
// 12. MENUS BURGER & MODALES D'INFORMATION
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
                <h3>Suivi de commande Doux-Doux</h3>
                <p>Retrouvez vos livraisons programmées à Dakar et dans toutes les régions du Sénégal.</p>
                <button style="background:#ffd814; border:1px solid #fcd200; padding:10px 20px; border-radius:4px; font-weight:bold; cursor:pointer;" onclick="window.location.href='login.html'">Mon compte</button>
            </div>`;
    } else if (type === 'vendre') {
        contenu = `
            <div>
                <h3 style="text-align: center;">Devenir Vendeur sur Doux-Doux</h3>
                <form id="sellerForm" onsubmit="event.preventDefault(); alert('Demande enregistrée !'); fermerInfo();">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Nom de la boutique ou Marque</label>
                    <input type="text" required style="width:100%; padding:8px; margin-bottom:12px; box-sizing:border-box;">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Téléphone (Sénégal)</label>
                    <input type="tel" required style="width:100%; padding:8px; margin-bottom:15px; box-sizing:border-box;">
                    <button type="submit" style="width:100%; background:#ffd814; border:none; padding:10px; font-weight:bold; cursor:pointer; border-radius:4px;">Inscrire ma boutique</button>
                </form>
            </div>`;
    } else if (type === 'guide') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-book-open" style="font-size:40px; color:#0066c0; margin-bottom:15px;"></i>
                <h3>Comment commander ?</h3>
                <p style="font-size:13px; text-align:left; color:#4b5563;">1. Choisissez vos articles et ajoutez-les au panier.<br>2. Saisissez votre adresse de livraison au Sénégal.<br>3. Choisissez Wave ou Orange Money pour valider.</p>
                <button style="width:100%; background:#ffd814; border:none; padding:10px; font-weight:bold; cursor:pointer; margin-top:10px;" onclick="fermerInfo()">Compris</button>
            </div>`;
    }
    modalBody.innerHTML = contenu;
    modal.style.display = 'flex';
}

function fermerInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    filtrerProduits('Toutes');
});
