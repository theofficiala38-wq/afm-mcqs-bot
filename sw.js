// Network-First SW — الـ HTML دايماً من النت مش من الكاش
var SW_VERSION='1783278945353';
self.addEventListener('install',function(e){
  // تفعيل فوري بدون انتظار الـ tabs القديمة تتقفل
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',function(e){
  // استحواذ فوري على كل الصفحات المفتوحة
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){return caches.delete(k);}));
    }).then(function(){return self.clients.claim();})
  );
});
self.addEventListener('fetch',function(e){
  // طلبات التنقل (HTML) → دايماً من النت
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request,{cache:'no-cache'})
        .catch(function(){
          return caches.match(e.request)||new Response('Offline',{status:503});
        })
    );
  }
  // باقي الموارد → اتركها للمتصفح
});
