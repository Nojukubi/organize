import { NetworkOnly } from 'workbox-strategies';
import { offlineFallback } from 'workbox-recipes';
import { setDefaultHandler } from 'workbox-routing';

// Asset hashes to see if content has changed.
const assetHashes = self.__WB_MANIFEST;
console.log(assetHashes);

// Sets a default Network Only handler.
setDefaultHandler(new NetworkOnly());

// HTML to serve when the site is offline
offlineFallback({
  pageFallback: '/offline.html'
});
