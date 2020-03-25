import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product, CategoryFilter, Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

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
    private toastr: ToastrService
  ) { }

  set filteredName(value: string) {
    this._filteredName = value;
  }

  get filteredName(): string {
    return this._filteredName;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const category = params.get('category');

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
    this.listData.paginator = this.paginator;
  }

  private onProductsRetrieved(products: Product[], category: string): void {
    this.setActiveCategory(category);
    this.filteredProducts = this.getProductByCategory(products, this.getActiveCategory());
    this.filteredName = '';
  }

  private getProductByCategory(products: Product[], activeCategory: string): Product[] {
    return activeCategory === 'All' ? products : products.filter(product => product.category === activeCategory);
  }

  private getActiveCategory(): string {
    return this.categoryFilters.filter(category => category.isActive === true)[0].type;
  }

  private setActiveCategory(category: string) {
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
