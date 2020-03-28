import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  isSuccess: boolean;
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedProduct: Product = data['resolvedProduct'];
      this.onProductRetrieved(resolvedProduct);
    });
  }

  private onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.isSuccess = false;
    } else {
      this.isSuccess = true;
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
    setTimeout(() => this.toastr.success('Deleted Successfully!', 'Product Deleting'), 1500);
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
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
    setTimeout(() => this.toastr.success('Restored Successfully!', 'Product Restoring'), 1500);
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
  }

}
