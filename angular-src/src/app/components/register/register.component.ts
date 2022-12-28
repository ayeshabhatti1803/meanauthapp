import { ForwardRefHandling } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular/module/flash-messages.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashmessageComponent } from '../flashmessage/flashmessage.component';
import { Router } from '@angular/router';


@Component({ 
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  successMessage: string;
  backgroundColor : string;


  constructor
  (private validateservice : ValidateService,
    private authservice : AuthService,
    private router : Router){
   this.name = '';
   this.username = '';
   this.email = '';
   this.password = '';
   this.successMessage = '';
   this.backgroundColor = '';

   
  }
  ngOnInit() {
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
    if(this.authservice.checkuser())
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

    onRegisterSubmit() {

      var user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      };
     
      
      //Required Field
      if (!this.validateservice.validateRegister(user)){
        //this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
        this.setMessage("Please fill in all fields",false);
        return false;
      }

      // Validate Email
    if(!this.validateservice.validateEmail(user.email)) {
      this.setMessage("Please use a valid email",false);
      return false;
    }

    this.authservice.registerUser(user).subscribe((data:any) =>{
     
      if(data.success)
      {
        this.setMessage("user registered...",true);
        this.router.navigate(["/login"]);
      }
      else{
        this.setMessage("user registration failed...",false);
        this.router.navigate(["/register"]);
      }
    });
    return true;

    
    
  }
}