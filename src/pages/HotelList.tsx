import InfiniteScroll from 'react-infinite-scroll-component'
import Hotel from '@components/hotelList/hooks/HotelItem'
import useHotels from '@components/hotelList/hooks/useHotels'
import Spacing from '@components/shared/Spacing'
import Top from '@shared/Top'
import { Fragment } from 'react'
import useUser from '@hooks/auth/useUser'
import useLike from '@hooks/like/useLike'

const HotelList = () => {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: like } = useLike()

  console.log(likes)
  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <Hotel
                hotel={hotel}
                isLike={Boolean(likes?.find(like => like.hotelId === hotel.id))}
                onLike={like}
              />

              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default HotelList
