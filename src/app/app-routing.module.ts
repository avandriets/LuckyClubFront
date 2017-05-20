import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "app/main/main.component";
import { AboutComponent } from "app/views/about/about.component";
import { RulesComponent } from "app/views/rules/rules.component";
import { ContactsComponent } from "app/views/contacts/contacts.component";
import {CategoriesComponent} from "./views/categories/categories.component";
import {LotsComponent} from "./views/lots/lots.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthGuardService} from "./auth/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'categories', component: CategoriesComponent, canActivate:[AuthGuardService] },
  { path: 'lots', component: LotsComponent, canActivate:[AuthGuardService] },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
