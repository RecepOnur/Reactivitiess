import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/Models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  editMode: boolean;
  handleOpenForm: (id: string) => void;
  handleCloseForm: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  handleSelectActivity,
  handleCancelSelectActivity,
  editMode,
  handleOpenForm,
  handleCloseForm,
  handleCreateOrEditActivity,
  handleDeleteActivity,
  submitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            handleOpenForm={handleOpenForm}
          />
        )}
        {editMode && (
          <ActivityForm
            handleCloseForm={handleCloseForm}
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
