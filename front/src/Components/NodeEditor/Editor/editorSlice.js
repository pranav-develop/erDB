import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
    name: 'counter',
    initialState: {
        editorJson: {},
    },
    reducers: {
        updateEditorJson: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.editorJson = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateEditorJson } = editorSlice.actions

export default editorSlice.reducer