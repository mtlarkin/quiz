import { Component } from '@angular/core';
import { QuizService } from './quiz.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ QuizService ]
})
export class AppComponent {
  title = 'app';
  public constructor(public quizService: QuizService){

  }

 
}
