import React from 'react'
import {QuizContext} from '../QuizProvider'

export default function QuizQuestion() {
  return (
    <QuizContext.Consumer>
      {(context) => (
        <section>
          <section>
            <h1>
              {`${context.state.currentStep +1}.`}
            </h1>
            <h3>
              {context.data[context.state.currentStep].question}
            </h3>
          </section>
          <section>
            <button onClick={context.goBack}>Tilbage</button>
            <button onClick={() => context.handleStep(false)}>Nej</button>
            <button onClick={() => context.handleStep(true)}>Ja</button>
          </section>
        </section>
      )}
    </QuizContext.Consumer>
  )
}
