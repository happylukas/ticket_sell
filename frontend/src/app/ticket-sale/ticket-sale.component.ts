import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-sale',
  templateUrl: './ticket-sale.component.html',
  styleUrls: ['./ticket-sale.component.scss']
})
export class TicketSaleComponent implements OnInit {

  title: string = 'Ticket Sale';

  constructor() { }

  ngOnInit(): void {
  }

}
