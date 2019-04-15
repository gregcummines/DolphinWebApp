import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './shared/pages/error404-page/error404-page.component';
import {HomePageComponent} from './shared/pages/home-page/home-page.component';
import {AppConfig} from './configs/app.config';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { LoginComponent } from './shared/pages/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('LinkedIn-client-Id', false, 'en_US')
  }
]);
 
export function provideConfig() {
  return config;
}

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: AppConfig.routes.heroes, loadChildren: './modules/heroes/heroes.module#HeroesModule', canActivate: [AuthGuard]},
  {path: AppConfig.routes.error404, component: Error404PageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'en', redirectTo: ''}, // because english language is the default one

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    SocialLoginModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule {
}
