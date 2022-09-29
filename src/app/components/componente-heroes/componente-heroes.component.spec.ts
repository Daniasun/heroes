import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { ComponenteHeroesComponent } from './componente-heroes.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatPaginatorModule, MatTableDataSource, MatTableModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import {ServicioHeroesService} from '../../services/servicio-heroes.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {} from 'jasmine';
import {HeroeModel} from '../../models/heroe-model';
import {of} from 'rxjs';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

let mockHeroes: HeroeModel[];
mockHeroes = [
  {id: 1, nombre : 'Superman'},
  {id: 2, nombre : 'Spiderman'},
  {id: 3, nombre : 'Batman'},
  {id: 4, nombre : 'Manolito el fuerte'},
  {id: 5, nombre : 'Hulk'},
  {id: 6, nombre : 'IronMan'},
  {id: 7, nombre : 'Goku'}
];

describe('ComponenteHeroesComponent', () => {
  let component: ComponenteHeroesComponent;
  let fixture: ComponentFixture<ComponenteHeroesComponent>;
  let heroesService: ServicioHeroesService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteHeroesComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        ServicioHeroesService,
        TranslateService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([ServicioHeroesService], s => {
    heroesService = s;
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteHeroesComponent);
    component = fixture.componentInstance;
    component.heroes = mockHeroes;
    component.dataSource = new MatTableDataSource<HeroeModel>(component.heroes);
    component.dataSource.data = mockHeroes;
    fixture.detectChanges();
  });


  it(' create', () => {
    expect(component).toBeTruthy();
  });
  it(' buscar', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.formBuscar.controls.busqueda.value = 'Goku';
    const heroesEncontrados = component.heroesService.consultarHeroePorBusqueda('Goku');
    component.buscar();
    expect(component.heroes).toEqual(heroesEncontrados);
  });

  it(' cargar Heroes', () => {
    const response: HeroeModel[] = [];
    spyOn(heroesService, 'getAll').and.returnValue(of(response))
    component.heroesService.setHeroes(response);
    component.cargarHeroes();
    expect(component.heroes).toEqual(response);
    component.heroesService.setHeroes(response);
  });

  it(' recargar Heroes', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.recargarHeroes();
    expect(component.heroes).toEqual(mockHeroes);
  });
  it(' recargar DataSource', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.recargarDataSource();
    expect(component.dataSource.data).toEqual(mockHeroes);
  });
  it(' mostrar Form Editar', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.mostrarFormEditar(mockHeroes[0]);
    component.formEditar = component.formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre)
    });
    expect(component.mostrarEditar).toEqual(true);
    expect(component.mostrarAniadir).toEqual(false);
    expect(component.heroeEditar).toEqual(mockHeroes[0]);
    expect(component.formEditar.get('nombre')).toBeTruthy();
  });
  it(' ocultar Formularios', () => {
    component.ocultarFormularios();
    expect(component.mostrarEditar).toEqual(false);
    expect(component.mostrarAniadir).toEqual(false);
  });


  it(' mostrar Form Añadir', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.heroeEditar = { id: component.heroes.length + 1, nombre: ''};
    component.mostrarFormAniadir();
    component.formAniadir = component.formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre)
    });
    expect(component.mostrarAniadir).toEqual(true);
    expect(component.mostrarEditar).toEqual(false);
    expect(component.heroeEditar).toEqual({ id: component.heroes.length + 1, nombre: ''})
    expect(component.formAniadir.get('nombre').value).toEqual('');
  });
  it(' editar', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.heroeEditar = mockHeroes[0];
    component.formEditar = component.formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre + 'editado')
    });
    component.editar(mockHeroes[0]);
    expect(mockHeroes[0].nombre).toEqual(component.formEditar.get('nombre').value);
  });
  it(' aniadir', () => {
    component.heroesService.setHeroes(mockHeroes);
    component.heroeEditar = { id: component.heroes.length + 1, nombre: 'Añadido'};
    component.formAniadir = component.formBuilder.group({
      nombre: new FormControl(component.heroeEditar.nombre)
    });
    component.aniadir(component.heroeEditar);
    expect(component.heroeEditar.nombre).toEqual(component.formAniadir.get('nombre').value);
  });
  it(' eliminar', () => {
    component.heroesService.setHeroes(mockHeroes);
    const longitudArray = mockHeroes.length;
    component.eliminar(mockHeroes[0].id);
    expect(mockHeroes.length).toEqual(longitudArray - 1);
  });
});
