import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _updateState = new Subject<number>();
  updateState$ = this._updateState.asObservable();

  constructor(private http: HttpClient) {
  }

  updateState(value: any) {
    this._updateState.next(value);
  }

  getUsers(_params: any): Observable<any> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');

    let params = new HttpParams();
    for (const key in _params) {
      params = params.set(key, _params[key]);
    }
    return this.http.get(
      `${environment.apiUrl}/users`, {params}
    );
  }

  getUserDetail(_params: any): Observable<any> {
    const {user_id} = _params;
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    const params = new HttpParams()
      .set('user_id', user_id)
    return this.http.get(
      `${environment.apiUrl}/user`, {params}
    );
  }

  updateUser(input: any): Observable<any> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    return this.http.patch(
      `${environment.apiUrl}/user`, {...input}
    );
  }

  createUser(input: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    // };
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    return this.http.post(
      `${environment.apiUrl}/user`, {...input}
    );
  }

  deleteUser(input: any): Observable<any> {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    return this.http.delete(
      `${environment.apiUrl}/user`, {...input}
    );
  }
}
