import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-payment',
  templateUrl: './direct-payment.component.html',
  styleUrls: ['./direct-payment.component.scss']
})
export class DirectPaymentComponent implements OnInit {

  title: string = 'Payment';

  constructor() { }

  ngOnInit(): void {
  }

}
