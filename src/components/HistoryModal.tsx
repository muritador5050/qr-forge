import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Box,
  Divider,
} from '@chakra-ui/react';
import { QRHistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: QRHistoryItem | null;
  onLoad: (item: QRHistoryItem) => void;
  onDelete: (id: number) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  item,
  onLoad,
  onDelete,
}) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align='stretch'>
            <HStack justify='space-between'>
              <Badge colorScheme='blue' textTransform='capitalize'>
                {item.type}
              </Badge>
              <Text fontSize='sm' color='gray.500'>
                {item.timestamp}
              </Text>
            </HStack>

            <Box>
              <Text fontWeight='semibold' mb={2}>
                Content:
              </Text>
              <Text
                fontSize='sm'
                bg='gray.50'
                color='black'
                p={3}
                borderRadius='md'
              >
                {item.value}
              </Text>
            </Box>

            <Box>
              <Text fontWeight='semibold' mb={2}>
                Settings:
              </Text>
              <VStack spacing={2} align='stretch' fontSize='sm'>
                <HStack justify='space-between'>
                  <Text>Size:</Text>
                  <Text>{item.settings.qrSize}px</Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text>Foreground:</Text>
                  <HStack>
                    <Box
                      w={4}
                      h={4}
                      bg={item.settings.fgColor}
                      borderRadius='sm'
                    />
                    <Text>{item.settings.fgColor}</Text>
                  </HStack>
                </HStack>
                <HStack justify='space-between'>
                  <Text>Background:</Text>
                  <HStack>
                    <Box
                      w={4}
                      h={4}
                      bg={item.settings.bgColor}
                      borderRadius='sm'
                      border='1px'
                      borderColor='gray.300'
                    />
                    <Text>{item.settings.bgColor}</Text>
                  </HStack>
                </HStack>
                <HStack justify='space-between'>
                  <Text>Error Level:</Text>
                  <Text>{item.settings.errorLevel}</Text>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            <HStack spacing={3}>
              <Button
                colorScheme='blue'
                onClick={() => {
                  onLoad(item);
                  onClose();
                }}
                flex={1}
              >
                Load This QR Code
              </Button>
              <Button
                colorScheme='red'
                variant='outline'
                onClick={() => {
                  onDelete(item.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
