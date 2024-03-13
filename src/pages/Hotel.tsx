import { useParams } from 'react-router-dom'

import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@components/shared/Top'
import Carousel from '@/components/hotel/Carousel'

const Hotel = () => {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) return <div>Loading...</div>

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

export default Hotel
