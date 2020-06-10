import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  title: string = 'Transactions';

  displayedColumns: string[] = ['Date', 'Amount', 'Concept', 'Name', 'Phone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  Amount: number;
  Date: string;
  Concept: string;
  Name: string;
  Phone: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 120, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'ticketsale', Name: 'Jone', Phone: 1234554656},
  {Date: '2020/6/10', Amount: 100, Concept: 'direct', Name: 'doe', Phone: 1234554656},
];
