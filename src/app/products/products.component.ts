import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product-service';

import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  products: Product[] = []
  filteredProducts: Product[] = []
  selectedCategory: string = "All Collections"

  ngOnInit() {
    this.products = this.productService.getProducts()
    this.route.queryParams.subscribe(params => {
      let categoryFromUrl = params['category']

      if (categoryFromUrl) {
        this.filterByCategory(categoryFromUrl)
      }
      
      else {
        this.filterByCategory("All Collections")
      }
    })
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
    }
  }
}