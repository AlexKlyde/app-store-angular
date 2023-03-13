import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  submitted = false;
  productForm = this.fb.group({
    title: ['', [Validators.required]],
    type: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: ['', [Validators.required]],
    info: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get type() { return this.productForm.controls['type']; }
  get title() { return this.productForm.controls['title']; }
  get image() { return this.productForm.controls['image']; }
  get info() { return this.productForm.controls['info']; }
  get price() { return this.productForm.controls['price']; }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.submitted = true;

    const product: Product = {
      title: this.title.value,
      type: this.type.value,
      price: this.price.value,
      image: this.image.value,
      info: this.info.value,
      date: new Date()
    }

    this.productService.add(product).subscribe({
      next: () => {
        this.productForm.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      error: () => {
        this.submitted = false;
      }
    });
  }
}
