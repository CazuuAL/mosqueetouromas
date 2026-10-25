# Mosquée Al Kawthar - Site Web Officiel

## 📋 Vue d'ensemble
Site web pour la Mosquée Al Kawthar à Saint-Pierre-des-Corps. Plateforme complète pour informer la communauté et gérer les inscriptions aux cours et activités.

## 🌐 URLs
- **Développement Local**: http://localhost:3000 (voir "Installation et Développement" ci-dessous)
- **Production**: [À déployer sur Cloudflare Pages]
- **Repository GitHub**: [À configurer]

## ✨ Fonctionnalités Actuelles

### Pages Publiques
- ✅ **Page d'accueil** - Présentation de la mosquée, services, horaires de prières, actualités
- ✅ **À propos** - Mission, histoire et valeurs de la mosquée (contenu à compléter)
- ✅ **Cours d'Arabe** - Présentation des cours (enfants, femmes, hommes) avec formulaire d'inscription
- ✅ **Stages Intensifs** - Inscription aux stages de vacances
- ✅ **Projets** - Affichage des projets communautaires avec suivi des dons
- ✅ **Actualités** - Liste complète des actualités de la mosquée
- ✅ **Contact** - Informations de contact et formulaire de message

### Système d'Inscriptions
- ✅ **Cours d'Arabe**
  - Inscription pour enfants, femmes ou hommes
  - Niveaux : Débutant, Intermédiaire, Avancé
  - Tarifs dégressifs pour les familles (1-5 enfants)
  - Formulaire adaptatif selon le type de cours
  - Champs spécifiques pour mineurs (autorisations parentales, assurance)
  
- ✅ **Stages Intensifs**
  - Formulaire simplifié (civilité, nom, prénom, téléphone, date de naissance)
  - Sélection du type de stage
  - Gestion du paiement

### Base de Données
- ✅ **Cloudflare D1 (SQLite)** configurée localement
- ✅ Tables créées :
  - `cours_arabe_inscriptions` - Inscriptions aux cours d'arabe
  - `stages_intensifs_inscriptions` - Inscriptions aux stages
  - `actualites` - Gestion des actualités
  - `projets` - Gestion des projets et dons

### API REST
- ✅ `GET /api/prayer-times` - Récupérer les horaires de prière en temps réel depuis Mawaqit
- ✅ `GET /api/prayer-times` - Horaires de prière (Mawaqit)
- ✅ `POST /api/inscriptions/cours-arabe` - Créer une inscription cours (public)
- 🔒 `GET /api/inscriptions/cours-arabe` - Lister les inscriptions cours (admin uniquement)
- ✅ `POST /api/inscriptions/stages` - Créer une inscription stage (public)
- 🔒 `GET /api/inscriptions/stages` - Lister les inscriptions stages (admin uniquement)
- ✅ `GET /api/actualites` - Lister les actualités publiées (public)
- 🔒 `POST /api/actualites` - Créer une actualité (admin uniquement)
- ✅ `GET /api/projets` - Lister les projets actifs (public)
- 🔒 `POST /api/projets` - Créer un projet (admin uniquement)
- ✅ `POST /api/admin/login` - Connexion admin (retourne un token signé)

🔒 = nécessite un header `Authorization: Bearer <token>` obtenu via `/api/admin/login`.

### Intégration Mawaqit
- ✅ **Horaires de prière en temps réel** depuis l'API Mawaqit
- ✅ Affichage automatique de Fajr, Dhuhr, Asr, Maghrib et Isha
- ✅ Mise à jour quotidienne des horaires
- ✅ Source: [Mosquée Al-Kawthar sur Mawaqit](https://mawaqit.net/fr/msp)

### 💳 Paiement en ligne (HelloAsso)
- ✅ Boutons "Payer maintenant" / "Faire un don" redirigeant vers HelloAsso (dons, cours d'arabe, stages)
- ✅ Lien de paiement inclus dans l'email de confirmation d'inscription
- ⏳ URLs HelloAsso à configurer (actuellement vides, voir le guide ci-dessous)
- 📖 Guide complet : [HELLOASSO_SETUP.md](./HELLOASSO_SETUP.md)

## 🎨 Design
- Framework CSS: **Tailwind CSS** (via CDN)
- Icônes: **Font Awesome 6**
- Couleurs principales: Teal (vert-bleu) et jaune (logo)
- Design responsive et moderne
- Animations et effets de survol

## 🏗️ Architecture Technique

### Frontend
- **HTML5** avec templates TypeScript
- **Tailwind CSS** pour le styling
- **Vanilla JavaScript** pour les interactions
- **Axios** pour les requêtes API

### Backend
- **Hono Framework** - Framework web léger pour Cloudflare Workers
- **TypeScript** - Type safety
- **Cloudflare D1** - Base de données SQLite edge
- **Cloudflare Pages** - Hébergement et déploiement

### Structure du Projet
```
webapp/
├── src/
│   ├── index.tsx              # Application Hono principale avec routes API
│   ├── templates/
│   │   ├── layout.ts          # Layout principal, navigation, footer
│   │   ├── pages.ts           # Pages cours et stages
│   │   └── other-pages.ts     # Autres pages (à propos, projets, etc.)
│   └── renderer.tsx           # Renderer JSX de base
├── public/
│   └── static/
│       ├── logo-mosquee.png   # Logo Al Kawthar
│       ├── app.js             # JavaScript frontend
│       └── style.css          # Styles personnalisés
├── migrations/
│   └── 0001_initial_schema.sql # Schéma de base de données
├── wrangler.jsonc             # Configuration Cloudflare
├── ecosystem.config.cjs       # Configuration PM2 pour dev
└── package.json               # Dépendances et scripts
```

## 🔧 Installation et Développement

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation
```bash
# Depuis le dossier du projet (celui contenant ce README)
npm install
cp .dev.vars.example .dev.vars   # puis renseignez vos propres valeurs
```

### Base de Données Locale
```bash
# Appliquer les migrations localement
npm run db:migrate:local

# Accéder à la console D1 locale
npm run db:console:local -- --command="SELECT * FROM cours_arabe_inscriptions"
```

### Développement

**Option simple (recommandée)** :
```bash
npm run dev
```
Ouvre un serveur de développement avec rechargement à chaud sur http://localhost:3000.

**Option via Wrangler (plus proche de la prod, utile pour tester le binding D1)** :
```bash
npm run build
npm run dev:sandbox
```

Le fichier `ecosystem.config.cjs` (PM2) n'est utile que sous Linux/macOS pour superviser
le process `wrangler pages dev` en arrière-plan ; il n'est pas nécessaire sur Windows.

### Tests
```bash
# Tester l'accès au serveur
curl http://localhost:3000

# Tester l'API des horaires de prière
curl http://localhost:3000/api/prayer-times

# Tester une inscription cours d'arabe
curl -X POST http://localhost:3000/api/inscriptions/cours-arabe \
  -H "Content-Type: application/json" \
  -d '{"nom_eleve":"Test","prenom_eleve":"User","date_naissance":"2010-01-01","niveau_arabe":"Débutant","type_cours":"Enfants","adresse":"123 rue test","code_postal":"37000","ville":"Tours","email":"test@test.com","telephone":"0123456789","frais_inscription":140}'
```

**Test du parcours d'inscription + paiement :**
1. Ouvrir `/cours-arabe`
2. Remplir le formulaire d'inscription et cliquer sur "S'inscrire"
3. Le message de succès affiche un lien "Payer maintenant via HelloAsso"
4. Vérifier que ce lien pointe vers le bon formulaire HelloAsso (voir [HELLOASSO_SETUP.md](./HELLOASSO_SETUP.md))
5. Vérifier que l'inscription apparaît dans `/admin/dashboard` (connexion admin requise)

## 📝 Contenu à Compléter

Les éléments suivants sont marqués avec `[TEXTE À COMPLÉTER]` ou `[VALEUR]` dans le code et doivent être renseignés :

### Page d'Accueil
- [x] **Horaires des 5 prières quotidiennes** - ✅ Intégré via Mawaqit API
- [ ] Adresse complète de la mosquée (déjà sur Mawaqit: 71 rue de la Rabaterie 37700 Saint-Pierre-des-Corps)
- [ ] Numéro de téléphone (déjà sur Mawaqit: 0033219264302)
- [ ] Adresse email (déjà sur Mawaqit: mosqueespdc71@gmail.com)
- [ ] Liens réseaux sociaux (Facebook, Instagram, YouTube)

### Page À Propos
- [ ] Description de la mission de la mosquée
- [ ] Histoire de la mosquée (fondation, évolution)
- [ ] Détails des 4 valeurs (Fraternité, Savoir, Solidarité, Respect)

### Page Contact
- [ ] Adresse complète
- [ ] Horaires d'ouverture
- [ ] Intégration Google Maps
- [ ] Fonctionnalité d'envoi de formulaire de contact

### Stages Intensifs
- [ ] Âge minimum requis
- [ ] Dates et prix des différents stages
- [ ] Détails des programmes

### Actualités et Projets
- [ ] Ajouter du contenu initial via l'API ou interface admin

## 🚀 Déploiement sur Cloudflare Pages

### Étape 1: Configuration Cloudflare
```bash
# Se connecter à Cloudflare (nécessite CLOUDFLARE_API_TOKEN)
npx wrangler login

# Créer la base de données de production
npx wrangler d1 create webapp-production

# Copier le database_id dans wrangler.jsonc
```

### Étape 2: Appliquer les Migrations en Production
```bash
npm run db:migrate:prod
```

### Étape 2bis : Configurer les secrets (obligatoire avant le premier déploiement)
```bash
npx wrangler pages secret put ADMIN_USERNAME --project-name webapp
npx wrangler pages secret put ADMIN_PASSWORD --project-name webapp
npx wrangler pages secret put ADMIN_TOKEN_SECRET --project-name webapp   # ex: openssl rand -hex 32
npx wrangler pages secret put RESEND_API_KEY --project-name webapp
```

⚠️ Sans `ADMIN_TOKEN_SECRET` configuré, le site retombe sur un secret de
développement non sécurisé — ne déployez jamais en production sans l'avoir défini.

### Étape 3: Créer le Projet Pages
```bash
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2026-01-02
```

### Étape 4: Déployer
```bash
npm run deploy:prod
```

### URLs après Déploiement
- Production: `https://webapp.pages.dev`
- Branches: `https://[branch].webapp.pages.dev`

## 📊 Gestion des Données

### Voir les Inscriptions
```bash
# Local
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM cours_arabe_inscriptions"

# Production
npx wrangler d1 execute webapp-production \
  --command="SELECT * FROM cours_arabe_inscriptions"
```

### Ajouter du Contenu Test

Les routes `POST /api/actualites` et `POST /api/projets` sont protégées : il faut
d'abord récupérer un token admin.

```bash
# Se connecter en admin et récupérer le token
TOKEN=$(curl -s -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"VOTRE_MOT_DE_PASSE"}' | jq -r .token)

# Ajouter une actualité
curl -X POST http://localhost:3000/api/actualites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titre": "Bienvenue sur le nouveau site",
    "contenu": "Nous sommes heureux de vous présenter notre nouveau site web...",
    "auteur": "Administration",
    "categorie": "Annonce",
    "est_publie": 1
  }'

# Ajouter un projet
curl -X POST http://localhost:3000/api/projets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titre": "Rénovation de la salle de prière",
    "description": "Projet de rénovation et d'agrandissement de la salle de prière principale",
    "statut": "En cours",
    "objectif_financier": 50000,
    "montant_collecte": 15000,
    "est_actif": 1
  }'
```

## 🔐 Sécurité
- ✅ CORS configuré pour les routes API
- ✅ Authentification admin par token signé (HMAC-SHA256), expiration 24h
- ✅ Routes sensibles protégées (inscriptions, création d'actualités/projets)
- ✅ Base de données D1 sécurisée
- ⏳ À ajouter : Rate limiting
- ⏳ À ajouter : Protection CSRF pour les formulaires publics

## 🎯 Prochaines Étapes Recommandées

### Fonctionnalités Prioritaires
1. ~~**Interface Admin**~~ - ✅ **IMPLÉMENTÉ** - Panneau d'administration pour gérer actualités, projets et inscriptions
2. ~~**Système d'authentification**~~ - ✅ **IMPLÉMENTÉ** - Token admin signé, routes sensibles protégées
3. **Notifications email** - ✅ **IMPLÉMENTÉ** (Resend) - voir [RESEND_SETUP.md](./RESEND_SETUP.md)
4. **Paiement en ligne** - ⏳ Boutons en place, URLs HelloAsso à configurer - voir [HELLOASSO_SETUP.md](./HELLOASSO_SETUP.md)
5. ~~**Horaires de prières dynamiques**~~ - ✅ **IMPLÉMENTÉ** - API Mawaqit pour horaires en temps réel
6. **Calendrier des événements** - Gestion et affichage des événements de la mosquée
7. **Dashboard de suivi** - Tableau de bord pour voir les statistiques d'inscription et paiements
8. **Marquer un paiement comme reçu** - Actuellement le rapprochement HelloAsso ↔ inscription est manuel (voir HELLOASSO_SETUP.md)

### Améliorations UX
- Ajout de animations et transitions
- Mode sombre optionnel
- Version arabe du site (RTL)
- Amélioration de l'accessibilité (ARIA labels)

### Performance
- Optimisation des images
- Mise en cache des données
- Lazy loading des images

## 📞 Support
Pour toute question ou assistance, contactez l'administrateur du site.

---

**Dernière mise à jour**: 2026-01-02  
**Version**: 1.0.0  
**Stack**: Hono + TypeScript + Tailwind CSS + Cloudflare Pages/D1
