import React from 'react'
import {QuizContext} from '../QuizProvider'

function resultSelector (count) {
  switch (count) {
    case 0:
      return 'Testen peger på, at du ikke har et problem med spil. Er du nysgerrig på mere viden om ansvarligt spil, er du velkommen til at kontakte StopSpillet.'
    case 1:
      return 'Testen peger på, at du kan være i risiko for at udvikle et problem med spil. Du bør derfor være opmærksom på, om dine spillevaner ændrer sig. Er du i tvivl og har brug for vejledning, er du velkommen til at kontakte StopSpillet.'
    case 2:
    case 3:
      return 'Testen peger på, at du kan have et problem med spil. Dine spilvaner kan udvikle sig til en egentlig afhængighed. Derfor opfordres du til at tage kontakt til StopSpillet, hvor vi kan hjælpe dig med afklaring og sammen finde ud af eventuelle videre tiltag.'
    default:
      return 'Testen peger på, at du kan have en spilafhængighed. Du opfordres til at tage kontakt til StopSpillet, hvor vi kan hjælpe dig med afklaring og sammen finde ud af eventuelle videre tiltag.'
  }
}

export default function QuizResult () {
  return (
    <QuizContext.Consumer>
      {(context) => (
        <section>
          <h1>Resultat</h1>

          <h3>
            {resultSelector(context.state.quiz.filter(val => val === true).length)}
          </h3>

          <section>
            <button onClick={context.resetState}>
              Prøv igen!
            </button>
          </section>
        </section>
      )}
    </QuizContext.Consumer>
  )
}
