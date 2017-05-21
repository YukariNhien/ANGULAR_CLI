import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class LoginService {
    public headers: Headers;
    private url = 'http://localhost:53256/api/Autho/';
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }
    login(item) {
        return this.http.post(this.url + 'login', item, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    token(item) {
        return this.http.post(this.url + 'loginNext',JSON.stringify(item), { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    register(item) {
        return this.http.post(this.url + 'register', item, { headers: this.headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().msg || 'Server error');
    }
}