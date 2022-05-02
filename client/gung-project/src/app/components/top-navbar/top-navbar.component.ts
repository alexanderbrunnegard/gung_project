import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent implements OnInit {
  searchString: string = '';
  fromVolume: number = 0; // startvalue
  toVolume: number = 9999; // startvalue
  sortBypriceToggled: boolean = false;
  sortByVolToggled: boolean = false;
  sortByStockToggled: boolean = false;
  searchValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  // Event emitters.
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

  /**
   * If the sortBypriceToggled is true, remove the active class from the price button, set
   * sortBypriceToggled to false and emit the sortBypriceToggled value to the parent component. If the
   * sortBypriceToggled is false, remove the active class from all buttons, add the active class to the
   * price button, set sortBypriceToggled to true and emit the sortBypriceToggled value to the parent
   * component
   */
  sortByPrice(): void {
    //TODO: Make the css class activate from another function to keep the method single responsibility
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

  /**
   * It emits an event with the current state of the volume slider
   */
  updateSortByVol(): void {
    this.onSortByVolToggled.emit({
      toggled: this.sortByVolToggled,
      from: this.fromVolume,
      to: this.toVolume,
    });
  }

  /**
   * If the sortByVolToggled boolean is true, remove the active class from the volume button and set the
   * sortByVolToggled boolean to false, and emit an event with the sortByVolToggled boolean, the fromVolume number, and the toVolume
   * number. If the sortByVolToggled boolean is false, remove the active class
   * from all buttons, add the active class to the volume button, set the sortByVolToggled boolean to
   * true, and emit an event with the sortByVolToggled boolean, the fromVolume number, and the toVolume
   * number
   */
  sortByVol(): void {
    //TODO: Make the css class activate from another function to keep the method single responsibility
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

  /**
   * When the search button is clicked or when a key is released, the searchValue is emitted to the parent component
   */
  searchFunction(): void {
    this.onSearch.emit(this.searchValue);
  }

  /**
   * If the sortByStockToggled property is true, remove the active class from the lagerstatus element and
   * set the sortByStockToggled property to false, and emit an event with the sortByStockToggled boolean. If the sortByStockToggled * property is false, remove the active class from all elements with the a tag, add the active class to the lagerstatus element
   * and set the sortByStockToggled property to true. Then emit an event with the sortByStockToggledBoolean
   */
  sortByStock(): void {
    //TODO: Make the css class activate from another function to keep the method single responsibility
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
