import { AcomptesAction } from "../actions/AcomptesAction";
import { Acompte } from "../interfaces/ReservationInterface";

export const initialState: Acompte[] = [];

const acomptesReducer = (
  state = initialState,
  action: AcomptesAction
): Acompte[] => {
  switch (action.type) {
    case "ADD_ACOMPTE":
      return [...state, action.payload];
    case "DELETE_ACOMPTE":
      return state.filter((acompte) => acompte.id !== action.payload);
    case "RESET_ACOMPTE":
      return initialState;
    default:
      return state;
  }
};

export default acomptesReducer;
