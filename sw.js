/* 拼豆图纸工具 Service Worker · v661
   策略：导航请求「网络优先，3 秒超时回退缓存」；静态资源「缓存优先」。
   导航缓存统一存 /index.html —— 分享码 URL 变化、或从桌面图标以 ./ 打开
   （平台会返回 403「链接不完整」）时，都能回退到本地那份。 */
const VER = 'v661';
const CACHE = 'bead-' + VER;
const PAGE_KEY = '/index.html';

self.addEventListener('install', function(){ self.skipWaiting(); });

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.filter(function(k){ return k !== CACHE; })
        .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

function cachePut(key, res){
  if (!res || !res.ok) return;
  var copy = res.clone();
  caches.open(CACHE).then(function(c){ c.put(key, copy); }).catch(function(){});
}

self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  var isNav = e.request.mode === 'navigate';

  if (isNav){
    e.respondWith(new Promise(function(resolve){
      var done = false;
      var timer = setTimeout(function(){
        if (done) return; done = true;
        caches.match(PAGE_KEY).then(function(hit){ resolve(hit || fetch(e.request)); })
          .catch(function(){ resolve(fetch(e.request)); });
      }, 3000);
      fetch(e.request).then(function(res){
        if (done) return; done = true; clearTimeout(timer);
        if (res && res.ok){ cachePut(PAGE_KEY, res); resolve(res); return; }
        caches.match(PAGE_KEY).then(function(hit){ resolve(hit || res); })
          .catch(function(){ resolve(res); });
      }).catch(function(){
        if (done) return; done = true; clearTimeout(timer);
        caches.match(PAGE_KEY).then(function(hit){ resolve(hit || Response.error()); })
          .catch(function(){ resolve(Response.error()); });
      });
    }));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(hit){
      if (hit) return hit;
      return fetch(e.request).then(function(res){ cachePut(e.request, res); return res; });
    }).catch(function(){ return caches.match(e.request); })
  );
});
