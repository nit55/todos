import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./counterSlice";

const selectCounter = (state) => state.counter || initialState;

const makeSelectCount = () =>
  createSelector(selectCounter, (loansState) => loansState.count);

const makeSelectData = () =>
  createSelector(selectCounter, (loansState) => loansState.data);

export { selectCounter, makeSelectCount, makeSelectData };
