import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "semantic-ui-react";

const ModalsContainer = () => {
  const { modalStore } = useStore();
  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="tiny"
    >
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalsContainer);
