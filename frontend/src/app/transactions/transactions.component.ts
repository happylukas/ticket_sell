import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from '../services/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  title: string = 'Transactions';
  table_data: any;
  from_date: Date;
  to_date: Date;

  displayedColumns: string[] = ['Date', 'Amount', 'Concept', 'Name', 'Phone'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) this.router.navigate(['/']);
    else {
      // this.dataSource.paginator = this.paginator;
      this.transactionsService.getTransactions().subscribe((data: any) => {
        console.log(data.data);
        this.table_data = data.data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(data.data);
      });
    }
  }

  filterByDay() {
    let d = new Date();
    let yesterday = d.setDate(d.getDate() - 1);
    let filtered_day = this.table_data.filter((data: any) => {
      return new Date(data.created_at).getTime() >= yesterday;
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtered_day);
  }

  filterByWeek() {
    let d = new Date();
    let week = d.setDate(d.getDate() - 7);
    let filtered_day = this.table_data.filter((data: any) => {
      return new Date(data.created_at).getTime() >= week;
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtered_day);
  }

  onFromDate(event: any) {
    console.log(this.to_date);
    this.from_date = new Date(event.target.value);
    let fromDate = this.from_date.setDate(this.from_date.getDate() - 1);
    let toDate = new Date().getTime();
    if (this.to_date) toDate = this.to_date.getTime();
    let filtered_day = this.table_data.filter((data: any) => {
      return (
        new Date(data.created_at).getTime() >= fromDate &&
        new Date(data.created_at).getTime() <= toDate
      );
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtered_day);
  }

  onToDate(event: any) {
    this.to_date = new Date(event.target.value);
    let toDate = this.to_date.getTime();
    let fromDate = 0;
    if (this.from_date)
      fromDate = this.from_date.setDate(this.from_date.getDate() - 1);
    let filtered_day = this.table_data.filter((data: any) => {
      return (
        new Date(data.created_at).getTime() <= toDate &&
        new Date(data.created_at).getTime() >= fromDate
      );
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtered_day);
  }
}

export interface PeriodicElement {
  amount: number;
  created_at: string;
  description: string;
  firstname: string;
  phone: number;
}
