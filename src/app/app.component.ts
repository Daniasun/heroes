import { Component } from '@angular/core';
import { ServicioHeroesService } from './services/servicio-heroes.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ServicioHeroesService]
})
export class AppComponent {
  private title = '';
  constructor(readonly translateService: TranslateService) {
    this.translateService.setDefaultLang('es');
    this.translateService.get(['heroes.nombre_app']).subscribe(tranlations => {
      this.title = tranlations['heroes.nombre_app'];
    });
  }

}
