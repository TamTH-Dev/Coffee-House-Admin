import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['resolvedCategories'];
  }

}
