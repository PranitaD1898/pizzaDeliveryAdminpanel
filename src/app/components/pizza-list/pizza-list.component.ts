import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaDetailsService } from '../../services/pizza-details.service';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.scss'
})
export class PizzaListComponent {
  pizzas: any[] = []; // This will hold data from your Node.js API
  isModalOpen = false;
  editMode = false;
  isLoading: boolean = false;
  
  currentPizza: any = {
    pizzaName: '',
    pizzaPrice: 0,
    size: 'Medium',
    imageUrl: '',
    mealType: 'veg'

  };
  constructor(public pizzaService : PizzaDetailsService){
    
  }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.isLoading = true;
    
    this.pizzaService.getAllPizzas().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.pizzas = response.data;
        } else {
          this.pizzas = response;
        }
        this.isLoading = false;
        console.log("Pizzas loaded successfully:", this.pizzas);
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Failed to load pizzas:", err);
        alert("Could not connect to the server. Check if backend is running.");
      }
    });
  }

  openModal(pizza?: any) {
    if (pizza) {
      this.editMode = true;
      this.currentPizza = { ...pizza }; // Clone to avoid direct binding
    } else {
      this.editMode = false;
      this.currentPizza = { pizzaName: '', pizzaPrice: 0, size: 'Medium', imageUrl: '', mealType: 'veg' };
    }
    this.isModalOpen = true;
  }

  closeModal() { this.isModalOpen = false; }

  savePizza() {
    if (this.editMode) {
      // This calls your /updatePizzadetails route
      this.pizzaService.updatePizza(this.currentPizza).subscribe({
        next: (res) => {
          this.loadPizzas();
          this.closeModal();
        }
      });
    } else {
      // This calls your /savePizzadetails route
      this.pizzaService.addPizza(this.currentPizza).subscribe({
        next: (res) => {
          this.loadPizzas();
          this.closeModal();
        }
      });
    }
  }

  deletePizza(id: string): void {
    // 1. Ask for confirmation so users don't delete by accident
    if (confirm('Are you sure you want to remove this pizza from the menu?')) {
      
      // 2. Call the service
      this.pizzaService.deletePizza(id).subscribe({
        next: (response: any) => {
          if (response.success) {
            alert('Pizza deleted successfully!');
            // 3. Refresh the list to show updated data
            this.loadPizzas(); 
          }
        },
        error: (err) => {
          console.error("Delete failed:", err);
          alert("Could not delete pizza. Please try again.");
        }
      });
    }
  }
}