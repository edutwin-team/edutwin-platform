import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/home/Home'

describe('Home Page', () => {
  it('affiche le titre principal', () => {
    render(<Home />)
    expect(
      screen.getByText(/Jumeaux numériques pour l’éducation/i)
    ).toBeInTheDocument()
  })

  it('affiche la liste des fonctionnalités', () => {
    render(<Home />)
    expect(screen.getByText(/Analyse du profil/i)).toBeInTheDocument()
    expect(screen.getByText(/Génération de quiz adaptatifs/i)).toBeInTheDocument()
    expect(screen.getByText(/Amélioration continue/i)).toBeInTheDocument()
  })
})
