import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

   private baseUrl = `${environment.apiUrl}/api/customerDetails`;
 
   constructor(private http: HttpClient) {}
 
   // Add these to your existing OrderService
   getAllCustomerdetails(): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}/getAllCustomerdetails`);
 }
}
