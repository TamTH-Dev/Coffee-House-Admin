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
  faFolderPlus = faFolderPlus;
  product: Product;
  isDirty: boolean = false;
  categories: Category[] = [
    Category.MilkTea,
    Category.Coffee,
    Category.Pudding,
  ];

  // uploadImg = null;
  // imgUrl: string = null;
  // onFileSelected(event) {
  //   this.uploadImg = event.target.files.item(0);
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imgUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.uploadImg);
  // }

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      this.product = { ...form.value, quantity: +form.value.quantity, price: +form.value.price, status: true };
      this.productService.createProduct(this.product)
        .subscribe({
          next: () => {
            this.onCreateSuccess();
            this.isDirty = false;
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
    this.product = {
      productID: null,
      productName: null,
      imgPath: null,
      category: null,
      description: null,
      quantity: null,
      price: null
    }
  }

}
