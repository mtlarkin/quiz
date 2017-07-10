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

  userRetrieved = new EventEmitter<object>();

  activeUser;
  uid;
  constructor(public userService: UserService, public quizService: QuizService) { }

  ngOnInit() {

  }

  signIn(email, password){
    this.userService.logIn(email, password);
    setTimeout(()=> {
      this.getUser();
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

      console.log('login = ' + this.activeUser);
      this.quizService.generateQuizzes(this.uid);
    },1000);
  }

  getUser() {
    this.userService.getCurrentUser().subscribe( user => {
      this.userRetrieved.emit(user);
      console.log('Get user '+ user);
      return this.activeUser = user;
    });
  }





}
