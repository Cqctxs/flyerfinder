import Image from "next/image"

export default function FlyerSquareOne({ productName, price, imageUrl }) {
    return (
        <div className="w-32 h-32 max-w-sm mx-auto">
            <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg h-full">
                <Image
                    src={imageUrl}
                    alt={productName}
                    fill={true}
                    className="absolute inset-0 bg-cover"
                />

            </div>
            <div className="flex flex-col items-center mt-2">
                <div className="font-semibold">{productName}</div>
                <div className="font-semibold">{price}</div>
            </div>
        </div>
    )
}

FlyerSquareOne.defaultProps = {
    productName: "Carrots",
    price: "$2.99",
    imageUrl: "/images/image.png"
}