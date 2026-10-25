# Configuration HelloAsso pour les Paiements 💳

## Vue d'ensemble

Le site utilise **HelloAsso** comme solution de paiement en ligne, pour :
- Les frais d'inscription aux **cours d'arabe**
- Les frais des **stages intensifs**
- Les **dons libres** (page Projets et page d'accueil)

HelloAsso est une plateforme française spécialisée pour les associations : **0% de
commission** prélevée sur les paiements (HelloAsso propose juste une contribution
volontaire au payeur, qu'il peut refuser), pas de frais fixes, et aucun compte
développeur/Stripe à gérer.

**Important** : contrairement à l'ancienne intégration Stripe (supprimée), le site
n'appelle pas d'API HelloAsso. Les boutons de paiement redirigent simplement vers les
pages de paiement HelloAsso. Le suivi des paiements se fait depuis le tableau de bord
HelloAsso (voir "Suivi des paiements" plus bas).

## Comment ça fonctionne dans le code

Toutes les URLs HelloAsso sont centralisées dans un seul fichier :

```
src/config/helloasso.ts
```

```typescript
export const HELLOASSO_URLS = {
  dons: null,        // Dons libres / projets
  coursArabe: null,  // Paiement des frais d'inscription aux cours d'arabe
  stages: null,      // Paiement des stages intensifs
}
```

Tant qu'une URL vaut `null`, le bouton correspondant redirige vers `/contact` pour ne
jamais afficher de lien cassé. Dès que vous collez l'URL HelloAsso, le site l'utilise
automatiquement partout :
- Bouton "Faire un Don" (page d'accueil et page Projets)
- Bouton "Soutenir ce projet" sur chaque projet
- Lien "Payer maintenant" affiché après une inscription (cours d'arabe / stages)
- Lien "Payer maintenant" dans l'email de confirmation envoyé automatiquement

## Étape 1 : Créer le compte association sur HelloAsso

1. Allez sur https://www.helloasso.com
2. Cliquez sur **"Créer un compte"** puis choisissez **"Une association"**
3. Préparez les informations suivantes (obligatoires pour une association) :
   - Numéro RNA (répertoire national des associations) ou numéro SIREN
   - Statuts de l'association ou récépissé de déclaration en préfecture
   - RIB de l'association (c'est le compte qui recevra les paiements)
4. Validez l'email de confirmation

> ⏳ La vérification du compte par HelloAsso peut prendre quelques jours. Faites
> cette étape en premier, avant de préparer les formulaires.

## Étape 2 : Créer les formulaires de paiement

Dans le tableau de bord HelloAsso ("Espace Admin"), créez **3 formulaires** :

### A. Dons (page Projets / page d'accueil)

1. **Nouveau formulaire → "Collecte de dons"**
2. Nom : par ex. "Soutenez la Mosquée Al Kawthar"
3. Montant : laissez le choix libre au donateur (montant libre + suggestions, ex. 10€/20€/50€)
4. Activez le reçu fiscal si l'association peut en délivrer (rescrit fiscal)
5. Publiez le formulaire

### B. Cours d'Arabe

1. **Nouveau formulaire → "Vente de billets" ou "Adhésion"** (le type "Adhésion" convient bien pour des frais annuels)
2. Nom : "Inscription Cours d'Arabe - Mosquée Al Kawthar"
3. Ajoutez les tarifs correspondant au site :
   - Cours Enfants : 140€ (1 enfant), avec paliers 260€/360€/440€/500€ pour 2 à 5 enfants si vous voulez les proposer comme tarifs séparés
   - Cours Femmes : 230€
   - Cours Hommes : 230€
4. Astuce : ajoutez un champ personnalisé "Nom et prénom de l'élève" pour pouvoir
   recouper facilement un paiement HelloAsso avec une inscription reçue sur le site
5. Publiez le formulaire

### C. Stages Intensifs

1. **Nouveau formulaire → "Vente de billets"**
2. Nom : "Stage Intensif - Mosquée Al Kawthar"
3. Ajoutez un tarif par type de stage (Hiver / Printemps / Été / Toussaint) avec le montant choisi
4. Publiez le formulaire

## Étape 3 : Récupérer les URLs des formulaires

Pour chaque formulaire publié :

1. Ouvrez le formulaire dans le tableau de bord HelloAsso
2. Cliquez sur **"Partager"**
3. Copiez l'**URL du formulaire** (ressemble à `https://www.helloasso.com/associations/votre-association/formulaires/votre-formulaire`)

## Étape 4 : Coller les URLs dans le code

Ouvrez [`src/config/helloasso.ts`](./src/config/helloasso.ts) et remplacez les `null` :

```typescript
export const HELLOASSO_URLS = {
  dons: 'https://www.helloasso.com/associations/.../formulaires/dons',
  coursArabe: 'https://www.helloasso.com/associations/.../formulaires/cours-arabe',
  stages: 'https://www.helloasso.com/associations/.../formulaires/stages',
}
```

Puis reconstruisez et redéployez le site :

```bash
npm run build
npm run deploy:prod
```

## Étape 5 : Tester

1. Allez sur la page `/projets` du site → le bouton "Faire un don via HelloAsso" doit
   ouvrir votre formulaire de dons
2. Remplissez le formulaire `/cours-arabe` → après soumission, le message de succès
   doit contenir un lien "Payer maintenant via HelloAsso" qui ouvre le bon formulaire
3. Vérifiez que l'email de confirmation reçu contient bien le bouton "Payer maintenant"

## Suivi des paiements

Contrairement à Stripe, **le site ne reçoit aucune information automatique** quand un
paiement HelloAsso est effectué (pas de webhook configuré). Le suivi se fait en deux
endroits séparés :

- **Côté HelloAsso** : Espace Admin → "Formulaires" → onglet "Paiements/Commandes"
  pour voir qui a payé, quand, et combien.
- **Côté site** : les inscriptions (nom, coordonnées, détails du cours/stage) restent
  visibles dans `/admin/dashboard`, avec un statut "En attente" par défaut.

**Recommandation pratique** : après avoir vérifié un paiement reçu sur HelloAsso,
recoupez-le avec l'inscription correspondante côté site (par nom/email) pour savoir qui
a payé. Il n'y a pas encore de bouton "marquer comme payé" dans l'admin — si vous le
voulez, c'est une petite amélioration à prévoir côté code (mettre à jour la colonne
`statut_paiement` via une nouvelle route admin).

### Pour automatiser plus tard (optionnel, nécessite du développement)

HelloAsso propose une API avec des **webhooks** (notifications automatiques à chaque
paiement) : https://dev.helloasso.com. Si vous voulez qu'un paiement HelloAsso mette
automatiquement à jour `statut_paiement` en base (comme le faisait l'ancienne
intégration Stripe), il faudra :
1. Créer des clés API OAuth2 dans l'espace développeur HelloAsso
2. Ajouter une route `/api/webhook/helloasso` dans `src/index.tsx`
3. Configurer l'URL de ce webhook dans les paramètres du formulaire HelloAsso

Ce n'est **pas nécessaire pour démarrer** — le suivi manuel décrit ci-dessus suffit pour
un volume modéré d'inscriptions.

## Frais et versements

- **0% de commission HelloAsso** sur les dons et paiements (modèle "contribution
  volontaire" payée par le donateur/payeur, jamais par l'association)
- Les fonds sont versés sur le compte bancaire de l'association selon le calendrier
  HelloAsso (généralement entre 48h et quelques jours après le paiement)
- Détails à jour : https://www.helloasso.com/tarifs

## Support

- **Documentation HelloAsso** : https://centredaide.helloasso.com
- **Support HelloAsso** : via le chat de l'espace admin ou support@helloasso.com
- **Documentation API (pour automatisation future)** : https://dev.helloasso.com
