import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularOpenlayersModule } from 'angular2-openlayers';
import { ModifyInteractionComponent } from '../components/modify.component';
import { SelectInteractionComponent } from '../components/select.component';
import { TranslateInteractionComponent } from '../components/translate.component';
import {
  MdButtonModule, MdIconModule, MdButtonToggleModule, MdTooltipModule,
  StyleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ModifyInteractionComponent,
    SelectInteractionComponent,
    TranslateInteractionComponent
  ],
  imports: [BrowserAnimationsModule, MdButtonModule, MdIconModule, MdButtonToggleModule, StyleModule, MdTooltipModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularOpenlayersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
