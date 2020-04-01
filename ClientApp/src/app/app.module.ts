import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { UserModule } from './components/user/user.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    MaterialModule,
    UserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
