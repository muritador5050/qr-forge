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
import { FileText } from 'lucide-react';
import QRWithLogo from './QRWithLogo';

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
  logo?: string;
  logoSize: number;
  customText?: string;
  showCustomText: boolean;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  inputValue,
  qrValue,
  qrSize,
  fgColor,
  bgColorQR,
  errorLevel,
  marginSize,
  emptyQrBgColor,
  borderColor,
  mutedColor,
  qrRef,
  logo,
  logoSize,
  customText,
  showCustomText,
}) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>QR Code Preview</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
          {/* Custom Text */}
          {showCustomText && customText && (
            <Text
              fontSize='lg'
              fontWeight='semibold'
              textAlign='center'
              color={fgColor}
              bg={bgColorQR}
              px={4}
              py={2}
              borderRadius='md'
              maxW={qrSize}
            >
              {customText}
            </Text>
          )}

          {/* QR Code */}
          <Center zIndex={1}>
            <Box ref={qrRef} p={4} borderRadius='lg' bg={bgColorQR}>
              {inputValue ? (
                <QRWithLogo
                  qrValue={qrValue}
                  qrSize={qrSize}
                  fgColor={fgColor}
                  bgColor={bgColorQR}
                  errorLevel={errorLevel}
                  marginSize={marginSize}
                  logo={logo}
                  logoSize={logoSize}
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
        </VStack>
      </CardBody>
    </Card>
  );
};

export default QRCodeDisplay;
