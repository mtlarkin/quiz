import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
  outputs: ['userRetrieved']
})
export class LoginComponent implements OnInit {

  userRetrieved = new EventEmitter();

  activeUserId: string;
  uid;
  constructor(public userService: UserService, public quizService: QuizService) { }

  ngOnInit() {

  }

  signIn(email, password){
    this.userService.logIn(email, password);
    setTimeout(()=> {
      this.getUser();
      setTimeout(()=>{
      
        console.log("sign in:  "+this.activeUserId);
        this.userRetrieved.emit(this.activeUserId);
      },700)
    }, 300);
  }

  log() {
    this.userService.logOut();
  }

  createAccount(email, password, firstName, lastName) {
    var user = this.userService.newAccount(email, password, firstName, lastName);
    user.then( usr => {
      return this.uid = usr.uid;
    })
    setTimeout(()=>{
      this.getUser();

    }, 500);
    setTimeout(x => {

      this.quizService.generateQuizzes(this.uid);
    },1000);
  }

  getUser() {
   return this.activeUserId = this.userService.getCurrentUser()
  }





}
