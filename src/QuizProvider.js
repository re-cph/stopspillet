import React, { Component } from 'react'
import { data } from './data/data'

// Using context API for quiz
export const QuizContext = React.createContext()

// Initial App state
const initialState = {
    quiz: [...Array(9)],
    currentStep: 0
}


class QuizProvider extends Component {

    state = initialState

    // Used to start over, when hitting "try again" button
    resetState = () => {
        this.setState(initialState)
    }

    // Handle "Yes"/"No" buttons
    handleStep = selection => {
        const { currentStep } = this.state

        // If we still before final quiz - No. 9  
        if(currentStep <= 9) {
            
            // update quiz values in state (yes/no)
            let copy = [...this.state.quiz]
            copy.splice(currentStep, 1, selection)

            this.setState({ 
                quiz: copy,
                currentStep: currentStep >= 8 ? 9 : currentStep + 1
             })
        } 
              
      }

      // Handle Go back button
      goBack = () => {
        const { currentStep } = this.state

        if(currentStep > 0) {
          this.setState({
              currentStep: currentStep - 1
          })
        }
      }

  render() {
    return (
     <QuizContext.Provider value={{
        state: this.state,
        data: data,
        resetState: this.resetState,
        handleStep: this.handleStep,
        goBack: this.goBack
    }}>
        {this.props.children}
     </QuizContext.Provider>
    )
  }
}

export default QuizProvider
