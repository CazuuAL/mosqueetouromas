// URLs des formulaires HelloAsso de la mosquée.
//
// Comment les obtenir : créez un compte association sur https://www.helloasso.com,
// puis créez un formulaire ("Collecte de dons" ou "Vente de billets / adhésion")
// pour chaque usage ci-dessous. HelloAsso vous donne une URL du type
// https://www.helloasso.com/associations/votre-assoc/formulaires/votre-formulaire
// Collez-la ici. Voir HELLOASSO_SETUP.md pour le guide pas-à-pas complet.
//
// Tant qu'une URL reste à "null", le bouton correspondant pointe vers /contact
// pour ne jamais casser le site en attendant la configuration.

export const HELLOASSO_URLS = {
  dons: null as string | null,        // Dons libres / projets (page Projets, page d'accueil)
  coursArabe: null as string | null,  // Paiement des frais d'inscription aux cours d'arabe
  stages: null as string | null,      // Paiement des stages intensifs
}

export function getHelloAssoUrl(key: keyof typeof HELLOASSO_URLS): string {
  return HELLOASSO_URLS[key] || '/contact'
}
