import { Component } from '@angular/core';
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

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.productId = params['id']
    })
  }

  productId: number = 0
  product?: Product

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.product = this.productService.getProductsById(this.productId)
    console.log(this.product)
  }

  scrollTo(sectionId: string) {
  if (this.router.url === '/home' || this.router.url === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    this.router.navigate(['/home'], { fragment: sectionId });
  }
}
}
