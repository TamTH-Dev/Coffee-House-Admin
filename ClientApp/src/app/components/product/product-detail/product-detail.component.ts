import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private _faInfoCircle = faInfoCircle;
  private _isSuccess: boolean;
  private _product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get product(): Product {
    return this._product;
  }

  get faInfoCircle() {
    return this._faInfoCircle;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedProduct: Product = data['resolvedProduct'];
      this.onProductRetrieved(resolvedProduct);
    });
  }

  private onProductRetrieved(product: Product): void {
    this._product = product;

    if (!this.product) {
      this._isSuccess = false;
    } else {
      this._isSuccess = true;
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
