import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isAndroid } from '@nativescript/core';
import { isIOS } from '@nativescript/core';
import { Base64 } from '../../utils/base64';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  oauth(): Observable<any> {
    const payload = new FormData();
    payload.append('grant_type', 'client_credentials');
    payload.append('client_id', '7f4e667e-019b-4dcc-8c20-bb0f3e9ecbe0');
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

  login(tokenOauth: string): Observable<any> {
    return this.httpClient.post<any>(
      `https://api-sandbox.hdi.com.br/rest/WebAppExecutivo/hdi/v1/login?access_token=${tokenOauth}`,
      {
        usuario: 'marcioa',
        senha: Base64.encode('Berna2121!'),
      },
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenOauth}`,
        },
      }
    );
  }

  powerbi(token: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://api-sandbox.hdi.com.br/rest/WebAppExecutivo/hdi/v1/getAccessToken?access_token=${token}`
    );
  }
}
