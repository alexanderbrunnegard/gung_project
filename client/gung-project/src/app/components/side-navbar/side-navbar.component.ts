import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  selectedIndex: number = 0;
  categories: any[] = [];
  toggled: boolean = true;
  isActive: boolean = false;
  @Output() onSideBarToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCategoryToggled: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    //@ts-ignore
    getCategories(this.getGungCategories);
  }

  // Bad complexity.
  getGungCategories: (gungCategories: any) => void = (
    gungCategories: any
  ): void => {
    for (let key in gungCategories.children) {
      if (gungCategories.children[key].id.charAt(0) == 's') {
        this.categories.push(gungCategories.children[key].name);
      }
      for (let key1 in gungCategories.children[key].children) {
        if (gungCategories.children[key].children[key1].id.charAt(0) == 's')
          this.categories.push(
            gungCategories.children[key].children[key1].name
          );
      }
    }
  };

  setIndex(index: number): void {
    this.selectedIndex = index;
  }

  removeCategoryIndicator(index: number): void {}

  onCategoryClicked(category: string, index: number): void {
    if (this.selectedIndex === index) {
      category = '';
      $('a').removeClass('active');
      this.onCategoryToggled.emit(category);
    } else {
      this.selectedIndex = 0;
      $('.menu-item').find('.active').removeClass('active');
      $(this).parent().addClass('active');
      this.onCategoryToggled.emit(category);
    }
  }

  toggleSidebar(): void {
    this.onSideBarToggled.emit(this.toggled);
    if (this.toggled) {
      document.getElementById('sidebar')!.style.width = '280px';
      this.toggled = false;
    } else {
      document.getElementById('sidebar')!.style.width = '80px';
      this.toggled = true;
    }
  }
}
