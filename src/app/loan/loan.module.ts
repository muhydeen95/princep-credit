import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanRoutingModule } from './loan-routing.module';



@NgModule({
  declarations: [
    LoanListComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
