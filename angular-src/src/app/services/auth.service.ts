import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  baseurl : string;

  constructor(private http: HttpClient) {
    this.baseurl = ""; 
   }

  registerUser(user: any) {
    var apiUrl = this.baseurl + 'users/register';
    return this.http.post(apiUrl, user, {headers: {'Content-Type':'application/json'}});
  }

  authenticateUser(user: any) {
    var apiUrl = this.baseurl + 'users/authenticate';
    return this.http.post(apiUrl, user, {headers: {'Content-Type':'application/json'}});
  }

  getProfile(){
    this.loadToken();
    var apiUrl = this.baseurl + 'users/profile';
    console.log(this.authToken);
    return this.http.get(apiUrl,  {headers: {'Authorization':this.authToken,'Content-Type':'application/json'}});
  }
  
  
  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    //JSON.stringify takes the object and convert it into string.
    //JSON.parse converts the json string into object
    localStorage.getItem('id_token');
    this.authToken = token;
    this.user = user;
  }

  loadToken() { // fetch it from local storage
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return JwtModule;
  }

  checkuser(){
    this.loadToken();

    if(this.authToken)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
