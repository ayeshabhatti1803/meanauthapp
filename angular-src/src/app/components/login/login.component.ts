import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashmessageComponent } from '../flashmessage/flashmessage.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  username: String;
  password: String;
  backgroundColor : string;
  subscribe : string;
  successMessage: string
  
  
  

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
   
   this.username = '';
   this.password = '';
   this.backgroundColor = '';
   this.subscribe = '';
   this.successMessage = '';

     }

  ngOnInit() {
    if(this.authService.checkuser())
    {
      this.router.navigate(['Dashboard']);
    }
  }

  setMessage(message:string,success : boolean){
      
    if(success)
    {
      this.backgroundColor = 'green';
    }
    else
    {
      this.backgroundColor = 'red';
    }
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
    }
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    
    
    this.authService.authenticateUser(user).subscribe((data:any) =>{
      
      if(data.success)
      {
        this.authService.storeUserData(data.token, data.user);
        this.setMessage("You are now logged in...",true);
        this.router.navigate(['Dashboard']);
      }
      else{
      
        this.setMessage("user login failed..." + data.msg,false);
        this.router.navigate(['login']);
      }
    });

    return true;
  }

  }

