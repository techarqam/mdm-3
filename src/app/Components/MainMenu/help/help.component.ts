import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  name: string = 'Support';
  faqs: Array<any> = [];

  constructor(
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getVendorFaqs();
  }


  getVendorFaqs() {
    this.commonService.getVendorFaqs().subscribe(nap => {
      this.faqs = [];
      nap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.faqs.push(temp);
      })
    })
  }

}
