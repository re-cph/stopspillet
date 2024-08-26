import React, { Component } from "react";
import QuizContainer from "./components/QuizContainer";
import QuizProvider from "./QuizProvider";

class App extends Component {
  render() {
    return (
      <QuizProvider>
        <QuizContainer />
      </QuizProvider>
    );
  }
}

export default App;
