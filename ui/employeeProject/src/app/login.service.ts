import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of  } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  errorMsg!: string;
  readonly APIUrl = "http://localhost:5000/api";
  readonly photoUrl = "http://localhost:5000/Photos/";

  isLogin!: boolean;
  constructor(private http: HttpClient, private spinner: SpinnerService) { }

  authUser(user: any):Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/Employee/login', user);
  }

  verifyToken(user: any):Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/Employee/verify-token', user);
  }
  
  registerUser(user: any):Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/Employee/verify-token', user);
  }

  


}
