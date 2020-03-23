import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  faSearch = faSearch;
  result: boolean;
  products: Product[] = [];
  private _nameFilter: string = '';
  private _filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  set nameFilter(value: string) {
    this._nameFilter = value;
  }

  get nameFilter() {
    return this._nameFilter;
  }

  get filteredProducts(): Product[] {
    return this._filteredProducts;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedProducts: Product[] = data['resolvedProducts'];
      this.onProductsRetrieved(resolvedProducts);
    });
  }

  onProductsRetrieved(products: Product[]): void {
    this.products = products;
    this._filteredProducts = products;

    if (!this.products) {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  onFilter(): void {
    if (this._nameFilter.trim() === '') {
      return;
    }
    this._filteredProducts = this.products.filter(product => product.productName.toLocaleLowerCase().indexOf(this._nameFilter.toLocaleLowerCase()) != -1);
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

  deleteProduct(productID: number): void {
    this.products.map(product => {
      if (product.productID === productID) product.status = false
    });
  }

}
