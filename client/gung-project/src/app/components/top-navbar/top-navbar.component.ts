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
  fromVolume: number = 0;
  toVolume: number = 9999;
  sortBypriceToggled: boolean = false;
  sortByVolToggled: boolean = false;
  sortByStockToggled: boolean = false;
  searchValue: string = '';

  @Output() onSortByPriceToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onSortByVolToggled = new EventEmitter<{
    toggled: boolean;
    from: number;
    to: number;
  }>();
  @Output() onSortByStockToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  sortByPrice(): void {
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

  updateSortByVol(): void {
    this.onSortByVolToggled.emit({
      toggled: this.sortByVolToggled,
      from: this.fromVolume,
      to: this.toVolume,
    });
  }

  sortByVol(): void {
    if (this.sortByVolToggled) {
      $(`#volym`).removeClass('active');
      this.sortByVolToggled = false;
      this.onSortByVolToggled.emit({
        toggled: this.sortByVolToggled,
        from: this.fromVolume,
        to: this.toVolume,
      });
    } else {
      $('body a').removeClass('active');
      $(`#volym`).addClass('active');
      this.sortByVolToggled = true;
      this.onSortByVolToggled.emit({
        toggled: this.sortByVolToggled,
        from: this.fromVolume,
        to: this.toVolume,
      });
    }
  }
  searchFunction(event: any): void {
    this.onSearch.emit(this.searchValue);
  }

  sortByStock(): void {
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
