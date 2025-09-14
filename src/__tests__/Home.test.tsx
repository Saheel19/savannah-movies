// __tests__/Home.test.tsx
import React from "react"
import { render, screen } from "@testing-library/react"
import { useDispatch, useSelector } from "react-redux"
import Home from "../pages/Home"

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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
  it("renders loading state", () => {
    renderHomeWithState({ loading: true, movies: [], error: null })
    expect(screen.getByText(/Loading popular movies/i)).toBeInTheDocument()
  })

  it("renders error state", () => {
    renderHomeWithState({
      loading: false,
      movies: [],
      error: "Something went wrong",
    })
    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument()
  })

  it("renders movies list", () => {
    renderHomeWithState({
      loading: false,
      movies: [
        { id: 1, title: "Movie One", poster_path: "/poster1.jpg" },
        { id: 2, title: "Movie Two", poster_path: "/poster2.jpg" },
      ],
      error: null,
    })

    expect(screen.getByText("Movie One")).toBeInTheDocument()
    expect(screen.getByText("Movie Two")).toBeInTheDocument()
  })
})
