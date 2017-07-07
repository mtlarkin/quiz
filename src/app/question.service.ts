import { Injectable } from '@angular/core';

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


  constructor( public db: AngularFireDatabase) {
    this.questionTable = firebase.database().ref('questions');
    this.listOfQuestions = db.list('/questions');
   }

   newQuestion(id, week, day, topic, question, correct, wrong1, wrong2){
     var questionToAdd: Question = new Question(id, week, day, topic, question, correct, wrong1, wrong2);
     this.listOfQuestions.push(questionToAdd);
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
       id: updatedQuestion.id,
       week: updatedQuestion.week,
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

//QuizQuestion will be...
// question.$key
//           answer:
//           correct:
