import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Category } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  doesAdd: boolean = false;
  newCategory: string = '';
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['resolvedCategories'];
  }

  onCreate(): void {
    if (this.newCategory.trim() != '') {
      this.categoryService.createCategory({ category: this.newCategory, status: true })
        .subscribe({
          next: data => {
            this.onCreateSuccess(data);
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private onCreateSuccess(data: Category): void {
    this.categories.push(data);
    this.toastr.success('Created Successfully!', 'Category Creating');
    this.newCategory = '';
  }

  onClear(): void {
    this.newCategory = '';
  }
}
