// __tests__/firebase.spec.ts
import { auth } from "../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

// Mock only signInWithEmailAndPassword
jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth")
  return {
    ...originalModule,
    signInWithEmailAndPassword: jest.fn(),
  }
})

describe("Firebase Authentication", () => {
  it("should initialize auth", () => {
    expect(auth).toBeDefined()
  })

  it("should call signInWithEmailAndPassword with correct arguments", async () => {
    const mockEmail = "test@example.com"
    const mockPassword = "password123"
    const mockUserCredential = { user: { uid: "123" } }

    // Mock implementation
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
