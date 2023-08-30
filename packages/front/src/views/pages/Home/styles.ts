import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: relative;
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
`;

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 0 10px;

  &[disabled] {
    background-color: #00000066;
    border-color: #00000066;
    color: #ffffff66;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  position: relative;
  width: 100%;

  label, form, input, ${Button} {
    height: 100%;
    font-size: 24px;
    width: 100%;
  }

  input, ${Button} {
    border: 1px solid #000;
    padding: 0 10px;
    width: -webkit-fill-available;
  }
`;
