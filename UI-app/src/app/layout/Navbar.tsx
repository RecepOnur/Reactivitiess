import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  handleOpenForm: () => void;
}

const Navbar = ({ handleOpenForm }: Props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={handleOpenForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
