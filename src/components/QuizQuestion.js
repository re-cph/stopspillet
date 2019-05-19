import React from 'react'
import { Button, Segment } from 'semantic-ui-react'
import { QuizContext } from '../QuizProvider'

export default function QuizQuestion() {
  return (
      <QuizContext.Consumer>
          { context => (
              <Segment placeholder>
                
              <h1>
                  {`${context.state.currentStep +1}.`}
              </h1>
              
              <div style={styles.questionText}>
                  <h3>
                      {context.data[context.state.currentStep].question}
                  </h3>
              </div>
              
              <Segment.Inline>
                  <Button content='Go back' icon='left arrow' labelPosition='left' onClick={context.goBack} />
                  <Button negative onClick={() => context.handleStep(false)}>No</Button>
                  <Button positive onClick={() => context.handleStep(true)}>Yes</Button>
              </Segment.Inline>
          </Segment>
          )}
      </QuizContext.Consumer>
  

        
  )
}

const styles = {
    questionText: {
        height: 100, 
        width: 350,

    }
}