import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  product: Product;
  isDirty: boolean = false;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
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
            if (err.status == 400) {
              this.toastr.error('This product\'s name existed', 'Create Product Failed');
              form.controls['productName'].reset();
            } else {
              console.log(err);
            }
          }
        });
    }
  }

  private onCreateSuccess(): void {
    this.toastr.success('Created Successfully!', 'Product Creating');
    this.router.navigate(['/products'], {
      queryParamsHandling: "preserve"
    });
  }

  private resetForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }
    this.categories = this.route.snapshot.data['resolvedCategories'];
    this.product = {
      productName: null,
      categoryID: null,
      description: null,
      quantity: null,
      price: null
    }
  }

}
