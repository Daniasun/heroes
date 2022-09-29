import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tabla-heroes', loadChildren: () =>
      import('./components/componente-heroes/componente-heroes.module')
        .then(m => m.ComponenteHeroesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
