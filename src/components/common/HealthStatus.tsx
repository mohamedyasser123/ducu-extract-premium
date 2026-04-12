import { useEffect, useState } from 'react';
import { pdfService } from '../../services/api';

export function HealthStatus() {
  const [status, setStatus] = useState('Checking...');
  const [color, setColor] = useState('#8b8fa8');

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        await pdfService.checkHealth();
        if (mounted) {
          setStatus('System Ready');
          setColor('#006c49');
        }
      } catch {
        if (mounted) {
          setStatus('System Offline');
          setColor('#d93025');
        }
      }
    };
    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <span style={{ fontSize: '10.5px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
      ● STATUS: {status}
    </span>
  );
}
