import { Observable } from "rxjs";

export abstract class HttpServiceContract {
    abstract get<R>(url: string): Observable<R>;
    abstract post<R, B>(url: string, body: B): Observable<R>;
}

