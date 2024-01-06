import React, { useState } from "react";
import styled from "styled-components";
import UserAccounts from "./UserAccounts";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  hight: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalBody = styled.div`
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
`;
export default function Modal({ children }) {
    const [shouldShow, setShouldShow] = useState(false);

  return (
    <>
     <UserAccounts />
      <button onClick={() => setShouldShow(true)}>show Modal</button>
      {shouldShow && (
        <ModalBackground onClick={() => setShouldShow(false)}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShouldShow(false)}>X</button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
}
