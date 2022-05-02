import {
  Component,
  DoCheck,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  selectedIndex: number = 0;
  categories: any[] = [];
  toggled: boolean = true;
  @Output() onSideBarToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() categoryPicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    //@ts-ignore
    getCategories(this.getGungCategories);
  }

  // I don't want to use double for loop but for this project i'm using it to save my time since the products and categories are quite few. I'am however very aware of the bad complexity. Here I would want to research more how to search through json faster.
  getGungCategories: (gungCategories: any) => void = async (
    gungCategories: any
  ): Promise<void> => {
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
    this.categoryPicked.emit(this.categories[0]);
  };

  /**
   * It sets the selectedIndex property of the component to the index passed in
   * @param {number} index - The index of the tab that was selected.
   */
  setIndex(index: number): void {
    this.selectedIndex = index;
  }

  /**
   * When a category is clicked, emit the category name to the parent component
   * @param {string} category - string - the name of the category that was clicked
   */
  onCategoryClicked(category: string): void {
    this.categoryPicked.emit(category);
  }

  /**
   * If the sidebar is toggled, then set the width to 280px and set the toggled variable to false.
   * Otherwise, set the width to 80px and set the toggled variable to true
   */
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
