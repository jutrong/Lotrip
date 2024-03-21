import { MouseEvent, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import Flex from '@components/shared/Flex'
import { Hotel as IHotel } from '@models/hotel'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import addDelimiter from '@utils/addDelimiter'
import Tag from '@components/shared/Tag'
import formatTime from '@utils/formatTime'
import { Link } from 'react-router-dom'

const HotelItem = ({
  hotel,
  isLike,
  onLike,
}: {
  hotel: IHotel
  isLike: boolean
  onLike: ({
    hotel,
  }: {
    hotel: Pick<IHotel, 'name' | 'id' | 'mainImageUrl'>
  }) => void
}) => {
  const [remainedTime, setRemainedTime] = useState(0)

  const tagComponent = () => {
    if (hotel.events == null) return null

    const { name, tagThemeStyle } = hotel.events

    const promotionTxt =
      remainedTime > 0 ? `- ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    onLike({
      hotel: {
        name: hotel.name,
        mainImageUrl: hotel.mainImageUrl,
        id: hotel.id,
      },
    })
  }

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) return

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(hotel.events?.promoEndTime as string),
        new Date(),
      )

      if (남은초 < 0) {
        clearInterval(timer)
      }
      setRemainedTime(남은초)

      return () => {
        clearInterval(timer)
      }
    }, 1000)
  }, [hotel.events])
  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts
                title={hotel.name}
                subTitle={hotel.comment}
              ></ListRow.Texts>
              <Spacing size={4} />
              <Text typography="t7" color="gray">
                {hotel.starRating}
              </Text>
            </Flex>
          }
          right={
            <Flex
              direction="column"
              align="flex-end"
              style={{ position: 'relative' }}
            >
              <img
                src={
                  isLike
                    ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                    : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
                }
                alt=""
                css={iconHeartStyles}
                onClick={handleLike}
              />
              <Spacing size={8} />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
    align - items: flex - start;
    `
const imageStyles = css`
    width: 90px;
    height: 110px;
    border - radius: 8px;
    object - fit: cover;
    margin - left: 16px;
    `

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`
export default HotelItem
