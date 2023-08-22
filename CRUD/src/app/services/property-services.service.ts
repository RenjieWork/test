import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyServicesService {

  constructor(private _http: HttpClient) { }

  addProperty(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/propertyList',data);
  }
  getPropertyList(): Observable<any> {
    return this._http.get('http://localhost:3000/propertyList');
  }
  updateProperty(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/propertyList/${id}`, data);
  }
  deleteProperty(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/propertyList/${id}`);
  }
}
