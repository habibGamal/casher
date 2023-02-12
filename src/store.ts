import { configureStore } from '@reduxjs/toolkit'
import addProductReducer from './app/slices/addProduct'
// ...

const store = configureStore({
    reducer: {
        addProduct: addProductReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch