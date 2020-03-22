import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => console.log(err)
    });
  }

  onDelete(productID: number): void {
    const deletedProduct = { ...this.getProduct(productID), status: false };
    this.productService.updateProduct(deletedProduct)
      .subscribe({
        next: () => {
          this.deleteProduct(productID);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getProduct(productID: number): Product {
    return this.products.filter(product => product.productID === productID)[0];
  }

  deleteProduct(productID: number): void {
    this.products.map(product => {
      if (product.productID === productID) product.status = false
    });
  }

}
