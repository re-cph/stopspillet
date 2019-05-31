import React, { Component } from 'react'
import {Grid, Header, Segment, Container } from 'semantic-ui-react'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'
import StepBullet from './StepBullet'
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
                                <Header as='h1'>TEST DIG SELV</Header>
                                <Header as='h3'>
                                  Har du et problematisk forhold til spil? Tag en test med 9 spørgsmål om dine spilvaner.
                                </Header>

                                </Grid.Column>

                                <Grid.Column>
                                    <div style={styles.stepBullet}>
                                        <StepBullet />
                                    </div>

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

const styles = {
    stepBullet: {
        width: 30,
        height: 10,
        display: 'flex',
        marginRight: 10,
    }
}
