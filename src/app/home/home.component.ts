import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private productService = inject(ProductService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  productId: number = 0
  product?: Product
  saleProducts: Product[] = []

  ngOnInit() {
    this.saleProducts = this.productService.getSaleProducts().slice(0, 3)
    this.route.params.subscribe(params => {
      this.productId = params['id']
      this.product = this.productService.getProductsById(this.productId)
    })
  }

  scrollTo(sectionId: string) {
  let element = document.getElementById(sectionId)
  
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  } 
  
  else {
    this.router.navigate(['/home'], { fragment: sectionId })
  }
}
}
