import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { Product, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  product: Product;
  categories: Category[] = [
    Category.MilkTea,
    Category.Coffee,
    Category.Pudding,
  ];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      this.product = { ...form.value, quantity: +form.value.quantity, price: +form.value.price, status: true };
      console.log(this.product);
      this.productService.createProduct(this.product)
        .subscribe({
          next: () => {
            this.onCreateSuccess(form);
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  private onCreateSuccess(form: NgForm): void {
    this.resetForm(form);
    this.router.navigate(['/product']);
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
    this.product = {
      productID: null,
      productName: '',
      category: null,
      description: '',
      quantity: null,
      price: null
    }
  }

}
