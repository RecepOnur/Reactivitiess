import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/Models/Activity";

interface Props {
  activity: Activity;
  handleCancelSelectActivity: () => void;
  handleOpenForm: (id: string) => void;
}

const ActivityDetails = ({
  activity,
  handleCancelSelectActivity,
  handleOpenForm,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => handleOpenForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={handleCancelSelectActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
