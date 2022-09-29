import {Component, OnInit, ViewChild} from '@angular/core';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import { HeroeModel } from '../../models/heroe-model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-componente-heroes',
  templateUrl: './componente-heroes.component.html',
  styleUrls: ['./componente-heroes.component.scss']
})
export class ComponenteHeroesComponent implements OnInit {

  constructor(readonly heroesService: ServicioHeroesService,
              readonly formBuilder: FormBuilder) {
    this.cargarHeroes();
  }
  public formBuscar: FormGroup;
  public formEditar: FormGroup;
  public formAniadir: FormGroup;
  public mostrarEditar = false;
  public mostrarAniadir = false;
  public requeridoAniadir = false;
  public requeridoEditar = false;
  public heroes: HeroeModel[];
  public heroeEditar: HeroeModel;
  public dataSource: MatTableDataSource<HeroeModel>;
  public displayColumns: string[] = ['id', 'nombre', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  ngOnInit() {
    this.cargarHeroes();
    this.cargarForms();
  }
  public cargarForms(): void {
    this.formBuscar = this.formBuilder.group({
      busqueda: new FormControl('')
    });
  }
  public buscar() {
    const resultado = this.heroesService.consultarHeroePorBusqueda(this.formBuscar.controls.busqueda.value);
    if (resultado) {
      this.heroes = resultado;
      this.dataSource.data = resultado;
    }
  }
  public cargarHeroes(): void {
    this.heroesService.getAll().subscribe((value: HeroeModel[]) => {
      this.heroes = value;
      this.heroesService.setHeroes(value);
      this.recargarDataSource();
    });
  }
  public recargarHeroes(): void {
    this.heroes = this.heroesService.consultarTodos();
    this.recargarDataSource();
  }
  public recargarDataSource(): void {
    this.dataSource = new MatTableDataSource<HeroeModel>(this.heroes);
    this.dataSource.paginator = this.paginator;
  }
  public mostrarFormEditar(heroe: HeroeModel): void {
    this.mostrarEditar = true;
    this.mostrarAniadir = false;
    this.heroeEditar = heroe;
    this.formEditar = this.formBuilder.group({
      nombre: new FormControl(this.heroeEditar.nombre, [Validators.required])
    });
  }
  public ocultarFormularios(): void {
    this.mostrarAniadir = false;
    this.mostrarEditar = false;
  }
  public mostrarFormAniadir(): void {
    this.mostrarAniadir = true;
    this.mostrarEditar = false;
    this.heroeEditar = { id: this.heroes.length + 1, nombre: ''};
    this.formAniadir = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required])
    });
  }
  public editar(heroe: HeroeModel): void {
    if (!this.formEditar.valid) {
      this.requeridoEditar = true;
      return;
    }
    this.requeridoEditar = false;
    heroe.nombre = this.formEditar.controls.nombre.value;
    this.heroesService.modificarHeroe(heroe);
    this.recargarHeroes();
  }
  public aniadir(heroe: HeroeModel): void {
    if (!this.formAniadir.valid) {
      this.requeridoAniadir = true;
      return;
    }
    this.requeridoAniadir = false;
    heroe.nombre = this.formAniadir.controls.nombre.value;
    this.heroesService.aniadirHeroe(heroe);
    this.recargarHeroes();
  }
  public eliminar(id: number): void {
    this.ocultarFormularios();
    this.heroesService.eliminarHeroe(id);
    this.recargarHeroes();
  }
}
