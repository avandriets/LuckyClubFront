import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";
import { SignInPopUpComponent } from './auth/sign-in-pop-up/sign-in-pop-up.component';
import {SignUpEmailComponent} from "./auth/sign-up-email/sign-up-email.component";
import {SignInEmailComponent} from "./auth/sign-in-email/sign-in-email.component";
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {CategoriesService} from "./services/categories-service.service";
import {AuthHttpService} from "./helpers/auth-http.service";
import { NewCategoryComponent } from './views/categories/new-category/new-category.component';
import { EditCategoryComponent } from './views/categories/edit-category/edit-category.component';
import { CategoryComponent } from './views/categories/category/category.component';
import { UserComponent } from './views/user/user.component';
import { LotComponent } from './views/lots/lot/lot.component';
import { NewLotComponent } from './views/lots/new-lot/new-lot.component';
import { EditLotComponent } from './views/lots/edit-lot/edit-lot.component';
import {LotsServiseService} from "./services/lots-servise.service";
import { LotPanelComponent } from './views/lot-item/lot-item.component';
import { CategoriesFilterComponent } from './views/filter/categories-filter/categories-filter.component';
import { LuckyBoardComponent } from './views/lucky-board/lucky-board.component';
import { LotItemGroupComponent } from './views/lot-item-group/lot-item-group.component';
import {AuthAsyncGuardGuard} from "./auth/auth-async-guard.guard";
import { LotDetailViewComponent } from './views/lot-detail-view/lot-detail-view.component';

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
    SignInPopUpComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    CategoryComponent,
    UserComponent,
    LotComponent,
    NewLotComponent,
    EditLotComponent,
    LotPanelComponent,
    CategoriesFilterComponent,
    LuckyBoardComponent,
    LotItemGroupComponent,
    LotDetailViewComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuardService, CategoriesService, LotsServiseService, AuthHttpService, AuthAsyncGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
