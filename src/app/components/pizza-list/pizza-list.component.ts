import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaDetailsService } from '../../services/pizza-details.service';
import { SupabaseService } from '../../services/supabase.service';
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File | null = null;
  existingImageUrl: string = '';
  previewUrl: string = '';
  isUploading: boolean = false;
  itemName: string = '';
  constructor(public pizzaService : PizzaDetailsService,
    private supabaseService: SupabaseService,
    private http: HttpClient
  ){
    
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Show preview
    const reader = new FileReader();
    reader.onload = (e: any) => this.previewUrl = e.target.result;
    reader.readAsDataURL(this.selectedFile!);
  }

  async savePizza() {
    if (this.editMode) {
      let imageUrl = this.existingImageUrl; // default to existing

      // Only upload if new image was selected
      if (this.selectedFile) {
        imageUrl = await this.supabaseService.uploadImage(this.selectedFile);
      }
      // this.isUploading = true;
      // This calls your /updatePizzadetails route
      this.currentPizza.imageUrl = imageUrl;
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