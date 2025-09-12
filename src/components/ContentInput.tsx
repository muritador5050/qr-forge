import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  Textarea,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';

interface ContentInputProps {
  inputValue: string;
  onInputValueChange: (value: string) => void;
  inputType: string;
  placeholder: string;
}

const ContentInput: React.FC<ContentInputProps> = ({
  inputValue,
  onInputValueChange,
  inputType,
  placeholder,
}) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>Content</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3} align='stretch'>
          <Textarea
            value={inputValue}
            onChange={(e) => onInputValueChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            resize='none'
            focusBorderColor='blue.500'
          />
          <Flex justify='space-between' align='center'>
            <Text fontSize='sm' color='mutedColor'>
              {inputValue.length} characters
            </Text>
            {(inputType === 'wifi' || inputType === 'vcard') && (
              <Badge colorScheme='blue' variant='subtle'>
                {inputType === 'wifi'
                  ? 'Format: Name|Pass|WPA'
                  : 'Format: Name|Phone|Email'}
              </Badge>
            )}
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ContentInput;
