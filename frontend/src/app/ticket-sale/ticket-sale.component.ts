import { Component, OnInit } from '@angular/core';
import {TicketSaleService} from '../services/ticket-sale.service'

@Component({
  selector: 'app-ticket-sale',
  templateUrl: './ticket-sale.component.html',
  styleUrls: ['./ticket-sale.component.scss']
})
export class TicketSaleComponent implements OnInit {

  title: string = 'Ticket Sale';
  tickets: any

  constructor(private ticketSaleService: TicketSaleService) { }

  ngOnInit(): void {
    this.ticketSaleService.getTickets().subscribe((data: any) => {
      console.log(data.data);
      this.tickets = data.data;
    })
  }

}
