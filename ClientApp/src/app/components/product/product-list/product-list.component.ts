import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Product, CategoryFilter, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['image', 'productName', 'quantity', 'price', 'actions'];

  showLoadingIndicator: boolean = true;
  private _isSuccess: boolean;
  private products: Product[] = [];
  private _nameFilter: string = '';
  private _categoryFilter: string = 'All';
  private _filteredProducts: Product[] = [];
  private _categoryFilters: CategoryFilter[] = [
    { type: 'All', isActive: true },
    { type: Category.MilkTea, isActive: false },
    { type: Category.Coffee, isActive: false },
    { type: Category.Pudding, isActive: false },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  set nameFilter(value: string) {
    this._nameFilter = value;
  }

  get nameFilter(): string {
    return this._nameFilter;
  }

  get categoryFilters(): CategoryFilter[] {
    return this._categoryFilters;
  }

  get filteredProducts(): Product[] {
    return this._filteredProducts;
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  private setProducts(products: Product[]): void {
    this.products = products;
  }

  private setFilteredProducts(products: Product[]) {
    this._filteredProducts = products;
  }

  private setCategoryFilter(categoryFilter: string): void {
    this._categoryFilter = categoryFilter;
  }

  private getCategoryFilter(): string {
    return this._categoryFilter;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this._categoryFilter = params.get('category');
      if (this._categoryFilter) {
        this.setCategoryFilter(this._categoryFilter);
      } else {
        this.setCategoryFilter('All');
      }
      this.route.data.subscribe(data => {
        const resolvedProducts: Product[] = data['resolvedProducts'];
        this.onProductsRetrieved(resolvedProducts);
        this.listData = new MatTableDataSource(this.filteredProducts);
      });
    })
  }

  private onProductsRetrieved(products: Product[]): void {
    this.setProducts(products);

    if (this.products) {
      this._isSuccess = true;
      this.onCategoryFilter();
    } else {
      this._isSuccess = false;
    }
  }

  private onCategoryFilter(): void {
    this.setActiveCategory(this.getCategoryFilter());
    this.setFilteredProducts(this.getProductByCategory(this.products, this.getActiveCategory()));
    this._nameFilter = '';
  }

  private getProductByCategory(products: Product[], activeCategory: string): Product[] {
    return activeCategory === 'All' ? products : products.filter(product => product.category === activeCategory);
  }

  private getActiveCategory(): string {
    return this._categoryFilters.filter(category => category.isActive === true)[0].type;
  }

  private setActiveCategory(category: string) {
    this._categoryFilters.map(c => c.isActive = c.type === category ? true : false);
  }

  onDelete(productID: number): void {
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

  private getProduct(productID: number): Product {
    return this.products.filter(product => product.productID === productID)[0];
  }

  private onDeleteSuccess(productID: number): void {
    this.deleteProduct(productID);
    this.toastr.success('Deleted Successfully!', 'Product Deleting');
  }

  private deleteProduct(productID: number): void {
    this.products.map(product => {
      if (product.productID === productID) product.status = false
    });
  }

}
