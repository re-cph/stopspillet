import React from 'react'
import {QuizContext} from '../QuizProvider'

function resultSelector (count) {
  switch (count) {
    case 0:
      return (
        <p>Testen peger på, at du ikke har et problem med spil. Er du nysgerrig på mere viden om ansvarligt spil, er du velkommen til at tage kontakt til StopSpillet på <a href="tel:70222825">70 22 28 25</a>.</p>
      );
    case 1:
      return (
        <p>Testen peger på, at du kan være i risiko for at udvikle et problem med spil. Du bør derfor være opmærksom på, om dine spillevaner ændrer sig. Er du i tvivl og har brug for vejledning, er du velkommen til at tage kontakt til StopSpillet på <a href="tel:70222825">70 22 28 25</a>.</p>
      );
    case 2:
    case 3:
      return (
        <p>Testen peger på, at du kan have et problem med spil. Dine spilvaner kan udvikle sig til en egentlig afhængighed. Derfor opfordres du til at tage kontakt til StopSpillet på <a href="tel:70222825">70 22 28 25</a>, hvor vi kan hjælpe dig med afklaring og sammen finde ud af eventuelle videre tiltag.</p>
      );
    default:
      return (
        <React.Fragment>
          <p>Testen peger på, at du kan have en spilafhængighed. Du opfordres til at tage kontakt til StopSpillet på 70 22 28 25, hvor vi kan hjælpe dig med afklaring og sammen finde ud af eventuelle videre tiltag.</p>
          <p><a href="tel:70222825">Kontakt os nu på 70 22 28 25</a></p>
        </React.Fragment>
      )
  }
}

export default function QuizResult () {
  return (
    <QuizContext.Consumer>
      {(context) => (
        <React.Fragment>
          <section className='quiz-content-header'>
            <h3>Resultat</h3>
            {resultSelector(context.state.quiz.filter(val => val === true).length)}
          </section>

          <section className='quiz-content-footer'>
            <button className='quiz-button quiz-button-reset' onClick={context.resetState}>
              Prøv igen!
            </button>
          </section>
        </React.Fragment>
      )}
    </QuizContext.Consumer>
  )
}
