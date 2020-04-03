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
    const data: number[] = [];
    const labels: string[] = [];
    const tmp = {};

    this.categories.map(c => {
      labels.push(c.categoryName);
      tmp[c.categoryID] = 0;
    });

    this.products.map(product => tmp[product.categoryID] += 1);

    for (let key in tmp) {
      data.push(tmp[key])
    }

    this.buildBarChart(data, labels);
    this.buildPieChart(data, labels);
    this.buildLineChart();
  }

  private buildBarChart(data: number[], labels: string[]): void {
    const backgroundColor: string[] = [];
    this.categories.map(() => backgroundColor.push('#fff'));

    Chart.defaults.global.defaultFontColor = "#fff";
    new Chart('bar', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Product(s)',
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
            drawOnChartArea: false,
            drawTicks: false,
            color: 'rgba(255, 255, 255, 0.4)',
          },
          ticks: {
            padding: 10,
          }
        }],
        yAxes: [{
          gridLines: {
            borderDash: [4, 4],
            color: 'rgba(255, 255, 255, 0.4)',
            zeroLineColor: 'rgba(255, 255, 255, 0.4)'
          },
          ticks: {
            beginAtZero: true,
            padding: 10,
            stepSize: 1,
          }
        }]
      }
    };
  }

  private buildPieChart(data: number[], labels: string[]): void {
    const backgroundColor: string[] = [];
    this.categories.map(() => backgroundColor.push(this.getRandomColor()));
    const total = data.reduce((total, value) => total += value);
    data = data.map(value => value / total * 100);

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
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const index = tooltipItem.index;
              const label = `${data.labels[index]}: ${data.datasets[0].data[index].toFixed(2)}%`;
              return label;
            }
          }
        }
      }
    })
  }

  private buildLineChart(): void {
    Chart.defaults.global.elements.line.tension = 0
    new Chart('line', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales ($)',
          data: [45, 68, 70, 40, 55, 92, 75, 86, 67, 52, 48, 60],
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1
        }, {
          label: 'Earnings ($)',
          data: [21, 34, 35, 20, 20, 50, 43, 56, 40, 30, 24, 37],
          backgroundColor: 'rgba(0, 0, 255, 0.4)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1
        }]
      },
      options: this.getLineOptions()
    });
  }

  private getLineOptions(): object {
    return {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: '#000'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: "#000",
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "#000",
            padding: 10
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            const label = `${data.datasets[0].data[tooltipItem.index]} $`;
            return label;
          }
        }
      }
    }
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