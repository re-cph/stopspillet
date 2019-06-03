import React from 'react'
import {QuizContext} from '../QuizProvider'

export default function QuizQuestion() {
  return (
    <QuizContext.Consumer>
      {(context) => (
        <React.Fragment>
          <section className='quiz-question quiz-content-header'>
            <h1>
              {`${context.state.currentStep +1}.`}
            </h1>
            <p>
              {context.data[context.state.currentStep].question}
            </p>
          </section>
          <section className='quiz-answer quiz-content-footer'>
            <button className='quiz-button quiz-button-back' onClick={context.goBack}>Tilbage</button>
            <button className='quiz-button quiz-button-no' onClick={() => context.handleStep(false)}>Nej</button>
            <button className='quiz-button quiz-button-yes'  onClick={() => context.handleStep(true)}>Ja</button>
          </section>
        </React.Fragment>
      )}
    </QuizContext.Consumer>
  )
}
