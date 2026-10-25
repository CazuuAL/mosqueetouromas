export const getCoursArabePage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">Cours d'Arabe</h2>
            <p class="text-xl text-center max-w-3xl mx-auto">
                Apprenez la langue arabe dans un environnement bienveillant et structuré
            </p>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-child text-4xl text-teal-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Cours Enfants</h3>
                    <p class="text-gray-600 mb-4">Apprentissage ludique et adapté aux plus jeunes</p>
                    <p class="text-3xl font-bold text-teal-700">140€</p>
                    <p class="text-sm text-gray-500">par enfant / an</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-female text-4xl text-teal-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Cours Femmes</h3>
                    <p class="text-gray-600 mb-4">Groupe dédié dans un environnement confortable</p>
                    <p class="text-3xl font-bold text-teal-700">230€</p>
                    <p class="text-sm text-gray-500">par an</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-male text-4xl text-teal-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Cours Hommes</h3>
                    <p class="text-gray-600 mb-4">Apprentissage en groupe avec professeurs qualifiés</p>
                    <p class="text-3xl font-bold text-teal-700">230€</p>
                    <p class="text-sm text-gray-500">par an</p>
                </div>
            </div>

            <div class="bg-teal-50 rounded-xl p-6 mb-12">
                <h3 class="text-2xl font-bold text-teal-800 mb-4"><i class="fas fa-info-circle mr-2"></i>Tarifs dégressifs pour les familles</h3>
                <div class="grid md:grid-cols-5 gap-4 text-center">
                    <div>
                        <p class="text-lg font-semibold text-gray-700">1 enfant</p>
                        <p class="text-2xl font-bold text-teal-700">140€</p>
                    </div>
                    <div>
                        <p class="text-lg font-semibold text-gray-700">2 enfants</p>
                        <p class="text-2xl font-bold text-teal-700">260€</p>
                    </div>
                    <div>
                        <p class="text-lg font-semibold text-gray-700">3 enfants</p>
                        <p class="text-2xl font-bold text-teal-700">360€</p>
                    </div>
                    <div>
                        <p class="text-lg font-semibold text-gray-700">4 enfants</p>
                        <p class="text-2xl font-bold text-teal-700">440€</p>
                    </div>
                    <div>
                        <p class="text-lg font-semibold text-gray-700">5 enfants</p>
                        <p class="text-2xl font-bold text-teal-700">500€</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                    <i class="fas fa-pen mr-2"></i>Formulaire d'Inscription
                </h3>
                
                <form id="cours-arabe-form" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Type de cours *</label>
                        <select id="type_cours" name="type_cours" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <option value="">-- Sélectionnez --</option>
                            <option value="Enfants">Cours Enfants</option>
                            <option value="Femmes">Cours Femmes</option>
                            <option value="Hommes">Cours Hommes</option>
                        </select>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Nom de l'élève *</label>
                            <input type="text" name="nom_eleve" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Prénom de l'élève *</label>
                            <input type="text" name="prenom_eleve" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Date de naissance *</label>
                            <input type="date" name="date_naissance" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Niveau d'arabe *</label>
                            <select name="niveau_arabe" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <option value="">-- Sélectionnez --</option>
                                <option value="Débutant">Débutant</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Avancé">Avancé</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Adresse *</label>
                        <input type="text" name="adresse" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Code postal *</label>
                            <input type="text" name="code_postal" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Ville *</label>
                            <input type="text" name="ville" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Téléphone *</label>
                            <input type="tel" name="telephone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                    </div>

                    <div id="mineur-section" style="display: none;" class="border-t pt-6 space-y-6">
                        <h4 class="text-xl font-bold text-gray-800 mb-4">Informations parent / tuteur</h4>
                        
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Nom du parent ou tuteur</label>
                            <input type="text" name="nom_parent" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Téléphone d'urgence</label>
                                <input type="tel" name="telephone_urgence" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Lien avec l'enfant</label>
                                <select name="lien_avec_enfant" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="Père">Père</option>
                                    <option value="Mère">Mère</option>
                                    <option value="Tuteur légal">Tuteur légal</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Nombre d'enfants à inscrire</label>
                            <select name="nombre_enfants" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <option value="1">1 enfant</option>
                                <option value="2">2 enfants</option>
                                <option value="3">3 enfants</option>
                                <option value="4">4 enfants</option>
                                <option value="5">5 enfants</option>
                            </select>
                        </div>

                        <div class="space-y-3">
                            <label class="flex items-center">
                                <input type="checkbox" name="autorisation_parentale" class="mr-3 h-5 w-5 text-teal-600">
                                <span class="text-gray-700">J'autorise mon enfant à participer aux cours</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="autorisation_photos" class="mr-3 h-5 w-5 text-teal-600">
                                <span class="text-gray-700">J'autorise la prise de photos à usage pédagogique</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" name="assurance_fournie" class="mr-3 h-5 w-5 text-teal-600">
                                <span class="text-gray-700">Assurance extra-scolaire fournie</span>
                            </label>
                        </div>
                    </div>

                    <div id="tarif-info" class="bg-teal-50 rounded-lg p-4">
                        <h4 class="font-semibold text-gray-800 mb-2">Tarif :</h4>
                        <p class="text-sm text-gray-600">Sélectionnez le type de cours pour voir le tarif</p>
                    </div>

                    <button type="submit" class="w-full bg-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition shadow-lg">
                        <i class="fas fa-paper-plane mr-2"></i>S'inscrire
                    </button>
                </form>
            </div>
        </div>
    </section>
  `;
};

export const getStagesPage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-16 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-5xl font-bold mb-4 text-center">Stages Intensifs</h2>
            <p class="text-xl text-center max-w-3xl mx-auto">
                Progressez rapidement grâce à nos stages intensifs durant les vacances scolaires
            </p>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-info-circle text-teal-600 mr-2"></i>À propos des stages
                </h3>
                <div class="space-y-3 text-gray-700">
                    <p><i class="fas fa-check text-teal-600 mr-2"></i>Stages durant les vacances scolaires</p>
                    <p><i class="fas fa-check text-teal-600 mr-2"></i>Programme intensif adapté à tous les niveaux</p>
                    <p><i class="fas fa-check text-teal-600 mr-2"></i>Professeurs qualifiés et expérimentés</p>
                    <p><i class="fas fa-check text-teal-600 mr-2"></i>Groupes à effectif réduit</p>
                    <p><i class="fas fa-check text-teal-600 mr-2"></i>Âge minimum : [ÂGE MINIMUM À COMPLÉTER]</p>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
                <h3 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                    <i class="fas fa-pen mr-2"></i>Formulaire d'Inscription
                </h3>
                
                <form id="stages-form" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Civilité *</label>
                        <select name="civilite" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <option value="">-- Sélectionnez --</option>
                            <option value="M.">M.</option>
                            <option value="Mme">Mme</option>
                            <option value="Mlle">Mlle</option>
                        </select>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Nom *</label>
                            <input type="text" name="nom" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Prénom *</label>
                            <input type="text" name="prenom" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Date de naissance *</label>
                            <input type="date" name="date_naissance" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Téléphone *</label>
                            <input type="tel" name="telephone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        </div>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Type de stage *</label>
                        <select name="type_stage" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            <option value="">-- Sélectionnez --</option>
                            <option value="Stage Vacances Hiver">Stage Vacances Hiver</option>
                            <option value="Stage Vacances Printemps">Stage Vacances Printemps</option>
                            <option value="Stage Vacances Été">Stage Vacances Été</option>
                            <option value="Stage Vacances Toussaint">Stage Vacances Toussaint</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Montant *</label>
                        <input type="number" name="montant" value="50" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <p class="text-sm text-gray-500 mt-1">Le montant sera confirmé après validation</p>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p class="text-sm text-yellow-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            Le paiement sera à effectuer après confirmation de votre inscription
                        </p>
                    </div>

                    <button type="submit" class="w-full bg-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition shadow-lg">
                        <i class="fas fa-paper-plane mr-2"></i>S'inscrire au stage
                    </button>
                </form>
            </div>
        </div>
    </section>
  `;
};
