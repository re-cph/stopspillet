import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Icon, Search, Segment, Container, Image } from 'semantic-ui-react'
import arrowImage from '../assets/arrow2.png'
import QuizQuestion from './QuizQuestion'
import QuizResult from './QuizResult'

export class QuizStep extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
        <Container style={{marginTop: '50px'}}>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='left'>
                    {/* <Divider vertical>{`<`}</Divider> */}

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

                                {this.props.currentStep === 9 ? 
                                <QuizResult 
                                    quizData={this.props.quizData} 
                                    resetState={this.props.resetState} 
                                /> : 

                                <QuizQuestion 
                                question={this.props.question.question} 
                                currentStep={this.props.currentStep} 
                                handleStep={this.props.handleStep}
                                goBack={this.props.goBack}
                                /> 
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
        </Segment>
  </Container>
    )
  }
}

export default QuizStep
