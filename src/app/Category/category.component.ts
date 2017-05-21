import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { ClientService } from '../app.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Response, Category } from '../theme/model/class';
@Component({
    selector: 'category',
    templateUrl: './category.component.html',

})

export class Categorys implements AfterViewInit {
    public submited: boolean = false;
    public message: string = "";
    private form: FormGroup;
    private category: Category = new Category();
    private list: Array<any> = new Array<any>();
    constructor(
        private fb: FormBuilder, private router: Router,
        private server: ClientService
    ) {
        this.initForm(this.category)
    }
    initForm(item: Category) {
        this.form = this.fb.group({
            CategoryId: [item.CategoryId],
            Name: [item.Name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])]
        });
    }
    private get() {
        this.server.get('ManagerCity/GetCategory').subscribe(data => {
            this.list = data;
        }, err => { this.list = new Array<any>(); })
    }
    private Save(values: Category) {
        console.log(values);
        if (values.Name == null || values.Name.trim() == "") {
            this.message = "Nhập tên loại";
            this.startTime();
            return;
        }
        if (this.form.valid) {
            if (!this.submited) {
                this.submited = true;
                this.server.post('ManagerCity/SaveCategory', values)
                    .subscribe((data: Response) => {
                        this.message = data.msg;
                        this.submited = false;
                        this.startTime();
                        if (data.result) {
                            this.cancel();
                            this.get();
                        }

                    },
                    err => {
                        this.message = "Không thể chỉnh sửa lúc này, quay lại sau.";
                        this.submited = false;
                        this.startTime();
                    })
            }
        }
    }
    private Edit(item: Category) {
        this.initForm(item);
    }
    private Remove(item: Category) {
        if (!this.submited) {
            if (window.confirm("Bạn có muốn xóa??")) {
                this.submited = true;
                this.server.remove('ManagerCity/DeleteCategory', item.CategoryId).subscribe((data: Response) => {
                        this.message = data.msg;
                        this.submited = false;
                        this.startTime();
                        if (data.result) {
                            this.get();
                        }

                    },
                    err => {
                        this.message = "Không thể xóa lúc này, quay lại sau.";
                        this.submited = false;
                        this.startTime();
                    })
            }
        }
    }
    public cancel() {
        this.category = new Category();
        this.initForm(this.category);
    }
    public startTime(): void {
        setTimeout(() => { this.message = ""; }, 5000);
    }
    ngAfterViewInit() {
        this.get();
    }
}