import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/orders.service'

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  allOrders: any[] = [];
  statusOptions = ['placed', 'preparing', 'ready_for_delivery', 'rider_allocated', 'on_the_way', 'delivered', 'cancelled'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data: any[]) => {
        // Show newest orders at the top
        this.allOrders = data.reverse();
      },
      error: (err: any) => console.error("Error loading orders", err)
    });
  }

  changeStatus(orderId: string, newStatus: string) {
    this.orderService.updateStatus(orderId, newStatus).subscribe({
      next: () => {
        alert('Status updated successfully!');
        this.loadOrders();
      },
      error: (err: any) => alert('Failed to update status')
    });
  }

  getActiveCount(): number {
    return this.allOrders.filter(o => 
      o.orderStatus === 'preparing' || o.orderStatus === 'ready_for_delivery'
    ).length;
  }
}