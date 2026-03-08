import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  // Initialize as an empty array to prevent "Symbol.iterator" errors on load
  customers: any[] = [];
  isLoading: boolean = true;

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoading = true;
    this.customersService.getAllCustomerdetails().subscribe({
      next: (response: any) => {
        // FIX: Handle different API response structures
        if (Array.isArray(response)) {
          this.customers = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.customers = response.data;
        } else if (response && response.customers && Array.isArray(response.customers)) {
          this.customers = response.customers;
        } else {
          this.customers = [];
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Failed to load customers", err);
        this.customers = [];
        this.isLoading = false;
      }
    });
  }
}