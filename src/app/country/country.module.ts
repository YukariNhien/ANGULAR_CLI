import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countrys} from './country.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerService } from "../service-pagination/page.service";
@NgModule({
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  declarations: [
    Countrys
  ],
  providers:[PagerService] 
})
export class CountrysModule { }