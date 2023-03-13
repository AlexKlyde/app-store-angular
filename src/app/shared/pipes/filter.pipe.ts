import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../products/models/product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], type = ''): any {
    if (!type) {
      return products;
    }

    return products.filter(product => product.type.toLowerCase() === type)
  }

}
