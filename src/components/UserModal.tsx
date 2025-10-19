import { useState } from 'react';
import Modal from './Modal';

const UserModal = () => {
  const [user, setUser] = useState({ value: '', open: false });
  console.log(user);

  return (
    <Modal.Provider state={user} actions={{ update: setUser }}>
      <Modal.Trigger />
      <Modal.Content>
        <Modal.Header title={'Add user'} description={'In this modal you can add users'} />
        <Modal.InputField />
        <Modal.Footer>
          <Modal.Submit />
        </Modal.Footer>
      </Modal.Content>
    </Modal.Provider>
  );
};

export default UserModal;
