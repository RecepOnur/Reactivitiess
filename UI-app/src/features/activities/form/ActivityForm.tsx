import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/Models/Activity";
import { ChangeEvent, useState } from "react";

interface Props {
  handleCloseForm: () => void;
  activity: Activity | undefined;
  handleCreateOrEditActivity: (activity: Activity) => void;
}

const ActivityForm = ({
  handleCloseForm,
  activity: selectedActivity,
  handleCreateOrEditActivity,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    date: "",
    category: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    handleCreateOrEditActivity(activity);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={handleCloseForm}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;