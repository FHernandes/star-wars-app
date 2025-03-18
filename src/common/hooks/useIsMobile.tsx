import { useState, useEffect } from 'react';
import { size } from '../mediaqueries';

const useIsMobile = (): boolean => {
    const mobileSize = parseInt(size.mobile.replace(/\D/g, ''), 10)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= mobileSize);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export default useIsMobile;
