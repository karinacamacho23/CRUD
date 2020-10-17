import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../Services/heroes.service';
import { HeroeModel } from '../../Modelos/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	heroess : HeroeModel [] = [];

	cargar : boolean;
	noregistro : boolean = false;
	msj : boolean;
	heroets : HeroeModel = null;
	i_ts: number = null;


	constructor( private heroesService : HeroesService ) { }

	ngOnInit(): void {
		this.cargar = true;
		this.heroesService.getHeroe().subscribe( res => {
			this.heroess = res;
			if (this.heroess === null){
				this.cargar = false;
				this.noregistro = true;
				return;

			}
			this.cargar = false;
		});
	}

	eliminarHeroe( heroe: HeroeModel, idx: number) {

		Swal.fire ({
			title: 'Estas Seguro ?',
			text : 'Deseas Eliminar al heroe ${heroe.nombre}',
			icon : 'question',
			showConfirmButton : true,
			showCancelButton  : true
		})
		.then ( resp => {
			if ( resp.value ){
				this.heroess.splice (idx , 1);
				this.heroesService.deleteHeroe( heroe.id ).subscribe ();
				Swal.fire ({
				title : 'Eliminado Exitosamente'
				});
			}
			
		})
		
		.catch ( err => {

		})
	
	}

/*
	eliminarHeroe() {
		this.msj = false; //inicializo la pregunta
		this.heroess.splice (this.i_ts , 1);
		this.heroesService.deleteHeroe( this.heroets.id ).subscribe ();
		this.i_ts = null; this.heroets.id = null;
	}*/
}
