import { Injectable } from '@angular/core';
import { get } from 'https';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
//Email-service has 3 functions, one to set the email into the cookie storage
//one to get the email from the cookie storage
//and one to delete the email
export class EmailServiceService {
  constructor(private cookieService: CookieService) { }
  private emailKey = 'userEmail';
  setEmail(email: string) {
    //this.email = emailGrabbed;
    this.cookieService.set(this.emailKey, email, { path: '/' });
   // console.log("Setting email:",email)
  }
  getEmail() {
    return this.cookieService.get(this.emailKey);

  }
  deleteEmail() {
    this.cookieService.delete(this.emailKey, '/'); // Remove the token cookie
  }
}
