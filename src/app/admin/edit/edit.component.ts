import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  submitted = false;
  editForm: FormGroup;
  product: Product

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getProduct(params['id'])
      })
    ).subscribe(product => {
      this.product = product;
      this.editForm = this.fb.group({
        title: [product.title, [Validators.required]],
        type: [product.type, [Validators.required]],
        price: [product.price, [Validators.required]],
        image: [product.image, [Validators.required]],
        info: [product.info, [Validators.required]]
      });
    })
  }

  get type() { return this.editForm.controls['type']; }
  get title() { return this.editForm.controls['title']; }
  get image() { return this.editForm.controls['image']; }
  get info() { return this.editForm.controls['info']; }
  get price() { return this.editForm.controls['price']; }

  onSubmit() {
    if (this.editForm.invalid) {
      return
    }

    this.submitted = true

    this.productService.update({
      ...this.product,
      title: this.title.value,
      type: this.type.value,
      price: this.price.value,
      image: this.image.value,
      info: this.info.value,
      date: new Date()
    }).subscribe({
      next: () => {
        this.submitted = false
        this.router.navigate(['/admin', 'dashboard'])
      },
      error: () => {
        this.submitted = false;
      }
    })
  }

}
