import { Component } from '@angular/core';
import { ServicioHeroesService } from './services/servicio-heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ServicioHeroesService]
})
export class AppComponent {
  title = 'heroes';
}
