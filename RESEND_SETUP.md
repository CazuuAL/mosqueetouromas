# Configuration Resend pour l'Envoi d'Emails 📧

## Vue d'ensemble

Le site utilise **Resend** pour envoyer automatiquement des emails de confirmation aux utilisateurs qui s'inscrivent aux cours d'arabe ou aux stages intensifs.

### Quand les emails sont envoyés ?

1. **Après l'inscription** - Email de confirmation immédiat avec statut "En attente de paiement"
2. **Après le paiement Stripe réussi** - Email de confirmation avec statut "Paiement confirmé"
3. **Payer plus tard** - L'email initial indique que le paiement peut être fait plus tard

## Étape 1 : Créer un Compte Resend (Gratuit)

1. Allez sur https://resend.com
2. Créez un compte gratuit
   - **Plan gratuit** : 100 emails/jour, 3000 emails/mois
   - Parfait pour démarrer !

## Étape 2 : Obtenir votre Clé API

1. Connectez-vous à https://resend.com/api-keys
2. Cliquez sur **"Create API Key"**
3. Donnez-lui un nom (ex: "Mosquée Al Kawthar")
4. Sélectionnez les permissions : **"Sending access"**
5. Cliquez sur **"Create"**
6. **Copiez immédiatement la clé** (elle ne sera plus affichée !)
   - Format : `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

## Étape 3 : Configuration en Développement

### Modifier le fichier `.dev.vars`

```bash
# Dans .dev.vars
RESEND_API_KEY=re_votre_cle_copiee_ici
```

### Redémarrer le serveur

```bash
npm run build
pm2 restart mosquee-alkawthar --update-env
```

## Étape 4 : Configuration en Production (Cloudflare)

```bash
# Ajouter la clé Resend comme secret Cloudflare
npx wrangler pages secret put RESEND_API_KEY --project-name webapp

# Lors du prompt, coller votre clé Resend
```

## Étape 5 : Configuration de l'Expéditeur

### Mode Développement (Par défaut)

En développement, Resend utilise automatiquement `onboarding@resend.dev` comme expéditeur.
- ✅ Fonctionne immédiatement
- ✅ Pas de configuration de domaine nécessaire
- ⚠️ Limité à 100 emails/jour

### Mode Production (Recommandé)

Pour utiliser votre propre domaine (ex: `noreply@mosquee-alkawthar.fr`) :

1. **Ajouter votre domaine dans Resend**
   - Allez sur https://resend.com/domains
   - Cliquez sur **"Add Domain"**
   - Entrez votre domaine : `mosquee-alkawthar.fr`

2. **Configurer les DNS**
   - Resend vous donnera des enregistrements DNS à ajouter
   - Ajoutez ces enregistrements dans votre hébergeur DNS (OVH, Cloudflare, etc.)
   - Types d'enregistrements :
     - `TXT` pour la vérification
     - `MX` pour la réception
     - `TXT` pour SPF et DKIM

3. **Vérifier le domaine**
   - Attendez quelques minutes (propagation DNS)
   - Cliquez sur **"Verify"** dans Resend
   - ✅ Votre domaine est vérifié !

4. **Modifier l'expéditeur dans le code**
   
   Éditez `src/lib/email.ts` ligne 17 :
   
   ```typescript
   from: 'Mosquée Al Kawthar <noreply@mosquee-alkawthar.fr>',
   ```

## Tester l'Envoi d'Emails

### Test Inscription Cours d'Arabe

```bash
curl -X POST http://localhost:3000/api/inscriptions/cours-arabe \
  -H "Content-Type: application/json" \
  -d '{
    "nom_eleve": "Test",
    "prenom_eleve": "Ahmed",
    "date_naissance": "2010-01-01",
    "niveau_arabe": "Débutant",
    "type_cours": "Enfants",
    "adresse": "123 rue test",
    "code_postal": "37000",
    "ville": "Tours",
    "email": "votre-email@example.com",
    "telephone": "0123456789",
    "frais_inscription": 140
  }'
```

### Test Inscription Stage

```bash
curl -X POST http://localhost:3000/api/inscriptions/stages \
  -H "Content-Type: application/json" \
  -d '{
    "civilite": "M",
    "nom": "Test",
    "prenom": "Ahmed",
    "telephone": "0123456789",
    "date_naissance": "2000-01-01",
    "email": "votre-email@example.com",
    "type_stage": "Stage Vacances",
    "montant": 50
  }'
```

**✅ Vérifiez votre boîte email** - Vous devriez recevoir un email de confirmation !

## Contenu des Emails

### Email après Inscription (Paiement en attente)

```
Sujet: ✅ Confirmation d'inscription - Mosquée Al Kawthar

- Récapitulatif de l'inscription
- Informations du cours/stage
- Montant à payer
- Statut: ⏳ En attente de paiement
- Coordonnées de la mosquée pour questions
```

### Email après Paiement Stripe (Paiement confirmé)

```
Sujet: ✅ Paiement confirmé - Mosquée Al Kawthar

- Récapitulatif de l'inscription
- Informations du cours/stage
- Montant payé
- Statut: ✅ Paiement confirmé
- Prochaines étapes
```

## Templates d'Emails

Les templates sont définis dans `src/lib/email.ts` :

- `getCoursArabeConfirmationEmail()` - Pour les cours d'arabe
- `getStageConfirmationEmail()` - Pour les stages intensifs

### Personnaliser les Templates

Vous pouvez modifier les templates dans `src/lib/email.ts` pour :
- Changer les couleurs
- Ajouter le logo de la mosquée
- Modifier le texte
- Ajouter des informations supplémentaires

## Surveillance et Logs

### Voir les emails envoyés dans Resend

1. Allez sur https://resend.com/emails
2. Vous verrez tous les emails envoyés avec :
   - ✅ Statut (Sent, Delivered, Opened, Clicked)
   - 📅 Date et heure
   - 📧 Destinataire
   - 📝 Sujet

### Logs dans le serveur

```bash
# Voir les logs PM2
pm2 logs mosquee-alkawthar --nostream | grep -i "email"

# Les logs afficheront :
# - "Email sent successfully" si l'email est envoyé
# - "Resend API key not configured" si la clé manque
# - "Error sending email" en cas d'erreur
```

## Limitations et Quotas

### Plan Gratuit Resend
- ✅ 100 emails/jour
- ✅ 3000 emails/mois
- ✅ Parfait pour démarrer
- ✅ Toutes les fonctionnalités incluses

### Plan Payant (si nécessaire)
- **Pro** : 50 000 emails/mois pour 20$/mois
- **Business** : Volumes plus élevés

## Dépannage

### Problème : Email non reçu

1. **Vérifier les spams/courrier indésirable**
2. **Vérifier la clé API** dans `.dev.vars`
3. **Vérifier les logs** : `pm2 logs mosquee-alkawthar`
4. **Vérifier sur Resend** : https://resend.com/emails

### Problème : "Resend API key not configured"

```bash
# Vérifier que la clé est dans .dev.vars
cat .dev.vars | grep RESEND

# Redémarrer avec les nouvelles variables
pm2 restart mosquee-alkawthar --update-env
```

### Problème : Email avec "onboarding@resend.dev"

C'est normal en développement ! Pour utiliser votre domaine :
1. Configurez votre domaine dans Resend (voir Étape 5)
2. Modifiez `src/lib/email.ts` pour changer l'expéditeur

## Support

- **Documentation Resend** : https://resend.com/docs
- **Support Resend** : support@resend.com
- **API Reference** : https://resend.com/docs/api-reference

---

**Note** : Les emails sont automatiquement envoyés lors des inscriptions et des paiements. Aucune action manuelle n'est nécessaire une fois configuré !
