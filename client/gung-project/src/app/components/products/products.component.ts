import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // TODO: Byt till att uppdatera products hela tiden istället för att ha två arrayer med produkter.
  // Would like to have a type from a model here rather than any.
  products: any[] = [];
  stockFiltered: any[] = [];
  categoryChildren: any[] = [];

  constructor() {}

  @Input() sortByPrice: boolean = false;
  @Input() sortByVolume: boolean = false;
  @Input() sortByStock: boolean = false;
  @Input() categoryPicked: string = '';
  alphabeticalSort: boolean = false;

  ngOnInit(): void {
    //@ts-ignore
    getProducts(this.getGungProducts);
  }

  ngOnChanges(): void {
    if (this.categoryPicked != '') {
      this.sortByCategoryCalled(this.categoryPicked);
      return;
    }
    if (this.sortByPrice) {
      this.sortByPriceCalled();
      return;
    }
    if (this.sortByStock) {
      this.sortByStockCalled();
      return;
    }
    if (this.sortByVolume) {
      this.sortByVolumeCalled();
      return;
    } else {
      this.sortByAlpabetical();
    }
  }

  sortByCategoryCalled(categoryPicked: string) {
    //@ts-ignore
    getCategories(this.getGungCategories);
  }

  // This methods extracts the ID's of the selected categories subcategory. However, it only works with this exact json format. And on top of that has a very bad complexity. Given the time I would had created this as a more general function and getting a way better time complexity. Preferably with a hash table perhaps?
  getGungCategories: (gungCategories: any) => any = (
    gungCategories: any
  ): any => {
    this.categoryChildren = [];
    // If this is true then the first category is called.
    if (gungCategories.children[0].name === this.categoryPicked) {
      for (let key in gungCategories.children[0].children) {
        for (let key2 in gungCategories.children[0].children[key].children)
          this.categoryChildren.push(
            gungCategories.children[0].children[key].children[key2].id
          );
      }
    } else {
      // If the first category "slangupprullare isn't picked. The rest of the categories are on index gungCategories.children[0]" This way I need one less for loop. Again I wouldn't want to nest a for loop if we had 1000s of children in our categories the time complexity would've been to high.
      for (let key in gungCategories.children[0].children) {
        if (
          gungCategories.children[0].children[key].name === this.categoryPicked
        ) {
          for (let key2 in gungCategories.children[0].children[key].children) {
            this.categoryChildren.push(
              gungCategories.children[0].children[key].children[key2].id
            );
          }
        }
      }
    }
    // Filter out the products that hasn't the Id's we found.
    this.products = this.products.filter((product: any) =>
      this.categoryChildren.includes(product.id)
    );
  };

  getGungProducts: (gungProducts: any) => void = (gungProducts: any): void => {
    //@ts-ignore
    let productsJson: string[] = Object.values(gungProducts);
    productsJson.forEach((element: string): number =>
      this.products.push(element)
    );
  };

  sortByAlpabetical() {
    this.alphabeticalSort = true;
    this.sortByStock = false;
    this.products.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByPriceCalled() {
    this.alphabeticalSort = false;
    this.sortByStock = false;
    this.products.sort((a, b) =>
      a.extra.AGA.PRI.localeCompare(b.extra.AGA.PRI)
    );
  }

  sortByStockCalled() {
    this.alphabeticalSort = false;
    this.sortByVolume = false;
    this.sortByPrice = false;
    let filteredArray = this.products.filter(function (stock: any) {
      return stock.extra.AGA.LGA > 0;
    });
    filteredArray.sort((a, b) =>
      b.extra.AGA.LGA.localeCompare(a.extra.AGA.LGA)
    );
    this.stockFiltered = filteredArray;
  }

  sortByVolumeCalled() {
    this.sortByStock = false;
    this.alphabeticalSort = false;
    this.products.sort((a, b) =>
      b.extra.AGA.VOL.localeCompare(a.extra.AGA.VOL)
    );
  }
}
