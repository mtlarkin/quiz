import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { QuizQuestion } from '../models/quiz-question.model';

import { QuizService } from '../quiz.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css'],
  providers: [UserService, QuizService],
  inputs: ['userKey:userFromAppView']
})
export class QuizViewComponent implements OnInit {
  user;
  userKey: string;
  allUserQuizzes: Object;

  selectedQuiz;
  questionObjectArray;

  currentQuestionIndex: number = 0;
  currentQuestionAnswers = [];
  correctCount: number = 0;
  currentQuestion;
  answerArray: Array<QuizQuestion> = [];


  currentUser: FirebaseObjectObservable<any>;
  currentUserQuizzes: FirebaseListObservable<any>;
  currentQuizKey: string;

  constructor(public quizService: QuizService, public userService: UserService) {
  }

  ngOnInit() {
    console.log(this.userKey);
    if (this.userKey) {
      this.quizService.getCurrentUserQuizList().subscribe(list => {
        return this.allUserQuizzes = list;
      });
      console.log(this.allUserQuizzes);
    }

  }

  submitAnswer(answer) {
    var correct: boolean = null;


    if (answer === this.questionObjectArray[this.currentQuestionIndex].correct) {
      correct = true;
    } else {
      correct = false;
    }

    var result = new QuizQuestion(this.questionObjectArray[this.currentQuestionIndex].$key, answer, correct);

    if (this.answerArray.length === this.questionObjectArray.length) {
      console.log("submitting data")
      this.quizService.updateQuestionAnswerAndScore(this.currentQuizKey, this.answerArray);
      this.currentQuestionIndex++;
      this.startQuiz();
    } else {

      this.answerArray.push(result);
      console.log("answerArray: " + this.answerArray.length);
      console.log(this.answerArray)

      console.log("questionObjectArray: " + this.questionObjectArray.length);
      console.log(this.questionObjectArray)

      console.log("before      addition: " + this.currentQuestionIndex);
      this.currentQuestionIndex++;

      console.log("after addition: " + this.currentQuestionIndex);
      this.currentQuestionAnswers = new Array(0);

      this.startQuiz();

    }


  }

  startQuiz() {
    if (this.questionObjectArray[this.currentQuestionIndex]) {

      this.currentQuestion = this.questionObjectArray[this.currentQuestionIndex];
      console.log("currentQuestionIndex: " + this.currentQuestionIndex);
      console.log(this.currentQuestion);
      console.log(this.questionObjectArray)

      this.currentQuestionAnswers.push(this.currentQuestion.correct);
      this.currentQuestionAnswers.push(this.currentQuestion.wrong1);
      this.currentQuestionAnswers.push(this.currentQuestion.wrong2);
      this.currentQuestionAnswers.push(this.currentQuestion.wrong3);

      var temp = new Array(0, 1, 2, 3);
      var shuffledAnswers = [];

      var shuffledOrder = this.quizService.shuffle(temp);

      for (var i = 0; i < shuffledOrder.length; i++) {
        var position = shuffledOrder[i];
        shuffledAnswers.push(this.currentQuestionAnswers[position])
      }
      return this.currentQuestionAnswers = shuffledAnswers;

    } else {
      console.log("nice");
    }
  }

  test() {

  }
  selectQuiz(quizKey) {
    this.currentQuizKey = quizKey;
    this.selectedQuiz = this.quizService.startSelectedQuiz(this.userKey, quizKey);


    var questions = [];

    for (var questionKey of this.selectedQuiz) {

      this.quizService.getQuestionByKey(questionKey).subscribe(question => {
        questions.push(question);
      });

    }

    return this.questionObjectArray = questions;

  }
}
