import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { store } from './firebase'
import { Hotel } from '@models/hotel'

export const getHotels = async (pageParams?: QuerySnapshot<Hotel>) => {
  // pageParams가 null(첫페이지)이면 10개의 호텔을 가져오고, 아니면 pageParams를 기준으로 10개의 호텔을 가져온다.
  const hotelQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )
  const hotelsSnapshop = await getDocs(hotelQuery)

  const items = hotelsSnapshop.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshop.docs[hotelsSnapshop.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

export const getHotel = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapshot.data(),
  } as Hotel
}
