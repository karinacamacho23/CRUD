import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';

const routes: Routes = [
	{path:'heroe/:id', component: HeroeComponent},
	{path:'heroes', component: HeroesComponent},
	{path:'**', pathMatch:'full', redirectTo:'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
		