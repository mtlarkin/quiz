import { Component, OnInit, } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
  providers: [QuestionService]
})
export class NewQuestionComponent implements OnInit {
addedQuestion: Question;
  constructor(public questionService: QuestionService) { }

  ngOnInit() {

  }
  saveQuestion(week, day, topic, question, correct, wrong1, wrong2){
    this.addedQuestion = this.questionService.newQuestion(week, day, topic, question, correct, wrong1, wrong2);

  }

  checkFunction(){
    this.questionService.addQuestionsFromJson();
  }


}
