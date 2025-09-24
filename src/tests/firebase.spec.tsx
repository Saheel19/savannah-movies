import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

jest.mock("../firebase/firebase", () => ({
  auth: {},
}))

// Mock signInWithEmailAndPassword separately
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}))

describe("Firebase Authentication", () => {
  it("should initialize auth", () => {
    expect(auth).toBeDefined()
  })

  it("should call signInWithEmailAndPassword with correct arguments", async () => {
    const mockEmail = "test@example.com"
    const mockPassword = "password123"
    const mockUserCredential = { user: { uid: "123" } }

    ;(signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
      mockUserCredential
    )

    const result = await signInWithEmailAndPassword(
      auth,
      mockEmail,
      mockPassword
    )

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      mockEmail,
      mockPassword
    )
    expect(result).toEqual(mockUserCredential)
  })
})
