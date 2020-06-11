import { Component, OnInit } from '@angular/core';
import { BgContentService } from '../services/bg-content.service';

@Component({
  selector: 'app-bg-content',
  templateUrl: './bg-content.component.html',
  styleUrls: ['./bg-content.component.scss'],
})
export class BgContentComponent implements OnInit {
  constructor(private bgContentService: BgContentService) {}

  bgContents: any

  ngOnInit(): void {
    this.bgContentService.getBackGround().subscribe((data: any) => {
      console.log(data.data);
      this.bgContents = data.data;
    });
  }
}
