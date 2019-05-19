import React from 'react'
import { QuizContext } from '../QuizProvider'
import YesImage from '../assets/green.png'
import NoImage from '../assets/red.png'
import NullImage from '../assets/single.png'
import CurrentImage from '../assets/double.png'

export default function StepBullet() {
  return (
      <QuizContext.Consumer>
          { context => (
              <React.Fragment>
                    {context.state.quiz.map((item, i) => {
                         if(i === context.state.currentStep) {
                            return <img src={CurrentImage} width="20" height="20" hspace="3"/>
                         } else {
                            if(item == null) {
                                return <img src={NullImage} width="20" height="20" hspace="3"/>
                            } else {
                                if(item === true) {
                                    return <img src={YesImage} width="20" height="20" hspace="3"/>
                                } else {
                                    return <img src={NoImage} width="20" height="20" hspace="3"/>
                                }
                            }
                         }
                      
                         }
                    )}
              </React.Fragment>
          )}
      </QuizContext.Consumer>
    
  )
}
