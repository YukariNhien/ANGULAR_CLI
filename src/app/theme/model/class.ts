import { Component } from '@angular/core';
export class Response {
    result: boolean;
    msg: string;
    Token?: string;
    User?: any;
    UserInfo?: any;
    constructor() {
        this.result = false;
        this.msg = '';
    }
};
export class Dangky {
    UserName: string;
    Password: string;
    ConfirmPassword: string;
    Phone: string;
    Email: string;
    Captcha: string;
    constructor() {
        this.UserName = "";
        this.Password = "";
        this.ConfirmPassword = "";
        this.Email = "";
        this.Phone = "";
        this.Captcha = "";
    }
};
export class Category {
    CategoryId: number;
    Name: string;
    constructor() {
        this.CategoryId = 0;
        this.Name = "";
    }
}
export class City {
    CityId: number;
    CityName: string;
    constructor() {
        this.CityId = 0;
        this.CityName = "";
    }
}
export class State {
    StateId: number;
    StateName: string;
    City?: City
    CityId: number;
    Posts?: Post;
    constructor() {
        this.StateId = 0;
        this.StateName = "";
        this.CityId = 0;
    }
}
export class Post {
    PostId: number;
    Name: string;
    Description: string;
    Link: string;
    TotalView: number;
    Infomation: string;
    Date: Date;
    UserId: string;
    CategoryId: number;
    StateId: number
    Category?: Category;
    State?: State;
    constructor() {
        this.PostId = 0;
        this.Name = "";
        this.Description = "";
        this.Infomation = "";
        this.Link = "";
        this.Date = new Date();
        this.UserId = "";
        this.StateId = 0;
        this.CategoryId = 0;
    }

}
export class Skill {
    SkillId: number;
    Name: string;
    Value: number;
    MemberId: number;
    constructor() {
        this.SkillId = 0;
        this.Name = "";
        this.Value = 0;
        this.MemberId = 0;
    }
}
export class Member {
    MemberId: number;
    Name: string;
    Image: string;
    Description: string;
    Information: string;
    Email: string;
    Phone: string;
    Address: string;
    Skills: Array<Skill>;
    constructor(){
        this.MemberId=0;
        this.Name="";
        this.Image="";
        this.Information="";
        this.Description="";
        this.Email="";
        this.Phone="";
        this.Address="";
        this.Skills = new Array<Skill>();
    }
}