import styled from "styled-components";

export const StCard = styled.li`
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    min-width: 400px;
    padding: 40px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
    text-decoration: none;
    width: 500px;
    margin-bottom: 2rem;

    & > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`