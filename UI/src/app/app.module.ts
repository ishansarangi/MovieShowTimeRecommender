
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DialogModule } from 'primeng/dialog';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ShowtimesComponent } from './showtimes/showtimes.component';
import { DataViewModule } from 'primeng/dataview';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule, NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TrailerComponent } from './trailer/trailer.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { routing, AppRouting } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const routes: Routes =  [
  { path: '', component: LoginComponent },
  { path: '', children: [
      { path: 'home', component: HomeComponent, children: [
          { path: 'movies', component: MovieDetailsComponent },
          { path: 'showtimes', component: ShowtimesComponent, canActivate: [AuthGuard] }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: ''  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainNavigationComponent,
    MovieDetailsComponent,
    SignupComponent,
    SigninComponent,
    HomeNavigationComponent,
    UserProfileComponent,
    ShowtimesComponent,
    TrailerComponent,
    AlertComponent
  ],
  imports: [
     BrowserModule,
     FormsModule, 
     CalendarModule,
     MenubarModule,
     BrowserAnimationsModule,
     ButtonModule,
     InputTextModule,
     YoutubePlayerModule,
     DialogModule,
     PasswordModule,
     DataViewModule,
     KeyFilterModule,
     HttpClientModule,
     CardModule,
     CarouselModule,
     NgbModule,
    //  routing,
    //  AppRouting,
     FlashMessagesModule.forRoot(),
     NgbCarouselModule.forRoot(),
     NgbAlertModule.forRoot(),
     Ng4LoadingSpinnerModule.forRoot(),
     RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}) 
  ],
  providers: [
    CookieService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

