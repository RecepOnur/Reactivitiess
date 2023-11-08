import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/Models/Activity";
import { SyntheticEvent, useState } from "react";

interface Props {
  activities: Activity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList = ({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState("");

  const DeleteActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    handleDeleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city} , {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  name={activity.id}
                  floated="right"
                  loading={submitting && target === activity.id}
                  content="Delete"
                  color="red"
                  onClick={(e) => DeleteActivity(e, activity.id)}
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => handleSelectActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
