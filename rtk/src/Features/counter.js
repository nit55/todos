import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCount, makeSelectData } from "./selectors";
import { increment, decrement } from "./counterSlice";

// const stateSelector = createStructuredSelector({
//   count: makeSelectCount(),
//   data: makeSelectData(),
// });

function Counter() {
  //   const { count, data } = useSelector(stateSelector);
  const count = useSelector((state) => state.counter.count);
  const data = useSelector((state) => state.counter.data);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>increment</button>
      {count}
      {console.log(data)}
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
}

export default Counter;
