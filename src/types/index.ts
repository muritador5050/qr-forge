export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type InputType = 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard';

export interface QRHistoryItem {
  id: number;
  type: InputType;
  value: string;
  qrValue: string;
  timestamp: string;
  settings: {
    qrSize: number;
    marginSize: number;
    fgColor: string;
    bgColor: string;
    errorLevel: string;
    logo?: string;
    logoSize: number;
    customText?: string;
    showCustomText: boolean;
  };
}

export interface InputTypeOption {
  value: InputType;
  label: string;
  icon: React.ComponentType<any>;
}
