import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServicioHeroesService {

  readonly url = 'http://localhost:3000/heroes';
  public heroes: HeroeModel[];

  constructor(readonly http: HttpClient) {
    this.getAll().subscribe(value => {
      this.heroes = value;
    });
  }
  public setHeroes(arrayHeroes: HeroeModel[]): void {
    this.heroes = arrayHeroes;
  }
  public getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  public consultarTodos(): HeroeModel [] {
    return this.heroes;
  }
  public consultarHeroe(id: number): HeroeModel | number {
    const heroeEncontrado = this.heroes.find((item: HeroeModel) => item.id === id);
    return heroeEncontrado ? heroeEncontrado : -1;
  }
  public consultarHeroePorBusqueda(busqueda: string): HeroeModel[] {
    const heroesEncontrados = this.heroes.filter((value: HeroeModel) =>
      value.nombre.toUpperCase().indexOf(busqueda.toUpperCase()) !== -1);
    return heroesEncontrados;
  }
  public modificarHeroe(data: HeroeModel): void {
    const heroeEncontrado = this.heroes.findIndex((item: HeroeModel) => item.id === data.id);
    if (heroeEncontrado !== -1) {
      this.heroes.push(data);
      this.heroes.splice(heroeEncontrado, 1);
    }
    this.ordenar();
  }
  public aniadirHeroe(data: HeroeModel): void {
    this.heroes.push(data);
  }
  public eliminarHeroe(id: number): void {
    const heroeEncontrado = this.heroes.findIndex((item: HeroeModel) => item.id === id);
    if (heroeEncontrado !== -1) {
      this.heroes.splice(heroeEncontrado, 1);
    }
  }
  public ordenar(): void{
    this.heroes = this.heroes.sort(this.sortId);
  }
  public sortId(a: any, b: any): number {
    if (a.id <= b.id) {
      return -1;
    }
    if (a.id >= b.id) {
      return 1;
    }
  }
}
