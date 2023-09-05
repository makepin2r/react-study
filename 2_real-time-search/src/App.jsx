import { useEffect, useState } from "react";
import { search } from "./API/searchAPI";
import { autoSuggest } from "./API/autoSuggestionAPI";
import { Wrapper, InputBox, ResultBox } from "./Styled";

const App = () => {
    const [input, setInput] = useState(""); // input을 통한 검색어
    const [results, setResults] = useState([]); // 검색 결과
    const [keywords, setKeywords] = useState([]); // 검색어 자동완성

    // api 검색 기능 함수
    const searchHandler = async (query) => {
        // 검색 파라미터 설정
        const params = {
            query: query,
            sort: "accuracy",
            page: 1,
            size: 10,
        };

        const { data } = await search(params); // 검색 api 호출
        setResults(
            data.documents.map((item) => {
                return { title: item.title, content: item.contents, url: item.url };
            })
        ); // 결과값 state에 저장
    };

    // 검색어 자동완성 함수
    const autoSuggestionHandler = async (query) => {
        const { data } = await autoSuggest(query); // 자동완성 호출
        data.suggestions.length !== 0 &&
            setKeywords(
                data.suggestions.map((item) => {
                    return { value: item.value };
                })
            ); // 결과값 state에 저장
    };

    // 인풋 입력시 실행할 함수
    const handleInputUpdate = (e) => {
        setInput(e.target.value);
        if (input !== "") {
            searchHandler(input); // 검색 함수 실행
            autoSuggestionHandler(input); // 검색어 자동완성 함수 실행
        }
    };

    //
    const handleClickKeyword = (value) => {
        setInput(value); // 인풋창에 해당 검색어 입력
        searchHandler(value); // 자동완성 검색어 값으로 바로 검색 실행
    };

    return (
        <Wrapper>
            <div>
                <InputBox
                    type="search"
                    placeholder="검색어를 입력하세요"
                    name="query"
                    onChange={handleInputUpdate}
                    value={input}
                />
                <ul>
                    {keywords.map((keyword, idx) => {
                        return (
                            <li
                                key={idx}
                                onClick={() => {
                                    handleClickKeyword(keyword.value);
                                }}
                            >
                                {keyword.value}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ResultBox>
                    {results.map((result, idx) => {
                        return (
                            <li key={idx}>
                                <a
                                    href={result.url}
                                    target="_blank"
                                    dangerouslySetInnerHTML={{ __html: result.title }}
                                ></a>
                                <p dangerouslySetInnerHTML={{ __html: result.content }}></p>
                            </li>
                        );
                    })}
                </ResultBox>
            </div>
        </Wrapper>
    );
};

export default App;
