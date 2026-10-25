import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getLayout, getHomePage } from './templates/layout'
import { getCoursArabePage, getStagesPage } from './templates/pages'
import { getAProposPage, getProjetsPage, getActualitesPage, getContactPage } from './templates/other-pages'
import { getAdminLoginPage, getAdminDashboardPage } from './templates/admin-pages'
import { EmailService } from './lib/email'
import { signAdminToken, verifyAdminToken } from './lib/admin-auth'

type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
  SITE_URL: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  ADMIN_TOKEN_SECRET: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

const requireAdmin = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  const secret = c.env.ADMIN_TOKEN_SECRET || 'dev-insecure-secret-change-me'

  if (!token || !(await verifyAdminToken(token, secret))) {
    return c.json({ success: false, message: 'Non autorisé' }, 401)
  }

  await next()
}

app.post('/api/inscriptions/cours-arabe', async (c) => {
  try {
    const data = await c.req.json()
    const { DB, RESEND_API_KEY } = c.env

    const result = await DB.prepare(`
      INSERT INTO cours_arabe_inscriptions (
        nom_eleve, prenom_eleve, date_naissance, niveau_arabe, type_cours,
        adresse, code_postal, ville, email, telephone,
        est_mineur, nom_parent, telephone_urgence, lien_avec_enfant,
        autorisation_parentale, autorisation_photos,
        nombre_enfants, frais_inscription, assurance_fournie
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.nom_eleve, data.prenom_eleve, data.date_naissance, data.niveau_arabe, data.type_cours,
      data.adresse, data.code_postal, data.ville, data.email, data.telephone,
      data.est_mineur || 0, data.nom_parent || null, data.telephone_urgence || null, data.lien_avec_enfant || null,
      data.autorisation_parentale || 0, data.autorisation_photos || 0,
      data.nombre_enfants || 1, data.frais_inscription, data.assurance_fournie || 0
    ).run()

    const inscriptionId = result.meta.last_row_id;

    if (data.email) {
      const emailService = new EmailService(RESEND_API_KEY);
      const emailHtml = emailService.getCoursArabeConfirmationEmail({
        nom: data.nom_eleve,
        prenom: data.prenom_eleve,
        typeCours: data.type_cours,
        niveau: data.niveau_arabe,
        frais: data.frais_inscription
      });

      await emailService.sendEmail({
        to: data.email,
        subject: '✅ Confirmation d\'inscription - Mosquée Al Kawthar',
        html: emailHtml
      });
    }

    return c.json({ success: true, id: inscriptionId, message: 'Inscription enregistrée avec succès' })
  } catch (error) {
    console.error('Erreur inscription cours arabe:', error)
    return c.json({ success: false, message: 'Erreur lors de l\'inscription' }, 500)
  }
})

app.get('/api/inscriptions/cours-arabe', requireAdmin, async (c) => {
  try {
    const { DB } = c.env
    const result = await DB.prepare('SELECT * FROM cours_arabe_inscriptions ORDER BY date_inscription DESC').all()
    return c.json({ success: true, inscriptions: result.results })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la récupération des inscriptions' }, 500)
  }
})

app.post('/api/inscriptions/stages', async (c) => {
  try {
    const data = await c.req.json()
    const { DB, RESEND_API_KEY } = c.env

    const result = await DB.prepare(`
      INSERT INTO stages_intensifs_inscriptions (
        civilite, nom, prenom, telephone, date_naissance, email,
        type_stage, date_stage, montant
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.civilite, data.nom, data.prenom, data.telephone, data.date_naissance, data.email || null,
      data.type_stage, data.date_stage || null, data.montant
    ).run()

    const inscriptionId = result.meta.last_row_id;

    if (data.email) {
      const emailService = new EmailService(RESEND_API_KEY);
      const emailHtml = emailService.getStageConfirmationEmail({
        nom: data.nom,
        prenom: data.prenom,
        typeStage: data.type_stage,
        montant: data.montant
      });

      await emailService.sendEmail({
        to: data.email,
        subject: '✅ Confirmation d\'inscription au stage - Mosquée Al Kawthar',
        html: emailHtml
      });
    }

    return c.json({ success: true, id: inscriptionId, message: 'Inscription au stage enregistrée avec succès' })
  } catch (error) {
    console.error('Erreur inscription stage:', error)
    return c.json({ success: false, message: 'Erreur lors de l\'inscription' }, 500)
  }
})

app.get('/api/inscriptions/stages', requireAdmin, async (c) => {
  try {
    const { DB } = c.env
    const result = await DB.prepare('SELECT * FROM stages_intensifs_inscriptions ORDER BY date_inscription DESC').all()
    return c.json({ success: true, inscriptions: result.results })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la récupération des inscriptions' }, 500)
  }
})

app.get('/api/actualites', async (c) => {
  try {
    const { DB } = c.env
    const result = await DB.prepare('SELECT * FROM actualites WHERE est_publie = 1 ORDER BY date_publication DESC').all()
    return c.json({ success: true, actualites: result.results })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la récupération des actualités' }, 500)
  }
})

app.post('/api/actualites', requireAdmin, async (c) => {
  try {
    const data = await c.req.json()
    const { DB } = c.env

    const result = await DB.prepare(`
      INSERT INTO actualites (titre, contenu, image_url, auteur, categorie, est_publie)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(data.titre, data.contenu, data.image_url || null, data.auteur || null, data.categorie || null, data.est_publie || 1).run()

    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la création de l\'actualité' }, 500)
  }
})

app.get('/api/prayer-times', async (c) => {
  try {
    const response = await fetch('https://mawaqit.net/api/2.0/mosque/search?word=saint-pierre-des-corps')

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des horaires')
    }

    const data = await response.json()

    const mosquee = data.find((m: any) => m.slug === 'msp' || m.name.includes('AL-KAWTHAR'))

    if (!mosquee) {
      throw new Error('Mosquée non trouvée')
    }

    const prayerTimes = {
      fajr: mosquee.times[0],
      dhuhr: mosquee.times[2],
      asr: mosquee.times[3],
      maghrib: mosquee.times[4],
      isha: mosquee.times[5],
      jumua: mosquee.jumua,
      jumua2: mosquee.jumua2,
      sunrise: mosquee.times[1]
    }

    return c.json({ success: true, prayerTimes })
  } catch (error) {
    console.error('Erreur récupération horaires:', error)
    return c.json({
      success: false,
      message: 'Erreur lors de la récupération des horaires',
      prayerTimes: {
        fajr: '--:--',
        dhuhr: '--:--',
        asr: '--:--',
        maghrib: '--:--',
        isha: '--:--',
        jumua: '--:--'
      }
    }, 500)
  }
})

app.get('/api/projets', async (c) => {
  try {
    const { DB } = c.env
    const result = await DB.prepare('SELECT * FROM projets WHERE est_actif = 1 ORDER BY date_debut DESC').all()
    return c.json({ success: true, projets: result.results })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la récupération des projets' }, 500)
  }
})

app.post('/api/projets', requireAdmin, async (c) => {
  try {
    const data = await c.req.json()
    const { DB } = c.env

    const result = await DB.prepare(`
      INSERT INTO projets (titre, description, image_url, statut, objectif_financier, montant_collecte, date_debut, date_fin, est_actif)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.titre, data.description, data.image_url || null, data.statut || 'En cours',
      data.objectif_financier || null, data.montant_collecte || 0,
      data.date_debut || null, data.date_fin || null, data.est_actif || 1
    ).run()

    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ success: false, message: 'Erreur lors de la création du projet' }, 500)
  }
})

app.get('/', (c) => {
  return c.html(getLayout('Accueil', getHomePage(), '/'))
})

app.get('/a-propos', (c) => {
  return c.html(getLayout('À Propos', getAProposPage(), '/a-propos'))
})

app.get('/cours-arabe', (c) => {
  return c.html(getLayout('Cours d\'Arabe', getCoursArabePage(), '/cours-arabe'))
})

app.get('/stages', (c) => {
  return c.html(getLayout('Stages Intensifs', getStagesPage(), '/stages'))
})

app.get('/projets', (c) => {
  return c.html(getLayout('Projets', getProjetsPage(), '/projets'))
})

app.get('/actualites', (c) => {
  return c.html(getLayout('Actualités', getActualitesPage(), '/actualites'))
})

app.get('/contact', (c) => {
  return c.html(getLayout('Contact', getContactPage(), '/contact'))
})

app.get('/admin/login', (c) => {
  return c.html(getAdminLoginPage())
})

app.get('/admin/dashboard', (c) => {
  return c.html(getAdminDashboardPage())
})

app.post('/api/admin/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_TOKEN_SECRET } = c.env

    const adminUser = ADMIN_USERNAME || 'admin'
    const adminPass = ADMIN_PASSWORD || 'changeme-dev-only'
    const secret = ADMIN_TOKEN_SECRET || 'dev-insecure-secret-change-me'

    if (username === adminUser && password === adminPass) {
      const token = await signAdminToken(username, secret)
      return c.json({ success: true, token })
    } else {
      return c.json({ success: false, message: 'Identifiants incorrects' }, 401)
    }
  } catch (error) {
    return c.json({ success: false, message: 'Erreur serveur' }, 500)
  }
})

export default app
