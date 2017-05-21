import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categorys} from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  declarations: [
    Categorys
  ] 
})
export class CategoryModule { }