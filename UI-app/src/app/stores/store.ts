import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store {
  activityStore: ActivityStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
