import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  searchString: string = '';

  sortBypriceToggled: boolean = false;
  sortByVolToggled: boolean = false;
  sortByStockToggled: boolean = false;

  @Output() onSortByPriceToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onSortByVolToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onSortByStockToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  sortByPrice() {
    if (this.sortBypriceToggled) {
      $(`#pris`).removeClass('active');
      this.sortBypriceToggled = false;
      this.onSortByPriceToggled.emit(this.sortBypriceToggled);
    } else {
      $('body a').removeClass('active');
      $(`#pris`).addClass('active');
      this.sortBypriceToggled = true;
      this.onSortByPriceToggled.emit(this.sortBypriceToggled);
    }
  }

  sortByVol() {
    if (this.sortByVolToggled) {
      $(`#volym`).removeClass('active');
      this.sortByVolToggled = false;
      this.onSortByVolToggled.emit(this.sortByVolToggled);
    } else {
      $('body a').removeClass('active');
      $(`#volym`).addClass('active');
      this.sortByVolToggled = true;
      this.onSortByVolToggled.emit(this.sortByVolToggled);
    }
  }
  searchFunction(searchValue: any) {
    // To allow alphanumeric only.
    if (
      (searchValue.keyCode >= 48 && searchValue.keyCode <= 57) ||
      (searchValue.keyCode >= 65 && searchValue.keyCode <= 90)
    ) {
      this.searchString = this.searchString + searchValue.key;
      console.log(searchValue);
    }

    if ('slangupprullare Avfettning 10m'.includes(this.searchString)) {
      console.log('Japp');
    }
  }
  sortByStock() {
    if (this.sortByStockToggled) {
      $(`#lagerstatus`).removeClass('active');
      this.sortByStockToggled = false;
      this.onSortByStockToggled.emit(this.sortByStockToggled);
    } else {
      $('body a').removeClass('active');
      $(`#lagerstatus`).addClass('active');
      this.sortByStockToggled = true;
      this.onSortByStockToggled.emit(this.sortByStockToggled);
    }
  }
}
