import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'APEX COMMUTER', image: '/images/APEX_Commuter.png', price: 90, salePrice: 65, rating: 4.5, category: 'Backpacks' },
    { id: 2, name: 'APEX HERITAGE', image: '/images/APEX_Heritage.png', price: 75, rating: 4.1, category: 'Backpacks', isNew: true },
    { id: 3, name: 'APEX PULSE', image: '/images/APEX_Pulse.png', price: 80, rating: 4.8, category: 'Backpacks', isNew: true },
    { id: 4, name: 'APEX STEALTH', image: '/images/APEX_Stealth.png', price: 110, salePrice: 95, rating: 4.2, category: 'Backpacks' },
    { id: 5, name: 'APEX SKYLINE', image: '/images/APEX_Skyline.png', price: 95, rating: 4.8, category: 'Backpacks' },
    { id: 6, name: 'APEX GLOBAL', image: '/images/APEX_Global.png', price: 120, salePrice: 85, rating: 4.5, category: 'Backpacks' },

    { id: 7, name: 'APEX CROSSOVER', image: '/images/APEX_Crossover.png', price: 95, rating: 4.0, category: 'Duffel Bags' },
    { id: 8, name: 'APEX EXECUTIVE', image: '/images/APEX_Executive.png', price: 150, salePrice: 115, rating: 4.9, category: 'Duffel Bags' },
    { id: 9, name: 'APEX IGNITE', image: '/images/APEX_Ignite.png', price: 85, rating: 4.8, category: 'Duffel Bags', isNew: true },
    { id: 10, name: 'APEX TRANSFORMER', image: '/images/APEX_Transformer.png', price: 110, salePrice: 89, rating: 4.7, category: 'Duffel Bags' },
    { id: 11, name: 'APEX LEGACY', image: '/images/APEX_Legacy.png', price: 85, rating: 3.9, category: 'Duffel Bags' },

    { id: 12, name: 'APEX ODYSSEY', image: '/images/APEX_Odyssey.png', price: 160, salePrice: 130, rating: 5.0, category: 'Travel Packs' },
    { id: 13, name: 'APEX VOYAGER', image: '/images/APEX_Voyager.png', price: 145, rating: 5.0, category: 'Travel Packs', isNew: true },
    { id: 14, name: 'APEX SUMMIT', image: '/images/APEX_Summit.png', price: 130, rating: 4.7, category: 'Travel Packs' },
    { id: 15, name: 'APEX CYBER', image: '/images/APEX_Cyber.png', price: 180, salePrice: 149, rating: 4.6, category: 'Travel Packs' }
  ]

  getProducts() {
    return this.products
  }

  getProductsById(id: number){
    return this.products.find(p => p.id == id)
  }

  getSaleProducts() {
    return this.products.filter(p => p.salePrice !== undefined)
  }
}
