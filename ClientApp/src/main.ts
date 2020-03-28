import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
import { BootController } from './boot-controller';

if (environment.production) {
  enableProdMode();
}

const init = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => (<any>window).appBootstrap && (<any>window).appBootstrap())
    .catch(err => console.error('NG Bootstrap Error =>', err));
}

init();

BootController.getbootControl().watchReboot().subscribe(() => init());
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
