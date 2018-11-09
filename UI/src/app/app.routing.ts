import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { NgModule } from '@angular/core';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ShowtimesComponent } from './showtimes/showtimes.component';


// TODO: to be modified
// const appRoutes: Routes = [
//     { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },

//     // otherwise redirect to home
//     { path: '**', redirectTo: '' }
// ];

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '', children: [
      {
        path: 'home', component: HomeComponent, children: [
          { path: 'movies', component: MovieDetailsComponent },
          { path: 'showtimes', component: ShowtimesComponent }
        ]
      }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'}); 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRouting {}

  

