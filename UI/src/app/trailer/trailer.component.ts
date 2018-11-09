import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer,SafeValue } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {

  @Input() public trailerUrl;
  trailer: SafeValue;
  constructor(private sanitizer:DomSanitizer,private cookieService: CookieService) { 
  }

  ngOnInit() {
    console.log("Iframe" + this.trailerUrl)
    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.trailerUrl);
  }
  destoryComp(){
    
  }

}
