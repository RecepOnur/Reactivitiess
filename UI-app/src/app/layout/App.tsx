import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../Models/Activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };
  const handleOpenForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };
  const handleCloseForm = () => {
    setEditMode(false);
  };
  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };
  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  useEffect(() => {
    agent.Activities.list().then((res) => {
      let activities: Activity[] = [];
      res.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingComponent content="Loading app" />
      ) : (
        <>
          <Navbar handleOpenForm={handleOpenForm} />
          <Container style={{ marginTop: "7em" }}>
            <ActivityDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              handleSelectActivity={handleSelectActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
              editMode={editMode}
              handleOpenForm={handleOpenForm}
              handleCloseForm={handleCloseForm}
              handleCreateOrEditActivity={handleCreateOrEditActivity}
              handleDeleteActivity={handleDeleteActivity}
              submitting={submitting}
            />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
