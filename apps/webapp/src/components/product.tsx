import Image from "next/legacy/image";
import Link from "next/link";
import { IProduct } from "@/interfaces";

interface Props {
  product: IProduct;
}

const Product = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="rounded-sm border bg-white group overflow-hidden"
    >
      <div className="relative aspect-w-5 aspect-h-4 overflow-hidden">
        <Image
          alt={product.title}
          className="group-hover:scale-110 transition-all"
          src="https://res.cloudinary.com/duwhxat61/image/upload/v1654369965/cld-sample-4.jpg"
          blurDataURL="https://res.cloudinary.com/duwhxat61/image/upload/v1654369965/cld-sample-4.jpg"
          placeholder="blur"
          objectFit="cover"
          layout="fill"
        />
      </div>

      <div className="p-2">
        <h1>{product.title}</h1>
      </div>
    </Link>
  );
};

export default Product;
