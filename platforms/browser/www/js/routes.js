var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // Servicio page
  {
    path: '/servicio/:value?',
    url: './pages/servicio.html',
    name: 'servicio',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
