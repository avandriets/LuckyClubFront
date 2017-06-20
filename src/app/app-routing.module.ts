import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "app/main/main.component";
import { AboutComponent } from "app/views/about/about.component";
import { RulesComponent } from "app/views/rules/rules.component";
import { ContactsComponent } from "app/views/contacts/contacts.component";
import {CategoriesComponent} from "./views/categories/categories.component";
import {LotsComponent} from "./views/lots/lots.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {NewCategoryComponent} from "./views/categories/new-category/new-category.component";
import {EditCategoryComponent} from "./views/categories/edit-category/edit-category.component";
import {CategoryComponent} from "./views/categories/category/category.component";
// import {SignUpEmailComponent} from "./auth/sign-up-email/sign-up-email.component";
// import {SignInEmailComponent} from "./auth/sign-in-email/sign-in-email.component";


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'categories', component: CategoriesComponent, canActivate:[AuthGuardService] , children:[
    { path: 'new', component: NewCategoryComponent},
    { path: ':id', component: CategoryComponent},
    { path: ':id/edit', component: EditCategoryComponent}
  ] },
  { path: 'lots', component: LotsComponent, canActivate:[AuthGuardService] },
  // { path: 'signin', component: SignInEmailComponent },
  // { path: 'signup', component: SignUpEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
