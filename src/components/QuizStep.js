import React, { Component } from 'react'
import {Grid, Header, Segment, Container } from 'semantic-ui-react'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import { QuizContext } from '../QuizProvider'

class QuizStep extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
        <QuizContext.Consumer>
            { context => (
                    <Container style={{marginTop: '50px'}}>
                    <Segment placeholder>
                        <Grid columns={2} stackable textAlign='left'>
                        
                            <Grid.Row >
                                <Grid.Column>
                                <Header as='h1'>Test Yourself</Header>
                                <Header as='h3'>Answer 9 questions and get better understanding
                                        of how much you could benefit from our product</Header>
    
                                </Grid.Column>
    
                                <Grid.Column>
                                    
                                    {
                                        /* if current step equals 9, we're done with quiz, show results 
                                        else, show quiz questions
                                        */
                                    }
    
                                    {context.state.currentStep === 9 ? 
                                    <QuizResult /> : <QuizQuestion /> 
                                    }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Container>
            )}
        </QuizContext.Consumer>
        
    )
  }
}

export default QuizStep
