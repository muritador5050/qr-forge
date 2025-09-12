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
  Box,
  Textarea,
  Switch,
  Button,
} from '@chakra-ui/react';
import { Palette, Upload, Type, Image } from 'lucide-react';

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
  logo?: string;
  onLogoChange: (logo: string | undefined) => void;
  logoSize: number;
  onLogoSizeChange: (size: number) => void;
  customText?: string;
  onCustomTextChange: (text: string) => void;
  showCustomText: boolean;
  onShowCustomTextChange: (show: boolean) => void;
  onReset: () => void;
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
  logo,
  onLogoChange,
  logoSize,
  onLogoSizeChange,
  customText,
  onCustomTextChange,
  showCustomText,
  onShowCustomTextChange,
  onReset,
}) => {
  return (
    <Collapse in={isOpen}>
      <Card bg='cardBg' borderColor='borderColor'>
        <CardHeader pb={4}>
          <HStack justify='space-between'>
            <Heading size='md'>
              <HStack>
                <Palette size={20} />
                <Text>Customization</Text>
              </HStack>
            </Heading>
            <Button
              size='sm'
              variant='ghost'
              colorScheme='red'
              onClick={onReset}
            >
              Reset
            </Button>
          </HStack>
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

              {/* Logo Upload Section */}
              <FormControl>
                <FormLabel>
                  <HStack>
                    <Image size={16} />
                    <Text>Logo</Text>
                  </HStack>
                </FormLabel>
                <VStack spacing={3} align='stretch'>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          onLogoChange(event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    size='sm'
                  />

                  {logo && (
                    <>
                      <HStack>
                        <Box
                          w={8}
                          h={8}
                          border='1px'
                          borderColor='gray.300'
                          borderRadius='md'
                          overflow='hidden'
                        >
                          <img
                            src={logo}
                            alt='Logo preview'
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                        <Button
                          size='xs'
                          colorScheme='red'
                          variant='ghost'
                          onClick={() => onLogoChange(undefined)}
                        >
                          Remove
                        </Button>
                      </HStack>

                      <FormControl>
                        <FormLabel fontSize='sm'>
                          Logo Size: {logoSize}%
                        </FormLabel>
                        <Slider
                          value={logoSize}
                          onChange={onLogoSizeChange}
                          min={10}
                          max={20}
                          colorScheme='blue'
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </FormControl>
                    </>
                  )}
                </VStack>
              </FormControl>

              {/* Custom Text Section */}
              <FormControl>
                <FormLabel>
                  <HStack justify='space-between' w='full'>
                    <HStack>
                      <Type size={16} />
                      <Text>Custom Text</Text>
                    </HStack>
                    <Switch
                      isChecked={showCustomText}
                      onChange={(e) => onShowCustomTextChange(e.target.checked)}
                      size='sm'
                    />
                  </HStack>
                </FormLabel>

                {showCustomText && (
                  <Textarea
                    value={customText || ''}
                    onChange={(e) => onCustomTextChange(e.target.value)}
                    placeholder="e.g., 'WiFi Password', 'Our Website', 'Contact Info'"
                    size='sm'
                    rows={2}
                  />
                )}
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
