import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
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
  categoryFilters: Category[];

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
    this.categoryFilters = this.route.snapshot.data['resolvedCategories'];
    this.categoryFilters.unshift({ categoryName: 'All', isFiltered: true });

    this.route.queryParamMap.subscribe(params => {
      const categoryName = params.get('category');
      if (params.keys.length > 0 && params.keys[0] != 'category') {
        this.isValid = false;
      } else if (params.keys.length > 0 && params.keys[0] == 'category') {
        if (!this.categoryFilters.some(c => c.categoryName == categoryName)) {
          this.isValid = false;
        }
      }

      if (!this.isValid) {
        this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
        this.router.navigateByUrl('/error');
        return;
      }

      this.route.data.subscribe(data => {
        const resolvedProducts: Product[] = data['resolvedProducts'].reverse();
        if (resolvedProducts) {
          this.onProductsRetrieved(this.getProductsWithResolvedCategories(resolvedProducts), categoryName);
          this.listData = new MatTableDataSource(this.filteredProducts);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        }
      });
    })
  }

  ngAfterViewInit() {
    if (this.isValid) {
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  }

  private onProductsRetrieved(products: Product[], categoryName: string): void {
    this.setFilteredCategory(categoryName);
    products.map(product => product.imgPath = `https://picsum.photos/id/${product.productID}/126/84`);
    this.filteredProducts = this.getProductsByCategory(products, this.getFilteredCategory());
    this.filteredName = '';
  }

  private getProductsByCategory(products: Product[], filteredCategory: string): Product[] {
    return filteredCategory === 'All' ? products : products.filter(product => product.categoryName == filteredCategory);
  }

  private getFilteredCategory(): string {
    return this.categoryFilters.filter(category => category.isFiltered === true)[0].categoryName;
  }

  private setFilteredCategory(categoryName: string) {
    if (!categoryName) {
      categoryName = 'All';
    }
    this.categoryFilters.map(c => c.isFiltered = c.categoryName === categoryName ? true : false);
  }

  private getProductsWithResolvedCategories(products: Product[]): Product[] {
    for (let p of products) {
      for (let c of this.categoryFilters) {
        if (p.categoryID == c.categoryID) {
          p.categoryName = c.categoryName;
        }
      }
    }
    return products;
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
