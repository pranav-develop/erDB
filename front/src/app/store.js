import { configureStore } from '@reduxjs/toolkit'
import editorReducer from '../Components/NodeEditor/Editor/editorSlice'

export default configureStore({
    reducer: {
        editor: editorReducer,
    },
})