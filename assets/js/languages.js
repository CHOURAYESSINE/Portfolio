// English is the initial language. A visitor may explicitly choose French.
(() => {
  const french = {
    'Cisco · October 2026': 'Cisco · Octobre 2026',
    'Amazon Web Services Training and Certification · May 2026': 'Amazon Web Services Training and Certification · Mai 2026',
    'Skip to content': 'Aller au contenu', 'Home': 'Accueil', 'About': 'À propos',
    'Work': 'Projets', 'Experience': 'Expérience', 'Main navigation': 'Navigation principale',
    'Yessine Choura home': 'Accueil de Yessine Choura', 'Email': 'E-mail',
    'Explore my projects': 'Découvrir mes projets',
    "Hello, I'm Yessine Choura. I'm a computer engineering student actively searching for a final-year internship in networks and cybersecurity starting in February 2027. I enjoy building sites & apps.": "Bonjour, je suis Yessine Choura, étudiant en ingénierie informatique. Je recherche un stage de fin d’études en réseaux et cybersécurité à partir de février 2027. J’aime créer des sites et des applications.",
    'Me': 'de moi', 'Background': 'Parcours', 'Skills': 'Compétences', 'Education': 'Formation',
    'Currently a computer engineering student at the International Institute of Technology (IIT) in Sfax, Tunisia, specializing in Network Administration and Information Security.': 'Étudiant en ingénierie informatique à l’Institut International de Technologie (IIT) de Sfax, en Tunisie, spécialisé en administration des réseaux et sécurité de l’information.',
    'Actively searching for a final-year internship opportunity starting in February 2027.': 'Je recherche un stage de fin d’études à partir de février 2027.',
    "Through internships and academic projects, I've gained experience in web development, network security and deployment. I am always looking to learn new technologies.": 'Mes stages et projets académiques m’ont permis d’acquérir de l’expérience en développement web, sécurité réseau et déploiement. Je souhaite toujours apprendre de nouvelles technologies.',
    'Front-end': 'Interfaces web', 'Back-end': 'Développement serveur',
    'Operating Systems': 'Systèmes d’exploitation', 'Networks & Security': 'Réseaux et sécurité',
    'Deployment & Monitoring': 'Déploiement et supervision', 'Databases': 'Bases de données',
    'Engineering degree · ARSI': 'Diplôme d’ingénieur · ARSI',
    'IIT, Sfax · 2024–2027 (expected)': 'IIT, Sfax · 2024–2027 (prévu)',
    "Bachelor's degree": 'Licence', 'Software Engineering and Information Systems': 'Génie logiciel et systèmes d’information',
    'My services': 'Mes services', 'Areas I work on through my studies, internships and projects.': 'Mes domaines de travail dans le cadre de mes études, stages et projets.',
    'Web Development': 'Développement web',
    'Application interfaces and backend workflows using Angular, Laravel and ASP.NET Core.': 'Interfaces d’applications et fonctionnalités serveur avec Angular, Laravel et ASP.NET Core.',
    'Network filtering, VPN access, detection and automated incident response in lab environments.': 'Filtrage réseau, accès VPN, détection et réponse automatisée aux incidents en laboratoire.',
    'Linux, Docker and K3s deployments, with Grafana dashboards for monitoring.': 'Déploiements sous Linux avec Docker et K3s, et tableaux de bord Grafana pour la supervision.',
    'My work': 'Mes projets', 'Selected projects, ordered by date from newest to oldest.': 'Sélection de projets, du plus récent au plus ancien.',
    'Security & infrastructure': 'Sécurité et infrastructure', 'Web applications': 'Applications web',
    'Secure airport baggage management': 'Gestion sécurisée des bagages à l’aéroport',
    'An OACA internship project combining baggage tracking with JWT access, user roles, HTTPS and a WireGuard VPN. Deployed with Docker and Kubernetes (K3s).': 'Projet de stage à l’OACA : suivi des bagages, authentification JWT, rôles utilisateurs, HTTPS et VPN WireGuard. Déploiement avec Docker et Kubernetes (K3s).',
    'Automated incident response': 'Réponse automatisée aux incidents',
    'A team SOC/SOAR lab: detect suspicious traffic, orchestrate IP blocking and monitor security alerts. Detection and blocking validated in a Kali Linux / Metasploitable environment.': 'Projet SOC/SOAR en équipe : détection du trafic suspect, orchestration du blocage IP et supervision des alertes. Détection et blocage validés dans un environnement Kali Linux / Metasploitable.',
    'Pharmacy management': 'Gestion de pharmacie',
    'Built during my Medicacom internship: purchases, products, inventory, sales, user roles and report exports.': 'Réalisé pendant mon stage chez Medicacom : achats, produits, stocks, ventes, rôles utilisateurs et export de rapports.',
    'Event and registration management with an administrator dashboard.': 'Gestion des événements et des inscriptions avec un tableau de bord administrateur.',
    'An online store with a product catalog, shopping cart, favorites and order management.': 'Boutique en ligne avec catalogue, panier, favoris et gestion des commandes.',
    'Training-PFE — Student Management': 'Training-PFE — Gestion des étudiants',
    'Enhanced a student management system during my end-of-studies internship at Spark-It. Improved authentication, settings and learning materials.': 'Amélioration d’un système de gestion des étudiants pendant mon stage de fin d’études chez Spark-It : authentification, paramètres et supports pédagogiques.',
    'A full-stack car sales application with vehicle browsing and order management.': 'Application complète de vente de voitures avec consultation des véhicules et gestion des commandes.',
    'Personal Portfolio': 'Portfolio personnel',
    'A responsive portfolio presenting my background, experience and projects, with animated page transitions and an interactive particle background.': 'Portfolio adaptatif présentant mon parcours, mes expériences et mes projets, avec des transitions animées et un fond de particules interactif.',
    'Public case study ↗': 'Présentation publique ↗', 'View source ↗': 'Code source ↗',
    'Live demo ↗': 'Voir l’application ↗', 'Live site ↗': 'Voir le site ↗',
    'Previous projects': 'Projets précédents', 'Next projects': 'Projets suivants',
    'Project pages': 'Pages de projets', 'Projects. Left and right arrows change pages.': 'Projets. Les flèches gauche et droite changent de page.',
    'TRACK': 'SUIVRE', 'SECURE': 'SÉCURISER', 'DEPLOY': 'DÉPLOYER', 'DETECT': 'DÉTECTER',
    'RESPOND': 'RÉPONDRE', 'MONITOR': 'SUPERVISER', 'STUDENTS': 'ÉTUDIANTS', 'LEARNING': 'FORMATION', 'MANAGEMENT': 'GESTION',
    'My experience': 'Mon expérience', 'Secure Airport Baggage Management': 'Gestion sécurisée des bagages à l’aéroport',
    'OACA · Internship': 'OACA · Stage',
    'Developed baggage tracking with JWT, role-based access, HTTPS and WireGuard. Deployed using Docker and K3s on an OVH VPS, with network filtering validation.': 'Développement du suivi des bagages avec JWT, accès par rôles, HTTPS et WireGuard. Déploiement avec Docker et K3s sur un VPS OVH et validation du filtrage réseau.',
    'Pharmacy Management System': 'Système de gestion de pharmacie', 'Medicacom · Summer internship': 'Medicacom · Stage d’été',
    'Built user and role administration and pharmacy workflows for purchases, inventory, sales and report exports.': 'Gestion des utilisateurs et des rôles, et fonctionnalités d’achats, de stocks, de ventes et d’export de rapports pour une pharmacie.',
    'Student Management System Enhancement': 'Amélioration du système de gestion des étudiants',
    'Enhanced authentication, settings and learning materials using ASP.NET MVC and PostgreSQL.': 'Amélioration de l’authentification, des paramètres et des supports pédagogiques avec ASP.NET MVC et PostgreSQL.',
    'Job Application Platform': 'Plateforme de recrutement', 'Revolusoft · Summer internship': 'Revolusoft · Stage d’été',
    'Developed authentication, vacancies, job search and user profiles with PHP, from UML planning to implementation.': 'Développement en PHP de l’authentification, des offres, de la recherche d’emploi et des profils utilisateurs, de la conception UML à la réalisation.',
    "Let's": 'Restons', 'connect.': 'en contact.',
    'Looking for a final-year internship in networks and cybersecurity from February 2027.': 'À la recherche d’un stage de fin d’études en réseaux et cybersécurité à partir de février 2027.',
    'Name': 'Nom', 'Subject': 'Objet', 'Your name': 'Votre nom', 'Your email': 'Votre e-mail',
    'Your message': 'Votre message', "Let's talk ⟶": 'Échangeons ⟶',
    'This opens your email application with your message ready to send.': 'Votre application de messagerie s’ouvre avec le message prêt à envoyer.',
    'Jul – Aug 2026': 'Juil. – août 2026', 'Feb – Jun 2026': 'Févr. – juin 2026', 'Aug 2025': 'Août 2025',
    'Feb – Aug 2024': 'Févr. – août 2024', 'JUL — AUG 2026': 'JUIL. — AOÛT 2026',
    'AUG 2025': 'AOÛT 2025', 'FEB — AUG 2024': 'FÉVR. — AOÛT 2024', 'AUG — SEP 2023': 'AOÛT — SEPT. 2023',
    'Pharmacy management application preview': 'Aperçu de la gestion de pharmacie',
    'Event Planner application preview': 'Aperçu d’Event Planner', 'SfaxStore application preview': 'Aperçu de SfaxStore',
    'AutoWebStore / My Car application preview': 'Aperçu d’AutoWebStore / My Car', 'Personal portfolio preview': 'Aperçu du portfolio personnel'
  };
  const originals = new WeakMap();
  let language = 'en';
  const translate = value => language === 'fr' ? (french[value] || (value.startsWith('Project page ') ? value.replace('Project page ', 'Page de projets ') : value)) : value;
  function apply(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest('script,style,.language-switch')) continue;
      if (!originals.has(node)) originals.set(node, node.textContent);
      const original = originals.get(node), key = original.trim();
      node.textContent = original.replace(key, translate(key));
    }
    root.querySelectorAll('[aria-label],[placeholder],img[alt]').forEach(element => {
      for (const attribute of ['aria-label', 'placeholder', 'alt']) {
        if (!element.hasAttribute(attribute) || element.closest('.language-switch')) continue;
        const source = 'data-original-' + attribute;
        if (!element.hasAttribute(source)) element.setAttribute(source, element.getAttribute(attribute));
        element.setAttribute(attribute, translate(element.getAttribute(source)));
      }
    });
  }
  const switcher = document.createElement('div');
  switcher.className = 'language-switch'; switcher.setAttribute('role', 'group');
  switcher.setAttribute('aria-label', 'Language / Langue');
  for (const [code, label] of [['en', 'English'], ['fr', 'Français']]) {
    const button = document.createElement('button'); button.type = 'button';
    button.textContent = code.toUpperCase(); button.lang = code; button.title = label;
    button.setAttribute('aria-label', label); button.setAttribute('aria-pressed', String(code === language));
    button.addEventListener('click', () => {
      language = code; document.documentElement.lang = code;
      switcher.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.lang === code)));
      apply(document.body); updateTitle();
    });
    switcher.append(button);
  }
  document.querySelector('header').append(switcher);
  function updateTitle() {
    const names = {home:'Home', about:'About', services:'Services', work:'Work', testimonials:'Experience', contact:'Contact'};
    document.title = 'Yessine Portfolio — ' + translate(names[document.body.dataset.page] || 'Home');
  }
  // Page rendering replaces the main content. Translate the new nodes without
  // recreating forms or resetting the selected project page.
  new MutationObserver(() => { apply(document.querySelector('#main')); updateTitle(); })
    .observe(document.querySelector('#main'), {childList:true});
  apply(document.body); updateTitle();
})();
