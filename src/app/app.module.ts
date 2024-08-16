// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, Pipe } from '@angular/core';
// import { DatePipe } from '@angular/common';
// // import { CommonModule } from '@angular/common';
// import { AppComponent } from './app.component';



// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [
//     DatePipe
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// import { PadreComponent } from './padre/padre.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,],
  declarations: [ AppComponent,],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

