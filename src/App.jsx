import { useEffect, useState } from 'react'
import { search } from "./API/searchAPI"

const App = () => {

  const [input, setInput] = useState(''); // input을 통한 검색어 
  const [results, setResults] = useState([]); // 검색 결과

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
    setResults(data.documents.map((item) => {
      console.log(item)
      return { title: item.title, content: item.contents, url: item.url }
    })); // 결과값 state에 저장
    console.log(results)
  }

  // 인풋 입력시 실행할 함수
  const handleInputUpdate = (e) => {
    setInput(e.target.value);
    if(input !== ""){
      searchHandler(input); // 검색 함수 실행
      // 검색어 자동완성 함수 실행
    }
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
          return <li key={idx}>
            <a href={result.url} target="_blank" dangerouslySetInnerHTML={{__html: result.title}}></a>
            <p dangerouslySetInnerHTML={{__html: result.content}}></p>
          </li>
        })}
      </ul>
    </>
  )
}

export default App
