import { Component, OnInit } from '@angular/core';
import { TicketSaleService } from '../services/ticket-sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-direct-payment',
  templateUrl: './direct-payment.component.html',
  styleUrls: ['./direct-payment.component.scss'],
})
export class DirectPaymentComponent implements OnInit {
  form: FormGroup;
  title: string = 'Payment';
  submitted = false;
  tickets: any;
  result: string;
  default_ticket: string;
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
      amount: ['', Validators.required],
    });
    this.ticketSaleService.getTickets().subscribe((data: any) => {
      console.log(data);
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
          ticket_number: '',
          token: token.id,
          email: token.email,
          amount: 100 * this.f.amount.value,
          description: 'direct',
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
              this.f.amount.setValue('');
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
      description: 'direct payment',
      amount: 100 * this.f.amount.value,
    });
  }
}
