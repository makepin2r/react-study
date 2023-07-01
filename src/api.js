// 카카오 검색 API 세팅
import axios from "axios";

const kakao = axios.create({
    baseURL: "https://dapi.kakao.com", // 공동 요청 url 경로
    headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_REST_API_KEY}`,
    },
});

// 검색 api
export const search = (params) => {
    return kakao.get("/v2/search/web", {params});
};

