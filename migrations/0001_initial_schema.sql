CREATE TABLE IF NOT EXISTS cours_arabe_inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom_eleve TEXT NOT NULL,
  prenom_eleve TEXT NOT NULL,
  date_naissance TEXT NOT NULL,
  niveau_arabe TEXT NOT NULL CHECK(niveau_arabe IN ('Débutant', 'Intermédiaire', 'Avancé')),
  type_cours TEXT NOT NULL CHECK(type_cours IN ('Enfants', 'Femmes', 'Hommes')),
  
  adresse TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  ville TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  
  est_mineur BOOLEAN DEFAULT 0,
  nom_parent TEXT,
  telephone_urgence TEXT,
  lien_avec_enfant TEXT CHECK(lien_avec_enfant IN ('Père', 'Mère', 'Tuteur légal')),
  autorisation_parentale BOOLEAN DEFAULT 0,
  autorisation_photos BOOLEAN DEFAULT 0,
  
  nombre_enfants INTEGER DEFAULT 1,
  frais_inscription REAL NOT NULL,
  statut_paiement TEXT DEFAULT 'En attente' CHECK(statut_paiement IN ('En attente', 'Reçu', 'Validé')),
  assurance_fournie BOOLEAN DEFAULT 0,
  
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stages_intensifs_inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  civilite TEXT NOT NULL CHECK(civilite IN ('M.', 'Mme', 'Mlle')),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  date_naissance TEXT NOT NULL,
  email TEXT,
  
  type_stage TEXT NOT NULL,
  date_stage TEXT,
  
  montant REAL NOT NULL,
  statut_paiement TEXT DEFAULT 'En attente' CHECK(statut_paiement IN ('En attente', 'Reçu', 'Validé')),
  
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actualites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL,
  image_url TEXT,
  date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
  auteur TEXT,
  categorie TEXT,
  est_publie BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  statut TEXT DEFAULT 'En cours' CHECK(statut IN ('En cours', 'Terminé', 'À venir')),
  objectif_financier REAL,
  montant_collecte REAL DEFAULT 0,
  date_debut TEXT,
  date_fin TEXT,
  est_actif BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cours_email ON cours_arabe_inscriptions(email);
CREATE INDEX IF NOT EXISTS idx_cours_date ON cours_arabe_inscriptions(date_inscription);
CREATE INDEX IF NOT EXISTS idx_stages_telephone ON stages_intensifs_inscriptions(telephone);
CREATE INDEX IF NOT EXISTS idx_stages_date ON stages_intensifs_inscriptions(date_inscription);
CREATE INDEX IF NOT EXISTS idx_actualites_date ON actualites(date_publication);
CREATE INDEX IF NOT EXISTS idx_projets_statut ON projets(statut);
