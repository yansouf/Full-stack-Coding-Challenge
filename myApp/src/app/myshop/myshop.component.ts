import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/session.service';


@Component({
  selector: 'app-myshop',
  templateUrl: './myshop.component.html',
  styleUrls: ['./myshop.component.scss'],
})
export class MyShopComponent implements OnInit {
  signed : Boolean
  constructor(private  sessionService:SessionService) {}

  ngOnInit() {
   this.signed=this.sessionService.isSignedIn;
  }


}
