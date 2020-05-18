import React, { Component } from "react";
var firebase = require("firebase");
var uuid = require("uuid");

var config = {
  apiKey: "AIzaSyDfZ9kyrFv5U5B7TJZ3946aj-MuN65tO10",
  authDomain: "usurvey-4a24f.firebaseapp.com",
  databaseURL: "https://usurvey-4a24f.firebaseio.com",
  storageBucket: "usurvey-4a24f.appspot.com",
  messagingSenderId: "340209735320",
};
firebase.initializeApp(config);

class Usurvey extends Component {
  submitName(event) {
    var studentName = this.refs.name.value;
    this.setState({ studentName: studentName }, function () {
      console.log(this.state);
    });
  }

  submitPage() {
    firebase
      .database()
      .ref("uSurvey/" + this.state.uid)
      .set({
        studentName: this.state.studentName,
        answers: this.state.answers,
      });
    this.setState({ isSubmitted: true });
  }

  submitQuestion(event) {
    var answers = this.state.answers;
    if (event.target.name === "answer1") {
      answers.answer1 = event.target.value;
    } else if (event.target.name === "answer2") {
      answers.answer2 = event.target.value;
    } else if (event.target.name === "answer3") {
      answers.answer3 = event.target.value;
    }
    this.setState({ answers: answers }, function () {
      console.log(this.state);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
      },
      isSubmitted: false,
    };
    this.submitName = this.submitName.bind(this);
    this.submitPage = this.submitPage.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  render() {
    var studentName;
    var questions;

    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      studentName = (
        <div>
          <h1>Hey Man enter your name </h1>
          <form onSubmit={this.submitName}>
            <input
              className="namy"
              type="text"
              placeholder="Enter your name"
              ref="name"
            />
          </form>
        </div>
      );
      questions = "";
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === false
    ) {
      studentName = <h1>Hey man {this.state.studentName}</h1>;
      questions = (
        <div>
          <h2>Here are some questions for you to answer</h2>
          <form onSubmit={this.submitPage}>
            <div className="card">
              <label>What are you intrested in???</label>
              <br />
              <input
                type="radio"
                name="answer1"
                value="Technology"
                onChange={this.submitQuestion}
              />
              Technology
              <input
                type="radio"
                name="answer1"
                value="Design"
                onChange={this.submitQuestion}
              />
              Design
              <input
                type="radio"
                name="answer1"
                value="Developer"
                onChange={this.submitQuestion}
              />
              Developer
            </div>
            <div className="card">
              <label>What are looking for???</label>
              <br />
              <input
                type="radio"
                name="answer2"
                value="Job"
                onChange={this.submitQuestion}
              />
              Job
              <input
                type="radio"
                name="answer2"
                value="Internship"
                onChange={this.submitQuestion}
              />
              Internship
              <input
                type="radio"
                name="answer2"
                value="Part-time-job"
                onChange={this.submitQuestion}
              />
              Part-Time-job
            </div>
            <div className="card">
              <label>Your fav part in web dev??</label>
              <br />
              <input
                type="radio"
                name="answer3"
                value="front-end"
                onChange={this.submitQuestion}
              />
              front-end
              <input
                type="radio"
                name="answer3"
                value="back-end"
                onChange={this.submitQuestion}
              />
              back-end
              <input
                type="radio"
                name="answer3"
                value="full-stack"
                onChange={this.submitQuestion}
              />
              full-stack
            </div>
            <input className="feedback-button" type="submit" value="submit" />
          </form>
        </div>
      );
    } else if (this.state.isSubmitted === true) {
      studentName = (
        <div>
          <h1>Thanks, {this.state.studentName}</h1>
        </div>
      );
    }

    return (
      <div>
        {studentName}
        --------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
