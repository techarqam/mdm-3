import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.scss'],
})
export class BackHeaderComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {}

}
