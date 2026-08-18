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

// Liste stricte des 3 catégories autorisées
const CATEGORIES_AUTORISEES = ['mode', 'beaute', 'beauté', 'accessoires', 'accessoire'];

// ==========================================
// 2. CHARGEMENT DYNAMIQUE DEPUIS LE BACKEND
// ==========================================
async function fetchProductsFromBackend() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        // Filtrage strict : Conserver uniquement Mode, Beauté et Accessoires
        produitsStockesLocale = products.filter(p => {
            const cat = (p.category || p.cat || p.categorie || "").toLowerCase().trim();
            return CATEGORIES_AUTORISEES.some(autorisee => cat.includes(autorisee));
        });

        return produitsStockesLocale;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        return []; 
    }
}

// ==========================================
// 3. FONCTIONS D'AFFICHAGE ET FILTRAGE
// ==========================================
async function filtrerProduits(categorie) {
    const grille = document.getElementById("productGrid");
    if (grille) grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Chargement du catalogue Doux-Doux...</p>";

    const catalogue = await fetchProductsFromBackend();

    if (!catalogue || catalogue.length === 0) {
        if (grille) grille.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Impossible de charger les produits. Vérifiez la connexion backend.</p>";
        return;
    }

    if (grille) grille.innerHTML = ""; 

    const titreSection = document.getElementById('section-title');
    if (titreSection) {
        titreSection.scrollIntoView({ behavior: 'smooth' });
        if (categorie === 'Toutes' || categorie === 'all' || !categorie) {
            titreSection.innerText = "Notre Catalogue Complet";
            gererZoneBanniereSpeciale(null);
        } else if (categorie.toLowerCase().includes('mode')) {
            titreSection.innerText = "👗 Collection Mode";
            gererZoneBanniereSpeciale('mode');
        } else if (categorie.toLowerCase().includes('beaute') || categorie.toLowerCase().includes('beauté')) {
            titreSection.innerText = "✨ Gamme Beauté & Soins";
            gererZoneBanniereSpeciale('beaute');
        } else if (categorie.toLowerCase().includes('accessoire')) {
            titreSection.innerText = "💼 Collection Accessoires";
            gererZoneBanniereSpeciale('accessoires');
        }
    }

    const produitsAffiches = (categorie === 'Toutes' || categorie === 'Toutes les catégories' || categorie === 'all' || !categorie) 
        ? catalogue 
        : catalogue.filter(p => {
            const cat = (p.category || p.cat || p.categorie || "").toLowerCase().trim();
            return cat.includes(categorie.toLowerCase().trim());
        });

    if (produitsAffiches.length === 0) {
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Aucun produit disponible dans cette catégorie.</p>";
        return;
    }

    let blockActuel = null;
    let compteurDansBlock = 0;
    let indexBlockGlobal = 0;

    produitsAffiches.forEach(p => {
        const imageBrute = p.imageUrl || p.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
        const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
            ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
            : imageBrute;

        const nomProduit = p.name || p.titre || "Produit sans nom";
        const prixProduit = p.price || p.prix || 0;
        const categorieProduit = p.category || p.cat || p.categorie || 'Mode';
        const uniqueId = p._id || p.id;

        const carte = document.createElement('div');
        carte.className = "product-card product-item";
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
                <button class="btn-add-cart" onclick="event.stopPropagation(); ajouterAuPanier('${nomProduit.replace(/'/g, "\\'")}', ${prixProduit})">
                    <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
            </div>`;
            
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
                        <div class="sponsored-card" onclick="ouvrirDetailProduit('cosm-001')">
                            <div class="sponsored-badge">Sponsorisé ℹ</div>
                            <img src="https://images.weserv.nl/?url=https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600" alt="Huile de Baobab">
                            <div class="sponsored-info">
                                <h4>Huile de Baobab Purifiante - Doux-Doux</h4>
                                <p class="sponsored-desc font-text">Soin naturel pressé à froid pour nourrir votre peau.</p>
                                <span class="sponsored-price"></span>
                            </div>
                        </div>`;
                    grille.appendChild(sponsorise);
                } 
                else if (indexBlockGlobal === 2) {
                    const infoBlock = document.createElement('div');
                    infoBlock.className = "info-block-separator";
                    infoBlock.innerHTML = `
                        <div class="info-box-delivery">
                            <span class="delivery-icon">🇸🇳</span>
                            <p><strong>Paiement à la livraison :</strong> Commandez en toute sécurité et payez une fois votre colis entre vos mains !</p>
                        </div>`;
                    grille.appendChild(infoBlock);
                } 
                else if (indexBlockGlobal === 3) {
                    const infoBlock2 = document.createElement('div');
                    infoBlock2.className = "info-block-separator";
                    infoBlock2.innerHTML = `
                        <div class="info-box-delivery help-whatsapp">
                            <span class="delivery-icon">💬</span>
                            <p><strong>Besoin d'aide ?</strong> Des questions sur un produit ? Écrivez-nous directement sur WhatsApp !</p>
                        </div>`;
                    grille.appendChild(infoBlock2);
                }
                else {
                    const espaceur = document.createElement('div');
                    espaceur.className = "block-spacer";
                    grille.appendChild(espaceur);
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

    if (boutique === 'mode') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #3a7bd5, #3a6073); color: white; padding: 25px; border-radius: 4px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">👗 Boutique Mode</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #f0f4f8;">Découvrez les dernières tendances vestimentaires sélectionnées pour vous au Sénégal.</p>
            </div>`;
    } else if (boutique === 'beaute') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #f12711, #f5af19); color: white; padding: 25px; border-radius: 4px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">✨ Gamme Beauté & Soins</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #fff3e0;">Sublimez votre peau et vos cheveux avec nos produits cosmétiques d'exception.</p>
            </div>`;
    } else if (boutique === 'accessoires') {
        zone.innerHTML = `
            <div style="background: linear-gradient(135deg, #11998e, #38ef7d); color: white; padding: 25px; border-radius: 4px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 8px 0; font-size: 24px;">💼 Collection Accessoires</h2>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #e8f5e9;">Sacs, montres et bijoux pour compléter votre style au quotidien.</p>
            </div>`;
    } else {
        zone.innerHTML = "";
    }
}

// ==========================================
// 5. SYSTÈME DE VUE DÉTAILLÉE (MODALE PRODUIT)
// ==========================================
function ouvrirDetailProduit(idOrData) {
    let produit = null;
    
    if (typeof idOrData === 'object' && idOrData !== null) {
        produit = idOrData;
    } else {
        produit = produitsStockesLocale.find(p => (p._id === idOrData || p.id === idOrData));
    }
    
    if (!produit) return;

    const imageBrute = produit.imageUrl || produit.image || 'https://via.placeholder.com/400x400?text=Doux-Doux';
    const imageAffichage = (imageBrute.includes('pinterest.com') || imageBrute.includes('pinimg.com')) 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(imageBrute)}` 
        : imageBrute;

    const nomProduit = produit.name || produit.titre || "Produit sans nom";
    const prixProduit = produit.price || produit.prix || 0;
    const descProduit = produit.desc || produit.description || "Aucune description disponible pour cet article Doux-Doux.";

    if (document.getElementById('modal-product-img')) document.getElementById('modal-product-img').src = imageAffichage;
    if (document.getElementById('modal-product-title')) document.getElementById('modal-product-title').innerText = nomProduit;
    if (document.getElementById('modal-product-category')) document.getElementById('modal-product-category').innerText = `Catégorie : ${produit.category || produit.cat || produit.categorie || 'Mode'}`;
    if (document.getElementById('modal-product-price')) document.getElementById('modal-product-price').innerText = `${Number(prixProduit).toLocaleString()} FCFA`;
    if (document.getElementById('modal-product-desc')) document.getElementById('modal-product-desc').innerText = descProduit;

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
    if (modalDetail) {
        modalDetail.style.display = "flex";
        document.body.classList.add('modal-open');
    }
}

function fermerDetailProduit() {
    const modalDetail = document.getElementById('product-detail-modal');
    if (modalDetail) {
        modalDetail.style.display = "none";
        document.body.classList.remove('modal-open');
    }
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
    const compteur = document.getElementById('cartCount');
    if (compteur) compteur.innerText = panier.length;

    const tousLesCompteurs = document.querySelectorAll('.cart-badge-count');
    tousLesCompteurs.forEach(badge => {
        badge.innerText = panier.length;
    });
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
function openPayment() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
}

function ouvrirPaiementDirect(titre, prix) {
    modeAchatDirect = true;
    produitDirectEnCours = { titre, prix };
    
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
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
        document.body.classList.add('modal-open');
        const listeTitres = panier.map(p => p.titre).join(', ');
        let totalPanier = panier.reduce((sum, item) => sum + item.prix, 0);

        if (document.getElementById('modal-product-name')) document.getElementById('modal-product-name').innerText = `Commande groupée (${panier.length} articles : ${listeTitres})`;
        if (document.getElementById('modal-order-total-price')) document.getElementById('modal-order-total-price').innerText = `${totalPanier.toLocaleString()} FCFA`;
    }
}

function closePayment() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

// ==========================================
// 8. MOTEUR DE RECHERCHE RESTREINT
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
            carte.className = "product-card product-item";
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
        grille.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: red;'>Une erreur est survenue lors de la recherche.</p>";
    }
}

// ==========================================
// 9. GESTION DES REQUÊTES / ENVOI DE COMMANDE
// ==========================================
async function finaliserEtEnvoyerCommande(methodePaiement) {
    const nom = document.getElementById('client-name').value.trim();
    const telephone = document.getElementById('client-phone').value.trim();
    const region = document.getElementById('select-region').value;
    const departement = document.getElementById('select-departement').value;
    const commune = document.getElementById('select-commune').value;

    if (!nom || !telephone || !region || !departement || !commune) {
        alert("Veuillez remplir l'intégralité des informations de livraison.");
        return;
    }

    const articleLabel = modeAchatDirect ? produitDirectEnCours.titre : panier.map(x => x.titre).join(" + ");
    const totalFacture = modeAchatDirect ? produitDirectEnCours.prix : panier.reduce((a, b) => a + b.prix, 0);
    const adresseLivraison = `${region}, Dept: ${departement}, Quartier: ${commune}`;

    const texteWhatsApp = encodeURIComponent(`Bonjour Doux-Doux.sn ! Je souhaite commander :\n\n• Articles : ${articleLabel}\n• Total : ${totalFacture.toLocaleString()} F CFA\n• Mode de paiement : ${methodePaiement}\n\n👉 Infos de livraison :\n- Nom : ${nom}\n- Tél : ${telephone}\n- Localisation : ${adresseLivraison}`);
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
// 11. SLIDERS D'ACCUEIL
// ==========================================
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
// 12. MENUS BURGER ET CONFIGURATION MODALES
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

function ouvrirInfo(titleOrType = '', message = '') {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('info-modal-body');
    if (!modal) return;

    let contenu = '';  

    if (titleOrType === 'commandes') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-box-open" style="font-size: 40px; color: #f97316; margin-bottom: 15px;"></i>
                <h3>Suivi des commandes & Retours</h3>
                <p style="font-size: 13px; color: #4b5563; margin-bottom: 15px;">Suivez vos livraisons en cours partout au Sénégal.</p>
            </div>`;
    } else if (titleOrType === 'vendre') {
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
    } else if (titleOrType === 'guide') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-book-open" style="font-size:40px; color:#0066c0; margin-bottom:15px;"></i>
                <h3>Guide de l'acheteur</h3>
                <p style="font-size:13px; text-align:left; color:#4b5563;">1. Sélectionnez vos articles (Mode, Beauté, Accessoires).<br>2. Validez le panier.<br>3. Payez via Wave, Orange Money ou à la livraison.</p>
            </div>`;
    } else if (titleOrType === 'aide') {
        contenu = `
            <div style="text-align:center;">
                <i class="fas fa-headset" style="font-size: 40px; color: #007185; margin-bottom: 15px;"></i>
                <h3>Besoin d'aide ?</h3>
                <p style="font-size:13px; color:#4b5563;">Notre équipe est à votre disposition 7j/7 pour vous assister.</p>
            </div>`;
    } else if (message) {
        contenu = `
            <div style="text-align:center;">
                <h3>${titleOrType}</h3>
                <p style="font-size:13px; color:#4b5563;">${message}</p>
            </div>`;
    } else {
        contenu = `<p style="text-align:center;">Information non disponible.</p>`;
    }

    if (modalBody) modalBody.innerHTML = contenu;
    modal.style.display = "flex";
    document.body.classList.add('modal-open');
}

function fermerInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
}

// ==========================================
// 13. FONCTIONS UTILITAIRES ET INTERACTIONS
// ==========================================
function retournerEnHaut() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// 14. INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Initialisation du catalogue restreint
    filtrerProduits("Toutes");

    // Touche Entrée sur le champ de recherche
    const inputRecherche = document.getElementById('searchInput');
    if (inputRecherche) {
        inputRecherche.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchProducts();
            }
        });
    }

    // Fermeture des modales au clic extérieur
    window.onclick = function(event) {
        const modalPaiement = document.getElementById('payment-modal');
        const modalDetail = document.getElementById('product-detail-modal');
        const modalInfo = document.getElementById('info-modal');
        const overlaySide = document.getElementById('side-overlay');

        if (event.target === modalPaiement) closePayment();
        if (event.target === modalDetail) fermerDetailProduit();
        if (event.target === modalInfo) fermerInfo();
        if (event.target === overlaySide) closeNav();
    };

    // Fermeture globale des modales et menus avec la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePayment();
            fermerDetailProduit();
            fermerInfo();
            closeNav();
        }
    });
});
