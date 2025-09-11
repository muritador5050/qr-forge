// components/ActionButtons.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  SimpleGrid,
  Button,
  Divider,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Download, Copy } from 'lucide-react';

interface ActionButtonsProps {
  inputValue: string;
  onDownloadQR: (format: string) => void;
  onCopyToClipboard: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  inputValue,
  onDownloadQR,
  onCopyToClipboard,
}) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>Actions</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} w='full'>
            <Button
              onClick={() => onDownloadQR('png')}
              isDisabled={!inputValue.trim()}
              colorScheme='blue'
              leftIcon={<Download size={16} />}
              size='lg'
            >
              Download PNG
            </Button>

            <Button
              onClick={onCopyToClipboard}
              isDisabled={!inputValue.trim()}
              variant='outline'
              leftIcon={<Copy size={16} />}
              size='lg'
            >
              Copy to Clipboard
            </Button>
          </SimpleGrid>

          <Divider />

          <Text fontSize='sm' color='mutedColor' textAlign='center'>
            Additional Formats
          </Text>

          <HStack spacing={3}>
            <Button
              onClick={() => onDownloadQR('svg')}
              isDisabled={!inputValue.trim()}
              size='sm'
              variant='outline'
            >
              SVG
            </Button>
            <Button
              onClick={() => onDownloadQR('pdf')}
              isDisabled={!inputValue.trim()}
              size='sm'
              variant='outline'
            >
              PDF
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ActionButtons;
