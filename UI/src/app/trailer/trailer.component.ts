import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeValue } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {

  trailer: SafeValue;
  constructor(private sanitizer:DomSanitizer,private cookieService: CookieService) { 
    console.log("Iframe"+this.cookieService.get('trailerUrl'));
    console.log(this.trailer);
    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.cookieService.get('trailerUrl'));
  }

  ngOnInit() {
    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.cookieService.get('trailerUrl'));
  }

}
