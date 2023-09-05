import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #1e1e1e;

    & > div {
        width: 500px;
    }
`;

export const InputBox = styled.input`
    border: 0;
    width: 100%;
    height: 4rem;
    padding: 10px 20px;
    border: 3px solid #84817a;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 7px 29px 0px;
    transition: all 0.4s ease;
    background: transparent;
    color: #f7f1e3;
    &:focus {
        outline: none;
        border-color: white;
    }

    & + ul {
        box-sizing: border-box;
        background-color: white;

        & > li {
            width: 100%;
            height: 3rem;
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                background-color: #84817a;
                color: white;
            }
        }
    }
`;

export const ResultBox = styled.ul`
    margin-left: 2rem;
    & > li {
        padding: 1rem;
        border: 3px solid #84817a;
        margin-bottom: 1rem;
        box-shadow: rgba(255, 255, 255, 0.05) 0px 7px 29px 0px;
        box-sizing: border-box;

        & > p {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #d1ccc0;
        }

        & > a {
            color: white;
            margin-bottom: 1rem;
            display: block;
            line-height: 1.2rem;
        }
    }
`;
