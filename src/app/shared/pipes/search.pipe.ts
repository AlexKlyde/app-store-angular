import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../products/models/product.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): any {
    if (!productName.trim()) {
      return products
    }

    return products.filter(
      product => product.title.toLowerCase()
        .includes(productName.toLowerCase())
    )
  }

}
