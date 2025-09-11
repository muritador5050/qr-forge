// components/Footer.tsx
import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';

interface FooterProps {
  borderColor: string;
  cardBg: string;
  mutedColor: string;
}

const Footer: React.FC<FooterProps> = ({ borderColor, cardBg, mutedColor }) => {
  return (
    <Box
      as='footer'
      borderTop='1px'
      borderColor={borderColor}
      bg={cardBg}
      mt={12}
    >
      <Container maxW='7xl' py={6}>
        <Text fontSize='sm' color={mutedColor} textAlign='center'>
          © 2025 QR Code Generator Pro. Built with React & Chakra UI.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
