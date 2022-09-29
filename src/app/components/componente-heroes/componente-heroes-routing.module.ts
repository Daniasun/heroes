import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComponenteHeroesComponent} from './componente-heroes.component';

const routes: Routes = [
  { path: '', component: ComponenteHeroesComponent },
  { path: 'tabla-heroes', component: ComponenteHeroesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponenteHeroesRoutingModule { }
