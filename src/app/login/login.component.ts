import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../theme/validators';
import { LoginService } from './login.service';
import { Router } from "@angular/router";
import { Cookie } from 'ng2-cookies';
import { Response, Dangky } from '../theme/model/class';
import { ClientService } from '../app.service';

@Component({
    selector: 'login-client',
    templateUrl: './login.component.html'

})

export class Login {
    public form: FormGroup;
    public formregister: FormGroup;
    public submited: boolean = false;
    public message: string = "";
    public token: string = "";
    private time: number = 30;
    public show: boolean = false;
    imgCaptcha: string = '';
    private email:string='';
    page: number =1;
    constructor(
        private fb: FormBuilder, private router: Router,
        private server: ClientService,
        private _services: LoginService
    ) {
        this.initForm();
    }
    private ngOnInit() {
        if (Cookie.check(this.server.key)) {
            window.history.back();
        }
    }

    initForm() {
        this.form = this.fb.group({
            UserName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
            Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])]
        });
    }
    public loginSubmit(values: any) {
        if (!this.submited) {
            this.submited = true;
            this._services.login(values).subscribe((data: Response) => {
                if (!data.result) {
                    this.message = data.msg;
                    this.startTime();
                }
                else {
                    this.email = data.UserInfo;
                    this.page = 2;
                    // Cookie.set(this.server.key, data.Token, 0.02083333333);
                    this.initForm();
                    // window.location.reload();
                }
                this.submited = false;
            }, error => { this.message = "Không thể đăng nhập lúc này"; this.submited = false; this.startTime(); });
        }
    }
    public tokenSubmit() {
        if (this.token.trim() == "") {
            this.message = "Nhập mã xác thực";
            this.startTime();
            return;
        }
        if (!this.submited) {
            this.submited = true;
            this._services.token(this.token).subscribe((data: Response) => {
                if (!data.result) {
                    this.message = data.msg;
                    this.startTime();
                }
                else {
                    this.page = 1;
                    Cookie.set(this.server.key, data.Token, 0.02083333333*2);
                    this.initForm();
                    window.location.reload();
                }
                this.submited = false;
            }, error => { this.message = "Không thể đăng nhập lúc này"; this.submited = false; this.startTime(); });
        }
    }
    public startTime(): void {
        setTimeout(() => { this.message = ""; }, 5000);
    }


}