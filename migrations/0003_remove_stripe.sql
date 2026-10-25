-- Migration 0003: Suppression de toutes les colonnes Stripe
-- Date: 2026-01-02

-- Supprimer les colonnes Stripe de la table cours_arabe_inscriptions
-- Note: SQLite ne supporte pas ALTER TABLE DROP COLUMN directement
-- Il faut recréer la table sans les colonnes Stripe

-- Créer une nouvelle table temporaire sans les colonnes Stripe
CREATE TABLE cours_arabe_inscriptions_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom_eleve TEXT NOT NULL,
  prenom_eleve TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  niveau_arabe TEXT NOT NULL,
  type_cours TEXT NOT NULL,
  adresse TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  ville TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  est_mineur INTEGER DEFAULT 0,
  nom_parent TEXT,
  telephone_urgence TEXT,
  lien_avec_enfant TEXT,
  autorisation_parentale INTEGER DEFAULT 0,
  autorisation_photos INTEGER DEFAULT 0,
  nombre_enfants INTEGER DEFAULT 1,
  frais_inscription REAL NOT NULL,
  assurance_fournie INTEGER DEFAULT 0,
  statut_paiement TEXT DEFAULT 'En attente',
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Copier les données (sans les colonnes Stripe)
INSERT INTO cours_arabe_inscriptions_new 
SELECT 
  id, nom_eleve, prenom_eleve, date_naissance, niveau_arabe, type_cours,
  adresse, code_postal, ville, email, telephone, est_mineur, nom_parent,
  telephone_urgence, lien_avec_enfant, autorisation_parentale, 
  autorisation_photos, nombre_enfants, frais_inscription, assurance_fournie,
  statut_paiement, date_inscription
FROM cours_arabe_inscriptions;

-- Supprimer l'ancienne table
DROP TABLE cours_arabe_inscriptions;

-- Renommer la nouvelle table
ALTER TABLE cours_arabe_inscriptions_new RENAME TO cours_arabe_inscriptions;

-- Faire de même pour stages_intensifs_inscriptions
CREATE TABLE stages_intensifs_inscriptions_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  civilite TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  email TEXT NOT NULL,
  type_stage TEXT NOT NULL,
  date_stage TEXT,
  montant REAL NOT NULL,
  statut_paiement TEXT DEFAULT 'En attente',
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Copier les données
INSERT INTO stages_intensifs_inscriptions_new 
SELECT 
  id, civilite, nom, prenom, telephone, date_naissance, email,
  type_stage, date_stage, montant, statut_paiement, date_inscription
FROM stages_intensifs_inscriptions;

-- Supprimer l'ancienne table
DROP TABLE stages_intensifs_inscriptions;

-- Renommer la nouvelle table
ALTER TABLE stages_intensifs_inscriptions_new RENAME TO stages_intensifs_inscriptions;
