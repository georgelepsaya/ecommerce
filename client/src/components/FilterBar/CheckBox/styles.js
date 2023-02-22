import styled from "styled-components";

export const Container = styled.div`
  margin-left: 10px;
`;

export const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckInput = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border: 1px solid #ededed;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 100ms background-color ease-in-out;
  &:hover {
    background-color: #ededed;
    transition: 100ms background-color ease-in-out;
  }
  &:after {
    font-weight: 900;
    font-size: 20px;
    color: #fff;
    display: none;
  }
  &:checked {
    background-color: #5ece7b;
    border: 1px solid #5ece7b;
  }
  &:checked:after {
    background-color: #5ece7b;
    border: 1px solid #5ece7b;
    display: block;
  }
`;

export const CheckLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  margin-left: 8px;
  cursor: pointer;
`;
