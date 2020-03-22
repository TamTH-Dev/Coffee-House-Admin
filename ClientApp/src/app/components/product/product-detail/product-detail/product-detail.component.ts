import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  result: boolean;
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedProduct: Product = data['resolvedProduct'];
      this.onProductRetrieved(resolvedProduct);
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  onDelete(): void {
    const deletedProduct = { ...this.product, status: false };
    this.productService.updateProduct(deletedProduct)
      .subscribe({
        next: () => {
          this.onDeleteSuccess();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private onDeleteSuccess(): void {
    this.router.navigate(['/products']);
  }

  onRestore(): void {
    const restoredProduct = { ...this.product, status: true };
    this.productService.updateProduct(restoredProduct)
      .subscribe({
        next: () => {
          this.onRestoreSuccess();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private onRestoreSuccess(): void {
    this.router.navigate(['/products']);
  }

}
