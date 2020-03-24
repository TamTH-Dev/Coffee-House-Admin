import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {
  private _faFolderPlus = faFolderPlus;
  private _product: Product;
  private _categories: Category[] = [
    Category.MilkTea,
    Category.Coffee,
    Category.Pudding,
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  get categories(): Category[] {
    return this._categories;
  }

  get product(): Product {
    return this._product;
  }

  get faFolderPlus() {
    return this._faFolderPlus;
  }

  ngOnInit(): void {
    this.resetForm();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      this._product = { ...form.value, quantity: +form.value.quantity, price: +form.value.price, status: true };
      this.productService.createProduct(this.product)
        .subscribe({
          next: () => {
            this.onCreateSuccess();
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private onCreateSuccess(): void {
    setTimeout(() => this.toastr.success('Created Successfully!', 'Product Creating'), 1500);
    this.router.navigate(['/products'], {
      queryParamsHandling: "preserve"
    });
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
    this._product = {
      productID: null,
      productName: '',
      category: null,
      description: '',
      quantity: null,
      price: null
    }
  }

}
