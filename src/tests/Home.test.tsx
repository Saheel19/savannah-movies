import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { useDispatch, useSelector } from "react-redux"
import Home from "../pages/Home"

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock("components/MoviesModal", () => ({
  __esModule: true,
  default: ({ movie, open }: any) =>
    open && movie ? <div data-testid="movies-modal">{movie.title}</div> : null,
}))

const mockedDispatch = jest.fn()
const mockUseSelector = useSelector as unknown as jest.Mock

beforeEach(() => {
  ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockedDispatch)
  jest.clearAllMocks()
})

const renderHomeWithState = (state: any) => {
  mockUseSelector.mockReturnValue(state)
  render(<Home />)
}

describe("Home Component", () => {
  it("renders skeletons while loading", () => {
    renderHomeWithState({
      trending: [],
      popular: [],
      loading: true,
    })
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0)
  })

  it("renders trending and popular movies lists", () => {
    renderHomeWithState({
      trending: [
        {
          id: 1,
          title: "Trending Movie 1",
          poster_path: "/trend1.jpg",
          release_date: "2025-01-01",
          vote_average: 7.5,
        },
      ],
      popular: [
        {
          id: 2,
          title: "Popular Movie 1",
          poster_path: "/pop1.jpg",
          release_date: "2025-02-01",
          vote_average: 8.0,
        },
      ],
      loading: false,
    })

    expect(screen.getByText("Trending Movie 1")).toBeInTheDocument()
    expect(screen.getByText("Popular Movie 1")).toBeInTheDocument()
  })

  it("renders 'No movies found.' if sections are empty", () => {
    renderHomeWithState({
      trending: [],
      popular: [],
      loading: false,
    })

    expect(screen.getAllByText(/No movies found./i).length).toBe(2)
  })

  it("opens modal when movie is clicked", () => {
    renderHomeWithState({
      trending: [
        {
          id: 1,
          title: "Trending Movie 1",
          poster_path: "/trend1.jpg",
          release_date: "2025-01-01",
          vote_average: 7.0,
        },
      ],
      popular: [],
      loading: false,
    })

    fireEvent.click(screen.getByText("Trending Movie 1"))

    const modal = screen.getByTestId("movies-modal")
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent("Trending Movie 1")
  })
})
