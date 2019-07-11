import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouters } from './app.routing';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';

// Functional Components
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRouters,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    SharedModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
