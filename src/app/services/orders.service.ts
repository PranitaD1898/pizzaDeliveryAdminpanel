import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/api/orderDetails`;

  constructor(private http: HttpClient) {}

  // Add these to your existing OrderService
getAllOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getallorder`);
}

updateStatus(orderId: string, status: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/updateorderstatus`, { orderId, status });
}
}