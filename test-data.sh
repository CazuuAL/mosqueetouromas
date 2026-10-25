#!/bin/bash

# Ajouter des actualités de test
echo "Ajout d'actualités de test..."
curl -X POST http://localhost:3000/api/actualites \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Bienvenue sur le nouveau site de la Mosquée Al Kawthar",
    "contenu": "Nous sommes heureux de vous présenter notre nouveau site web ! Vous pouvez désormais vous inscrire en ligne aux cours d arabe et aux stages intensifs. Consultez régulièrement cette page pour rester informé de nos actualités.",
    "auteur": "Administration",
    "categorie": "Annonce",
    "est_publie": 1
  }'

echo -e "\n"

curl -X POST http://localhost:3000/api/actualites \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Inscriptions ouvertes pour les cours d arabe 2026",
    "contenu": "Les inscriptions pour l année 2026 sont maintenant ouvertes ! Cours disponibles pour enfants, femmes et hommes, tous niveaux. Tarifs dégressifs pour les familles. Rendez-vous sur la page Cours d Arabe pour vous inscrire.",
    "auteur": "Responsable Pédagogique",
    "categorie": "Cours",
    "est_publie": 1
  }'

echo -e "\n"

curl -X POST http://localhost:3000/api/actualites \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Stage intensif vacances de printemps",
    "contenu": "Un stage intensif d arabe aura lieu durant les vacances de printemps. Programme adapté pour progresser rapidement. Places limitées, inscrivez-vous vite !",
    "auteur": "Administration",
    "categorie": "Stages",
    "est_publie": 1
  }'

echo -e "\n\n"

# Ajouter des projets de test
echo "Ajout de projets de test..."
curl -X POST http://localhost:3000/api/projets \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Rénovation de la salle de prière",
    "description": "Projet de rénovation et d agrandissement de la salle de prière principale pour accueillir plus de fidèles dans de meilleures conditions.",
    "statut": "En cours",
    "objectif_financier": 50000,
    "montant_collecte": 18500,
    "est_actif": 1
  }'

echo -e "\n"

curl -X POST http://localhost:3000/api/projets \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Achat de livres pour la bibliothèque",
    "description": "Enrichissement de notre bibliothèque avec de nouveaux ouvrages islamiques en français et en arabe pour toute la famille.",
    "statut": "En cours",
    "objectif_financier": 5000,
    "montant_collecte": 3200,
    "est_actif": 1
  }'

echo -e "\n"

curl -X POST http://localhost:3000/api/projets \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Organisation Omra 2026",
    "description": "Préparation du voyage Omra pour la communauté. Accompagnement spirituel et logistique complet.",
    "statut": "À venir",
    "est_actif": 1
  }'

echo -e "\n\nDonnées de test ajoutées avec succès !"
