import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activities } = activityStore;

  useEffect(() => {
    if (activities.length <= 2) loadActivities();
  }, [loadActivities, activities]);
  return (
    <>
      {activityStore.loadingInitial ? (
        <LoadingComponent content="Loading app" />
      ) : (
        <Grid>
          <Grid.Column width="10">
            <ActivityList />
          </Grid.Column>
          <Grid.Column width="6">
            <ActivityFilters />
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default observer(ActivityDashboard);
