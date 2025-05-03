import {useState} from 'react';
import {Modal, View} from 'react-native';

const CustomModal = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal transparent visible={showModal} statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '95%',
            paddingBottom: 25,
            backgroundColor: '#9C043C',
            borderRadius: 32,
            paddingTop: 25,
            paddingBottom: 60,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
