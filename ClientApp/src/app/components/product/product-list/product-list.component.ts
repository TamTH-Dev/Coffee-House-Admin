import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { Product, CategoryFilter, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  showLoadingIndicator: boolean = true;
  private _faSearch = faSearch;
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

  get faSearch(): object {
    return this._faSearch;
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

  ngOnInit(): void {
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

  onNameFilter(): void {
    if (this._nameFilter.trim() === '') {
      return;
    }
    this._filteredProducts = this._filteredProducts.filter(product => product.productName.toLocaleLowerCase().indexOf(this._nameFilter.toLocaleLowerCase()) != -1);
  }

  onDelete(productID: number): void {
    const deletedProduct = { ...this.getProduct(productID), status: false };
    this.productService.updateProduct(deletedProduct)
      .subscribe({
        next: () => {
          this.deleteProduct(productID);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private getProduct(productID: number): Product {
    return this.products.filter(product => product.productID === productID)[0];
  }

  private deleteProduct(productID: number): void {
    this.products.map(product => {
      if (product.productID === productID) product.status = false
    });
  }

}
