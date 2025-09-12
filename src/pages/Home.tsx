// Home.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  useColorMode,
  useColorModeValue,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { Type, Link, Mail, Phone, Wifi, User } from 'lucide-react';
import ContentTypeSelector from '../components/ContentTypeSelector';
import ContentInput from '../components/ContentInput';
import QRCodeDisplay from '../components/QrCodeDisplay';
import SettingsPanel from '../components/SettingsPanel';
import HistoryPanel from '../components/HistoryPanel';
import ActionButtons from '../components/ActionButtons';
import InfoPanel from '../components/InfoPanel';
import Footer from '../components/Footer';
import { InputType, QRHistoryItem, InputTypeOption } from '../types/index';
import Header from '../components/Header';
import HistoryModal from '../components/HistoryModal';

const Home: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const emptyQrBgColor = useColorModeValue('gray.50', 'gray.700');

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.900', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');

  // Disclosure hooks for collapsible sections
  const { isOpen: isSettingsOpen, onToggle: toggleSettings } = useDisclosure();
  const { isOpen: isHistoryOpen, onToggle: toggleHistory } = useDisclosure();
  const {
    isOpen: isHistoryModalOpen,
    onOpen: openHistoryModal,
    onClose: closeHistoryModal,
  } = useDisclosure();

  // State management
  const [inputType, setInputType] = useState<InputType>('text');
  const [inputValue, setInputValue] = useState('');
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<QRHistoryItem | null>(null);
  const [logo, setLogo] = useState<string | undefined>();
  const [logoSize, setLogoSize] = useState(20); // 20% of QR code size
  const [customText, setCustomText] = useState<string>('');
  const [showCustomText, setShowCustomText] = useState(false);
  const [qrSize, setQrSize] = useState(256);
  const [marginSize, setMarginSize] = useState(4);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColorQR, setBgColorQR] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState('H');
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('qrHistory');
    if (savedHistory) {
      try {
        const parsedHistory: QRHistoryItem[] = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history from localStorage:', error);
      }
    }
  }, []);

  const handleReset = () => {
    setCustomText('');
    setShowCustomText(false);
    setFgColor('#000000');
    setBgColorQR('#ffffff');
    setQrSize(256);
    setMarginSize(4);
    setErrorLevel('H');
    setLogo(undefined);
    setLogoSize(20);
    showNotification('Settings reset to defaults!');
  };

  const showNotification = (
    message: string,
    status: 'success' | 'warning' | 'error' = 'success'
  ) => {
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const generateQRValue = (): string => {
    switch (inputType) {
      case 'url':
        return inputValue.startsWith('http')
          ? inputValue
          : `https://${inputValue}`;
      case 'email':
        return `mailto:${inputValue}`;
      case 'phone':
        return `tel:${inputValue}`;
      case 'wifi':
        const [ssid, password, security] = inputValue.split('|');
        return `WIFI:T:${security || 'WPA'};S:${ssid};P:${password};;`;
      case 'vcard':
        const [name, phone, email] = inputValue.split('|');
        return `BEGIN:VCARD\\nVERSION:3.0\\nFN:${name}\\nTEL:${phone}\\nEMAIL:${email}\\nEND:VCARD`;
      default:
        return inputValue;
    }
  };

  const handleSelectHistoryItem = (item: QRHistoryItem) => {
    setSelectedHistoryItem(item);
    openHistoryModal();
  };

  const deleteHistoryItem = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('qrHistory', JSON.stringify(updatedHistory));
    showNotification('History item deleted!');
  };

  const saveToHistory = () => {
    if (!inputValue.trim()) return;

    const newItem: QRHistoryItem = {
      id: Date.now(),
      type: inputType,
      value: inputValue,
      qrValue: generateQRValue(),
      timestamp: new Date().toLocaleString(),
      settings: {
        qrSize,
        marginSize,
        fgColor,
        bgColor: bgColorQR,
        errorLevel,
        logo,
        logoSize,
        customText,
        showCustomText,
      },
    };

    const updatedHistory = [newItem, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem('qrHistory', JSON.stringify(updatedHistory));
  };

  const downloadQR = async (format: string) => {
    if (!inputValue.trim()) {
      showNotification('Please enter some content first!', 'warning');
      return;
    }

    saveToHistory();

    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) return;

    const textHeight = showCustomText && customText ? 60 : 0;
    const padding = 20;

    finalCanvas.width = qrSize + padding * 2;
    finalCanvas.height = qrSize + textHeight + padding * 2;

    finalCtx.fillStyle = bgColorQR;
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    if (showCustomText && customText) {
      finalCtx.fillStyle = fgColor;
      finalCtx.font = 'bold 16px Arial';
      finalCtx.textAlign = 'center';
      finalCtx.fillText(customText, finalCanvas.width / 2, padding + 30);
    }

    const qrCanvas = qrRef.current?.querySelector('canvas');
    if (qrCanvas) {
      finalCtx.drawImage(qrCanvas, padding, padding + textHeight);

      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.${format}`;
      link.href = finalCanvas.toDataURL(`image/${format}`);
      link.click();
      showNotification('QR Code downloaded successfully!');
    }
  };

  const copyToClipboard = async () => {
    if (!inputValue.trim()) {
      showNotification('Please enter some content first!', 'warning');
      return;
    }

    try {
      const finalCanvas = document.createElement('canvas');
      const finalCtx = finalCanvas.getContext('2d');

      if (!finalCtx) {
        throw new Error('Could not get canvas context');
      }

      const textHeight = showCustomText && customText ? 60 : 0;
      const padding = 20;

      finalCanvas.width = qrSize + padding * 2;
      finalCanvas.height = qrSize + textHeight + padding * 2;

      // Fill background
      finalCtx.fillStyle = bgColorQR;
      finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Draw custom text if enabled
      if (showCustomText && customText) {
        finalCtx.fillStyle = fgColor;
        finalCtx.font = 'bold 16px Arial';
        finalCtx.textAlign = 'center';
        finalCtx.fillText(customText, finalCanvas.width / 2, padding + 30);
      }

      // Get the QR canvas and draw it
      const qrCanvas = qrRef.current?.querySelector('canvas');
      if (qrCanvas) {
        finalCtx.drawImage(qrCanvas, padding, padding + textHeight);

        // Convert to blob and copy
        finalCanvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            showNotification('QR Code copied to clipboard!');
          }
        });
      } else {
        throw new Error('QR Code canvas not found');
      }
    } catch (err) {
      showNotification('Copy failed. Please try download instead.', 'error');
    }
  };

  const printQR = () => {
    if (!inputValue.trim()) {
      showNotification('Please enter some content first!', 'warning');
      return;
    }

    // Create the same combined canvas as download function
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) return;

    const textHeight = showCustomText && customText ? 60 : 0;
    const padding = 20;

    finalCanvas.width = qrSize + padding * 2;
    finalCanvas.height = qrSize + textHeight + padding * 2;

    // Fill background
    finalCtx.fillStyle = bgColorQR;
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw custom text if enabled
    if (showCustomText && customText) {
      finalCtx.fillStyle = fgColor;
      finalCtx.font = 'bold 16px Arial';
      finalCtx.textAlign = 'center';
      finalCtx.fillText(customText, finalCanvas.width / 2, padding + 30);
    }

    // Get the QR canvas and draw it
    const qrCanvas = qrRef.current?.querySelector('canvas');
    if (qrCanvas) {
      finalCtx.drawImage(qrCanvas, padding, padding + textHeight);

      const dataUrl = finalCanvas.toDataURL('image/png');

      // Create print window
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>QR Code Print</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                text-align: center;
                font-family: Arial, sans-serif;
              }
              .qr-container {
                page-break-inside: avoid;
                margin: 20px auto;
              }
              .qr-code {
                max-width: 100%;
                height: auto;
                border: 1px solid #ddd;
              }
              .qr-info {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
              }
              .custom-text {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #333;
              }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              ${
                showCustomText && customText
                  ? `<div class="custom-text">${customText}</div>`
                  : ''
              }
              <img src="${dataUrl}" alt="QR Code" class="qr-code" />
              <div class="qr-info">
                <p><strong>Type:</strong> ${inputType.toUpperCase()}</p>
                <p><strong>Content:</strong> ${inputValue}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);

        printWindow.document.close();
        showNotification('Print dialog opened!');
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qrHistory');
    showNotification('History cleared!');
  };

  const loadFromHistory = (item: QRHistoryItem) => {
    setInputType(item.type);
    setInputValue(item.value);
    setQrSize(item.settings.qrSize);
    setFgColor(item.settings.fgColor);
    setBgColorQR(item.settings.bgColor);
    setErrorLevel(item.settings.errorLevel);
    showNotification('Loaded from history!');
  };

  const getPlaceholder = (): string => {
    switch (inputType) {
      case 'url':
        return 'Enter URL (e.g., google.com)';
      case 'email':
        return 'Enter email address';
      case 'phone':
        return 'Enter phone number';
      case 'wifi':
        return 'Format: NetworkName|Password|Security';
      case 'vcard':
        return 'Format: Name|Phone|Email';
      default:
        return 'Enter any text';
    }
  };

  const inputTypes: InputTypeOption[] = [
    { value: 'text', label: 'Text', icon: Type },
    { value: 'url', label: 'URL', icon: Link },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'vcard', label: 'Contact', icon: User },
  ];

  return (
    <Box border='3px solid red' bg={bgColor} minH='100vh'>
      <Header
        colorMode={colorMode}
        onToggleColorMode={toggleColorMode}
        onToggleHistory={toggleHistory}
        onToggleSettings={toggleSettings}
        isHistoryOpen={isHistoryOpen}
        isSettingsOpen={isSettingsOpen}
      />

      <Container maxW='7xl' py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Left Panel - Input & Controls */}
          <GridItem>
            <VStack spacing={6} align='stretch'>
              <ContentTypeSelector
                inputType={inputType}
                onInputTypeChange={setInputType}
                inputTypes={inputTypes}
              />

              <ContentInput
                inputValue={inputValue}
                onInputValueChange={setInputValue}
                inputType={inputType}
                placeholder={getPlaceholder()}
              />

              <SettingsPanel
                isOpen={isSettingsOpen}
                qrSize={qrSize}
                marginSize={marginSize}
                onMarginSizeChange={setMarginSize}
                onQrSizeChange={setQrSize}
                fgColor={fgColor}
                onFgColorChange={setFgColor}
                bgColorQR={bgColorQR}
                onBgColorQRChange={setBgColorQR}
                errorLevel={errorLevel}
                onErrorLevelChange={setErrorLevel}
                logo={logo}
                onLogoChange={setLogo}
                logoSize={logoSize}
                onLogoSizeChange={setLogoSize}
                customText={customText}
                onCustomTextChange={setCustomText}
                showCustomText={showCustomText}
                onShowCustomTextChange={setShowCustomText}
                onReset={handleReset}
              />

              <HistoryPanel
                isOpen={isHistoryOpen}
                history={history}
                onClearHistory={clearHistory}
                onSelectHistoryItem={handleSelectHistoryItem}
                // onLoadFromHistory={loadFromHistory}
                hoverBgColor={hoverBgColor}
                mutedColor={mutedColor}
              />
            </VStack>
          </GridItem>

          {/* Right Panel - QR Code Display & Actions */}
          <GridItem>
            <VStack spacing={6} align='stretch'>
              <QRCodeDisplay
                inputValue={inputValue}
                qrValue={generateQRValue()}
                qrSize={qrSize}
                marginSize={marginSize}
                fgColor={fgColor}
                bgColorQR={bgColorQR}
                errorLevel={errorLevel}
                emptyQrBgColor={emptyQrBgColor}
                borderColor={borderColor}
                mutedColor={mutedColor}
                qrRef={qrRef}
                logo={logo}
                logoSize={logoSize}
                customText={customText}
                showCustomText={showCustomText}
              />

              <ActionButtons
                inputValue={inputValue}
                onDownloadQR={downloadQR}
                onCopyToClipboard={copyToClipboard}
                onPrintQR={printQR}
              />

              <InfoPanel mutedColor={mutedColor} />
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
        item={selectedHistoryItem}
        onLoad={loadFromHistory}
        onDelete={deleteHistoryItem}
      />
      <Footer
        borderColor={borderColor}
        cardBg={cardBg}
        mutedColor={mutedColor}
      />
    </Box>
  );
};

export default Home;
