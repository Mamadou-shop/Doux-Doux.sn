// ==========================================
// 1. BASE DE DONNÉES DU CATALOGUE PRODUITS
// ==========================================
const produitsBDD = [
    { 
        id: 1, 
        titre: "Casquette Urban Style", 
        categorie: "Textile-Mode", 
        prix: 5000, 
        image: "https://i.pinimg.com/736x/fc/85/ec/fc85ec89d0c85f9b7441fd15b68e1e3d.jpg", 
        tag: "Meilleures-ventes" 
    },
    { 
        id: 2, 
        titre: "Lunettes Polarisées Sun", 
        categorie: "Equipement", 
        prix: 7500, 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", 
        tag: "Ventes-Flash" 
    },
    { 
        id: 3, 
        titre: "Baskets Run Comfort", 
        categorie: "Textile-Mode", 
        prix: 18000, 
        image: "https://i.pinimg.com/1200x/20/0f/03/200f031ddfe44c11fe37bae7353896cf.jpg", 
        tag: "Doux-Doux-Basics" 
    },
    { 
        id: 4, 
        titre: "Pack Beauté & Soins", 
        categorie: "Equipement", 
        prix: 12500, 
        image: "https://static.wixstatic.com/media/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90,enc_avif,quality_auto/956e87_2d4d743577134e0d8083a1afd057f6fc~mv2.png", 
        tag: "Nouveautes" 
    },
    { 
        id: 5, 
        titre: "Montre Homme Elegance", 
        categorie: "Equipement", 
        prix: 22000, 
        image: "https://i.pinimg.com/736x/55/75/4f/55754f21b118cfde8e52c490eecdf264.jpg", 
        tag: "Meilleures-ventes" 
    },
    { 
        id: 6, 
        titre: "Pack Mode T-shirt Basic", 
        categorie: "Textile-Mode", 
        prix: 9500, 
        image: "https://i.pinimg.com/1200x/b0/94/02/b09402ecfc2c948f2e8782a5a68bdfe2.jpg", 
        tag: "Doux-Doux-Haul" 
    }
];

// Variables globales
let panier = JSON.parse(localStorage.getItem('doux_doux_cart')) || [];
let currentSlide = 0;

// ==========================================
// 2. INITIALISATION AU CHARGEMENT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    afficherCatalogue(produitsBDD);
    afficherPanierSidebar();
});

// ==========================================
// 3. AFFICHAGE & FILTRAGE DU CATALOGUE
// ==========================================
function afficherCatalogue(listeProduits) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = '';
    if (listeProduits.length === 0) {
        grid.innerHTML = '<p style="padding: 20px; color: #666; grid-column: 1 / -1; text-align: center;">Aucun produit ne correspond à votre recherche.</p>';
        return;
    }

    listeProduits.forEach(prod => {
        const item = document.createElement('div');
        item.className = 'product-card';
        item.style.cssText = 'border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #fff; text-align: center; display: flex; flex-direction: column; justify-content: space-between;';
        item.innerHTML = `
            <div>
                <img src="${prod.image}" alt="${prod.titre}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 4px;">
                <h4 style="font-size: 14px; margin: 10px 0 5px 0; color: #111;">${prod.titre}</h4>
                <p style="font-size: 16px; color: #B12704; font-weight: bold; margin-bottom: 10px;">${prod.prix.toLocaleString()} FCFA</p>
            </div>
            <button onclick="ajouterAuPanier(${prod.id})" style="background: #ffd814; border: 1px solid #fcd200; border-radius: 4px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: bold; width: 100%;">
                Ajouter au panier
            </button>
        `;
        grid.appendChild(item);
    });
}

function filtrerProduits(critere) {
    const titleElem = document.getElementById('section-title');
    
    if (critere === 'Toutes') {
        afficherCatalogue(produitsBDD);
        if (titleElem) titleElem.textContent = "Notre Catalogue Complet";
    } else {
        const filtre = produitsBDD.filter(p => p.categorie === critere || p.tag === critere);
        afficherCatalogue(filtre);
        if (titleElem) titleElem.textContent = `Catégorie : ${critere.replace(/-/g, ' ')}`;
    }
}

function searchProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const term = input.value.trim().toLowerCase();
    if (term === '') {
        afficherCatalogue(produitsBDD);
        return;
    }

    const resultats = produitsBDD.filter(p => 
        p.titre.toLowerCase().includes(term) || 
        p.categorie.toLowerCase().includes(term) ||
        (p.tag && p.tag.toLowerCase().includes(term))
    );

    afficherCatalogue(resultats);

    const titleElem = document.getElementById('section-title');
    if (titleElem) {
        titleElem.textContent = `Résultats pour : "${input.value}" (${resultats.length})`;
    }
}

// ==========================================
// 4. GESTION COMPLÈTE DU PANIER
// ==========================================
function ajouterAuPanier(idProduit) {
    const produit = produitsBDD.find(p => p.id === idProduit);
    if (!produit) return;

    const itemExistant = panier.find(item => item.id === idProduit);
    if (itemExistant) {
        itemExistant.quantite += 1;
    } else {
        panier.push({
            id: produit.id,
            titre: produit.titre,
            prix: produit.prix,
            image: produit.image,
            quantite: 1
        });
    }

    sauvegarderMettreAJourPanier();
    
    // Ouvrir le panier latéral automatiquement
    const cartSidebar = document.getElementById("cartSidebar");
    if (cartSidebar && cartSidebar.style.right !== "0px") {
        cartSidebar.style.right = "0px";
    }
}

function supprimerDuPanier(idProduit) {
    panier = panier.filter(item => item.id !== idProduit);
    sauvegarderMettreAJourPanier();
}

function changerQuantite(idProduit, delta) {
    const item = panier.find(i => i.id === idProduit);
    if (!item) return;

    item.quantite += delta;
    if (item.quantite <= 0) {
        supprimerDuPanier(idProduit);
    } else {
        sauvegarderMettreAJourPanier();
    }
}

function viderLePanierComplete() {
    if (confirm("Voulez-vous vraiment vider votre panier ?")) {
        panier = [];
        sauvegarderMettreAJourPanier();
    }
}

function sauvegarderMettreAJourPanier() {
    localStorage.setItem('doux_doux_cart', JSON.stringify(panier));
    afficherPanierSidebar();
}

function afficherPanierSidebar() {
    const container = document.getElementById('cartSidebarItems');
    const totalElem = document.getElementById('cartSidebarTotal');
    const badgeCountDesktop = document.getElementById('cartCount');
    const badgeCountMobile = document.querySelector('.cart-badge-count');

    const totalArticles = panier.reduce((sum, item) => sum + item.quantite, 0);
    if (badgeCountDesktop) badgeCountDesktop.textContent = totalArticles;
    if (badgeCountMobile) badgeCountMobile.textContent = totalArticles;

    if (!container) return;

    container.innerHTML = '';
    let sousTotal = 0;

    if (panier.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #777; margin-top: 40px;">Votre panier est vide.</p>';
        if (totalElem) totalElem.textContent = '0 FCFA';
        return;
    }

    panier.forEach(item => {
        const itemTotal = item.prix * item.quantite;
        sousTotal += itemTotal;

        const div = document.createElement('div');
        div.style.cssText = 'display: flex; gap: 12px; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px;';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.titre}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <h5 style="margin: 0 0 5px 0; font-size: 13px; color: #111;">${item.titre}</h5>
                <p style="margin: 0; font-size: 12px; color: #B12704; font-weight: bold;">${item.prix.toLocaleString()} FCFA</p>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
                    <button onclick="changerQuantite(${item.id}, -1)" style="border: 1px solid #ccc; background: #fff; width: 22px; height: 22px; cursor: pointer; border-radius: 3px;">-</button>
                    <span style="font-size: 12px; font-weight: bold;">${item.quantite}</span>
                    <button onclick="changerQuantite(${item.id}, 1)" style="border: 1px solid #ccc; background: #fff; width: 22px; height: 22px; cursor: pointer; border-radius: 3px;">+</button>
                </div>
            </div>
            <i class="fas fa-trash-alt" onclick="supprimerDuPanier(${item.id})" style="color: #c92a2a; cursor: pointer; font-size: 14px; padding: 5px;"></i>
        `;
        container.appendChild(div);
    });

    if (totalElem) {
        totalElem.textContent = `${sousTotal.toLocaleString()} FCFA`;
    }
}

function procederAuPaiementPanier() {
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    let message = "Bonjour Doux-Doux.sn, je souhaite passer la commande suivante :\n\n";
    let total = 0;

    panier.forEach(item => {
        const st = item.prix * item.quantite;
        total += st;
        message += `• ${item.titre} (x${item.quantite}) : ${st.toLocaleString()} FCFA\n`;
    });

    message += `\n*Total Général : ${total.toLocaleString()} FCFA*`;
    message += "\n\nMerci de me confirmer la prise en charge et les modalités de livraison.";

    const url = `https://wa.me/221777226359?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function toggleCartSidebar() {
    const cart = document.getElementById("cartSidebar");
    if (!cart) return;
    if (cart.style.right === "0px") {
        cart.style.right = "-400px";
    } else {
        cart.style.right = "0px";
    }
}

// ==========================================
// 5. NAVIGATION & MODALES INTERACTIVES
// ==========================================
function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("side-overlay").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("side-overlay").style.display = "none";
}

const contenusInfo = {
    'a-propos': { 
        titre: 'À propos de Doux-Doux', 
        texte: 'Doux-Doux est votre plateforme e-commerce au Sénégal vous garantissant des articles de qualité, des tarifs compétitifs et une livraison rapide.' 
    },
    'carrieres': { 
        titre: 'Carrières', 
        texte: 'Rejoignez notre équipe en pleine expansion. Envoyez-nous votre candidature par WhatsApp ou via le service client.' 
    },
    'vendre': { 
        titre: 'Vendre sur Doux-Doux', 
        texte: 'Exposez vos produits sur notre marketplace et touchez des milliers d’acheteurs à travers tout le Sénégal.' 
    },
    'partenaire': { 
        titre: 'Partenaire de livraison', 
        texte: 'Devenez livreur partenaire Doux-Doux et générez des revenus réguliers en assurant les livraisons à Dakar et en région.' 
    },
    'retours': { 
        titre: 'Livraison & Retours', 
        texte: 'Livraison standard sous 24h à 48h. Retours acceptés sous 7 jours sous réserve que le produit reste dans son état d’origine.' 
    },
    'aide': { 
        titre: 'Centre d’assistance', 
        texte: 'Une question ? Notre service client répond rapidement sur WhatsApp au +221 77 722 63 59.' 
    }
};

function ouvrirInfo(cle) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    const info = contenusInfo[cle];

    if (modal && modalBody && info) {
        modalBody.innerHTML = `
            <h3 style="margin-top: 0; color: #232f3e; font-size: 18px;">${info.titre}</h3>
            <p style="color: #444; line-height: 1.6; font-size: 14px; margin-top: 10px;">${info.texte}</p>
        `;
        modal.style.display = 'flex';
    }
}

function fermerInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// 6. CARROUSEL D'ACCUEIL (HERO SLIDER)
// ==========================================
function slideSuivante() {
    const slider = document.getElementById('sliderSlides');
    if (!slider) return;
    currentSlide = (currentSlide + 1) % 3;
    slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}

function slidePrecedente() {
    const slider = document.getElementById('sliderSlides');
    if (!slider) return;
    currentSlide = (currentSlide - 1 + 3) % 3;
    slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
}

// Défilement automatique toutes les 5 secondes
setInterval(slideSuivante, 5000);
