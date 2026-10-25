export const getAdminLoginPage = () => {
  return `
    <div class="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center px-4">
      <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">🕌 Admin</h2>
          <p class="text-gray-600 mt-2">Mosquée Al Kawthar</p>
        </div>
        
        <form id="admin-login-form" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="fas fa-user mr-2"></i>Identifiant
            </label>
            <input type="text" name="username" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="fas fa-lock mr-2"></i>Mot de passe
            </label>
            <input type="password" name="password" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
          </div>
          
          <button type="submit" class="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
            <i class="fas fa-sign-in-alt mr-2"></i>Se connecter
          </button>
        </form>
        
        <div id="login-message" class="mt-4"></div>
      </div>
    </div>
    
    <script>
      document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
          const response = await axios.post('/api/admin/login', data);
          if (response.data.success) {
            localStorage.setItem('admin_token', response.data.token);
            window.location.href = '/admin/dashboard';
          } else {
            document.getElementById('login-message').innerHTML = 
              '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Identifiants incorrects</div>';
          }
        } catch (error) {
          document.getElementById('login-message').innerHTML = 
            '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Erreur de connexion</div>';
        }
      });
    </script>
  `;
};

export const getAdminDashboardPage = () => {
  return `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-teal-700 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">
              <i class="fas fa-user-shield mr-2"></i>Admin - Mosquée Al Kawthar
            </h1>
            <button onclick="logout()" class="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <i class="fas fa-sign-out-alt mr-2"></i>Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-lg shadow-lg mb-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8 px-6">
              <button onclick="showTab('actualites')" id="tab-actualites" 
                      class="tab-btn border-b-2 border-teal-500 py-4 px-1 text-teal-600 font-medium">
                <i class="fas fa-newspaper mr-2"></i>Actualités
              </button>
              <button onclick="showTab('projets')" id="tab-projets"
                      class="tab-btn border-b-2 border-transparent py-4 px-1 text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                <i class="fas fa-project-diagram mr-2"></i>Projets
              </button>
              <button onclick="showTab('inscriptions')" id="tab-inscriptions"
                      class="tab-btn border-b-2 border-transparent py-4 px-1 text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                <i class="fas fa-users mr-2"></i>Inscriptions
              </button>
            </nav>
          </div>
        </div>

        <div id="content-actualites" class="tab-content">
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold mb-4">➕ Nouvelle Actualité</h2>
            <form id="add-actualite-form" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input type="text" name="titre" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select name="categorie" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>Annonce</option>
                    <option>Événement</option>
                    <option>Cours</option>
                    <option>Stages</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                <textarea name="contenu" rows="4" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
                <input type="text" name="auteur" value="Administration" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
              </div>
              <button type="submit" class="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                <i class="fas fa-plus mr-2"></i>Ajouter l'actualité
              </button>
            </form>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">📰 Liste des Actualités</h2>
            <div id="actualites-list" class="space-y-4">
            </div>
          </div>
        </div>

        <div id="content-projets" class="tab-content hidden">
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold mb-4">➕ Nouveau Projet</h2>
            <form id="add-projet-form" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input type="text" name="titre" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select name="statut" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>En cours</option>
                    <option>À venir</option>
                    <option>Terminé</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="3" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Objectif financier (€)</label>
                  <input type="number" name="objectif_financier" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Montant collecté (€)</label>
                  <input type="number" name="montant_collecte" value="0" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">URL Image (optionnel)</label>
                <input type="url" name="image_url" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="https://...">
              </div>
              <button type="submit" class="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                <i class="fas fa-plus mr-2"></i>Ajouter le projet
              </button>
            </form>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">📋 Liste des Projets</h2>
            <div id="projets-list" class="space-y-4">
            </div>
          </div>
        </div>

        <div id="content-inscriptions" class="tab-content hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-2xl font-bold mb-4">📚 Cours d'Arabe</h2>
              <div id="inscriptions-cours-list" class="space-y-2">
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-2xl font-bold mb-4">🎓 Stages Intensifs</h2>
              <div id="inscriptions-stages-list" class="space-y-2">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="/static/admin.js"></script>
  `;
};
