import { Component, OnInit } from '@angular/core';
import { Product, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';

import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

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
  isValidData: { [key: string]: boolean } = {
    productName: true,
    category: true,
    description: true,
    quantity: true,
    price: true
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
    this.product = {
      productName: '',
      category: null,
      description: '',
      quantity: null,
      price: null
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.product = { ...form.value, status: true };
      this.productService.createProduct(this.product).subscribe(
        () => {
          this.resetForm(form);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
