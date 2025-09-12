import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { InputType, InputTypeOption } from '../types';

interface ContentTypeSelectorProps {
  inputType: string;
  onInputTypeChange: (type: InputType) => void;
  inputTypes: InputTypeOption[];
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  inputType,
  onInputTypeChange,
  inputTypes,
}) => {
  return (
    <Card bg='cardBg' borderColor='borderColor'>
      <CardHeader pb={4}>
        <Heading size='md'>Content Type</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
          {inputTypes.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              onClick={() => onInputTypeChange(value)}
              variant={inputType === value ? 'solid' : 'outline'}
              colorScheme={inputType === value ? 'blue' : 'gray'}
              leftIcon={<Icon size={16} />}
              size='sm'
              fontWeight='medium'
            >
              {label}
            </Button>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default ContentTypeSelector;
