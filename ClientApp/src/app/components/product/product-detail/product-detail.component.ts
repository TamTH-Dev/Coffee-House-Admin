import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  product: Product;
  isCategoryActive: boolean;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
    this.categoryService.getCategory(product.categoryID)
      .subscribe({
        next: c => {
          this.isCategoryActive = c.status
        },
        error: err => {
          console.log(err);
        }
      })
  }

  onDelete(): void {
    const doesDelete = confirm('Are you sure you want to delete this product?');
    if (doesDelete) {
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
  }

  private onDeleteSuccess(): void {
    setTimeout(() => this.toastr.success('Deleted Successfully!', 'Product Deleting'), 1000);
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
  }

  onRestore(): void {
    const doesRestore = confirm('Are you sure you want to restore this product?');
    if (doesRestore) {
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
  }

  private onRestoreSuccess(): void {
    setTimeout(() => this.toastr.success('Restored Successfully!', 'Product Restoring'), 1000);
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
  }

}
