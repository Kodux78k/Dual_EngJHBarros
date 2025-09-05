const CACHE = 'tico-ultra-v1';
const CORE = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/icon-192-mono.png',
  './icons/icon-512-mono.png',
  './icons/apple-touch-icon-180.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

async function handleNavigation(req){
  try {
    const net = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, net.clone());
    return net;
  } catch (e){
    const cache = await caches.open(CACHE);
    return (await cache.match('./offline.html')) || new Response('offline', {status:503});
  }
}
async function handleAsset(req){
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const p = fetch(req).then(r => { if(r && r.ok) cache.put(req, r.clone()); return r; }).catch(_=>null);
  return cached || p || new Response('', {status:504});
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method!=='GET') return;
  if(req.mode==='navigate'){ e.respondWith(handleNavigation(req)); }
  else if(new URL(req.url).origin===location.origin){ e.respondWith(handleAsset(req)); }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientsArr => {
      const hadWin = clientsArr.some(windowClient => (windowClient.url.includes('#check') && (windowClient.focus() || true)));
      if (!hadWin && clientsArr[0]) clientsArr[0].navigate('./#check');
    })
  );
});
