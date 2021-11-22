import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #282c34;
  overflow: auto;
  width: 100%;
  height: 100%;
`
export const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #414752;
  padding: 20px;
  width: 100%;
`
export const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #282c34;
  overflow: auto;
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 100%;
`

export const Text = styled.span`
  color: #eeeeee;
  font-size: 18px;
  font-weight: bold;
`

export const LoadingContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5252528c;
  width: 100%;
  height: 100%;

  gap: 20px;

  div {
    font-size: 20px;
    font-weight: bold;
  }
`
