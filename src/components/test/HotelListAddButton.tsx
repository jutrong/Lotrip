import Button from '@shared/Button'

import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES } from '@/mock/data'

// min에서 max 범위의 랜덤값 가져오기
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const HotelListAddButton = () => {
  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, idx) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: random(130000, 200000),
        starRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[idx] != null && { events: EVENTS[idx] }),
      }
    })

    console.log(hotels)
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
