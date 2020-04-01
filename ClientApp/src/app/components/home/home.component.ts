import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chart: any;
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.getCategories();
      },
      error: err => console.log(err)
    })
  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.buildChart();
      },
      error: err => console.log(err)
    })
  }

  private buildChart(): void {
    const data = [];
    const labels = [];
    const temp = {};
    const backgroundColor = [];

    this.categories.map(c => {
      labels.push(c.category);
      temp[c.categoryID] = 0;
      backgroundColor.push(this.getRandomColor());
    });

    this.products.map(product => temp[product.categoryID] += 1);

    for (let key in temp) {
      data.push(temp[key])
    }

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Category (Product(s))',
          data,
          backgroundColor,
          barPercentage: 0.5,
        }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}