import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = []; // Would like to have a type for product from a model here rather than any.
  allProducts: any[] = [];
  categoryChildren: any[] = [];
  _sortByPrice: boolean = false;
  _sortByStock: boolean = false;
  _categoryPicked: string = '';
  _sortByVol: boolean = false;
  _searchString: string = '';

  constructor() {}

  @Input() set sortByPrice(val: boolean) {
    this._sortByPrice = val;
    if (this._sortByPrice) {
      this.sortByPriceCalled();
    } else {
      this.initializeProducts();
    }
  }

  @Input() set sortByStock(val: boolean) {
    this._sortByStock = val;
    if (this._sortByStock) {
      this.sortByStockCalled();
    } else {
      this.initializeProducts();
    }
  }
  @Input() set categoryPicked(category: string) {
    this._categoryPicked = category;
    console.log('inne 1');
    if (this._categoryPicked.length != 0) {
      console.log('inne 2');
      this.sortByCategoryCalled();
    } else {
      console.log('inne 3');
      this.initializeProducts();
    }
  }

  @Input() set sortByVolume(val: any) {
    this._sortByVol = val?.toggled;

    if (this._sortByVol) {
      if (val.from == null) {
        val.from = 0;
      }
      if (val.to == null) {
        val.to = 9999;
      }
      this.sortByVolumeCalled(val.from, val.to);
    } else {
      this.initializeProducts();
    }
  }

  @Input() set searchString(searchString: string) {
    this._searchString = searchString;
    if (this._searchString.length != 0) {
      this.search(searchString);
    } else {
      this.initializeProducts();
    }
  }

  ngOnInit(): void {
    this.populateProducts();
  }

  initializeProducts(): void {
    //@ts-ignore
    getProducts(this.getGungProducts);
  }

  populateProducts(): void {
    //@ts-ignore
    getProducts(this.getAllProducts);
  }

  sortByCategoryCalled(): void {
    //@ts-ignore
    getCategories(this.getGungCategories);
  }

  // This methods extracts the ID's of the selected categories subcategory. However, it only works with this exact json format. And on top of that has a very bad complexity. Given the time I would had created this as a more general function and getting a way better time complexity. Preferably with a hash table perhaps?
  getGungCategories: (gungCategories: any) => any = (
    gungCategories: any
  ): any => {
    this.categoryChildren = [];
    // If this is true then the first category is called.
    if (gungCategories.children[0].name === this._categoryPicked) {
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
          gungCategories.children[0].children[key].name === this._categoryPicked
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
    this.products = this.allProducts.filter((product: any) =>
      this.categoryChildren.includes(product.id)
    );
    this.populateProducts();
  };

  getGungProducts: (gungProducts: any) => void = (gungProducts: any): void => {
    // Removes duplicate products.
    this.products.splice(0);
    let productsJson: string[] = Object.values(gungProducts);
    productsJson.forEach((element: string): number =>
      this.products.push(element)
    );
  };

  getAllProducts: (gungProducts: any) => void = (gungProducts: any): void => {
    // Removes duplicate products.
    this.allProducts.splice(0);
    let productsJson: string[] = Object.values(gungProducts);
    productsJson.forEach((element: string): number =>
      this.allProducts.push(element)
    );
  };

  sortByPriceCalled() {
    this.products.sort((a, b) =>
      a.extra.AGA.PRI.localeCompare(b.extra.AGA.PRI)
    );
  }

  search(searchString: string): void {
    this.products = this.products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(searchString.toLowerCase()) ||
        product.id.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  sortByStockCalled() {
    this.products = this.products.filter(function (stock: any) {
      return stock.extra.AGA.LGA > 0;
    });
    this.products.sort((a, b) =>
      b.extra.AGA.LGA.localeCompare(a.extra.AGA.LGA)
    );
  }

  sortByVolumeCalled(from: number, to: number): void {
    this.products = this.products.filter(
      (product: any) =>
        product.extra.AGA.VOL >= from && product.extra.AGA.VOL <= to
    );
    this.products.sort((a, b) =>
      b.extra.AGA.VOL.localeCompare(a.extra.AGA.VOL)
    );
  }
}
