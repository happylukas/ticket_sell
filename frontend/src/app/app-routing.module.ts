import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TicketSaleComponent } from './ticket-sale/ticket-sale.component';
import { DirectPaymentComponent } from './direct-payment/direct-payment.component';
import { LoginComponent } from './login/login.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', component : MainComponent},
  { path: 'login', component : LoginComponent},
  { path: 'ticket-sale', component : TicketSaleComponent},
  { path: 'direct-pay', component : DirectPaymentComponent},
  { path: 'transactions', component : TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
