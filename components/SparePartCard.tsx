import type { SparePart } from "@/app/types"
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

interface SparePartCardProps {
    sparePart: SparePart;
    cartButton?: boolean;
}

const SparePartCard = ({ sparePart, cartButton }: SparePartCardProps) => {
    const { openConfirmationDrawer } = useCart();

    return (
        <Link href={`/spare-parts/${sparePart.id}`}>
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-2 flex flex-col gap-1 hover:shadow-md transition-shadow">
                <div className="relative w-full h-32 mb-1">
                    <Image 
                        src={`${sparePart.imageUrl}`} 
                        alt={`${sparePart.name}`} 
                        fill
                        className="object-contain"
                    />
                </div>
                <h2 className="text-gray-900 font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">{sparePart.name}</h2>
                <p className="text-gray-500 text-xs">PN: {sparePart.number}</p>
                <p className="text-gray-500 text-xs truncate">Fits: {sparePart.fitsWith[0].brand} {sparePart.fitsWith[0].model}</p>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg font-extrabold text-gray-900">
                        SAR {sparePart.price}
                    </span>
                </div> 
                {cartButton && (
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => openConfirmationDrawer(sparePart)}
                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default SparePartCard;