// components/QRCodeDisplay.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Center,
  Box,
  VStack,
  Text,
} from '@chakra-ui/react';
import { QRCodeCanvas } from 'qrcode.react';
import { FileText } from 'lucide-react';
import { ErrorCorrectionLevel } from '../types';

interface QRCodeDisplayProps {
  inputValue: string;
  qrValue: string;
  qrSize: number;
  marginSize: number;
  fgColor: string;
  bgColorQR: string;
  errorLevel: string;
  emptyQrBgColor: string;
  borderColor: string;
  mutedColor: string;
  qrRef: React.RefObject<HTMLDivElement>;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  inputValue,
  qrValue,
  qrSize,
  marginSize,
  fgColor,
  bgColorQR,
  errorLevel,
  emptyQrBgColor,
  borderColor,
  mutedColor,
  qrRef,
}) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>QR Code Preview</Heading>
      </CardHeader>
      <CardBody>
        <Center>
          <Box ref={qrRef} p={4} borderRadius='lg' bg={bgColorQR}>
            {inputValue ? (
              <QRCodeCanvas
                value={qrValue}
                size={qrSize}
                fgColor={fgColor}
                bgColor={bgColorQR}
                level={errorLevel as ErrorCorrectionLevel}
                marginSize={marginSize}
              />
            ) : (
              <Center
                w={qrSize}
                h={qrSize}
                border='2px dashed'
                borderColor={borderColor}
                borderRadius='lg'
                bg={emptyQrBgColor}
              >
                <VStack spacing={3}>
                  <FileText size={32} color={mutedColor} />
                  <Text fontSize='sm' color={mutedColor} textAlign='center'>
                    Enter content to generate QR code
                  </Text>
                </VStack>
              </Center>
            )}
          </Box>
        </Center>
      </CardBody>
    </Card>
  );
};

export default QRCodeDisplay;
