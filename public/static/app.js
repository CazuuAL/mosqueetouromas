// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Load prayer times on home page
  if (document.getElementById('prayer-times-container')) {
    loadPrayerTimes();
  }

  // Load actualités on home page
  if (document.getElementById('actualites-container')) {
    loadActualites();
  }

  // Load all actualités on actualités page
  if (document.getElementById('all-actualites-container')) {
    loadAllActualites();
  }

  // Load projets on projets page
  if (document.getElementById('projets-container')) {
    loadProjets();
  }

  // Form handlers
  const coursArabeForm = document.getElementById('cours-arabe-form');
  if (coursArabeForm) {
    coursArabeForm.addEventListener('submit', handleCoursArabeSubmit);
    
    // Toggle mineur fields
    const typeCours = document.getElementById('type_cours');
    if (typeCours) {
      typeCours.addEventListener('change', function() {
        toggleMineurFields(this.value === 'Enfants');
      });
    }
  }

  const stagesForm = document.getElementById('stages-form');
  if (stagesForm) {
    stagesForm.addEventListener('submit', handleStagesSubmit);
  }
});

// Load prayer times
async function loadPrayerTimes() {
  try {
    const response = await axios.get('/api/prayer-times');
    
    if (response.data.success) {
      const times = response.data.prayerTimes;
      document.getElementById('fajr-time').textContent = times.fajr;
      document.getElementById('dhuhr-time').textContent = times.dhuhr;
      document.getElementById('asr-time').textContent = times.asr;
      document.getElementById('maghrib-time').textContent = times.maghrib;
      document.getElementById('isha-time').textContent = times.isha;
    } else {
      // Afficher les horaires par défaut en cas d'erreur
      ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
        const element = document.getElementById(`${prayer}-time`);
        if (element) {
          element.textContent = '--:--';
          element.classList.add('text-red-600');
        }
      });
    }
  } catch (error) {
    console.error('Erreur chargement horaires de prière:', error);
    // Afficher un message d'erreur visuel
    ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
      const element = document.getElementById(`${prayer}-time`);
      if (element) {
        element.innerHTML = '<i class="fas fa-exclamation-triangle text-red-500"></i>';
      }
    });
  }
}

// Load actualités (last 3)
async function loadActualites() {
  try {
    const response = await axios.get('/api/actualites');
    const container = document.getElementById('actualites-container');
    
    if (response.data.success && response.data.actualites.length > 0) {
      const actualites = response.data.actualites.slice(0, 3);
      container.innerHTML = actualites.map(actu => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
          ${actu.image_url ? `<img src="${actu.image_url}" alt="${actu.titre}" class="w-full h-48 object-cover">` : ''}
          <div class="p-6">
            <div class="text-sm text-teal-600 mb-2">
              <i class="far fa-calendar mr-1"></i>
              ${new Date(actu.date_publication).toLocaleDateString('fr-FR')}
            </div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">${actu.titre}</h4>
            <p class="text-gray-600 mb-4">${actu.contenu.substring(0, 150)}...</p>
            <a href="/actualites#${actu.id}" class="text-teal-600 font-semibold hover:text-teal-700">
              Lire la suite <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="col-span-3 text-center text-gray-500">
          <i class="fas fa-info-circle text-3xl mb-4"></i>
          <p>Aucune actualité pour le moment</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement actualités:', error);
    document.getElementById('actualites-container').innerHTML = `
      <div class="col-span-3 text-center text-red-500">
        <i class="fas fa-exclamation-triangle text-3xl mb-4"></i>
        <p>Erreur lors du chargement des actualités</p>
      </div>
    `;
  }
}

// Load all actualités
async function loadAllActualites() {
  try {
    const response = await axios.get('/api/actualites');
    const container = document.getElementById('all-actualites-container');
    
    if (response.data.success && response.data.actualites.length > 0) {
      container.innerHTML = response.data.actualites.map(actu => `
        <div id="${actu.id}" class="bg-white rounded-xl shadow-lg overflow-hidden">
          ${actu.image_url ? `<img src="${actu.image_url}" alt="${actu.titre}" class="w-full h-64 object-cover">` : ''}
          <div class="p-8">
            <div class="text-sm text-teal-600 mb-3">
              <i class="far fa-calendar mr-1"></i>
              ${new Date(actu.date_publication).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              ${actu.categorie ? `<span class="ml-4"><i class="fas fa-tag mr-1"></i>${actu.categorie}</span>` : ''}
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">${actu.titre}</h3>
            <p class="text-gray-600 whitespace-pre-line">${actu.contenu}</p>
            ${actu.auteur ? `<p class="text-sm text-gray-500 mt-4">Par ${actu.auteur}</p>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="text-center text-gray-500 py-12">
          <i class="fas fa-info-circle text-5xl mb-4"></i>
          <p class="text-xl">Aucune actualité pour le moment</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement actualités:', error);
  }
}

// Load projets
async function loadProjets() {
  try {
    const response = await axios.get('/api/projets');
    const container = document.getElementById('projets-container');
    
    if (response.data.success && response.data.projets.length > 0) {
      container.innerHTML = response.data.projets.map(projet => {
        const pourcentage = projet.objectif_financier 
          ? Math.min(100, (projet.montant_collecte / projet.objectif_financier) * 100).toFixed(0)
          : 0;
        
        return `
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            ${projet.image_url ? `<img src="${projet.image_url}" alt="${projet.titre}" class="w-full h-48 object-cover">` : ''}
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                  ${projet.statut}
                </span>
              </div>
              <h4 class="text-xl font-bold text-gray-800 mb-3">${projet.titre}</h4>
              <p class="text-gray-600 mb-4">${projet.description}</p>
              
              ${projet.objectif_financier ? `
                <div class="mb-4">
                  <div class="flex justify-between text-sm text-gray-600 mb-2">
                    <span>${projet.montant_collecte}€ collectés</span>
                    <span>${projet.objectif_financier}€ objectif</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-teal-600 h-3 rounded-full transition-all" style="width: ${pourcentage}%"></div>
                  </div>
                  <p class="text-center text-teal-600 font-semibold mt-2">${pourcentage}%</p>
                </div>
              ` : ''}
              
              <a href="${(window.HELLOASSO_URLS && window.HELLOASSO_URLS.dons) || '/contact'}" target="_blank" rel="noopener" class="block text-center bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Soutenir ce projet
              </a>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.innerHTML = `
        <div class="col-span-3 text-center text-gray-500 py-12">
          <i class="fas fa-info-circle text-5xl mb-4"></i>
          <p class="text-xl">Aucun projet en cours</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur chargement projets:', error);
  }
}

// Toggle mineur fields
function toggleMineurFields(show) {
  const mineurSection = document.getElementById('mineur-section');
  const tarifInfo = document.getElementById('tarif-info');
  
  if (mineurSection) {
    mineurSection.style.display = show ? 'block' : 'none';
    
    // Update required fields
    const requiredFields = mineurSection.querySelectorAll('input, select');
    requiredFields.forEach(field => {
      if (show) {
        field.setAttribute('required', 'required');
      } else {
        field.removeAttribute('required');
      }
    });
  }
  
  if (tarifInfo) {
    if (show) {
      tarifInfo.innerHTML = `
        <h4 class="font-semibold text-gray-800 mb-2">Tarifs Cours Enfants :</h4>
        <ul class="text-sm space-y-1">
          <li>1 enfant : 140€</li>
          <li>2 enfants : 260€</li>
          <li>3 enfants : 360€</li>
          <li>4 enfants : 440€</li>
          <li>5 enfants : 500€</li>
        </ul>
      `;
    } else {
      tarifInfo.innerHTML = `
        <h4 class="font-semibold text-gray-800 mb-2">Tarif Cours Adultes :</h4>
        <p class="text-sm">230€ par an</p>
      `;
    }
  }
}

// Handle Cours Arabe Form Submit
async function handleCoursArabeSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // Convert checkboxes to boolean
  data.est_mineur = data.type_cours === 'Enfants' ? 1 : 0;
  data.autorisation_parentale = formData.get('autorisation_parentale') ? 1 : 0;
  data.autorisation_photos = formData.get('autorisation_photos') ? 1 : 0;
  data.assurance_fournie = formData.get('assurance_fournie') ? 1 : 0;
  
  // Calculate frais_inscription
  if (data.type_cours === 'Enfants') {
    const tarifs = [140, 260, 360, 440, 500];
    data.frais_inscription = tarifs[Math.min(parseInt(data.nombre_enfants) - 1, 4)] || 140;
  } else {
    data.frais_inscription = 230;
    data.nombre_enfants = 1;
  }
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
  
  try {
    const response = await axios.post('/api/inscriptions/cours-arabe', data);
    
    if (response.data.success) {
      const payUrl = (window.HELLOASSO_URLS && window.HELLOASSO_URLS.coursArabe) || '/contact';
      showMessage(`✅ Inscription enregistrée ! <a href="${payUrl}" target="_blank" rel="noopener" class="underline font-bold">Payer maintenant via HelloAsso</a>`, 'success');
      e.target.reset();
      toggleMineurFields(false);
    } else {
      showMessage('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
    }
  } catch (error) {
    console.error('Erreur:', error);
    showMessage('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>S\'inscrire';
  }
}

// Handle Stages Form Submit
async function handleStagesSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // Set default montant (à adapter selon le stage)
  data.montant = parseFloat(data.montant) || 50; // Prix par défaut
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
  
  try {
    const response = await axios.post('/api/inscriptions/stages', data);
    
    if (response.data.success) {
      const payUrl = (window.HELLOASSO_URLS && window.HELLOASSO_URLS.stages) || '/contact';
      showMessage(`✅ Inscription au stage enregistrée ! <a href="${payUrl}" target="_blank" rel="noopener" class="underline font-bold">Payer maintenant via HelloAsso</a>`, 'success');
      e.target.reset();
    } else {
      showMessage('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
    }
  } catch (error) {
    console.error('Erreur:', error);
    showMessage('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>S\'inscrire au stage';
  }
}


// Show message
function showMessage(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white font-semibold max-w-md`;
  alertDiv.innerHTML = `
    <div class="flex items-center justify-between">
      <span><i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 10000);
}
