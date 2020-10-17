


	
export class HeroeModel {

	id     : string;
	nombre : string;
	poder  : string;

	vivo   : boolean;

	
	constructor() {
		// code...
		this.vivo = true; 
		/*cada vez que se declare un heroe tendra como estado VIVO*/
	}
}