import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(): Observable<any> {
    const payload = new FormData();
    payload.append('grant_type', 'client_credentials');
    return this.httpClient.post<any>(
      'https://login-sandbox.hdi.com.br/corporativo/autenticacao/oauth/token',
      payload,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic NGZmODVlYjMtMDcyZi00ZDA2LTg3NzItMTc0MjdiMzM3Y2ZmOmYzZjgwYTRhLTg5YzMtNDRmYi1iM2I1LTM0YmYyZjg2NWMzMQ==',
        },
      }
    );
  }
}
