// Check authentication
function checkAuth() {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    window.location.href = '/admin/login';
    return false;
  }
  // Envoyer le token sur tous les appels API suivants (routes admin protégées)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return true;
}

// Si le token est invalide ou expiré, renvoyer vers la page de connexion
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

// Logout
function logout() {
  localStorage.removeItem('admin_token');
  window.location.href = '/admin/login';
}

// Show tab
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-teal-500', 'text-teal-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  
  // Show selected tab
  document.getElementById('content-' + tabName).classList.remove('hidden');
  document.getElementById('tab-' + tabName).classList.add('border-teal-500', 'text-teal-600');
  document.getElementById('tab-' + tabName).classList.remove('border-transparent', 'text-gray-500');
  
  // Load data for the selected tab
  if (tabName === 'actualites') {
    loadActualites();
  } else if (tabName === 'projets') {
    loadProjets();
  } else if (tabName === 'inscriptions') {
    loadInscriptions();
  }
}

// Load actualités
async function loadActualites() {
  try {
    const response = await axios.get('/api/actualites');
    const list = document.getElementById('actualites-list');
    
    if (response.data.success && response.data.actualites.length > 0) {
      list.innerHTML = response.data.actualites.map(actu => `
        <div class="border rounded-lg p-4 hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-lg">${actu.titre}</h3>
              <p class="text-sm text-gray-600 mt-1">${actu.contenu}</p>
              <div class="flex gap-4 mt-2 text-sm text-gray-500">
                <span><i class="fas fa-user mr-1"></i>${actu.auteur || 'N/A'}</span>
                <span><i class="fas fa-tag mr-1"></i>${actu.categorie}</span>
                <span><i class="fas fa-calendar mr-1"></i>${new Date(actu.date_publication).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      list.innerHTML = '<p class="text-gray-500">Aucune actualité pour le moment.</p>';
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Load projets
async function loadProjets() {
  try {
    const response = await axios.get('/api/projets');
    const list = document.getElementById('projets-list');
    
    if (response.data.success && response.data.projets.length > 0) {
      list.innerHTML = response.data.projets.map(projet => `
        <div class="border rounded-lg p-4 hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-lg">${projet.titre}</h3>
                <span class="px-2 py-1 rounded text-xs ${
                  projet.statut === 'En cours' ? 'bg-green-100 text-green-800' :
                  projet.statut === 'À venir' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }">${projet.statut}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">${projet.description}</p>
              ${projet.objectif_financier ? `
                <div class="mt-3">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="font-semibold">${projet.montant_collecte || 0}€ / ${projet.objectif_financier}€</span>
                    <span class="text-gray-600">${Math.round((projet.montant_collecte || 0) / projet.objectif_financier * 100)}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-teal-600 h-2 rounded-full" style="width: ${Math.min((projet.montant_collecte || 0) / projet.objectif_financier * 100, 100)}%"></div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');
    } else {
      list.innerHTML = '<p class="text-gray-500">Aucun projet pour le moment.</p>';
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Load inscriptions
async function loadInscriptions() {
  try {
    // Load cours d'arabe
    const courResponse = await axios.get('/api/inscriptions/cours-arabe');
    const coursList = document.getElementById('inscriptions-cours-list');
    
    if (courResponse.data.success && courResponse.data.inscriptions.length > 0) {
      coursList.innerHTML = `<p class="text-sm font-semibold mb-2">Total: ${courResponse.data.inscriptions.length} inscriptions</p>` +
        courResponse.data.inscriptions.slice(0, 10).map(ins => `
          <div class="text-sm p-2 border-b">
            <span class="font-semibold">${ins.prenom_eleve} ${ins.nom_eleve}</span>
            <span class="text-gray-600"> - ${ins.type_cours} (${ins.niveau_arabe})</span>
            <span class="text-xs ${ins.statut_paiement === 'Validé' ? 'text-green-600' : 'text-orange-600'}">
              ${ins.statut_paiement === 'Validé' ? '✓ Payé' : '⏳ ' + (ins.statut_paiement || 'En attente')}
            </span>
          </div>
        `).join('');
    } else {
      coursList.innerHTML = '<p class="text-gray-500 text-sm">Aucune inscription.</p>';
    }
    
    // Load stages
    const stagesResponse = await axios.get('/api/inscriptions/stages');
    const stagesList = document.getElementById('inscriptions-stages-list');
    
    if (stagesResponse.data.success && stagesResponse.data.inscriptions.length > 0) {
      stagesList.innerHTML = `<p class="text-sm font-semibold mb-2">Total: ${stagesResponse.data.inscriptions.length} inscriptions</p>` +
        stagesResponse.data.inscriptions.slice(0, 10).map(ins => `
          <div class="text-sm p-2 border-b">
            <span class="font-semibold">${ins.prenom} ${ins.nom}</span>
            <span class="text-gray-600"> - ${ins.type_stage || 'Stage'}</span>
            <span class="text-xs ${ins.statut_paiement === 'Validé' ? 'text-green-600' : 'text-orange-600'}">
              ${ins.statut_paiement === 'Validé' ? '✓ Payé' : '⏳ ' + (ins.statut_paiement || 'En attente')}
            </span>
          </div>
        `).join('');
    } else {
      stagesList.innerHTML = '<p class="text-gray-500 text-sm">Aucune inscription.</p>';
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Form handlers
document.addEventListener('DOMContentLoaded', function() {
  if (!checkAuth()) return;
  
  // Add actualité form
  document.getElementById('add-actualite-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.est_publie = 1;
    
    try {
      const response = await axios.post('/api/actualites', data);
      if (response.data.success) {
        alert('✅ Actualité ajoutée avec succès !');
        e.target.reset();
        loadActualites();
      }
    } catch (error) {
      alert('❌ Erreur lors de l\'ajout de l\'actualité');
      console.error(error);
    }
  });
  
  // Add projet form
  document.getElementById('add-projet-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.est_actif = 1;
    data.objectif_financier = parseFloat(data.objectif_financier) || null;
    data.montant_collecte = parseFloat(data.montant_collecte) || 0;
    
    try {
      const response = await axios.post('/api/projets', data);
      if (response.data.success) {
        alert('✅ Projet ajouté avec succès !');
        e.target.reset();
        loadProjets();
      }
    } catch (error) {
      alert('❌ Erreur lors de l\'ajout du projet');
      console.error(error);
    }
  });
  
  // Load initial data
  loadActualites();
});
