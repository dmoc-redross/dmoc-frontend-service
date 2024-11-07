import store from "../../../redux/app/store";
import { OptionType } from "../../Services/Interfaces";

export const option: OptionType[] = Array.from({ length: 16 }, (_, i) => ({
  label: `Level ${i + 1}`,
  value: i + 1,
}));

// const RewardMutipler = store.getState().user?.RewardMutipler;