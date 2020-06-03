import React from 'react';
import SelectButton from './components/SelectButton';
import FileListControl from './components/FileListControl';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
	width: 600px;
	font-family: PT Sans, sans-serif;
`;

function SVGAdmin() {
  return (
      <Container>
          <SelectButton />
          <FileListControl />
      </Container>
  );
}

export default SVGAdmin;
