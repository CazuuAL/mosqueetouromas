import { HELLOASSO_URLS } from '../config/helloasso'

export const getLayout = (title: string, content: string, activePage: string = '') => {
  return `
    <!DOCTYPE html>
    <html lang="fr" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Mosquée Al Kawthar</title>
        <meta name="description" content="Mosquée Al Kawthar à Saint-Pierre-des-Corps. Cours d'arabe, stages intensifs, projets communautaires.">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/style.css" rel="stylesheet">
        <style>
          .hero-gradient {
            background: linear-gradient(135deg, #0F766E 0%, #14B8A6 100%);
          }
          .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        ${getNavigation(activePage)}
        ${content}
        ${getFooter()}
        <script>window.HELLOASSO_URLS = ${JSON.stringify(HELLOASSO_URLS)};</script>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `;
};

const getNavigation = (activePage: string) => {
  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'À Propos' },
    { href: '/cours-arabe', label: 'Cours d\'Arabe' },
    { href: '/stages', label: 'Stages Intensifs' },
    { href: '/projets', label: 'Projets' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/contact', label: 'Contact' }
  ];
  
  return `
    <nav class="bg-white shadow-lg fixed w-full z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center space-x-4">
                    <img src="/static/logo-mosquee.png" alt="Logo Mosquée Al Kawthar" class="h-16 w-16 object-contain">
                    <div>
                        <h1 class="text-2xl font-bold text-teal-700">Mosquée Al Kawthar</h1>
                        <p class="text-sm text-gray-600">Saint-Pierre-des-Corps</p>
                    </div>
                </div>
                <div class="hidden md:flex space-x-8">
                    ${navItems.map(item => `
                      <a href="${item.href}" class="${activePage === item.href ? 'text-teal-700 font-semibold border-b-2 border-teal-700 pb-1' : 'text-gray-700 hover:text-teal-700 transition'}">${item.label}</a>
                    `).join('')}
                </div>
                <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="px-4 py-4 space-y-3">
                ${navItems.map(item => `
                  <a href="${item.href}" class="block ${activePage === item.href ? 'text-teal-700 font-semibold' : 'text-gray-700'}">${item.label}</a>
                `).join('')}
            </div>
        </div>
    </nav>
  `;
};

const getFooter = () => {
  return `
    <footer class="bg-gray-900 text-white pt-12 pb-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <img src="/static/logo-mosquee.png" alt="Logo" class="h-16 w-16 mb-4 bg-white rounded-lg p-1">
                    <h4 class="text-xl font-bold mb-2">Mosquée Al Kawthar</h4>
                    <p class="text-gray-400">Saint-Pierre-des-Corps</p>
                </div>
                <div>
                    <h5 class="text-lg font-semibold mb-4">Navigation</h5>
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-400 hover:text-white transition">Accueil</a></li>
                        <li><a href="/a-propos" class="text-gray-400 hover:text-white transition">À Propos</a></li>
                        <li><a href="/cours-arabe" class="text-gray-400 hover:text-white transition">Cours d'Arabe</a></li>
                        <li><a href="/stages" class="text-gray-400 hover:text-white transition">Stages</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-lg font-semibold mb-4">Contact</h5>
                    <ul class="space-y-2 text-gray-400">
                        <li><i class="fas fa-map-marker-alt mr-2 text-teal-500"></i>71 Rue de la Rabaterie, 37700 Saint-Pierre-des-Corps</li>
                        <li><i class="fas fa-phone mr-2 text-teal-500"></i>+33 7 78 84 18 52</li>
                        <li><i class="fas fa-envelope mr-2 text-teal-500"></i>mosqueespdc71@gmail.com</li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-lg font-semibold mb-4">Suivez-nous</h5>
                    <div class="flex space-x-4">
                        <a href="https://www.facebook.com/p/Mosqu%C3%A9e-Kawthar-SPDC-%D9%85%D8%B3%D8%AC%D8%AF-%D8%A7%D9%84%D9%83%D9%88%D8%AB%D8%B1-%D8%B3%D8%A7%D9%86-%D8%A8%D9%8A%D8%A7%D8%B1-%D8%AF%D9%8A%D9%83%D9%88%D8%B1-100080743272056/" class="text-gray-400 hover:text-white text-2xl transition">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/mosquee_spdc/" class="text-gray-400 hover:text-white text-2xl transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white text-2xl transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-6 text-center text-gray-400">
                <p>&copy; 2026 Mosquée Al Kawthar. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
  `;
};

export const getHomePage = () => {
  return `
    <section class="hero-gradient text-white pt-32 pb-20 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-5xl font-bold mb-6">Bienvenue à la Mosquée Al Kawthar</h2>
            <p class="text-xl mb-8 max-w-3xl mx-auto">
                Un lieu de culte, d'apprentissage et de rassemblement pour la communauté musulmane de Saint-Pierre-des-Corps
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/cours-arabe" class="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                    <i class="fas fa-book-open mr-2"></i>Cours d'Arabe
                </a>
                <a href="/stages" class="bg-teal-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-900 transition shadow-lg">
                    <i class="fas fa-calendar-alt mr-2"></i>Stages Intensifs
                </a>
                <a href="${HELLOASSO_URLS.dons || '/contact'}" target="_blank" rel="noopener" class="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg">
                    <i class="fas fa-hand-holding-heart mr-2"></i>Faire un Don
                </a>
            </div>
        </div>
    </section>

    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg">
                <h3 class="text-3xl font-bold text-center text-teal-800 mb-8">
                    <i class="fas fa-clock mr-3"></i>Horaires des Prières
                </h3>
                <div id="prayer-times-container" class="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div class="text-center">
                        <i class="fas fa-sun text-yellow-500 text-3xl mb-2"></i>
                        <p class="text-gray-600 font-semibold">Fajr</p>
                        <p id="fajr-time" class="text-2xl font-bold text-teal-800"><i class="fas fa-spinner fa-spin"></i></p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-cloud-sun text-orange-400 text-3xl mb-2"></i>
                        <p class="text-gray-600 font-semibold">Dhuhr</p>
                        <p id="dhuhr-time" class="text-2xl font-bold text-teal-800"><i class="fas fa-spinner fa-spin"></i></p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-sun text-orange-500 text-3xl mb-2"></i>
                        <p class="text-gray-600 font-semibold">Asr</p>
                        <p id="asr-time" class="text-2xl font-bold text-teal-800"><i class="fas fa-spinner fa-spin"></i></p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-moon text-indigo-600 text-3xl mb-2"></i>
                        <p class="text-gray-600 font-semibold">Maghrib</p>
                        <p id="maghrib-time" class="text-2xl font-bold text-teal-800"><i class="fas fa-spinner fa-spin"></i></p>
                    </div>
                    <div class="text-center">
                        <i class="fas fa-star text-purple-600 text-3xl mb-2"></i>
                        <p class="text-gray-600 font-semibold">Isha</p>
                        <p id="isha-time" class="text-2xl font-bold text-teal-800"><i class="fas fa-spinner fa-spin"></i></p>
                    </div>
                </div>
                <div class="text-center mt-6 text-sm text-gray-600">
                    <i class="fas fa-info-circle mr-1"></i>
                    Horaires mis à jour quotidiennement depuis <a href="https://mawaqit.net/fr/msp" target="_blank" class="text-teal-700 hover:underline font-semibold">Mawaqit</a>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-4xl font-bold text-center text-gray-800 mb-12">Nos Services</h3>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white rounded-xl p-8 shadow-lg card-hover">
                    <div class="text-teal-600 text-5xl mb-4">
                        <i class="fas fa-book-quran"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4 text-gray-800">Cours d'Arabe</h4>
                    <p class="text-gray-600 mb-6">
                        Cours pour enfants, femmes et hommes. Niveaux débutant, intermédiaire et avancé disponibles.
                    </p>
                    <a href="/cours-arabe" class="text-teal-600 font-semibold hover:text-teal-700 transition">
                        En savoir plus <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                
                <div class="bg-white rounded-xl p-8 shadow-lg card-hover">
                    <div class="text-teal-600 text-5xl mb-4">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4 text-gray-800">Stages Intensifs</h4>
                    <p class="text-gray-600 mb-6">
                        Stages intensifs durant les vacances scolaires pour progresser rapidement en arabe.
                    </p>
                    <a href="/stages" class="text-teal-600 font-semibold hover:text-teal-700 transition">
                        S'inscrire <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                
                <div class="bg-white rounded-xl p-8 shadow-lg card-hover">
                    <div class="text-teal-600 text-5xl mb-4">
                        <i class="fas fa-kaaba"></i>
                    </div>
                    <h4 class="text-2xl font-bold mb-4 text-gray-800">Omra & Hajj</h4>
                    <p class="text-gray-600 mb-6">
                        Organisation de voyages Omra et accompagnement pour le pèlerinage.
                    </p>
                    <a href="/contact" class="text-teal-600 font-semibold hover:text-teal-700 transition">
                        Nous contacter <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-4xl font-bold text-center text-gray-800 mb-4">
                <i class="fas fa-images mr-3 text-teal-600"></i>Notre Mosquée
            </h3>
            <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Découvrez notre lieu de culte, un espace accueillant et paisible pour toute la communauté
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="overflow-hidden rounded-xl shadow-lg card-hover">
                    <img src="https://sspark.genspark.ai/cfimages?u1=IyYnCjVlZ2wMTHz73ozLp5auksgVaUeHMV3V58HFcwVeohoMWYehtw0wM2tgtbFS1b877JYbw4oQuPvEC1s8nHTQtfChzqB%2F%2BwYN0QfcHV02&u2=EJKeBIdys78ccHXb&width=2560" 
                         alt="Mosquée Al Kawthar - Extérieur" 
                         class="w-full h-64 object-cover"
                         loading="lazy">
                    <div class="p-4 bg-white">
                        <p class="text-gray-700 font-semibold text-center">
                            <i class="fas fa-mosque mr-2 text-teal-600"></i>Vue extérieure
                        </p>
                    </div>
                </div>
                <div class="overflow-hidden rounded-xl shadow-lg card-hover">
                    <img src="https://sspark.genspark.ai/cfimages?u1=JaCFz3SdZIr0sDHPsbaxqd2vo5dmjpeA2k8prV5Qgs95xX7oA96MnjDI27mQtFvnDGVehhjxOYpPUzL%2BkcQEx4lencr5jWrenwvhLLNTL0c%2Bzw%3D%3D&u2=Iqlz8Eoy2Uvc9S20&width=2560" 
                         alt="Mosquée Al Kawthar - Architecture" 
                         class="w-full h-64 object-cover"
                         loading="lazy">
                    <div class="p-4 bg-white">
                        <p class="text-gray-700 font-semibold text-center">
                            <i class="fas fa-building mr-2 text-teal-600"></i>Architecture
                        </p>
                    </div>
                </div>
                <div class="overflow-hidden rounded-xl shadow-lg card-hover">
                    <img src="https://sspark.genspark.ai/cfimages?u1=0DwhFRGLYperkW63Na6DCiAVRONAc8hy4YDdbUEZqxty1o6yA6ytR2lmVn5wQNadxkeWc%2FYNodSfnt%2FQItkl7KPAiYFC3kwtSdjd7o2tl0ln&u2=Wog7rbZw1OmROTdf&width=2560" 
                         alt="Mosquée Al Kawthar - Détails" 
                         class="w-full h-64 object-cover"
                         loading="lazy">
                    <div class="p-4 bg-white">
                        <p class="text-gray-700 font-semibold text-center">
                            <i class="fas fa-star-and-crescent mr-2 text-teal-600"></i>Détails
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-4xl font-bold text-center text-gray-800 mb-12">Dernières Actualités</h3>
            <div id="actualites-container" class="grid md:grid-cols-3 gap-8">
                <div class="text-center text-gray-500 col-span-3">
                    <i class="fas fa-spinner fa-spin text-3xl mb-4"></i>
                    <p>Chargement des actualités...</p>
                </div>
            </div>
            <div class="text-center mt-8">
                <a href="/actualites" class="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-lg">
                    Voir toutes les actualités
                </a>
            </div>
        </div>
    </section>
  `;
};
