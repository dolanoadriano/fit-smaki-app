import { Curiosities } from "../../../utils";

export interface ICuriositiesState {
  curiosities?: Curiosities;
  activeCuriosities?: Curiosities;
  currentCuriositiesIndex: number;
}
