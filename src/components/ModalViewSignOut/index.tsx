import React, { ReactNode } from 'react';
import { Modal, View, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { Background } from '../Background';
import { styles } from './styles';

type Props = ModalProps & {
  children: ReactNode,
  closeModal: () => void;
}

export const ModalViewSignOut = ({ closeModal, children, ...rest }: Props) => {
  return (
    <Modal
      transparent
      animationType='fade'
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal} >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  );
}

