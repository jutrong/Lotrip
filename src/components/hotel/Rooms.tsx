import { css } from '@emotion/react'
import Flex from '@components/shared/Flex'
import styled from '@emotion/styled'
import Text from '@components/shared/Text'
import useRooms from './hooks/useRooms'
import ListRow from '@components/shared/ListRow'
import Tag from '@components/shared/Tag'
import Spacing from '@components/shared/Spacing'
import Button from '@components/shared/Button'
import addDelimiter from '@utils/addDelimiter'

const Rooms = ({ hotelId }: { hotelId: string }) => {
  const { data } = useRooms({ hotelId })

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold={true} typography="t4">
          객실 정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const isDeadline = room.avaliableCount === 1
          const isSoldout = room.avaliableCount === 0

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName}이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {isDeadline === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감인박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? ' 환불 가능' : '환불 불가',
                  )}
                />
              }
              right={
                <Button size="medium" disabled={isSoldout}>
                  {isSoldout === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}
const Container = styled.div`
  margin: 40px 0;
`
const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`
const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover:
  border-radius: 8px;
`
export default Rooms
