import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../Models/Activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        this.activities = [];
        activities.forEach((activity: Activity) => {
          activity.date = activity.date.split("T")[0];
          this.activities.push(activity);
        });
        this.activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };
  setLoadingInitial(state: boolean) {
    this.loadingInitial = state;
  }
  handleSelectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
  };
  handleCancelSelectActivity = () => {
    this.selectedActivity = undefined;
  };
  handleFormOpen = (id?: string) => {
    id ? this.handleSelectActivity(id) : this.handleCancelSelectActivity();
    this.editMode = true;
  };
  handleCloseForm = () => {
    this.editMode = false;
  };
  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activities = [
          ...this.activities.filter((x) => x.id !== activity.id),
          activity,
        ];
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activities = [...this.activities.filter((x) => x.id !== id)];
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
