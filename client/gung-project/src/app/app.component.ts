import { Component, getDebugNode, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  searchString: string = '';
  sortByPriceSelector: boolean = false;
  sortByVolSelector: any;
  sortByStockSelector: boolean = false;
  category: string = '';

  ngOnInit(): void {}

  /**
   * If the side bar is toggled, then set the margin of the main element to 190px, otherwise set it to
   * 0px
   * @param {boolean} toggled - boolean - This is the boolean value that is passed from the child
   * component to the parent component.
   */
  sideBarToggled(toggled: boolean): void {
    if (toggled) {
      document.getElementById('main')!.style.marginLeft = '190px';
    } else {
      document.getElementById('main')!.style.marginLeft = '0px';
    }
  }

  categoryToggled(category: string): void {
    this.category = category;
  }

  searchForToggled(searchString: string): void {
    this.searchString = searchString;
  }

  sortByPriceToggled(toggled: boolean): void {
    this.sortByPriceSelector = toggled;
  }
  sortByVolToggled(toggled: any): void {
    this.sortByVolSelector = toggled;
  }
  sortByStockToggled(toggled: boolean): void {
    this.sortByStockSelector = toggled;
  }
}
