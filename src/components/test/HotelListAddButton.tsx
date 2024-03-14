import Button from '@shared/Button'

import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@mock/data'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

// min에서 max 범위의 랜덤값 가져오기
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const HotelListAddButton = () => {
  const batch = writeBatch(store)

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
    // COLLECTIONS.HOTEL안에 COLLETIONS.ROOM이 있는 계층구조로 데이터를 추가
    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))

      batch.set(hotelDocRef, hotel)

      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))
        batch.set(subDocRef, room)
      })
    })
    batch.commit()
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
