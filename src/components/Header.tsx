import React from 'react';
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { Moon, Sun, History, Settings } from 'lucide-react';

interface HeaderProps {
  colorMode: 'light' | 'dark';
  onToggleColorMode: () => void;
  onToggleHistory: () => void;
  onToggleSettings: () => void;
  isHistoryOpen: boolean;
  isSettingsOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  colorMode,
  onToggleColorMode,
  onToggleHistory,
  onToggleSettings,
  isHistoryOpen,
  isSettingsOpen,
}) => {
  return (
    <Box
      bg='cardBg'
      borderBottom='1px'
      borderColor='borderColor'
      shadow='sm'
      position='sticky'
      top={0}
      zIndex={10}
    >
      <Container maxW='7xl' py={4}>
        <Flex justify='space-between' align='center'>
          <HStack spacing={3}>
            <Box
              w={10}
              h={10}
              bg='blue.600'
              borderRadius='lg'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Text color='white' fontWeight='bold' fontSize='sm'>
                QR
              </Text>
            </Box>
            <Heading size='lg' color='textColor'>
              QR Code Generator Pro
            </Heading>
          </HStack>

          <HStack spacing={2}>
            <Tooltip label='View History'>
              <IconButton
                icon={<History size={20} />}
                onClick={onToggleHistory}
                variant='ghost'
                colorScheme='gray'
                isActive={isHistoryOpen}
                aria-label='View history'
              />
            </Tooltip>

            <Tooltip label='Settings'>
              <IconButton
                icon={<Settings size={20} />}
                onClick={onToggleSettings}
                variant='ghost'
                colorScheme='gray'
                isActive={isSettingsOpen}
                aria-label='Settings'
              />
            </Tooltip>

            <Tooltip
              label={`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`}
            >
              <IconButton
                icon={
                  colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />
                }
                onClick={onToggleColorMode}
                variant='ghost'
                colorScheme='gray'
                aria-label='Toggle color mode'
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
