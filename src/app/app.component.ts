import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  providers: [ProductService]
})
export class AppComponent {
  products: Product[];
  private locator = (p: Product, id: number) => p.Id == id;
  newproduct: Product;
  isEdit: boolean = false;

  constructor (private dataService: ProductService) {};

  ngOnInit() {
      this.getProducts();
      this.newproduct = new Product(0, "", 0,"", "");
  }

  getProducts() {
      this.dataService.getProducts().subscribe(
          data => this.products = data,
          error => console.log(error)
      );
  }

  saveProduct() {
      if(this.isEdit) {
          this.updateProduct(this.newproduct);
      }else{
          this.addProduct(this.newproduct);
      }     
  }

  editProduct(idx: number) {
      this.newproduct = this.products[idx];
      this.isEdit = true;
  }

  addProduct(prod: Product) {
      this.dataService.addProduct(prod).subscribe(p => this.products.push(p));
  }

  updateProduct(prod: Product) {
      this.dataService.addEditProduct(prod).subscribe(p => {
          let index = this.products.findIndex(item => this.locator(item, p.Id));
          this.products.splice(index, 1, p);
      });
  }

  deleteProduct(idx: number) {
      let prod: Product = this.products[idx];
      this.dataService.deleteProduct(prod).subscribe(() => {
          this.products.splice(idx, 1);
      });
  }
}
