import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props => props.background || '#7F97A4')};
  color: ${(props => props.color || 'white')};
  font-size: ${(props => props.font || '20px')};
  height: ${(props => props.height || '45px')};
  width: ${(props => props.width || '120px')};
  margin-right: ${(props => props.marginR || '20px')};
  cursor: pointer;
  &:hover {
    background-color: #677075;
}
`;