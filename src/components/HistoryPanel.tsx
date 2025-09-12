import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  Text,
  IconButton,
  Flex,
  Tooltip,
  Collapse,
  Badge,
} from '@chakra-ui/react';
import { History, Trash2 } from 'lucide-react';
import { QRHistoryItem } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  history: QRHistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: QRHistoryItem) => void;
  onDeleteHistoryItem?: (id: number) => void;
  hoverBgColor: string;
  mutedColor: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  history,
  onClearHistory,
  onSelectHistoryItem,
  hoverBgColor,
  mutedColor,
}) => {
  return (
    <Collapse in={isOpen}>
      <Card bg='cardBg' borderColor='borderColor'>
        <CardHeader pb={4}>
          <Flex justify='space-between' align='center'>
            <Heading size='md'>
              <History size={20} />
              <Text>Recent QR Codes</Text>
            </Heading>
            {history.length > 0 && (
              <Tooltip label='Clear History'>
                <IconButton
                  icon={<Trash2 size={16} />}
                  onClick={onClearHistory}
                  size='sm'
                  colorScheme='red'
                  variant='ghost'
                  aria-label='Clear history'
                />
              </Tooltip>
            )}
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          {history.length === 0 ? (
            <Text color={mutedColor} textAlign='center' py={4}>
              No history yet. Generate some QR codes!
            </Text>
          ) : (
            <VStack spacing={2} maxH='240px' overflowY='auto'>
              {history.map((item) => (
                <Card
                  key={item.id}
                  w='full'
                  cursor='pointer'
                  onClick={() => onSelectHistoryItem(item)}
                  _hover={{ bg: hoverBgColor }}
                  variant='outline'
                >
                  <CardBody py={3}>
                    <VStack align='start' spacing={1}>
                      <Badge colorScheme='blue' textTransform='capitalize'>
                        {item.type}
                      </Badge>
                      <Text fontSize='sm' noOfLines={1}>
                        {item.value}
                      </Text>
                      <Text fontSize='xs' color={mutedColor}>
                        {item.timestamp}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          )}
        </CardBody>
      </Card>
    </Collapse>
  );
};

export default HistoryPanel;
