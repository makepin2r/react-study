import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Spinner from "../../UIs/Spinner";

function Home() {

    const obsRef = useRef(null); // 옵저버
    const [List, setList] = useState([]); // post list
    const [page, setPage] = useState(1); // page
    const [load, setLoad] = useState(false); // 로딩 스피너
    const preventRef = useRef(true); // 옵저버 중복 실행 방지
    //const endRef = useRef(false); // 모든 글 로드 확인

    /**옵저버 콜백함수 */
    const obsHandler = (entries) => {
        const target = entries[0];
        console.log(obsRef);
        if (target.isIntersecting && preventRef.current) {
            preventRef.current = false; // 옵저버 중복 실행 방지
            setPage((prev) => prev + 1); // 페이지 값 증가
        }
    };

    // 옵저버 생성
    useEffect(() => {
        // 컴포넌트 마운트시 옵저버 생성
        const observer = new IntersectionObserver(obsHandler, {
            threshold: 0.5,
            // ? 왜 threshold가 1일 땐 인식이 안됐지?
        });
        obsRef.current && observer.observe(obsRef.current); 
        return () => {
            // 언마운트시 옵저버 해제
            observer.disconnect();
        };
    }, []);

    // 페이지 넘어갈 때 새로운 데이터 get
    useEffect(() => {
        getPost();
    }, [page]);

    /** 리스트로 뿌려질 데이터 불러오는 함수 */
    const getPost = useCallback(async () => {
        setLoad(true); // 로딩 시작
        try {
            const res = await axios({
                method: "GET",
                url: `https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_r6J82rmbQbmUgbxfkFGoGKNFKzupjsau4wbJC5TIrEaLCQ1szQUkVqJM3yOylFL0`,
            });
            setList((prev) => [...List, ...res.data]);
            preventRef.current = true;
        } catch (e) {
            console.error(e);
        } finally {
            setLoad(false); //로딩 종료
        }
    }, [page]);

    return(
        <ul>
            {List && List.map((post, idx) => <Card key={post.id + idx} name={post.breeds[0].name} url={post.url}/>)}
            {load && <li><Spinner/></li>}
            <li ref={obsRef} style={{width: '100%', height: "20vh"}}></li>
        </ul>
    )
}

export default Home;
