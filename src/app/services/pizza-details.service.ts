import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PizzaDetailsService {
  private baseUrl = `${environment.apiUrl}/api/pizzaDetails`;

  constructor(private http: HttpClient) { }

  // 1. Get all pizzas
  getAllPizzas(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(`${this.baseUrl}/getAllPizzadetails`);
  }

  // 2. Add a new pizza
  addPizza(pizzaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/savePizzadetails`, pizzaData);
  }

  // 3. Update an existing pizza
  // Note: Since your backend uses .post for updates, we use .post here
  updatePizza(pizzaData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updatePizzadetails`, pizzaData);
  }

  // 4. Delete a pizza
  // Note: Since your backend uses .post for delete, we pass the id in the body
  deletePizza(id: string): Observable<any> {
    // Sending the ID in the body as your backend expects a POST request
    return this.http.post(`${this.baseUrl}/deletePizzadetails`, { _id: id });
  }

  // 5. Get single pizza by ID
  getPizzaById(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getPizzadetailsbyId`, { id: id });
  }
}