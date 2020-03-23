import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';
import { Product, Category } from 'src/app/models/product.model';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  faEdit = faEdit;
  result: boolean;
  product: Product;
  categories: Category[] = [
    Category.MilkTea,
    Category.Coffee,
    Category.Pudding,
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
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

  onSave(form: NgForm): void {
    if (form.valid) {
      this.product = { ...form.value, quantity: +form.value.quantity, price: +form.value.price, productID: this.product.productID, status: true };
      this.productService.updateProduct(this.product)
        .subscribe({
          next: () => {
            this.onSaveSuccess(form);
          },
          error: err => {
            console.log(err);
          }
        });
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

  private onSaveSuccess(form: NgForm): void {
    this.resetForm(form);
    this.router.navigate(['/products']);
  }

  private resetForm(form: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
  }

  private onDeleteSuccess(): void {
    this.router.navigate(['/products']);
  }

}
