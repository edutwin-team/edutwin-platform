import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../../src/components/navbar/Navbar'

describe('Navbar', () => {
  it('affiche le titre du projet', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText(/Digital Twin Edu/i)).toBeInTheDocument()
  })

  it('affiche les liens de navigation', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Quiz/i)).toBeInTheDocument()
    expect(screen.getByText(/Profil/i)).toBeInTheDocument()
    expect(screen.getByText(/Enseignant/i)).toBeInTheDocument()
    expect(screen.getByText(/Projet/i)).toBeInTheDocument()
  })
})
