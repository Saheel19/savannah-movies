import axios from "axios"
import { movieService } from "../pages/_services"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("movieService", () => {
  afterEach(() => jest.clearAllMocks())

  describe("getPopular", () => {
    it("should fetch popular movies", async () => {
      const mockData = { results: [{ id: 1, title: "Test Movie" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getPopular()

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(result).toEqual(mockData)
    })
  })

  describe("getTrending", () => {
    it("should fetch trending movies", async () => {
      const mockData = { results: [{ id: 2, title: "Trending Movie" }] }
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockData })

      const result = await movieService.getTrending()

      expect(mockedAxios.get).toHaveBeenCalled()
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
