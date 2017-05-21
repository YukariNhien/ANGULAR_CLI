import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { ClientService } from '../app.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Response, City, State } from '../theme/model/class';
import { PagerService } from "../service-pagination/page.service";
@Component({
    selector: 'countrys',
    templateUrl: './country.component.html',

})

export class Countrys implements AfterViewInit {
    public submited: boolean = false;
    public message: string = "";
    public message1: string = "";
    private form: FormGroup;
    private formState: FormGroup;
    private city: City = new City();
    private state: State = new State();
    private Id: number = 0;
    private list: Array<City> = new Array<City>();
    private listCity: Array<City> = new Array<City>();
    private listState: Array<State> = new Array<State>();
    private lists: Array<State> = new Array<State>();
    // phân trang
    public pager: any = {};
    public currPage: number = 1;
    public pager2: any = {};
    public currPage2: number = 1;
    constructor(
        private fb: FormBuilder, private router: Router,
        private server: ClientService,
        private _pager: PagerService
    ) {
        this.initForm(this.city);
        this.initFormState(this.state);
    }
    public SetPage(page) {
        this.currPage = page < 1 ? 1 : page;
        this.pager = this._pager.getPage(this.listCity.length, this.currPage, 10);
        this.list = this.listCity.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    public SetPageState(page) {
        this.currPage2 = page < 1 ? 1 : page;
        this.pager2 = this._pager.getPage(this.lists.length, this.currPage2, 10);
        this.listState = this.lists.slice(this.pager2.startIndex, this.pager2.endIndex + 1);
    }
    initForm(item: City) {
        this.form = this.fb.group({
            CityId: [item.CityId],
            CityName: [item.CityName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])]
        });
    }
    initFormState(item: State) {
        this.formState = this.fb.group({
            StateId: [item.StateId],
            StateName: [item.StateName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])],
            CityId: [item.CityId]
        });
    }
    private get() {
        if (!this.submited) {
            this.submited = true;
            this.server.get('ManagerCity/GetCity').subscribe(data => {
                this.listCity = data;
                this.submited = false;
                if (this.listCity.length > 0) {
                    this.state.CityId = this.listCity[0].CityId;
                    this.SetPage(this.currPage);
                    this.getState(this.listCity[0].CityId);
                }
            }, err => { this.listCity = new Array<any>(); this.submited = false; })
        }

    }
    private getState(Id: number) {
        this.state.CityId = Id;
        this.Id = Id;
        this.initFormState(this.state);
        if (!this.submited) {
            this.submited = true;
            this.server.get('ManagerCity/GetState', 'CityId', Id).subscribe(data => {
              this.listState= this.lists = data; this.submited = false;
                if(this.lists.length>0){
                    this.SetPageState(this.currPage2);
                }
            }, err => { this.list = new Array<any>(); this.submited = false; })
        }

    }
    private Save(values: City) {
        console.log(values);
        if (values.CityName == null || values.CityName.trim() == "") {
            this.message = "Nhập tên tỉnh/thành phố.";
            this.startTime();
            return;
        }
        if (this.form.valid) {
            if (!this.submited) {
                this.submited = true;
                this.server.post('ManagerCity/SaveCity', values)
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
    private Edit(item: City) {
        this.initForm(item);
    }
    private Remove(item: City) {
        if (!this.submited) {
            if (window.confirm("Bạn có muốn xóa??")) {
                this.submited = true;
                this.server.remove('ManagerCity/DeleteCity', item.CityId).subscribe((data: Response) => {
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
        this.city = new City();
        this.initForm(this.city);
    }

    // code xử lý state
    private SaveState(values: State) {
        if (values.StateName == null || values.StateName.trim() == "") {
            this.message = "Nhập tên Quận/Huyện/Thị xã.";
            this.startTime();
            return;
        }
        if (this.formState.valid) {
            if (!this.submited) {
                this.submited = true;
                this.server.post('ManagerCity/SaveState', values)
                    .subscribe((data: Response) => {
                        this.message1 = data.msg;
                        this.submited = false;
                        this.startTime();
                        if (data.result) {
                            this.getState(this.state.CityId);
                            this.cancelState();
                        }
                    },
                    err => {
                        this.message1 = "Không thể chỉnh sửa lúc này, quay lại sau.";
                        this.submited = false;
                        this.startTime();
                    })
            }
        }
    }
    private EditState(item: State) {
        this.initFormState(item);
    }
    private RemoveState(item: State) {
        if (!this.submited) {
            if (window.confirm("Bạn có muốn xóa??")) {
                this.submited = true;
                this.server.remove('ManagerCity/DeleteState', item.StateId).subscribe((data: Response) => {
                    this.message1 = data.msg;
                    this.submited = false;
                    this.startTime();
                    if (data.result) {
                        this.getState(this.state.CityId);
                    }
                },
                    err => {
                        this.message1 = "Không thể xóa lúc này, quay lại sau.";
                        this.submited = false;
                        this.startTime();
                    })
            }
        }
    }
    public cancelState() {
        this.state = new State();
        this.state.CityId = this.Id;
        this.initFormState(this.state);
        console.log(this.city);
    }
    // end code xử lý
    public startTime(): void {
        setTimeout(() => { this.message = this.message1 = ""; }, 5000);
    }
    ngAfterViewInit() {
        this.get();
    }
}