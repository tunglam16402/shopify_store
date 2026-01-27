import Image from 'next/image'
import { USP } from '../../productDetail.contfig'

const ProductUSP = () => {
  return (
    <div className="flex gap-4 justify-center">
      {USP.map((usp) => (
        <div
          key={usp.id}
          className="flex flex-col items-center flex-1 text-center"
        >
          <Image src={usp.imageUrl} alt="" width={50} height={30} />
          <p className="text-[8px] md:text-xs">{usp.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductUSP
