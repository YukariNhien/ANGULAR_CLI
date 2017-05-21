import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Members } from './member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerService } from "../service-pagination/page.service";
import { ImageUploadModule } from 'angular2-image-upload';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageUploadModule.forRoot(),
    CKEditorModule
    ],
    declarations: [
        Members
    ],
    providers: [PagerService]
})
export class MembersModule { }