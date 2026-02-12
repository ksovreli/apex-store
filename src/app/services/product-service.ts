import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'CANVAS BACKPACK', image: 'images/canvas-backpack.png', price: 75, salePrice: 67.5, rating: 4.5, category: 'Backpacks' },
    { id: 2, name: 'TECHNICAL BACKPACK', image: 'images/technical-backpack.png', price: 75, rating: 4.1, category: 'Backpacks', isNew: true },
    { id: 3, name: 'LEATHER BACKPACK', image: 'images/leather-backpack.png', price: 75, rating: 4.8, category: 'Backpacks', isNew: true },
    { id: 4, name: 'FOREST BACKPACK', image: 'images/forest-backpack.png', price: 95, rating: 4.2, category: 'Backpacks' },
    { id: 5, name: 'WORK BACKPACK', image: 'images/work-backpack.png', price: 95, rating: 4.8, category: 'Backpacks' },
    { id: 6, name: 'CAMO BACKPACK', image: 'images/camo-backpack.png', price: 95, salePrice: 76, rating: 4.5, category: 'Backpacks' },

    { id: 7, name: 'SPORTS DUFFEL (B)', image: 'images/duffel-bag-(b).png', price: 95, rating: 4.0, category: 'Duffel Bags' },
    { id: 8, name: 'SPORTS DUFFEL (Y)', image: 'images/duffel-bag-(y).png', price: 85, rating: 4.9, category: 'Duffel Bags' },
    { id: 9, name: 'SPORTS DUFFEL (R)', image: 'images/duffel-bag-(r).png', price: 85, rating: 4.8, category: 'Duffel Bags' },
    { id: 10, name: 'SPORTS DUFFEL (G)', image: 'images/duffel-bag-(g).png', price: 85, rating: 4.7, category: 'Duffel Bags' },
    { id: 11, name: 'SPORTS DUFFEL (P)', image: 'images/duffel-bag-(p).png', price: 85, rating: 3.9, category: 'Duffel Bags' },

    { id: 12, name: 'TRAVEL PACK (G)', image: 'images/travel-pack-(g).png', price: 130, rating: 5.0, category: 'Travel Packs' },
    { id: 13, name: 'TRAVEL PACK (W)', image: 'images/travel-pack-(w).png', price: 130, rating: 5.0, category: 'Travel Packs' },
    { id: 14, name: 'TRAVEL PACK (GY)', image: 'images/travel-pack-(gy).png', price: 130, rating: 4.7, category: 'Travel Packs' },
    { id: 15, name: 'TRAVEL PACK (P)', image: 'images/travel-pack-(p).png', price: 130, rating: 4.6, category: 'Travel Packs' }
  ]

  getProducts() {
    return this.products
  }

  getProductsById(id: number){
    return this.products.find(p => p.id == id)
  }
}
