import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  try {
    enableProdMode();
  } catch (e) {

  }
}

platformBrowserDynamic().bootstrapModule(AppModule /*, {ngZone: 'noop'}*/)
  .catch(err => console.log(err));
