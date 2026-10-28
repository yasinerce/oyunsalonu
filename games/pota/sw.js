/* Yerel dosyalar kurulumda birlikte önbelleğe alınır. PvP internet gerektirir. */
const SURUM='pota-v1.0.8-random-melt';
const YEREL=[
  "./",
  "./index.html",
  "./boot.js",
  "./mp.js",
  "./game.js",
  "./game.js?theme=salon-1&v=ergit-2",
  "../../game-theme.css",
  "../../game-theme.js",
  "../../hub-bridge.js",
  "./manifest.json",
  "./vendor/matter.min.js",
  "./vendor/peerjs.min.js",
  "./fonts/fonts.css",
  "./fonts/font-0.woff",
  "./fonts/font-1.woff",
  "./fonts/font-2.woff",
  "./fonts/font-3.woff",
  "./fonts/font-4.woff",
  "./fonts/font-5.woff",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const cache=await caches.open(SURUM);await cache.addAll(YEREL);await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('pota-')&&n!==SURUM).map(n=>caches.delete(n)));await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  e.respondWith((async()=>{
    const cache=await caches.open(SURUM),hit=await cache.match(e.request);
    if(hit)return hit;
    try{return await fetch(e.request);}catch(error){
      if(e.request.mode==='navigate')return await cache.match('./index.html');
      return Response.error();
    }
  })());
});
