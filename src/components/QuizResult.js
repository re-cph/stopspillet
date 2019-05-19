import React from 'react'
import { Button } from 'semantic-ui-react'
import { QuizContext } from '../QuizProvider'

export default function QuizResult() {
  
  return (
    <QuizContext.Consumer>
      { context => (
          <div>
          <h1>RESULT</h1>
            <div>
              <h3>
                {`You answered "Yes" ${context.state.quiz.filter(val => val === true).length} times.`}
                That indicates you could have some use of our product. We recommend trying our free trial.
              </h3>
            </div>
    
            <div style={styles.tryAgainButton}>
              <Button onClick={context.resetState}>
              Try again!
              </Button>
          </div>
          
        </div>
      )}
    </QuizContext.Consumer>
    
  )
}


const styles = {
  tryAgainButton: {
    alignContent: 'left',
    paddingTop: 30
    
  }
}