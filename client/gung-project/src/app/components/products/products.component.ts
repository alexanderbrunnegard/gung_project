import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = []; // TODO: Create a model/interface for product
  categoryChildren: any[] = [];
  _sortByPrice: boolean = false;
  _sortByStock: boolean = false;
  _categoryPicked: string = '';
  _sortByVol: boolean = false;
  _searchString: string = '';

  constructor() {}

  // Input setters
  @Input() set sortByPrice(val: boolean) {
    this._sortByPrice = val;
    if (this._sortByPrice) {
      this.sortByPriceCalled();
    } else {
      this.getProducts(this.categoryChildren);
    }
  }

  @Input() set sortByStock(val: boolean) {
    this._sortByStock = val;
    if (this._sortByStock) {
      this.sortByStockCalled();
    } else {
      this.getProducts(this.categoryChildren);
    }
  }
  @Input() set categoryPicked(category: string) {
    this._categoryPicked = category;
    this.sortByCategoryCalled();
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
      this.getProducts(this.categoryChildren);
    }
  }

  @Input() set searchString(searchString: string) {
    // Bad solution to make it reset when i erase one character.
    this._searchString = searchString;
    if (this._searchString.length != 0) {
      this.search(searchString);
    } else {
      this.getProducts(this.categoryChildren);
    }
  }

  /**
   * It takes an array of product IDs, and then calls the getProduct function for each ID in the array
   * @param {string[]} arrayOfIds - string[] - an array of product ids
   */
  getProducts(arrayOfIds: string[]): void {
    // Empty array
    this.products = [];
    for (let i: number = 0; i < arrayOfIds.length; i++) {
      //@ts-ignore
      getProduct(arrayOfIds[i], this.getGungProducts);
    }
  }

  sortByCategoryCalled(): void {
    //@ts-ignore
    getCategories(this.getGungCategories);
  }

  /* A callback function that is called when the getCategories function is done. It takes the json  * object that the getCategories function returns and then searches through the json object to find * the category that the user has picked. Then it extracts the id's of the subcategories and then  * calls the getProducts function with the array of id's.
   */
  getGungCategories: (gungCategories: any) => any = (
    gungCategories: any
  ): any => {
    // This methods extracts the ID's of the selected categories subcategory. However, it only works with this exact json format. And on top of that has a very bad complexity. Here I would've wanted to focus more of my time to make the searching through json faster.

    // Reset array
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
      // If the first category "slangupprullare isn't picked. The rest of the categories are on index gungCategories.children[0]" This way I need one less for loop. If not I would have added another for loop. Again I wouldn't want to nest a for loop if we had 1000s of children in our categories since the time complexity would've been to high.
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
    this.getProducts(this.categoryChildren);
  };

  /* Callback function that is called when the getProduct function is done. */
  getGungProducts: (gungProduct: any) => void = (gungProduct: any): void => {
    this.products.push(gungProduct);
  };

  /**
   * It sorts the products by price.
   */
  sortByPriceCalled(): void {
    this.products.sort((a, b) =>
      a.extra.AGA.PRI.localeCompare(b.extra.AGA.PRI)
    );
  }

  /**
   * It takes a string as an argument and filters the products array to only include products that * * have a name or id that includes the search string
   * @param {string} searchString - string - This is the string that the user types into the search bar.
   */
  search(searchString: string): void {
    // TODO: Doesn't work if the user erases one character and starts typing again.
    this.products = this.products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(searchString.toLowerCase()) ||
        product.id.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  /**
   * The function filters the products array to only include products with a stock value greater than 0, then sorts the array by the stock value from high to low.
   * @returns The products array are being filtered by the stock and then sorted by the stock.
   */
  sortByStockCalled(): void {
    this.products = this.products.filter(function (stock: any) {
      return stock.extra.AGA.LGA > 0;
    });
    this.products.sort((a, b) =>
      b.extra.AGA.LGA.localeCompare(a.extra.AGA.LGA)
    );
  }

  /**
   * It filters the products array by the volume range and then sorts the array by volume
   * @param {number} from - number - the minimum volume
   * @param {number} to - number - the maximum volume of the product
   */
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
