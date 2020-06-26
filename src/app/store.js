import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/courseSlice';

export default configureStore({
  reducer: {
    courses: coursesReducer,
  },
});
