'use client'; 

// import Header from '@/components/Header';
import { useEffect, useState } from "react";
import type { SparePart, CarService } from './types';
import SparePartCard from '@/components/SparePartCard';
import Image from 'next/image';
import CarServiceCard from '@/components/CarServiceCard';
import Link from 'next/link';
import RecentlyViewed from '@/components/RecentlyViewed';
import { mainNavLinks } from '@/data/navigation';



export default function Home() {
    const [parts, setParts] = useState<SparePart[]>([]);
    const [partsIsLoading, setPartsIsLoading] = useState(true);
    const [partsError, setPartsError] = useState<string | null>(null);
    const [services, setServices] = useState<CarService[]>([]);
    const [servicesIsLoading, setServicesIsLoading] = useState(true);
    const [servicesError, setServicesError] = useState<string | null>(null); 
   

  const partsCategories = [
    {
      name: 'Steering Wheel and its accessories',
      imageUrl:'/image/parts/buttons/steering-wheel.2x.png'
    },
    {
      name: 'AC and Cooling System',
      imageUrl:'/image/parts/buttons/water-pump.2x.png'
    },
    {
      name: 'Engine Gears and its accessories',
      imageUrl:'/image/parts/buttons/car-engine.2x.png'
    },
    {
      name: 'Brakes and Brake Pads',
      imageUrl:'/image/parts/buttons/disc-brake.2x.png'
    },
    {
      name: 'Bumpers Grills and Front End',
      imageUrl:'/image/parts/buttons/bumpars.2x.png'
    },
    {
      name: 'Headlights and Rear lights',
      imageUrl:'/image/parts/buttons/car-lights.2x.png'
    },
  ]

  const servicesCategories = [
    {
      name: 'Top Selling'
    },
    {
      name: 'Detailing Services'
    },
    {
      name: 'Periodic Services'
    },
    {
      name: 'Windshields And Lights'
    },
    {
      name: 'Denting And Painting'
    },
    {
      name: 'Custom Services'
    },
    {
      name: 'Tyres And Wheel Care'
    },
    {
      name: 'General'
    },
    {
      name: 'Ac Service And Repair'
    },
  ]

  const accessoriesCategories = [
    {
      name: 'Lights and pulps',
      imageUrl:'/image/parts/buttons/lights-and-pulps@2x.png'
    },
    {
      name: 'Interior Accessories',
      imageUrl:'/image/parts/buttons/interior-accessories@2x.png'
    },
    {
      name: 'Tools Accessories',
      imageUrl:'/image/parts/buttons/tools-accessories@2x.png'
    },
    {
      name: 'Car Care Accessories',
      imageUrl:'/image/parts/buttons/car-care-accessories@2x.png'
    },
    {
      name: 'Oil and Fluids',
      imageUrl:'/image/parts/buttons/oil-and-fluids@2x.png'
    },
  ]

  const [partsCategory, setPartsCategory] = useState(partsCategories[0].name);
  const [servicesCategory, setServicesCategory] = useState(servicesCategories[0].name);
  const [accessoriesCategory, setAccessoriesCategory] = useState(accessoriesCategories[0].name);
  const carBrandsMenuItem = mainNavLinks.find(item => item.label === 'Car Manufacturers');

  console.log('Found Brands Menu Item:', carBrandsMenuItem);

  useEffect(() => {
    let isActive = true;
    setPartsIsLoading(true);
    setServicesIsLoading(true);
    setPartsError(null);
    setServicesError(null); 
    const fetchData = async () => {
      try {
        const [partsRes, servicesRes] = await Promise.all([
          fetch('/api/spare-parts'),
          fetch('/api/car-services')
        ]);
        if(!partsRes.ok) {
          if (isActive) setPartsError(`Error: ${partsRes.status} ${partsRes.statusText}`);
        }
        if(!servicesRes.ok) {
          if (isActive) setServicesError(`Error: ${servicesRes.status} ${servicesRes.statusText}`);
        }

        if(partsRes.ok) {
          const partsData = await partsRes.json();
          if (isActive) setParts(partsData.spareParts);
        }

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          if (isActive) setServices(servicesData.carServices);
        }
            
        // const partsData = await partsRes.json();
        // const servicesData = await servicesRes.json();
        // if (isActive) {
        //   setParts(partsData.spareParts);
        //   setServices(servicesData.carServices);
        // }
      } catch (err) {
        if (isActive) {
          const msg = err instanceof Error ? err.message : String(err);
          setPartsError(msg);
          setServicesError(msg);
          // if (err instanceof Error) {
          //   setPartsError(err.message);
          // } else {
          //   setPartsError(String(err))
          // }
                    
          // console.error("Fetch error:", err);
        }
      } finally {
        if (isActive) {
          setPartsIsLoading(false);
          setServicesIsLoading(false);    
        }
      }
    };

    fetchData();
      return () => {
        isActive = false;
      };
  }, []);

  // if(partsIsLoading) return <div className="flex justify-center items-center p-4 text-sm text-gray-600 animate-pulse">Loading...</div>

  // if (partsError) return <div className="error-banner">{partsError}</div>;


  return (
    <div>
      {/* <Header /> */}
      <main>
        <div className="py-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buy Genuine Car Spare Parts</h1>
            <p className="mt-1 text-base text-gray-600">Browse our wide collection of spare parts and car services</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center text-gray-900">
            <span>
              Spare Parts Market
            </span>
            <Link href="/spare-parts/discover" 
              className="bg-[#41d3bd] text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              View All
            </Link>
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {partsCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setPartsCategory(cat.name)}
                className="inline-flex flex-col items-center group"
              >
              <div className={`relative w-10 h-10 mb-2 mx-auto rounded-full border-2 p-1 flex items-center justify-center transition-colors ${partsCategory === cat.name ? 'bg-red-100 border-red-500' : 'bg-white border-gray-200'}`}>
                <Image src={cat.imageUrl} alt={cat.name} fill className="object-contain p-1"/>
              </div>
              <span className="group-hover:opacity-100">{cat.name}</span>
            </button>
            ))}
        </div>
        </div>
        {partsIsLoading && (
        <div className="text-center p-4 text-blue-600 bg-blue-50 rounded-lg animate-pulse">
          Loading...
        </div>
        )}
        {partsError && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg font-medium">
          {partsError}
        </div>
        )}
        {!partsIsLoading && !partsError && <div className="pb-8">
          {/* <h2 className="text-2xl font-bold mb-6">Spare Parts</h2> */}
          <div className="flex overflow-x-auto gap-4 py-4">
            {parts.filter(pc => pc.category === partsCategory).map(p => (
              <div key={p.id} className="flex-shrink-0 w-48">
                <SparePartCard sparePart={p} />
              </div>
            ))}
          </div>  
        </div>}
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center text-gray-900">
            <span>
              Car Services
            </span>
            <Link 
              href="/car-services/"
              className="bg-[#41d3bd] text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              View All
            </Link>
          </h2>
          <div className="flex gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
            {servicesCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setServicesCategory(cat.name)}
                className={`pb-4 text-sm font-semibold transition-all relative
                  ${servicesCategory === cat.name 
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-black'
                }`}
              >
                {cat.name}
        
                
                {servicesCategory === cat.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            ))}
          </div>
        </div>
        {servicesIsLoading && (
        <div className="text-center p-4 text-blue-600 bg-blue-50 rounded-lg animate-pulse">
          Loading...
        </div>
        )}
        {servicesError && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg font-medium">
          {servicesError}
        </div>
        )}
        {!servicesIsLoading && !servicesError && <div className="pb-8">
          {/* <h2 className="text-2xl font-bold mb-6">Spare Parts</h2> */}
          <div className="flex overflow-x-auto gap-4 py-4">
            {services.filter(pc => pc.serviceType === servicesCategory).map(p => (
              <div key={p.id} className="flex-shrink-0 w-64">
                <CarServiceCard carService={p} />
              </div> 
            ))}
          </div>  
        </div>}
      
        {/* <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center text-gray-900">
            <span>
              Accessories
            </span>
            <Link href="/spare-parts/discover" 
              className="bg-green-700 text-sm px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              View All
            </Link>
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {accessoriesCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setAccessoriesCategory(cat.name)}
                className="inline-flex flex-col items-center group"
              >
              <div className={`relative w-10 h-10 mb-2 mx-auto rounded-full border-2 p-1 flex items-center justify-center transition-colors ${accessoriesCategory === cat.name ? 'bg-red-100 border-red-500' : 'bg-white border-gray-200'}`}>
                <Image src={cat.imageUrl} alt={cat.name} fill className="object-contain p-1"/>
              </div>
              <span className="group-hover:opacity-100">{cat.name}</span>
            </button>
            ))}
        </div>
        </div>
        
        {partsIsLoading && (
        <div className="text-center p-4 text-blue-600 bg-blue-50 rounded-lg animate-pulse">
          Loading...
        </div>
        )}
        {partsError && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg font-medium">
          {partsError}
        </div>
        )}
        {!partsIsLoading && !partsError && <div className="pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {parts.filter(pc => pc.category === accessoriesCategory).map(p => (
              <SparePartCard key={p.id} sparePart={p} /> 
            ))}
          </div>  
        </div>} */}
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            <span>
              Recently Seen Parts
            </span>
          </h2>
        </div>
        <div className="pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <RecentlyViewed />
          </div>
        </div>
        
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
              <span>
                Shop by Car Brand
              </span>
            </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {carBrandsMenuItem?.children?.map(brand => (
                <Link
                  key={brand.label}
                  href={brand.href || '#'}
                  className="block bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full h-16">
                    <Image
                      src={brand.imageUrl || ''}
                      alt={brand.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              ))}
          </div>
      </main>
    </div>
  );
}
