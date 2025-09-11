// components/InfoPanel.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Info } from 'lucide-react';

interface InfoPanelProps {
  mutedColor: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ mutedColor }) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>
          <HStack>
            <Info size={20} />
            <Text>Quick Tips</Text>
          </HStack>
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={2} align='start'>
          <Text fontSize='sm' color={mutedColor}>
            • URLs automatically get https:// prefix if missing
          </Text>
          <Text fontSize='sm' color={mutedColor}>
            • WiFi format: NetworkName|Password|Security (WPA/WEP)
          </Text>
          <Text fontSize='sm' color={mutedColor}>
            • Higher error correction = more damage tolerance
          </Text>
          <Text fontSize='sm' color={mutedColor}>
            • Larger QR codes scan better from distance
          </Text>
          <Text fontSize='sm' color={mutedColor}>
            • High contrast colors improve readability
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InfoPanel;
