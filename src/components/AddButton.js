import {Image, TouchableOpacity} from 'react-native';

const AddButton = () => {
  return (
    <TouchableOpacity
      style={{
        width: 74,
        height: 74,
        borderRadius: 99,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../assets/icons/add.png')} />
    </TouchableOpacity>
  );
};

export default AddButton;
