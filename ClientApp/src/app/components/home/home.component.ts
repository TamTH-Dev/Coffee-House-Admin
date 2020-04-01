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
    const data: Category[] = [];
    const labels: string[] = [];
    const tmp = {};

    this.categories.map(c => {
      labels.push(c.category);
      tmp[c.categoryID] = 0;
    });

    this.products.map(product => tmp[product.categoryID] += 1);

    for (let key in tmp) {
      data.push(tmp[key])
    }

    this.buildBarChart(data, labels);
    this.buildPieChart(data, labels);
  }

  private buildBarChart(data: Category[], labels: string[]): void {
    const backgroundColor: string[] = [];
    this.categories.map(c => {
      backgroundColor.push('#fff');
    });

    Chart.defaults.global.defaultFontColor = "#fff";
    Chart.defaults.scale.gridLines.drawOnChartArea = false;
    new Chart('bar', {
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
      options: this.getBarOptions()
    })
  }

  private getBarOptions(): object {
    return {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawTicks: false,
            color: 'rgba(255, 255, 255, 0.4)',
          },
          ticks: {
            padding: 10,
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            drawTicks: false,
            color: 'rgba(255, 255, 255, 0.4)',
          },
          ticks: {
            padding: 10,
            stepSize: 1,
          }
        }]
      }
    };
  }

  private buildPieChart(data: Category[], labels: string[]): void {
    const backgroundColor: string[] = [];
    this.categories.map(c => {
      backgroundColor.push(this.getRandomColor());
    });

    new Chart('pie', {
      type: 'pie',
      data: {
        datasets: [{
          data,
          backgroundColor,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.4)'
        }],
        labels
      },
    })
  }

  private getPieOptions(): object {
    return {
    };
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