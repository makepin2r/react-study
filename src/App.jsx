import { useEffect, useState } from 'react'
import { search } from "./api"

const App = () => {

  const [input, setInput] = useState(''); // input을 통한 검색어 
  const [results, setResults] = useState([]); // 검색 결과

  // useEffect(() => {
  //   searchHandler('default');
  // })

  // api 검색 기능 함수
  const searchHandler = async (query) => {
    // 검색 파라미터 설정
    const params = {
      query: query,
      sort: "accuracy",
      page: 1,
      size: 10
    }

    const { data } = await search(params); // 검색 api 호출
    // console.log(data); // 결과 호출
    setResults(data.documents.map((item) => item.contents)); // 결과값 state에 저장
  }

  // 인풋 입력시 실행할 함수
  const handleInputUpdate = (e) => {
    setInput(e.target.value);
    input !== "" && searchHandler(input); // 검색 함수 실행
  }
  

  return (
    <>
      <div>
        <input 
        type="search" 
        placeholder='검색어를 입력하세요'
        name="query"
        onChange={handleInputUpdate}
        value={input}
        />
      </div>
      <ul>
        {results.map((result, idx) => {
          return <li key={idx} dangerouslySetInnerHTML={{__html: result}}></li>
        })}
      </ul>
    </>
  )
}

export default App
