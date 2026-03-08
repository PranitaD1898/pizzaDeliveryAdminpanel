import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        loadComponent: () => import('./components/home/home.component')
            .then(m => m.HomeComponent)
    },
    { 
        path: 'pizzas', 
        loadComponent: () => import('./components/pizza-list/pizza-list.component').then(m => m.PizzaListComponent) 
    },
    { 
        path: 'customers', 
        loadComponent: () => import('./components/customers/customers.component').then(m => m.CustomersComponent) 
    },
    { 
        path: 'orders', 
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) 
    }
];
