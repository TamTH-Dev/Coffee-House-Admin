import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product, CategoryFilter, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BootController } from 'src/boot-controller';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listData: MatTableDataSource<Product>;
  displayedColumns: string[] = ['image', 'productName', 'category', 'quantity', 'price', 'actions'];

  showLoadingIndicator: boolean = true;
  isValid: boolean = true;
  faPlus = faPlus;
  faTimes = faTimes;
  _filteredName: string;
  filteredProducts: Product[];
  categoryFilters: CategoryFilter[] = [
    { type: 'All', isActive: true },
    { type: Category.MilkTea, isActive: false },
    { type: Category.Coffee, isActive: false },
    { type: Category.Pudding, isActive: false },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  set filteredName(value: string) {
    this._filteredName = value;
  }

  get filteredName(): string {
    return this._filteredName;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const category = params.get('category');
      if (params.keys.length > 0 && params.keys[0] != 'category') {
        this.isValid = false;
      } else if (params.keys.length > 0 && params.keys[0] == 'category') {
        if (!this.categoryFilters.some(c => c.type == category)) {
          this.isValid = false;
        }
      }

      if (!this.isValid) {
        this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
        this.router.navigateByUrl('/error');
        return;
      }

      this.route.data.subscribe(data => {
        const resolvedProducts: Product[] = data['resolvedProducts'];
        this.onProductsRetrieved(resolvedProducts, category);
        this.listData = new MatTableDataSource(this.filteredProducts);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
    })
  }

  ngAfterViewInit() {
    if (this.isValid) {
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  }

  private onProductsRetrieved(products: Product[], category: string): void {
    this.setFilteredCategory(category);
    this.filteredProducts = this.getProductsByCategory(products, this.getFilteredCategory());
    this.filteredName = '';
  }

  private getProductsByCategory(products: Product[], activeCategory: string): Product[] {
    return activeCategory === 'All' ? products : products.filter(product => product.category === activeCategory);
  }

  private getFilteredCategory(): string {
    return this.categoryFilters.filter(category => category.isActive === true)[0].type;
  }

  private setFilteredCategory(category: string) {
    if (!category) {
      category = 'All';
    }
    this.categoryFilters.map(c => c.isActive = c.type === category ? true : false);
  }

  onNameFilter(): void {
    this.listData.filter = this._filteredName;
    this.listData.filterPredicate = (data, filter: string) => {
      return data.productName.trim().toLocaleLowerCase().indexOf(filter.trim().toLocaleLowerCase()) != -1;
    }
  }

  onDelete(productID: number): void {
    const doesDelete = confirm('Are you sure you want to delete this product?');
    if (doesDelete) {
      const deletedProduct = { ...this.getProduct(productID), status: false };
      this.productService.updateProduct(deletedProduct)
        .subscribe({
          next: () => {
            this.onDeleteSuccess(productID);
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }

  private getProduct(productID: number): Product {
    return this.filteredProducts.filter(product => product.productID === productID)[0];
  }

  private onDeleteSuccess(productID: number): void {
    this.deleteProduct(productID);
    this.toastr.success('Deleted Successfully!', 'Product Deleting');
  }

  private deleteProduct(productID: number): void {
    this.filteredProducts.map(product => {
      if (product.productID === productID) product.status = false
    });
  }

  onNameFilterClear(): void {
    this._filteredName = '';
    this.onNameFilter();
  }

}
