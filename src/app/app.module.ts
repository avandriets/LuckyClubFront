import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "app/app-routing.module";
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AboutComponent } from './views/about/about.component';
import { RulesComponent } from './views/rules/rules.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { LotsComponent } from './views/lots/lots.component';
import {AuthService} from "./auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";
import { SignInPopUpComponent } from './auth/sign-in-pop-up/sign-in-pop-up.component';
import {SignUpEmailComponent} from "./auth/sign-up-email/sign-up-email.component";
import {SignInEmailComponent} from "./auth/sign-in-email/sign-in-email.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MainMenuComponent,
    AboutComponent,
    RulesComponent,
    ContactsComponent,
    CategoriesComponent,
    LotsComponent,
    SignUpEmailComponent,
    SignInEmailComponent,
    SignInPopUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
