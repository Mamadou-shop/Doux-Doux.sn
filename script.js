// ==========================================
// 0. CATALOGUE DE PRODUITS PAR DÉFAUT (LOCAL)
// ==========================================
const PRODUITS_LOCAUX = [
    {
        _id: "1",
        name: "Sac à main Élégance",
        price: 15000,
        category: "Mode",
        description: "Sac à main en cuir de haute qualité, parfait pour toutes les occasions.",
        imageUrl: "https://via.placeholder.com/400x400?text=Sac+a+main"
    },
    {
        _id: "2",
        name: "Montre Luxe Homme",
        price: 25000,
        category: "Accessoires",
        description: "Montre élégante avec bracelet en acier inoxydable et cadran résistant.",
        imageUrl: "https://via.placeholder.com/400x400?text=Montre+Luxe"
    },
    {
        _id: "3",
        name: "Chaussures Sport Run",
        price: 18000,
        category: "Chaussures",
        description: "Baskets de sport confortables, respirantes et idéales pour le quotidien.",
        imageUrl: "https://via.placeholder.com/400x400?text=Baskets+Sport"
    },
    {
        _id: "4",
        name: "Robe Traditionnelle Chic",
        price: 20000,
        category: "Mode",
        description: "Superbe robe confectionnée avec des tissus de qualité supérieure.",
        imageUrl: "https://via.placeholder.com/400x400?text=Robe+Chic"
    }
];

// ==========================================
// VARIABLES GLOBALES ET ÉTAT DE L'APPLICATION
// ==========================================
let panier = [];
let slideIndex = 0;
let indexSlide = 0;
let modeAchatDirect = false;
let produitDirectEnCours = null;

// URL de votre API backend Node.js / Express
const API_URL = "http://localhost:5000/api/products";

// ==========================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    chargerProduits();
    moteurMettreAJourBadgesPanier();

    const inputRecherche = document.getElementById('searchInput');
    if (inputRecherche) {
        inputRecherche.addEventListener('input', searchProducts);
    }
});

// ==========================================
// 2. RÉCUPÉRATION DES PRODUITS (BACKEND OU SECOURS LOCAL)
// ==========================================
async function fetchProductsFromBackend() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        // Si le serveur renvoie un tableau non vide, on l'utilise
        if (Array.isArray(data) && data.length > 0) {
            return data;
        }
        return PRODUITS_LOCAUX;
    } catch (error) {
        console.warn("API non disponible, chargement des produits locaux de secours :", error);
        return PRODUITS_LOCAUX;
    }
}

// ==========================================
// 3. AFFICHAGE DES PRODUITS SUR LA GRILLE D'ACCUEIL
// ==========================================
async function chargerProduits() {
    const grille = document.getElementById("productGrid");
    if (!grille) return;

    grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Chargement du catalogue Doux-Doux...</p>";

    const produits = await fetchProductsFromBackend();
    grille.innerHTML = "";

    if (produits.length === 0) {
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Aucun produit disponible pour le moment.</p>";
        return;
    }

    produits.forEach(p => {
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
                <p class="product-price"><strong>${Number(prixProduit).toLocaleString('fr-FR')} FCFA</strong></p>
            </div>`;

        grille.appendChild(carte);
    });
}

// ==========================================
// 4. AFFICHAGE DE LA MODALE DÉTAIL PRODUIT
// ==========================================
async function ouvrirDetailProduit(id) {
    const produits = await fetchProductsFromBackend();
    const produit = produits.find(p => (p._id || p.id) == id);

    if (!produit) {
        alert("Produit introuvable.");
        return;
    }

    const nom = produit.name || produit.nom || produit.titre;
    const prix = produit.price || produit.prix;
    const desc = produit.description || produit.desc || "Aucune description disponible.";
    const imageBrute = produit.imageUrl || produit.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
    const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
        : imageBrute;

    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    document.getElementById('detail-image').src = imageAffichage;
    document.getElementById('detail-title').innerText = nom;
    document.getElementById('detail-price').innerText = `${Number(prix).toLocaleString('fr-FR')} FCFA`;
    document.getElementById('detail-description').innerText = desc;

    const btnAjouter = document.getElementById('btn-add-cart-modal');
    const btnAcheter = document.getElementById('btn-buy-now-modal');

    if (btnAjouter) {
        btnAjouter.onclick = () => {
            ajouterAuPanier(nom, prix);
            fermerDetailProduit();
        };
    }

    if (btnAcheter) {
        btnAcheter.onclick = () => {
            fermerDetailProduit();
            ouvrirPaiementDirect(nom, prix);
        };
    }

    modal.style.display = "flex";
}

function fermerDetailProduit() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.style.display = "none";
}

// ==========================================
// 5. FILTRAGE PAR CATÉGORIE
// ==========================================
function filtrerParCategorie(categorie) {
    const selectCat = document.getElementById("search-category");
    if (selectCat) selectCat.value = categorie;
    searchProducts();
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
                <p style="margin:3px 0 0 0; font-size:13px; color:#B12704; font-weight:bold;">${item.prix.toLocaleString('fr-FR')} FCFA</p>
            </div>
            <button onclick="retirerDuPanier(${index})" style="background:none; border:none; color:#007185; cursor:pointer; font-size:12px;"><i class="fas fa-trash"></i> Supprimer</button>
        `;
        container.appendChild(row);
    });

    if (totalLabel) totalLabel.innerText = `${total.toLocaleString('fr-FR')} FCFA`;
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
        if (document.getElementById('modal-order-total-price')) document.getElementById('modal-order-total-price').innerText = `${Number(prix).toLocaleString('fr-FR')} FCFA`;
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
        if (document.getElementById('modal-order-total-price')) document.getElementById('modal-order-total-price').innerText = `${totalPanier.toLocaleString('fr-FR')} FCFA`;
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
                <form id="sellerForm" onsubmit="event.preventDefault(); alert('Demande reçue ! Nos équipes vous contacteront.'); fermerInfo();">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Nom de la boutique</label>
                    <input type="text" required style="width:100%; padding:8px; margin-bottom:12px; box-sizing:border-box;">
                    <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Téléphone (WhatsApp)</label>
                    <input type="tel" required style="width:100%; padding:8px; margin-bottom:15px; box-sizing:border-box;">
                    <button type="submit" style="width:100%; background:#ffd814; border:none; padding:10px; font-weight:bold; cursor:pointer; border-radius:4px;">Envoyer ma demande</button>
                </form>
            </div>`;
    } else if (type === 'guide') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-book-open" style="font-size:40px; color:#0066c0; margin-bottom:15px;"></i>
                <h3>Guide d'achat Doux-Doux</h3>
                <p style="font-size:13px; text-align:left; color:#4b5563;">1. Parcourez nos catalogues et ajoutez vos articles.<br>2. Validez votre panier et renseignez votre commune de livraison.<br>3. Payez en toute sécurité à la livraison, via Wave ou Orange Money.</p>
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
// 11. GESTION DES REQUÊTES ET COMMANDE WHATSAPP / PAIEMENT
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
        `• Total : ${totalFacture.toLocaleString('fr-FR')} FCFA\n` +
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
                    <p class="product-price"><strong>${Number(prixProduit).toLocaleString('fr-FR')} FCFA</strong></p>
                </div>`;

            grille.appendChild(carte);
        });
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Erreur lors de la recherche.</p>";
    }
}
