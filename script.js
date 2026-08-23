// ==========================================
// DOUX-DOUX.SN — SCRIPT CATALOGUE (page d'accueil / liste produits)
// Dépend de products-data.js (chargé AVANT ce fichier dans le HTML)
// ==========================================

let panier = JSON.parse(localStorage.getItem("dd_panier") || "[]");

function sauvegarderPanier() {
  try { localStorage.setItem("dd_panier", JSON.stringify(panier)); } catch (e) { /* stockage indisponible, on continue sans */ }
}

// ==========================================
// AFFICHAGE ET FILTRAGE DU CATALOGUE
// ==========================================
async function filtrerProduits(categorieCode) {
  const grille = document.getElementById("productGrid");
  if (grille) grille.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>Chargement du catalogue Doux-Doux...</p>";

  const catalogue = await chargerCatalogue();
  if (!catalogue || catalogue.length === 0) {
    if (grille) grille.innerHTML = "<p style='color:#b12704;grid-column:1/-1;text-align:center;'>Impossible de charger les produits.</p>";
    return;
  }

  // Met à jour l'onglet actif dans le bandeau de catégories
  document.querySelectorAll(".cat-nav button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === (categorieCode || "Toutes"));
  });

  const titreSection = document.getElementById("section-title");
  const produitsAffiches = (!categorieCode || categorieCode === "Toutes")
    ? catalogue
    : catalogue.filter(p => p.category === categorieCode);

  if (titreSection) {
    titreSection.innerText = (!categorieCode || categorieCode === "Toutes")
      ? "Notre catalogue complet"
      : `${libelleCategorie(categorieCode)} — Doux-Doux`;
  }

  afficherBanniereCategorie(categorieCode);

  if (grille) grille.innerHTML = "";
  let blockActuel = null;
  let compteurDansBlock = 0;

  produitsAffiches.forEach(p => {
    const carte = construireCarteProduit(p);
    if (!grille) return;
    if (compteurDansBlock === 0) {
      blockActuel = document.createElement("div");
      blockActuel.className = "product-block-4";
      grille.appendChild(blockActuel);
    }
    blockActuel.appendChild(carte);
    compteurDansBlock++;
    if (compteurDansBlock === 4) {
      compteurDansBlock = 0;
      const infoBlock = document.createElement("div");
      infoBlock.className = "info-block-separator";
      infoBlock.innerHTML = `
        <div class="info-box-delivery">
          <span class="delivery-icon">🇸🇳</span>
          <p><strong>Paiement à la livraison :</strong> Commandez en toute sécurité et payez une fois votre colis entre vos mains, partout au Sénégal.</p>
        </div>`;
      grille.appendChild(infoBlock);
    }
  });

  document.getElementById("catalogue-section")?.scrollIntoView({ behavior: "smooth" });
}

function construireCarteProduit(p) {
  const nomProduit = p.name || "Article Doux-Doux";
  const prixProduit = Number(p.price || 0);
  const idProduit = p.id ?? p._id;
  const image = urlImagePropre(p.imageUrl);

  const carte = document.createElement("div");
  carte.className = "product-card";
  carte.style.cursor = "pointer";
  // Le clic amène sur une PAGE DÉDIÉE à l'article, avec ses détails + articles similaires
  carte.onclick = () => { window.location.href = `produit.html?id=${idProduit}`; };

  carte.innerHTML = `
    <div class="product-image"><img src="${image}" alt="${nomProduit}" loading="lazy"></div>
    <div class="product-info">
      <span class="category-tag">${libelleCategorie(p.category)}</span>
      <h3 class="product-title">${nomProduit}</h3>
      <p class="product-price"><strong>${prixProduit.toLocaleString()} FCFA</strong></p>
    </div>`;
  return carte;
}

function afficherBanniereCategorie(categorieCode) {
  const zone = document.getElementById("hero-banner");
  if (!zone) return;
  const cat = CATEGORIES.find(c => c.code === categorieCode);
  const image = cat ? MANNEQUINS_BANNIERES[cat.code] : MANNEQUINS_BANNIERES["Textile-Mode"];
  const titre = cat ? cat.label : "Doux-Doux.sn";
  const texte = cat
    ? `Découvrez notre sélection ${cat.label.toLowerCase()}, livrée partout au Sénégal.`
    : "Mode, beauté et accessoires — tout Doux-Doux dans une seule boutique, payable à la livraison.";
  zone.innerHTML = `
    <img src="${image}" alt="Mannequin Doux-Doux">
    <div class="hero-content">
      <span class="eyebrow">Doux-Doux.sn</span>
      <h1>${titre}</h1>
      <p>${texte}</p>
    </div>`;
}

// ==========================================
// RECHERCHE
// ==========================================
async function searchProducts() {
  const input = document.getElementById("searchInput");
  const grille = document.getElementById("productGrid");
  if (!input || !grille) return;
  const saisie = input.value.toLowerCase().trim();
  const selectCategorie = document.getElementById("search-category");
  const categorieSelectionnee = selectCategorie ? selectCategorie.value : "Toutes";

  grille.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>Recherche en cours...</p>";
  const catalogue = await chargerCatalogue();

  const resultats = catalogue.filter(p => {
    const nom = (p.name || "").toLowerCase();
    const desc = (p.desc || "").toLowerCase();
    const correspondCategorie = categorieSelectionnee === "Toutes" || p.category === categorieSelectionnee;
    const correspondMotCle = saisie === "" || nom.includes(saisie) || desc.includes(saisie);
    return correspondCategorie && correspondMotCle;
  });

  const titreSection = document.getElementById("section-title");
  if (titreSection) titreSection.innerText = saisie ? `Résultats pour « ${input.value} »` : "Notre catalogue complet";

  grille.innerHTML = "";
  if (resultats.length === 0) {
    grille.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>Aucun produit ne correspond à votre recherche.</p>";
    return;
  }
  const block = document.createElement("div");
  block.className = "product-block-4";
  grille.appendChild(block);
  resultats.forEach(p => block.appendChild(construireCarteProduit(p)));
}

// ==========================================
// PANIER LATÉRAL
// ==========================================
function toggleCartSidebar() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("side-overlay");
  if (!sidebar) return;
  const estOuvert = sidebar.style.right === "0px";
  sidebar.style.right = estOuvert ? "-400px" : "0px";
  if (overlay) overlay.style.display = estOuvert ? "none" : "block";
  if (!estOuvert) renderCartSidebar();
}

function ajouterAuPanier(titre, prix, image) {
  panier.push({ titre, prix: Number(prix), image });
  sauvegarderPanier();
  moteurMettreAJourBadgesPanier();
  renderCartSidebar();
}

function moteurMettreAJourBadgesPanier() {
  document.querySelectorAll(".cart-badge-count").forEach(badge => { badge.innerText = panier.length; });
}

function renderCartSidebar() {
  const container = document.getElementById("cartSidebarItems");
  const totalLabel = document.getElementById("cartSidebarTotal");
  if (!container) return;
  container.innerHTML = "";
  let total = 0;

  if (panier.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#6B6F76;margin-top:40px;'>Votre panier Doux-Doux est vide.</p>";
    if (totalLabel) totalLabel.innerText = "0 FCFA";
    return;
  }

  panier.forEach((item, index) => {
    total += item.prix;
    const row = document.createElement("div");
    row.style.cssText = "display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E7E1D3;padding-bottom:10px;margin-bottom:10px;";
    row.innerHTML = `
      <div style="max-width:220px;">
        <p style="margin:0;font-size:13px;font-weight:700;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.titre}</p>
        <p style="margin:3px 0 0;font-size:13px;color:#1B2A4A;font-weight:700;">${item.prix.toLocaleString()} FCFA</p>
      </div>
      <button onclick="retirerDuPanier(${index})" style="background:none;border:none;color:#1F7A6C;cursor:pointer;font-size:12px;">Supprimer</button>`;
    container.appendChild(row);
  });

  if (totalLabel) totalLabel.innerText = `${total.toLocaleString()} FCFA`;
}

function retirerDuPanier(index) {
  panier.splice(index, 1);
  sauvegarderPanier();
  moteurMettreAJourBadgesPanier();
  renderCartSidebar();
}

function viderLePanierComplete() {
  panier = [];
  sauvegarderPanier();
  moteurMettreAJourBadgesPanier();
  renderCartSidebar();
}

// ==========================================
// TUNNEL DE COMMANDE (paiement Wave / Orange Money)
// ==========================================
let modeAchatDirect = false;
let produitDirectEnCours = null;

function ouvrirPaiementDirect(titre, prix) {
  modeAchatDirect = true;
  produitDirectEnCours = { titre, prix };
  const modal = document.getElementById("payment-modal");
  if (modal) {
    modal.style.display = "flex";
    document.getElementById("modal-product-name").innerText = titre;
    document.getElementById("modal-order-total-price").innerText = `${Number(prix).toLocaleString()} FCFA`;
  }
}

function procederAuPaiementPanier() {
  if (panier.length === 0) { alert("Votre panier est vide."); return; }
  modeAchatDirect = false;
  toggleCartSidebar();
  const modal = document.getElementById("payment-modal");
  if (modal) {
    modal.style.display = "flex";
    const totalPanier = panier.reduce((sum, item) => sum + item.prix, 0);
    document.getElementById("modal-product-name").innerText = `Commande groupée (${panier.length} article${panier.length > 1 ? "s" : ""})`;
    document.getElementById("modal-order-total-price").innerText = `${totalPanier.toLocaleString()} FCFA`;
  }
}

function closePayment() {
  const modal = document.getElementById("payment-modal");
  if (modal) modal.style.display = "none";
}

async function finaliserEtEnvoyerCommande(methodePaiement) {
  const nom = document.getElementById("client-name")?.value.trim();
  const telephone = document.getElementById("client-phone")?.value.trim();
  const region = document.getElementById("select-region")?.value;
  const departement = document.getElementById("select-departement")?.value;
  const commune = document.getElementById("select-commune")?.value;

  if (!nom || !telephone || !region || !departement || !commune) {
    alert("Veuillez remplir l'intégralité des informations de livraison.");
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
    `👉 Infos de livraison :\n- Nom : ${nom}\n- Tél : ${telephone}\n- Localisation : ${adresseLivraison}`
  );
  const lienWhatsApp = `https://wa.me/221777226359?text=${texteWhatsApp}`;

  if (methodePaiement === "Wave") {
    window.open(lienWhatsApp, "_blank");
    window.location.href = "https://pay.wave.com/m/M_sn_oPpmOm67pxb4/c/sn/";
  } else if (methodePaiement === "Orange Money") {
    window.open(lienWhatsApp, "_blank");
    window.location.href = "tel:#144#";
  } else {
    window.location.href = lienWhatsApp;
  }
  closePayment();
}

// ==========================================
// LOCALISATION SÉNÉGAL (régions > départements > communes)
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
    "Bambey": ["Bambey", "Baba Garace", "Lambaye", "Ngogom", "Réfane"],
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
  const regionSelect = document.getElementById("select-region");
  const deptSelect = document.getElementById("select-departement");
  const commSelect = document.getElementById("select-commune");
  if (!regionSelect || !deptSelect || !commSelect) return;

  const region = regionSelect.value;
  deptSelect.innerHTML = '<option value="">-- Département --</option>';
  commSelect.innerHTML = '<option value="">-- Commune --</option>';
  commSelect.style.display = "none";

  if (region && senegalMap[region]) {
    deptSelect.style.display = "inline-block";
    for (const dept in senegalMap[region]) {
      const opt = document.createElement("option");
      opt.value = dept; opt.textContent = dept;
      deptSelect.appendChild(opt);
    }
  } else {
    deptSelect.style.display = "none";
  }
}

function chargerCommunes() {
  const regionSelect = document.getElementById("select-region");
  const deptSelect = document.getElementById("select-departement");
  const commSelect = document.getElementById("select-commune");
  if (!regionSelect || !deptSelect || !commSelect) return;

  const region = regionSelect.value;
  const dept = deptSelect.value;
  commSelect.innerHTML = '<option value="">-- Commune / Quartier --</option>';

  if (dept && senegalMap[region] && senegalMap[region][dept]) {
    commSelect.style.display = "inline-block";
    senegalMap[region][dept].forEach(commune => {
      const opt = document.createElement("option");
      opt.value = commune; opt.textContent = commune;
      commSelect.appendChild(opt);
    });
  } else {
    commSelect.style.display = "none";
  }
}

// ==========================================
// MENU BURGER
// ==========================================
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("side-overlay").style.display = "block";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  if (!document.getElementById("cartSidebar") || document.getElementById("cartSidebar").style.right !== "0px") {
    document.getElementById("side-overlay").style.display = "none";
  }
}

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  moteurMettreAJourBadgesPanier();
  if (document.getElementById("productGrid")) {
    const catDepuisUrl = new URLSearchParams(window.location.search).get("cat");
    filtrerProduits(catDepuisUrl || "Toutes");
  }
});
