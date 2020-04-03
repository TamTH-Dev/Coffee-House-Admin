import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('newCategoryInput') newCategoryInput: ElementRef;
  @ViewChild('editCategoryInput') editCategoryInput: ElementRef;
  faPlus = faPlus;
  faTimes = faTimes;
  doesAdd: boolean = false;
  isValidEditting: boolean = true;
  isValidAdding: boolean = true;
  editStatus: boolean[] = [];
  currentCategory: string;
  newCategory: string = '';
  categories: Category[];

  setFocus() {
    this.newCategoryInput.nativeElement.focus();
    this.doesAdd = true;
  }

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['resolvedCategories'];
    for (let c of this.categories) {
      this.editStatus.push(false);
    }
  }

  onCreate(): void {
    if (this.newCategory.trim() != '') {
      this.categoryService.createCategory({ categoryName: this.newCategory.trim(), status: true })
        .subscribe({
          next: category => {
            this.onCreateSuccess(category);
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      this.isValidAdding = false;
    }
  }

  private onCreateSuccess(category: Category): void {
    this.categories.push(category);
    this.toastr.success('Created Successfully!', 'Category Creating');
    this.newCategory = '';
    this.doesAdd = false;
    this.isValidAdding = true;
    this.editStatus.push(false);
  }

  onEdit(category: Category, index: number): void {
    const edittedCategory = { ...category, category: category.categoryName.trim() };
    if (category.categoryName.trim() != '') {
      this.categoryService.updateCategory(edittedCategory)
        .subscribe({
          next: () => {
            this.onEditSuccess(edittedCategory, index);
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      this.isValidEditting = false;
    }
  }

  private onEditSuccess(category: Category, index: number): void {
    this.categories.splice(index, 1, category);
    this.toastr.success('Updated Successfully!', 'Category Editting');
    for (let i = 0; i < this.editStatus.length; i++) {
      this.editStatus[i] = false;
    }
    this.isValidEditting = true;
  }

  changeEditStatus(index: number): void {
    for (let i = 0; i < this.editStatus.length; i++) {
      if (i == index) {
        this.editStatus[i] = true;
      } else {
        this.editStatus[i] = false;
      }
    }
    this.editCategoryInput.nativeElement.focus();
  }

  onCategoryCreatingClear(): void {
    this.newCategory = '';
  }

  onCategoryEdittingClear(id: number): void {
    this.categories.map(c => {
      if (c.categoryID == id) c.categoryName = '';
    })
  }

  onDelete(category: Category, index: number): void {
    const doesDelete = confirm('Delete this category will also delete all products have this category. Are you sure you want to continue?');
    if (doesDelete) {
      const deletedCategory = { ...category, status: false };
      this.categoryService.updateCategory(deletedCategory)
        .subscribe({
          next: () => {
            this.onDeleteSuccess(deletedCategory, index);
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private onDeleteSuccess(category: Category, index: number) {
    this.productService.deleteProducts(category.categoryID)
      .subscribe({
        next: () => {
          this.categories.splice(index, 1, category);
          this.toastr.success('Deleted Successfully!', 'Category Deleting');
        },
        error: err => {
          console.log(err);
        }
      });
  }

  onRestore(category: Category, index: number): void {
    const doesRestore = confirm('Restore this category will also restore all products have this category. Are you sure you want to continue?');
    if (doesRestore) {
      const restoredCategory = { ...category, status: true };
      this.categoryService.updateCategory(restoredCategory)
        .subscribe({
          next: () => {
            this.onRestoreSuccess(restoredCategory, index);
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private onRestoreSuccess(category: Category, index: number) {
    this.productService.restoreProducts(category.categoryID)
      .subscribe({
        next: () => {
          this.categories.splice(index, 1, category);
          this.toastr.success('Restored Successfully!', 'Category Restoring');
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
