import axios from "axios"
import { movieService } from "../pages/_services"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("movieService", () => {
  afterEach(() => jest.clearAllMocks())

  describe("getPopular", () => {
    it("should get popular movies", async () => {
      const mockData = { results: [{ id: 1, title: "Test Movie" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getPopular()

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(result).toEqual(mockData)
    })
  })

  describe("getTrending", () => {
    it("should get trending movies", async () => {
      const mockData = { results: [{ id: 2, title: "Trending Movie" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getTrending()

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(result).toEqual(mockData)
    })
  })

  describe("getMovieDetails", () => {
    it("should get movie details by ID", async () => {
      const mockData = { id: 3, title: "Detail Movie" }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getMovieDetails("3")

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/movie/3"),
        expect.any(Object)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getMovieCredits", () => {
    it("should get movie credits by ID", async () => {
      const mockData = { cast: [{ id: 10, name: "Actor" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getMovieCredits("3")

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/movie/3/credits"),
        expect.any(Object)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getMovieVideos", () => {
    it("should get movie videos by ID", async () => {
      const mockData = { results: [{ id: "abc", key: "trailer" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getMovieVideos("3")

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/movie/3/videos"),
        expect.any(Object)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getSimilarMovies", () => {
    it("should get similar movies by ID", async () => {
      const mockData = { results: [{ id: 20, title: "Similar Movie" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getSimilarMovies("3")

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/movie/3/similar"),
        expect.any(Object)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("error handling", () => {
    it("should handle API errors", async () => {
      const mockError = {
        status: 500,
        response: { data: { status_message: "Server error" } },
      }
      mockedAxios.get.mockResolvedValue(mockError)

      await expect(movieService.getPopular()).rejects.toBe("Server error")
    })
  })
})
