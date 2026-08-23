/* ==========================================================================
   DOUX-DOUX E-COMMERCE - SCRIPT PRINCIPAL (script.js)
   ========================================================================== */

// 1. DONNÉES ET ÉTAT GLOBAL
// --------------------------------------------------------------------------
const produits = [
    {
        id: 1,
        nom: "Sac à main Premium",
        categorie: "Accessoires",
        prix: 15000,
        image: "https://via.placeholder.com/300x300?text=Sac+a+main",
        description: "Sac élégant en cuir synthétique de haute qualité, idéal pour le travail et les sorties."
    },
    {
        id: 2,
        nom: "Robe Chic Wax",
        categorie: "Mode",
        prix: 25000,
        image: "https://via.placeholder.com/300x300?text=Robe+Wax",
        description: "Robe moderne aux motifs africains raffinés, coupe ajustée et confortable."
    },
    {
        id: 3,
        nom: "Sérum Éclat Visage",
        categorie: "Beauté",
        prix: 12000,
        image: "https://via.placeholder.com/300x300?text=Serum+Eclat",
        description: "Formule hydratante enrichie aux huiles naturelles pour un teint lumineux au quotidien."
    },
    {
        id: 4,
        nom: "Chaussures Cuir Homme",
        categorie: "Mode",
        prix: 30000,
        image: "https://via.placeholder.com/300x300?text=Chaussures+Cuir",
        description: "Mocassins en cuir véritable, alliant élégance, durabilité et grand confort."
    },
    {
        id: 5,
        nom: "Montre Chrono Gold",
        categorie: "Accessoires",
        prix: 18000,
        image: "https://via.placeholder.com/300x300?text=Montre+Gold",
        description: "Design sophistiqué avec cadran doré et bracelet en acier inoxydable."
    },
    {
        id: 6,
        nom: "Gamme Soin Cheveux",
        categorie: "Beauté",
        prix: 22000,
        image: "https://via.placeholder.com/300x300?text=Soin+Cheveux",
        description: "Kit complet nourrissant au beurre de karité et huile d'argon pour cheveux frisés/crépus."
    }
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


// 2. GESTION DU CATALOGUE ET RECHERCHE
// --------------------------------------------------------------------------
function afficherProduits(listeProduits) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (listeProduits.length === 0) {
        grid.innerHTML = `<div class="no-results"><p>Aucun produit trouvé pour votre recherche.</p></div>`;
        return;
    }

    grid.innerHTML = listeProduits.map(prod => `
        <div class="product-card">
            <div class="product-image" onclick="ouvrirDetailModal(${prod.id})">
                <img src="${prod.image}" alt="${prod.nom}">
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
    // Mise à jour des boutons de catégorie actifs
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categorie);
    });

    if (categorie === 'Toutes') {
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
        const matchQuery = p.nom.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
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

    // Liste dans le panier latéral
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


// 4. LIVRAISON ET CALCUL DU TOTAL
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


// 5. TUNNEL DE PAIEMENT ET VALIDATION DE COMMANDE
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

    // Formater le récapitulatif des articles
    let resumeArticles = panier.map(i => `- ${i.nom} x${i.quantite} (${(i.prix * i.quantite).toLocaleString('fr-FR')} FCFA)`).join('\n');

    if (modePaiement === 'Wave') {
        alert(`Redirection vers le paiement Wave pour un montant de ${totalNet.toLocaleString('fr-FR')} FCFA...`);
        envoyerViaWhatsApp(nom, telephone, region, adresse, modePaiement, totalNet, resumeArticles);
    } else if (modePaiement === 'Orange Money') {
        alert(`Pour finaliser par Orange Money, effectuez un transfert au 77 722 63 59 ou composez le #144#.`);
        envoyerViaWhatsApp(nom, telephone, region, adresse, modePaiement, totalNet, resumeArticles);
    } else if (modePaiement === 'Cash') {
        envoyerViaWhatsApp(nom, telephone, region, adresse, "Paiement à la livraison", totalNet, resumeArticles);
    }

    // Réinitialisation après commande
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


// 6. GESTION DES MODALES ET PANIER SIDE
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
                    <span class="badge-cat">${produit.categorie}</span>
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


// 7. HERO SLIDER AUTOMATIQUE
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
    slideInterval = setInterval(nextSlide, 5000); // Change de diapositive toutes les 5 secondes
}


// 8. INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // 1. Chargement initial
    afficherProduits(produits);
    mettreAJourPanierUI();
    initSlider();

    // 2. Recherche en temps réel
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

    // 3. Boutons de filtres de catégorie
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filtrerProduits(btn.dataset.category);
        });
    });

    // 4. Changement de région dans le tunnel de paiement
    const selectRegion = document.getElementById('select-region');
    if (selectRegion) {
        selectRegion.addEventListener('change', calculerTotalCommande);
    }

    // 5. Soumission du formulaire de commande
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', traiterCommande);
    }

    // 6. Fermeture des modales sur clic arrière-plan
    window.addEventListener('click', (event) => {
        const paymentModal = document.getElementById('payment-modal');
        const infoModal = document.getElementById('info-modal');
        const detailModal = document.getElementById('detail-modal');

        if (event.target === paymentModal) closePayment();
        if (event.target === infoModal) fermerInfo();
        if (event.target === detailModal) fermerDetailModal();
    });
});


// 9. FONCTIONS UTILITAIRES / SUPPORT
// --------------------------------------------------------------------------
function contacterSupportWhatsApp() {
    const message = encodeURIComponent("Bonjour Doux-Doux, j'ai une question concernant un produit ou une commande.");
    window.open(`https://wa.me/221777226359?text=${message}`, '_blank');
}
