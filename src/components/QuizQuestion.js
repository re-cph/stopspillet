import React from 'react'
import { Button, Header, Segment, Container } from 'semantic-ui-react'

export default function QuizQuestion(props) {
  return (
  

        <Segment placeholder>
                
            <h1>
                {`${props.currentStep +1}.`}
            </h1>
            
            <div style={styles.questionText}>
                <h3>
                    {props.question}
                </h3>
            </div>
            
            <Segment.Inline>
                <Button content='Go back' icon='left arrow' labelPosition='left' onClick={props.goBack} />
                <Button negative onClick={() => props.handleStep(false)}>No</Button>
                <Button positive onClick={() => props.handleStep(true)}>Yes</Button>
            </Segment.Inline>
        </Segment>
  )
}

const styles = {
    questionText: {
        height: 100, 
        width: 350,

    }
}