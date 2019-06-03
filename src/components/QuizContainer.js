import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import StepBullet from './StepBullet'
import {QuizContext} from '../QuizProvider'

class QuizContainer extends Component {
  render() {
    return (
      <QuizContext.Consumer>
        {(context) => (
          <section className='quiz'>
            <section className='quiz-explainer quiz-content-container'>
              <section className='quiz-explainer quiz-content-header'>
                <h1>TEST DIG SELV</h1>
                <p>
                  Har du et problematisk forhold til spil? Tag en test med 9 spørgsmål om dine spilvaner.
                </p>
              </section>
            </section>
            <section className='quiz-step quiz-content-container'>
              <section className='quiz-step-bullets quiz-content-top'>
                <StepBullet />
              </section>

              {context.state.currentStep === 9
                ? <QuizResult />
                : <QuizQuestion />}
            </section>
          </section>
        )}
      </QuizContext.Consumer>
    )
  }
}

export default QuizContainer
