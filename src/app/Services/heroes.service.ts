import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../Modelos/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

	url : string = 'https://crud-4b759.firebaseio.com'


	constructor( private http : HttpClient ) { }


	createHeroe ( heroe : HeroeModel ) {
		return this.http.post (`${this.url}/heroes.json`, heroe)
			.pipe (
				map( (resul : any) => {
					heroe.id = resul.name;	/*para colocar en el input ID el respectivo valor retornado*/				
					return heroe;
				})
			);

	} /*fin del metodo create*/

	actualizarHeroe ( heroe : HeroeModel ) {

		const heroeTem : HeroeModel = {
	
			...heroe

		}
		delete heroeTem.id;
		return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTem);

	} /*fin-Actualizar*/


	/*para mostrar un heroe*/
	getHeore ( id : string ){
		return this.http.get (`${this.url}/heroes/${ id }.json`);
		
	}

	/*mostrar el listado de heroes */
	getHeroe () {

		return this.http.get( `${ this.url }/heroes.json` )
			.pipe(
				map ( this.transfor)
			);
	}

	private transfor ( HeoresObjec : object ) {

		const heroes : HeroeModel [] = [];
		
		if ( HeoresObjec == null){
			return null;
		}

		Object.keys ( HeoresObjec ).forEach ( llave => {
			const heroe : HeroeModel = HeoresObjec [llave];
			heroe.id = llave;

			/*pasar los datos al arreglo*/
			heroes.push (heroe);
			/**/

		});
		console.log ('transfor');
		return heroes; 
		
	}

/*
hechiiiiiiiiiiii*/
	deleteHeroe ( id : string ) {
		return this.http.delete ( `${ this.url }/heroes/${id}.json` );
	}

}
