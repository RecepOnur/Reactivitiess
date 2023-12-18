import { makeAutoObservable, reaction, runInAction } from "mobx";
import { User, UserFormValues } from "../Models/User";
import agent from "../api/agent";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;
  token: string | null | undefined = localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) localStorage.setItem("jwt", token);
        else localStorage.removeItem("jwt");
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setToken = (token: string | null | undefined) => {
    this.token = token;
  };
  setAppLoaded = () => (this.appLoaded = true);

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    this.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
  };
  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    this.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate("/activities");
  };

  logout = () => {
    this.setToken(null);
    //localStorage.removeItem("jwt"); reaction icinde yapıyor
    this.user = null;
    router.navigate("/");
  };
}
