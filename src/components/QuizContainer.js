import React, { Component } from 'react'
import QuizStep from './QuizStep'
import data from '../data/data'

const initialState = {
        quiz: [...Array(9)],
        currentStep: 0
}

export class QuizContainer extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

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
      let { currentStep } = this.state
      
    return (
      <div>
        <QuizStep 
        question={data[currentStep]} 
        currentStep={this.state.currentStep} 
        handleStep={this.handleStep}
        quizData={this.state.quiz}
        resetState={this.resetState}
        goBack={this.goBack}
        />
        
      </div>
    )
  }
}

export default QuizContainer
