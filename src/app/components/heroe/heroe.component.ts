import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
/*importar modelo*/
import { HeroeModel } from '../../Modelos/heroe.model';
/*importar servicio*/
import { HeroesService } from '../../Services/heroes.service';
import { Observable } from 'rxjs';

/*importanto el SweetAlert2*/
import Swal from 'sweetalert2';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
	
	aviso : boolean = false;
	heroe : HeroeModel = new HeroeModel();


	constructor( private heroesService : HeroesService, 
				 private _route : ActivatedRoute,
				 private route : Router) { }

	ngOnInit(): void {
		const id = this._route.snapshot.paramMap.get( 'id' );

		if ( id !== 'nuevo' ){
			this.heroesService.getHeore( id )
				.subscribe ( (resp : HeroeModel) => {
					this.heroe = resp;
					this.heroe.id = id;
					console.log(this.heroe)				})
		}
	}


	private navigate (){
		this.route.navigate(['/heroes']);
	}

	/*metodos*/
	guardar ( form : NgForm ) {
		if (form.invalid){ 
			console.log('Usuario No valido');
			this.navigate();
			return;
		} /*fin de if*/


		Swal.fire ({
			title : 'Espere',
			text : 'Guardando Informacion',
			icon : 'info',
			allowOutsideClick : false
		});
		Swal.showLoading();

		let peticiones : Observable <any> = null;
		/*llamada del metodo createHeroe de nuestro modelo*/

		if ( this.heroe.id ) {
			peticiones = this.heroesService.actualizarHeroe ( this.heroe );
			
		}
		else{
			peticiones = this.heroesService.createHeroe ( this.heroe );
			
		}

		peticiones. subscribe ( result => {
			console.log ( result )
			Swal.fire({
				title : this.heroe.nombre,
				text  : 'Informacion Almacenada',
				icon  : 'success'
			}).then ( res => {
				if ( res.value) {
					this.navigate();
				}
			})
		} );

	}
}
