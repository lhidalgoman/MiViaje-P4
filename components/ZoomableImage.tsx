import React from 'react';
import ImageZoom from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ZoomableImageProps {
    images: { url: string }[]; 
  visible: boolean;
  onClose: () => void;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ images, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose} >
      <ImageViewer 
        imageUrls={images}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        saveToLocalByLongPress={false}
      />
    </Modal>
  );
};

export default ZoomableImage;
