import { Component, getDebugNode, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  sortByPriceSelector: boolean = false;
  sortByVolSelector: boolean = false;
  sortByStockSelector: boolean = false;
  category: string = '';

  ngOnInit() {}

  sideBarToggled(toggled: boolean) {
    if (toggled) {
      document.getElementById('main')!.style.marginLeft = '190px';
    } else {
      document.getElementById('main')!.style.marginLeft = '0px';
    }
  }
  categoryToggled(category: string) {
    this.category = category;
  }

  sortByPriceToggled(toggled: boolean) {
    this.sortByPriceSelector = toggled;
  }
  sortByVolToggled(toggled: boolean) {
    this.sortByVolSelector = toggled;
  }
  sortByStockToggled(toggled: boolean) {
    this.sortByStockSelector = toggled;
  }
}
