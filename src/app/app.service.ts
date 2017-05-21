import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Cookie } from 'ng2-cookies';
@Injectable()
export class ClientService {
    public headers: Headers;
    public url = 'http://localhost:53256/api/Admin/';
    public urlUpload= 'http://localhost:53256/api/home/upload';
    public key = "token";
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
        if (Cookie.check(this.key)) {
            this.headers.append("Authorization", Cookie.get(this.key));
        }
    }
    public get(link: string, params?: string, value?: any, params2?: string, value2?: any): Observable<any> {
        if (params != "" && params != null) {
            link += "?" + params + '=' + value;
        }
        if (params != "" && (params2 != "" && params2 != null)) {
            link += "&&" + params2 + '=' + value2;
        }

        return this.http.get(this.url + link, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    public post = (link: string, item: Object, list?: Array<any>): Observable<any> => {
        return this.http.post(this.url + link, item, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    public remove = (link: string, id: number | string): Observable<any> => {
        return this.http.post(this.url + link, JSON.stringify(id), { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}