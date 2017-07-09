import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



//Firebase imports
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Model imports
import { Question } from './models/question.model'

@Injectable()
export class QuestionService {
  questionTable: firebase.database.Reference;
  listOfQuestions: FirebaseListObservable<any>;


  constructor( public db: AngularFireDatabase, public http: Http) {
    this.questionTable = firebase.database().ref('questions');
    this.listOfQuestions = db.list('/questions');
  }

  newQuestion(week, day, topic, question, correct, wrong1, wrong2){
    var questionToAdd: Question = new Question( week, day, topic, question, correct, wrong1, wrong2);
    this.listOfQuestions.push(questionToAdd);
    return questionToAdd;
  }

  getQuestion(id){
    return this.db.object('questions/' + id);
  }

  deleteQuestion(id){
    if(confirm("Are you sure you want to delete this question?")) {
      this.listOfQuestions.remove(id);
    } else {
      alert("Phew...");
    }
  }

  getAllQuestions() {
    return this.listOfQuestions;
  }

  updateQuestion(updatedQuestion) {
    this.getQuestion(updatedQuestion.$key).update({
      week: updatedQuestion.week,
      day: updatedQuestion.day,
      topic: updatedQuestion.topic,
      question: updatedQuestion.question,
      correct: updatedQuestion.correct,
      wrong1: updatedQuestion.wrong1,
      wrong2: updatedQuestion.wrong2
    });
  }

  updateQuestionScore(answeredQuestion) {
    if(answeredQuestion.correct){
      this.getQuestion(answeredQuestion.$key).update(x => {
        x.timesCorrect++;});
      } else {
        this.getQuestion(answeredQuestion.$key).update(x => {
          x.timesIncorrect++;});
        }

      }

      addQuestionsFromJson(){
        var json = this.http.get("./assets/questions.json").map((res:any) => res.json());
        console.log('json below');
        console.log(json);
        json.subscribe( jsonObject => {
          var count = Object.keys(jsonObject).length;
          console.log('jsonObject has ' + count + ' keys.')
          for (var i = 1; i < count; i++){
            var tempQuestion: Question = new Question(jsonObject[i].week, jsonObject[i].day, jsonObject[i].topic, jsonObject[i].question, jsonObject[i].correct, jsonObject[i].wrong1, jsonObject[i].wrong2)
            this.listOfQuestions.push(tempQuestion);
          }
      })
    }
  }

  //QuizQuestion will be...
  // question.$key
  //           answer:
  //           correct:
