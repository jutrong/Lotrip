// 3자리마다 구분자를 찍어주는 유틸함수
const addDelimiter = (value: number | string, delimiter = ',') => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
