import { getHelloAssoUrl } from '../config/helloasso'

export const getAProposPage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">À Propos</h2>
            <p class="text-xl text-center max-w-3xl mx-auto">
                Découvrez l'histoire et la mission de la Mosquée Al Kawthar
            </p>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-12 rounded-xl overflow-hidden shadow-2xl">
                <img src="https://sspark.genspark.ai/cfimages?u1=bhVT%2F5D%2BGf9vor%2Bs6s%2FHvF31JKbKTp8PUrGVrbOpNotRMOWifDKddFUBy2uyU1EXFqJZoQ4NbAqgPnQUXzhuUIzsHC4rNf2olQMSZlYWYgNY&u2=oLjJZtscEnZYso%2FR&width=2560" 
                     alt="Mosquée Al Kawthar" 
                     class="w-full h-96 object-cover"
                     loading="lazy">
            </div>
            <div class="prose max-w-none">
                <h3 class="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h3>
                <p class="text-gray-700 text-lg mb-6">
                    [TEXTE À COMPLÉTER - Décrivez la mission de la mosquée, ses objectifs, et son rôle dans la communauté]
                </p>

                <h3 class="text-3xl font-bold text-gray-800 mb-6 mt-12">Notre Histoire</h3>
                <p class="text-gray-700 text-lg mb-6">
                    [TEXTE À COMPLÉTER - Racontez l'histoire de la mosquée, sa fondation, son évolution]
                </p>

                <h3 class="text-3xl font-bold text-gray-800 mb-6 mt-12">Nos Valeurs</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h4 class="text-xl font-bold text-teal-800 mb-3">
                            <i class="fas fa-heart mr-2"></i>Fraternité
                        </h4>
                        <p class="text-gray-700">[TEXTE À COMPLÉTER]</p>
                    </div>
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h4 class="text-xl font-bold text-teal-800 mb-3">
                            <i class="fas fa-book-open mr-2"></i>Savoir
                        </h4>
                        <p class="text-gray-700">[TEXTE À COMPLÉTER]</p>
                    </div>
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h4 class="text-xl font-bold text-teal-800 mb-3">
                            <i class="fas fa-hands-helping mr-2"></i>Solidarité
                        </h4>
                        <p class="text-gray-700">[TEXTE À COMPLÉTER]</p>
                    </div>
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h4 class="text-xl font-bold text-teal-800 mb-3">
                            <i class="fas fa-handshake mr-2"></i>Respect
                        </h4>
                        <p class="text-gray-700">[TEXTE À COMPLÉTER]</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
};

export const getProjetsPage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">Nos Projets</h2>
            <p class="text-xl text-center max-w-3xl mx-auto mb-8">
                Soutenez les projets de la mosquée et participez au développement de notre communauté
            </p>
            <div class="text-center">
                <a href="${getHelloAssoUrl('dons')}" target="_blank" rel="noopener" class="inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg">
                    <i class="fas fa-hand-holding-heart mr-2"></i>Faire un don via HelloAsso
                </a>
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="projets-container" class="grid md:grid-cols-3 gap-8">
                <div class="text-center text-gray-500 col-span-3">
                    <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                    <p>Chargement des projets...</p>
                </div>
            </div>
        </div>
    </section>
  `;
};

export const getActualitesPage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">Actualités</h2>
            <p class="text-xl text-center max-w-3xl mx-auto">
                Restez informé des dernières nouvelles de la mosquée
            </p>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="all-actualites-container" class="space-y-8">
                <div class="text-center text-gray-500">
                    <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                    <p>Chargement des actualités...</p>
                </div>
            </div>
        </div>
    </section>
  `;
};

export const getContactPage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">Contact</h2>
            <p class="text-xl text-center max-w-3xl mx-auto">
                Nous sommes à votre écoute pour toute question
            </p>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-info-circle text-teal-600 mr-2"></i>Informations de contact
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <i class="fas fa-map-marker-alt text-teal-600 text-xl mr-4 mt-1"></i>
                            <div>
                                <p class="font-semibold text-gray-800">Adresse</p>
                                <p class="text-gray-600">71 Rue de la Rabaterie</p>
                                <p class="text-gray-600">37700 Saint-Pierre-des-Corps</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <i class="fas fa-phone text-teal-600 text-xl mr-4 mt-1"></i>
                            <div>
                                <p class="font-semibold text-gray-800">Téléphone</p>
                                <p class="text-gray-600">+33 7 78 84 18 52</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <i class="fas fa-envelope text-teal-600 text-xl mr-4 mt-1"></i>
                            <div>
                                <p class="font-semibold text-gray-800">Email</p>
                                <p class="text-gray-600">mosqueespdc71@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 pt-8 border-t">
                        <h4 class="font-bold text-gray-800 mb-4">Horaires d'ouverture</h4>
                        <div class="space-y-2 text-gray-700">
                            <div class="space-y-2">
                                <p class="flex justify-between"><span class="font-medium">Lundi - Vendredi :</span><span>5h00 - 22h00</span></p>
                                <p class="flex justify-between"><span class="font-medium">Samedi - Dimanche :</span><span>5h00 - 22h00</span></p>
                                <p class="text-sm text-gray-500 mt-3">* Ouvert tous les jours pour les 5 prières quotidiennes</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h4 class="font-bold text-gray-800 mb-4">Suivez-nous</h4>
                        <div class="flex space-x-4">
                            <a href="https://www.facebook.com/p/Mosqu%C3%A9e-Kawthar-SPDC-%D9%85%D8%B3%D8%AC%D8%AF-%D8%A7%D9%84%D9%83%D9%88%D8%AB%D8%B1-%D8%B3%D8%A7%D9%86-%D8%A8%D9%8A%D8%A7%D8%B1-%D8%AF%D9%8A%D9%83%D9%88%D8%B1-100080743272056/" target="_blank" rel="noopener" class="text-teal-600 hover:text-teal-700 text-3xl transition">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/mosquee_spdc/" target="_blank" rel="noopener" class="text-teal-600 hover:text-teal-700 text-3xl transition">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">
                        <i class="fas fa-envelope text-teal-600 mr-2"></i>Envoyez-nous un message
                    </h3>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Nom *</label>
                            <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Email *</label>
                            <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Téléphone</label>
                            <input type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Sujet *</label>
                            <select required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <option value="">-- Sélectionnez --</option>
                                <option value="Cours d'arabe">Cours d'arabe</option>
                                <option value="Stages intensifs">Stages intensifs</option>
                                <option value="Omra/Hajj">Omra/Hajj</option>
                                <option value="Donation">Donation</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Message *</label>
                            <textarea required rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-lg">
                            <i class="fas fa-paper-plane mr-2"></i>Envoyer
                        </button>
                    </form>
                </div>
            </div>

            <div class="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="h-96 bg-gray-200 flex items-center justify-center">
                    <div class="text-center text-gray-500">
                        <i class="fas fa-map-marked-alt text-5xl mb-4"></i>
                        <p class="text-lg">[INTÉGRER ICI UNE CARTE GOOGLE MAPS]</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
};
