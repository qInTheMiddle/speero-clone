import type { CarService } from "@/app/types"
import Image from "next/image";

interface CarServiceCardProps {
    carService: CarService;
}

const CarServiceCard = ({ carService }: CarServiceCardProps) => {

    return (
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-2 flex flex-col gap-1 hover:shadow-md transition-shadow">
             <div className="relative w-full h-32 mb-1">
                <Image 
                    src={`${carService.imageUrl}`} 
                    alt={`${carService.name}`} 
                    fill
                    className="object-contain"
                />
             </div>
            <h2 className="text-gray-900 font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">{carService.name}</h2>
            <p className="text-gray-500 text-xs overflow-hidden text-ellipsis whitespace-nowrap">PN: {carService.description}</p>
            <p className="text-gray-500 text-xs truncate">{carService.serviceType}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-extrabold text-gray-900">
                    SAR {carService.discount}{carService.price}
                </span>
            </div> 
        </div>
    );
}

export default CarServiceCard;