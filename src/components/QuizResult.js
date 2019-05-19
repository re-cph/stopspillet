import React from 'react'
import { Button } from 'semantic-ui-react'

export default function QuizResult(props) {
  const noOfYes = props.quizData.filter(val => val === true)
  return (
    <div>
      <h1>RESULT</h1>
      <div>
        <h3>
          {`You answered "Yes" ${noOfYes.length} times.`}
          That indicates you could have some use of our product. We recommend trying our free trial.
        </h3>
      </div>

      <div style={styles.tryAgainButton}>
      <Button onClick={props.resetState}>
      Try again!
    </Button>
    </div>
      
    </div>
  )
}


const styles = {
  tryAgainButton: {
    alignContent: 'left',
    paddingTop: 30
    
  }
}