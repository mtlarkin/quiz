import { Component, Input, Output, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ QuizService ],
  inputs: ['user']
})
export class AppComponent {


  public constructor(public quizService: QuizService){

  }


}
