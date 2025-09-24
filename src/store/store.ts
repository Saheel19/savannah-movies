import { configureStore } from "@reduxjs/toolkit"
import { movieReducer } from "pages/_reducer"
import { searchReducer } from "utils/searchSlice"

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
