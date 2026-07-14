// ==========================================
// 1. VARIABLES, ÉTAT GLOBAL ET CONFIGURATION API
// ==========================================
const API_URL = "https://doux-doux-backend.onrender.com/api";
let panier = [];
let slideIndex = 0;
let indexSlide = 0;
let produitsStockesLocale = []; 
let modeAchatDirect = false; // Permet de distinguer l'achat instantané d'un produit vs la commande du panier complet
let produitDirectEnCours = null;

// ==========================================
// 2. CHARGEMENT DYNAMIQUE DEPUIS LE BACKEND
// ==========================================
async function fetchProductsFromBackend() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        produitsStockesLocale = products; 
        return products;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        return []; 
    }
}

// ==========================================
// 3. FONCTIONS D'AFFICHAGE ET FILTRAGE INTERCONNECTÉ
// ==========================================
async function filtrerProduits(categorie) {
    const grille = document.getElementById("productGrid");
    const grilleVenteFlash = document.getElementById("venteFlashGrid");
    const grilleHaul = document.getElementById("haulGrid");

    if (grille) grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Chargement du catalogue Doux-Doux...</p>";
    if (grilleVenteFlash) grilleVenteFlash.innerHTML = "";
    if (grilleHaul) grilleHaul.innerHTML = "";

    const catalogueBackend = await fetchProductsFromBackend();

    if (catalogueBackend.length === 0) {
        if (grille) grille.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Impossible de charger les produits</p>";
        return;
    }
    grille.innerHTML = ""; 

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
        ? catalogueBackend 
        : catalogueBackend.filter(p => {
            const cat = (p.category || p.cat || "").toLowerCase().trim();
            const tag = (p.tag || "").toLowerCase().trim();
            const cible = categorie.toLowerCase().trim();
            return cat === cible || cat.includes(cible) || cible.includes(cat) || tag === cible || (p.tags && p.tags.includes(cible));
        });

    produitsAffiches.forEach(p => {
        const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
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
             
                </div>
            </div>`;
            
       // Tri dynamique et envoi dans la bonne section
        if (categorieProduit === "Vente Flash") {
            if (grilleVenteFlash) grilleVenteFlash.appendChild(carte);
        } else if (categorieProduit === "Haul") {
            if (grilleHaul) grilleHaul.appendChild(carte);
        } else {
            // Reste du catalogue général
            if (grille) grille.appendChild(carte);
        }
    });
}

// ==========================================
// 4. INJECTION DE BANNIÈRES DE SOUS-PAGES THÉMATIQUES
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
                    <span style="font-weight: bold; cursor: pointer; border-bottom: 2px solid white;">Tout voir</span>
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
                    <span style="font-weight: bold; cursor: pointer; border-bottom: 2px solid white;">Packs Populaires</span>
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

    const nomProduit = produit.name || produit.titre || "Produit sans nom";
    const prixProduit = produit.price || produit.prix || 0;
    const descProduit = produit.desc || produit.description || "Aucune description disponible pour cet article Doux-Doux.";
    const tagProduit = (produit.tag || "").toLowerCase();

    if (document.getElementById('modal-product-img')) document.getElementById('modal-product-img').src = imageAffichage;
    if (document.getElementById('modal-product-title')) document.getElementById('modal-product-title').innerText = nomProduit;
    if (document.getElementById('modal-product-category')) document.getElementById('modal-product-category').innerText = `Catégorie : ${produit.category || produit.cat || 'Général'}`;
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
// 6. PANIER LATÉRAL COULISSANT (AMAZON SLIDE CART)
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
    // Met à jour le compteur classique (ordinateur)
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = panier.length;

    // Met à jour TOUS les badges de panier trouvés sur la page (y compris sur mobile)
    const tousLesCompteurs = document.querySelectorAll('.cart-badge-count');
    tousLesCompteurs.forEach(badge => {
        badge.innerText = panier.length;
    });
    
    // Notification discrète et rafraîchissement automatique du panier latéral s'il est ouvert
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
            <button onclick="retirerDuPanier(${index})" style="background:none; border:none; color:#007185; cursor:pointer; font-size:12px;"><i class="fas fa-trash"></i> Supprimer</button>
        `;
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
// 7. TUNNEL DE COMMANDE INTÉGRÉ
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
    toggleCartSidebar(); // Ferme le panier latéral
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Liste des titres résumés
        const listeTitres = panier.map(p => p.titre).join(', ');
        let totalPanier = panier.reduce((sum, item) => sum + item.prix, 0);

        document.getElementById('modal-product-name').innerText = `Commande groupée (${panier.length} articles : ${listeTitres})`;
        document.getElementById('modal-order-total-price').innerText = `${totalPanier.toLocaleString()} FCFA`;
    }
}

function closePayment() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 8. MOTEUR DE RECHERCHE CROISÉ SYNCHRONISÉ
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

            const correspondCategorie = (categorieSelectionnee === "Toutes") || (categorieProduit === categorieSelectionnee.toLowerCase()) || categorieProduit.includes(categorieSelectionnee.toLowerCase());
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
                    <button class="btn-add-cart" onclick="event.stopPropagation(); ajouterAuPanier('${nomProduit.replace(/'/g, "\\'")}', ${prixProduit})">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                </div>`;
            grille.appendChild(carte);
        });

    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Une erreur est survenue.</p>";
    }
}

// ==========================================
// 9. GESTION DES REQUÊTES VERS AIRTABLE / WHATSAPP BACKEND
// ==========================================
async function finaliserEtEnvoyerCommande(methodePaiement) {
    const nom = document.getElementById('client-name').value.trim();
    const telephone = document.getElementById('client-phone').value.trim();
    const region = document.getElementById('select-region').value;
    const departement = document.getElementById('select-departement').value;
    const commune = document.getElementById('select-commune').value;

    if (!nom || !telephone || !region || !departement || !commune) {
        alert("Veuillez remplir l'intégralité des informations de livraison locale.");
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

// --- DÉCLENCHEMENT DU PAIEMENT DIRECT (MODE PRODUITS.CSV) ---
    if (methodePaiement === 'Wave') {
        // Redirection immédiate vers ton lien de paiement Wave
        window.location.href = "https://pay.wave.com/m/M_sn_oPpmOm67pxb4/c/sn/";
        return;
    } else if (methodePaiement === 'Orange Money') {
        // Déclenchement du code USSD Orange Money Sénégal (#144#)
        window.location.href = "tel:#144#";
        return;
    }
    
    
     // --- MODE SANS BACKEND : ENVOI WHATSAPP + REDIRECTION PAIEMENT ---
    
    // 1. Préparation du message WhatsApp avec les détails de la commande
    const texteWhatsApp = encodeURIComponent(`Bonjour Doux-Doux.sn ! Je souhaite commander :\n\n• Articles : ${articleLabel}\n• Total : ${totalFacture} F CFA\n• Mode de paiement : ${methodePaiement}\n\n👉 Infos de livraison :\n- Nom : ${nomClient}\n- Tél : ${telephoneClient}\n- Localisation : ${adresseLivraison}`);
    const lienWhatsApp = `https://wa.me/221777226359?text=${texteWhatsApp}`; // ⚠️ Mets ton vrai numéro ici

    // 2. Déclenchement du paiement et ouverture de WhatsApp
    if (methodePaiement === 'Wave') {
        window.open(lienWhatsApp, '_blank');
        window.location.href = "https://pay.wave.com/m/M_sn_oPpmOm67pxb4/c/sn/";
    } else if (methodePaiement === 'Orange Money') {
        window.open(lienWhatsApp, '_blank');
        window.location.href = "tel:#144#";
    } else {
        window.location.href = lienWhatsApp;
    }
    
    if (typeof closePayment === "function") closePayment();
}

// ==========================================
// 10. CARTE ET LOCALISATION DU SÉNÉGAL (14 RÉGIONS)
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

    if(!deptSelect || !commSelect) return;

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

    if(!commSelect) return;
    commSelect.innerHTML = '<option value="">-- Commune / Quartier --</option>';

    if (dept && senegalMap[region][dept]) {
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
// 11. SLIDERS D'ACCUEIL SECURISÉS
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
    
    const totalSlides = 4; 
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
// 12. MENUS BURGER ET INFORMATIONS SUPPORT
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
                <p style="font-size:13px; text-align:left; color:#4b5563;">1. Sélectionnez vos articles.\n2. Validez le panier.\n3. Payez via Wave ou Orange Money à l'arrivée.</p>
                <button style="width:100%; background:#ffd814; border:none; padding:10px; font-weight:bold; cursor:pointer; margin-top:10px;" onclick="fermerInfo()">J'ai compris</button>
            </div>`;
    }
    modalBody.innerHTML = contenu;
    modal.style.display = 'flex';
}

function fermerInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = 'none';
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    filtrerProduits('Toutes');
});
