import {useState} from 'react';
import {Modal, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomAlert = ({visible, children}) => {
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
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#FD579A', '#9A023A']}
          style={{
            width: '70%',
            paddingTop: 20,
            borderRadius: 14,
            marginTop: 15,
          }}>
          {children}
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default CustomAlert;
