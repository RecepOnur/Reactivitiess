import { Message } from "semantic-ui-react";

interface Props {
  errors: string[] | null;
}

const ValidationErrors = ({ errors }: Props) => {
  console.log(errors);
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error: any, index) => (
            <Message.Item key={index}>{error}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationErrors;
