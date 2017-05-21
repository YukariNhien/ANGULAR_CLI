import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { ClientService } from '../app.service';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Response, Member, Skill } from '../theme/model/class';
@Component({
    selector: 'team-member',
    templateUrl: './member.component.html',

})

export class Members implements AfterViewInit {
    public submited: boolean = false;
    public message: string = "";
    private form: FormGroup;
    private member: Member = new Member();
    private skill: Skill = new Skill();
    private listSkill: Array<Skill> = new Array<Skill>();
    private list: Array<Member> = new Array<Member>();
    private listSearch: Array<Member> = new Array<Member>();
    private urlUpload: string = '';
    private create: boolean = false;
    constructor(
        private fb: FormBuilder, private router: Router,
        private server: ClientService
    ) {
        this.urlUpload = this.server.urlUpload;
        this.initForm(this.member)
    }

    private get() {
        this.server.get('Member/get').subscribe(data => {
            this.list = this.listSearch = data;
        }, err => { this.list = new Array<any>(); })
    }
    // khởi tạo form
    initForm(item: Member) {
        this.form = this.fb.group({
            MemberId: [item.MemberId],
            Name: [item.Name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
            Phone: [item.Phone, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            Email: [item.Email],
            Address: [item.Address],
            Description: [item.Description],
            Image: item.Image,
            Information: [item.Information],
            Skills: this.fb.array([
                this.initSkill(this.skill)
            ])
        });
    }
    initSkill(item: Skill) {
        return this.fb.group({
            MemberId: this.member.MemberId,
            Name: [item.Name, Validators.compose([Validators.required, Validators.minLength(1)])],
            Value: [item.Value, Validators.compose([Validators.required, Validators.minLength(1)])],
            SkillId: item.SkillId,
        });
    }
    addSkill(skill: Skill) {
        const control = <FormArray>this.form.controls['Skills'];
        control.push(this.initSkill(skill));

    }
    removeSkill(i: number) {
        const control = <FormArray>this.form.controls['Skills'];
        control.removeAt(i);
    }
    public imageUploaded(event: any) {
        this.form.controls['Image'].setValue(event.file.name);
    }
    public imageRemoved(event: any) {
        this.form.controls['Image'].setValue('');
    }
    //kết thúc xử lý form
    private Save(values: Member) {
        console.log(values);
        if (values.Name == null || values.Name.trim() == "") {
            this.message = "Nhập tên loại";
            this.startTime();
            return;
        }
        if (this.form.valid) {
            if (!this.submited) {
                this.submited = true;
                this.server.post('Member/save', values)
                    .subscribe((data: Response) => {
                        this.message = data.msg;
                        this.submited = false;
                        this.startTime();
                        if (data.result) {
                            this.cancel();
                            this.get();
                        }
                        this.imageRemoved(1);
                    },
                    err => {
                        this.message = "Không thể chỉnh sửa lúc này, quay lại sau.";
                        this.submited = false;
                        this.startTime();
                    })
            }
        }
    }
    private Edit(item: Member) {
        this.form = this.fb.group({
            MemberId: [item.MemberId],
            Name: [item.Name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
            Phone: [item.Phone, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            Email: [item.Email],
            Address: [item.Address],
            Description: [item.Description],
            Image: item.Image,
            Information: [item.Information],
            Skills: this.fb.array([
            ])
        });
        for (let s of item.Skills) {
            this.addSkill(s);
        }
        this.create = true;
    }
    private Remove(item: Member) {
        if (this.form.get('Name').value != "" || this.form.get('Name').value != null) {
            this.cancel();
        }
        if (!this.submited) {
            if (window.confirm("Bạn có muốn xóa??")) {
                this.submited = true;
                this.server.remove('Member/delete', item.MemberId).subscribe((data: Response) => {
                    this.message = data.msg;
                    this.submited = false;
                    this.startTime();
                    if (data.result) {
                        this.get();
                        this.create = false;
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
    search(timkiem: string) {
        this.list = this.listSearch.filter(s => s.Name.toLowerCase().search(timkiem.toLowerCase()) > -1 || s.Phone.search(timkiem) > -1 || s.Email.search(timkiem) > -1);
    }
    showKill(item: Member) {
        this.listSkill = item.Skills;
    }
    public cancel() {
        this.member = new Member();
        this.initForm(this.member);
        this.create = false;
    }
    public startTime(): void {
        setTimeout(() => { this.message = ""; }, 5000);
    }
    ngAfterViewInit() {
        this.get();
    }

}