import { Component, OnInit } from '@angular/core';
import { BgContentService } from '../services/bg-content.service';

@Component({
  selector: 'app-bg-content',
  templateUrl: './bg-content.component.html',
  styleUrls: ['./bg-content.component.scss']
})
export class BgContentComponent implements OnInit {

  constructor(private bgContentService: BgContentService) { }

  ngOnInit(): void {
    this.bgContentService.getBackGround().subscribe(data => {
      console.log(data);
    })
  }

}
