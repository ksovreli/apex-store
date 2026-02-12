import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  constructor(private productService: ProductService, private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      this.productId = params['id']
    })
  }

  productId: number = 0
  product?: Product

  ngOnInit(){
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.product = this.productService.getProductsById(this.productId)
    console.log(this.product)
  }

}
