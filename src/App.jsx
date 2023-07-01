import { useEffect } from 'react'
import { search } from "./api"

const App = () => {

  useEffect(() => {
    searchHandler();
  })

  const searchHandler = async () => {
    // 검색 파라미터 설정
    const params = {
      query: "호로록",
      sort: "accuracy",
      page: 1,
      size: 10
    }

    const { data } = await search(params); // 검색 api 호출
    console.log(data); // 결과 호출
  }
  

  return (
    <>
      <div>
        <input 
        type="search" 
        placeholder='검색어를 입력하세요'
        name="query"
        />
      </div>
    </>
  )
}

export default App
