import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of  } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  errorMsg!: string;
  readonly APIUrl = "http://localhost:5000/api";
  readonly photoUrl = "http://localhost:5000/Photos/";

  isLogin!: boolean;

  constructor(private http: HttpClient, private spinner: SpinnerService) { }
  

  getDepList():Observable<any[]> {
      //this.spinner.requestEnded(); 
      return this.http.get<any>(this.APIUrl + '/department');
  }

  addDepartment(val: any) {
    
      return this.http.post(this.APIUrl + '/Department', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/Department', val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(this.APIUrl + '/Department/' + val);
  }

  getEmpList():Observable<any[]> {
    //this.spinner.requestEnded(); 
    return this.http.get<any>(this.APIUrl + '/employee');
  }

  addEmployee(val: any) {
      return this.http.post(this.APIUrl + '/Employee', val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + '/Employee', val);
  }

  deleteEmployee(val: any) {
    return this.http.delete(this.APIUrl + '/Employee/' + val);
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/Employee/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>  {
    return this.http.get<any>(this.APIUrl + '/Employee/GetAllDepartmentNames');
  }

  getEmployeePrintDetails(val: any):Observable<any[]>  {
    return this.http.get<any>(this.APIUrl + '/print/' + val);
  }

  getAllEmployeeTypes():Observable<any[]>  {
    return this.http.get<any>(this.APIUrl + '/Employee/GetAllEmployeeTypes');
  }

  addEmployeePrintDetails(val: any):Observable<any[]>  {
    return this.http.post<any>(this.APIUrl + '/print', val);
  }

  updateEmployeePrintDetails(val: any):Observable<any[]>  {
    return this.http.put<any>(this.APIUrl + '/print', val);
  }


  getAllCountries(): Observable<any[]> {
    return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/iso');
  }

  getAllStates(val: any):Observable<any[]>  {
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/states',val);
  }

  getAllCities(val: any):Observable<any[]>  {
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/state/cities',val);
  }

  getAllDeletedEmployees(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Employee/GetDeletedEmployees');
  }

  restoreEmployee(val: any): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Employee/'+ val);
  }

}
