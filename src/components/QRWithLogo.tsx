import { useEffect, useRef } from 'react';
import { ErrorCorrectionLevel } from '../types';
import QRCode from 'qrcode';

const QRWithLogo: React.FC<{
  qrValue: string;
  qrSize: number;
  fgColor: string;
  bgColor: string;
  errorLevel: string;
  marginSize: number;
  logo?: string;
  logoSize: number;
}> = ({
  qrValue,
  qrSize,
  fgColor,
  bgColor,
  errorLevel,
  marginSize,
  logo,
  logoSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = qrSize;
    canvas.height = qrSize;

    // Generate QR code first
    QRCode.toCanvas(
      canvas,
      qrValue,
      {
        width: qrSize,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorLevel as ErrorCorrectionLevel,
        margin: marginSize,
      },
      (error) => {
        if (error) {
          console.error('QR Code generation error:', error);
          return;
        }

        // Add logo if provided
        if (logo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            // Calculate logo size and position
            const logoSizePixels = Math.min(
              (qrSize * logoSize) / 100,
              qrSize * 0.2 // Max 20% to ensure scannability
            );
            const logoX = (qrSize - logoSizePixels) / 2;
            const logoY = (qrSize - logoSizePixels) / 2;

            // Create a white background circle slightly larger than logo
            const bgRadius = logoSizePixels / 2 + 8;
            ctx.fillStyle = bgColor;
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, bgRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Add a subtle border
            ctx.strokeStyle = fgColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw the logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, logoSizePixels / 2, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(
              logoImg,
              logoX,
              logoY,
              logoSizePixels,
              logoSizePixels
            );
            ctx.restore();
          };
          logoImg.crossOrigin = 'anonymous';
          logoImg.src = logo;
        }
      }
    );
  }, [
    qrValue,
    qrSize,
    fgColor,
    bgColor,
    errorLevel,
    marginSize,
    logo,
    logoSize,
  ]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default QRWithLogo;
