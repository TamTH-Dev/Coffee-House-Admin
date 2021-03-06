import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  faEdit = faEdit;
  isDirty: boolean = false;
  product: Product;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['resolvedCategories'];
    this.route.data.subscribe(data => {
      const resolvedProduct: Product = data['resolvedProduct'];
      if (resolvedProduct) {
        this.onProductRetrieved(resolvedProduct);
      }
    });
  }

  private onProductRetrieved(product: Product): void {
    this.product = product;
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      this.product = { ...form.value, quantity: +form.value.quantity, price: +form.value.price, productID: this.product.productID, status: true };
      this.productService.updateProduct(this.product)
        .subscribe({
          next: () => {
            this.onSaveSuccess();
            this.isDirty = false;
          },
          error: err => {
            if (err.status == 400) {
              this.toastr.error('This product\'s name existed', 'Update Product Failed');
              form.controls['productName'].reset();
            } else {
              console.log(err);
            }
          }
        });
    }
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

  private onSaveSuccess(): void {
    this.toastr.success('Updated Successfully!', 'Product Updating');
    this.router.navigate(['/products'], {
      queryParamsHandling: "preserve"
    });
  }

  private onDeleteSuccess(): void {
    this.toastr.success('Deleted Successfully!', 'Product Deleting');
    this.router.navigate(['/products'], {
      queryParamsHandling: "preserve"
    });
  }

}
