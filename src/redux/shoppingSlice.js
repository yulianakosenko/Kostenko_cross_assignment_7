import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const shoppingSlice = createSlice({
name: "shopping",

initialState,

reducers: {
addItem: (state, action) => {
state.push({
...action.payload,
checked: false,
});
},

removeItem: (state, action) => {
  return state.filter(
    (item) => item.id !== action.payload,
  );
},

toggleChecked: (state, action) => {
  const item = state.find(
    (i) => i.id === action.payload,
  );

  if (item) {
    item.checked = !item.checked;
  }
},

},
});

export const {
addItem,
removeItem,
toggleChecked,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
