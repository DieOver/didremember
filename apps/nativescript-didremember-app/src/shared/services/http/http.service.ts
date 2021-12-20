import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpServiceContract } from "./http.service.contract";

@Injectable({ providedIn: "root" })
export class HttpService implements HttpServiceContract {

    constructor(
        private httpClient: HttpClient
    ) {}

    get<R>(url: string): Observable<R> {
        return this.httpClient.get<R>(url);
    }

    post<R, B>(url: string, body: B): Observable<R> {
        return this.httpClient.post<R>(url, body);
    }

}

