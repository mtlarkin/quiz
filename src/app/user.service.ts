import { Injectable } from '@angular/core';

//Firebase imports
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Model imports
import { User } from './models/user.model';

@Injectable()
export class UserService {
  auth: firebase.auth.Auth;
  userTable: firebase.database.Reference;
  listOfUsers: FirebaseListObservable<any>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.auth = afAuth.auth;
    this.listOfUsers = db.list('/users');
    this.userTable = firebase.database().ref('users');
  }

  newAccount(email, password, firstName, lastName){
    var user:(firebase.Promise<any>|firebase.Thenable<any>) = this.auth.createUserWithEmailAndPassword(email, password);
    setTimeout(()=>{

      user.then(u => {
        var newUser = new User(firstName, lastName);
        this.userTable.child(u.uid).set(newUser);
      })
    }, 100);
    return user;
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete your account?")){
      this.auth.currentUser.delete();
      this.listOfUsers.remove(this.auth.currentUser.uid);
    } else {
      alert("That was a close one...");
    }
  }

  logOut(){
    this.auth.signOut()
  }

  logIn(email, password){
    this.auth.signInWithEmailAndPassword(email, password);
  }

  getAllUsers() {
    return this.listOfUsers;
  }

  getCurrentUser(){
    return this.db.object('users/' + this.auth.currentUser.uid);
  }





}
