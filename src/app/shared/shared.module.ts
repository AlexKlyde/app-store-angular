import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchPipe } from "./pipes/search.pipe";
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SpinnerComponent,
    SearchPipe,
    FilterPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    SearchPipe,
    FilterPipe
  ]
})
export class SharedModule {

}