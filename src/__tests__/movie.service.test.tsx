import axios from "axios"
import { movieService } from "../pages/_services"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("movieService", () => {
  it("fetches popular movies", async () => {
    const mockMovies = [{ id: 1, title: "Movie A" }]

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { results: mockMovies },
    })

    const result = await movieService.getPopular()

    expect(result).toEqual({ results: mockMovies })
  })
})
