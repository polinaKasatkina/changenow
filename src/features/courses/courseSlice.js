import { createSlice } from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
  name: 'course',
  initialState: {
    interval: 0.1,
    oldCourse: 0,
    course: 0,
    difference: 0
  },
  reducers: {
    changeInterval: (state, action) => {
      state.interval = Number(action.payload)
    },
    updateCourse: (state, action) => {
      state.oldCourse = state.course;
      state.course = action.payload;
    },
    checkDifference: state => {

      let differenceInPercents = 0;

      if (state.oldCourse != 0) {
        if (state.oldCourse < state.course) {

          differenceInPercents = (((state.course - state.oldCourse ) / state.oldCourse) * 100).toFixed(2);
          differenceInPercents = differenceInPercents * -1;

          //a < b = ((b-a)/a) * 100
        } else if (state.oldCourse > state.course) {
          //a > b = ((a-b)/a) * 100

          differenceInPercents = (((state.oldCourse - state.course) / state.oldCourse) * 100).toFixed(2);

        }
      }

      state.difference = differenceInPercents;

    }
  },
});

export const { changeInterval, updateCourse, checkDifference } = coursesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;

export default coursesSlice.reducer;
