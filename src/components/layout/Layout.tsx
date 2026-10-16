import Sider from "@/components/layout/Sider";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import {ReactNode, useState, useEffect} from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({children}: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white to-gray-200 dark:from-[#09090b] dark:to-[#000000] text-primary dark:text-[#f4f4f5] transition-colors duration-300">
      <Sider isMobile={isMobile}/>
      <div className={`flex max-w-screen flex-1 flex-col justify-between ${isMobile ? 'pt-16' : 'ml-60'}`}>
        <Container isMobile={isMobile}>
          {children}
        </Container>
        <Footer isMobile={isMobile}/>
      </div>
    </div>
  );
};

export default Layout;
