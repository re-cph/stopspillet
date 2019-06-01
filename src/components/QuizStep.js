import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import StepBullet from './StepBullet'
import { QuizContext } from '../QuizProvider'

class QuizStep extends Component {
  render() {
    return (
      <QuizContext.Consumer>
        {(context) => (
          <section>
            <section>
              <h1>TEST DIG SELV</h1>
              <h3>
                Har du et problematisk forhold til spil? Tag en test med 9 spørgsmål om dine spilvaner.
              </h3>
            </section>
            <section>
              <StepBullet />

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

export default QuizStep
