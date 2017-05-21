import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaiViet} from './baiviet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerService } from "../service-pagination/page.service";
@NgModule({
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  declarations: [
    BaiViet
  ],
  providers:[PagerService] 
})
export class BaiVietModule { }