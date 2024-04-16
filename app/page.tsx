import React, { useEffect } from 'react';
import ProvincesComponent from './components/Provinces';

const HomePage: React.FC = () => {
    
    return (
        <div className="max-w-[80%] mx-auto my-6">
            <div className="text-xl font-semibold mb-4 text-center py-4">Top Canadian Employment Industries by Province (10 years)</div>
            <ProvincesComponent />
            {/* <IndustriesComponent /> */}
        </div>
    );
};

export default HomePage;
