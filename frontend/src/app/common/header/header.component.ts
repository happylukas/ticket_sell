import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  checktitle: boolean = false;
  login_status: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.title === 'Main') {
      this.checktitle = true;
    }
    if(localStorage.getItem('user')) this.login_status = true;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
