// components/SettingsPanel.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  SimpleGrid,
  Select,
  HStack,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { Palette } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  qrSize: number;
  onQrSizeChange: (size: number) => void;
  fgColor: string;
  onFgColorChange: (color: string) => void;
  bgColorQR: string;
  onBgColorQRChange: (color: string) => void;
  errorLevel: string;
  onErrorLevelChange: (level: string) => void;
  marginSize: number;
  onMarginSizeChange: (size: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  qrSize,
  onQrSizeChange,
  fgColor,
  onFgColorChange,
  bgColorQR,
  onBgColorQRChange,
  errorLevel,
  onErrorLevelChange,
  marginSize,
  onMarginSizeChange,
}) => {
  return (
    <Collapse in={isOpen}>
      <Card bg='cardBg' borderColor='borderColor'>
        <CardHeader pb={4}>
          <Heading size='md'>
            <HStack>
              <Palette size={20} />
              <Text>Customization</Text>
            </HStack>
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <VStack spacing={6} align='stretch'>
            {/* Size and Margin Sliders */}
            <SimpleGrid columns={1} spacing={4}>
              <FormControl>
                <FormLabel>Size: {qrSize}px</FormLabel>
                <Slider
                  value={qrSize}
                  onChange={onQrSizeChange}
                  min={128}
                  max={512}
                  colorScheme='blue'
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>

              {/* Add this new margin control */}
              <FormControl>
                <FormLabel>Margin: {marginSize} modules</FormLabel>
                <Slider
                  value={marginSize}
                  onChange={onMarginSizeChange}
                  min={0}
                  max={8}
                  colorScheme='blue'
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
            </SimpleGrid>

            {/* Colors */}
            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>Foreground Color</FormLabel>
                <Input
                  type='color'
                  value={fgColor}
                  onChange={(e) => onFgColorChange(e.target.value)}
                  h={12}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <Input
                  type='color'
                  value={bgColorQR}
                  onChange={(e) => onBgColorQRChange(e.target.value)}
                  h={12}
                />
              </FormControl>
            </SimpleGrid>

            {/* Error Correction */}
            <FormControl>
              <FormLabel>Error Correction Level</FormLabel>
              <Select
                value={errorLevel}
                onChange={(e) => onErrorLevelChange(e.target.value)}
              >
                <option value='L'>Low (7%)</option>
                <option value='M'>Medium (15%)</option>
                <option value='Q'>Quartile (25%)</option>
                <option value='H'>High (30%)</option>
              </Select>
            </FormControl>
          </VStack>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default SettingsPanel;
