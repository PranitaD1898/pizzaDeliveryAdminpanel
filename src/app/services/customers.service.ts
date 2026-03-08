import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

   private baseUrl = 'http://localhost:5000/api/customerDetails'; 
 
   constructor(private http: HttpClient) {}
 
   // Add these to your existing OrderService
   getAllCustomerdetails(): Observable<any[]> {
   return this.http.get<any[]>(`${this.baseUrl}/getAllCustomerdetails`);
 }
}
