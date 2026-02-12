import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private productService: ProductService) { }

  products: Product[] = []
  filteredProducts: Product[] = []
  selectedCategory: string = "All Collections"

  ngOnInit() {
    this.products = this.productService.getProducts()
    this.filteredProducts = [...this.products]
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category == "All Collections") {
      this.filteredProducts = [...this.products]
    }

    else {
      this.filteredProducts = this.products.filter(p => p.category == category)
    }
  }

  onSortChange(event: any) {
  const criteria = event.target.value

  switch (criteria) {
    case 'Price: Low to High':
      this.filteredProducts.sort((a, b) => 
        (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0)
      )
      break

    case 'Price: High to Low':
      this.filteredProducts.sort((a, b) => 
        (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0)
      )
      break

    case 'Top Rated':
      this.filteredProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      break

    case 'Newest First':
      this.filteredProducts.sort((a, b) => b.id - a.id)
      break
  }
}
}