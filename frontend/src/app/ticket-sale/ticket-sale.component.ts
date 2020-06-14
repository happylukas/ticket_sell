import { Component, OnInit } from '@angular/core';
import { TicketSaleService } from '../services/ticket-sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-sale',
  templateUrl: './ticket-sale.component.html',
  styleUrls: ['./ticket-sale.component.scss'],
})
export class TicketSaleComponent implements OnInit {
  form: FormGroup;
  title: string = 'Ticket Sale';
  submitted = false;
  tickets: any;
  result: string;
  default_ticket: string;
  ticket_amount: number;
  public_key: string;

  constructor(
    private formBuilder: FormBuilder,
    private ticketSaleService: TicketSaleService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      ticket_number: ['', Validators.required],
    });
    this.ticketSaleService.getTickets().subscribe((data: any) => {
      console.log(data);
      this.tickets = data.data;
      if (data.data.length > 0)
        this.default_ticket = data.data[0].ticket_number;
      else this.default_ticket = '';
      this.ticket_amount = data.ticket_price;
      this.public_key = data.public_key;
    });
    this.loadStripe(); 
    this.result = '';
  }

  get f() {
    return this.form.controls;
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.result = '';

    if (this.form.invalid) {
      return;
    }

    var handler = (<any>window).StripeCheckout.configure({
      key: this.public_key,
      locale: 'auto',
      token: async (token) => {
        this.result = 'just a minute...';
        console.log(token);
        let data = {
          firstname: this.f.firstname.value,
          lastname: this.f.lastname.value,
          phone: this.f.phone.value,
          ticket_number: this.f.ticket_number.value,
          token: token.id,
          email: token.email,
          amount: 100 * this.ticket_amount,
          description: 'ticket sale',
        };
        // alert('Token Created!!');
        this.ticketSaleService
          .payment(data)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log(data);
              this.submitted = false;
              this.f.firstname.setValue('');
              this.f.lastname.setValue('');
              this.f.phone.setValue('');
              this.ticketSaleService.getTickets().subscribe((data: any) => {
                console.log(data.data);
                this.tickets = data.data;
                if (data.data.length > 0)
                  this.default_ticket = data.data[0].ticket_number;
              });
              this.result = 'successfully paid';
            },
            (error) => {
              console.log(error);
              this.result = 'Failed';
            }
          );
      },
    });

    handler.open({
      name: 'Ticket Sell',
      description: 'ticket sale',
      amount: 100 * this.ticket_amount,
    });
  }
}
