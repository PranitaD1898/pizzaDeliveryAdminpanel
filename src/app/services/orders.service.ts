import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/orderDetails'; // Adjust to your order routes path

  constructor(private http: HttpClient) {}

  // Add these to your existing OrderService
getAllOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getallorder`);
}

updateStatus(orderId: string, status: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/updateorderstatus`, { orderId, status });
}
}