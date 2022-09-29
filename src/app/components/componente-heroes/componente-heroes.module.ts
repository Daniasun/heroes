import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ComponenteHeroesComponent} from './componente-heroes.component';
import {MatListModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {ComponenteHeroesRoutingModule} from './componente-heroes-routing.module';


@NgModule({
  declarations: [
    ComponenteHeroesComponent
  ],
  imports: [
    CommonModule,
    ComponenteHeroesRoutingModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ComponenteHeroesComponent
  ],
  providers: [
    ServicioHeroesService
  ]
})
export class ComponenteHeroesModule { }
