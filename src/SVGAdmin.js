import React, { Component } from 'react';
import SelectButton from './components/SelectButton';
import FileListControl from './components/FileListControl';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
	width: 600px;
	font-family: PT Sans, sans-serif;
`;

export default class SVGAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilesListEnabled: false,
            selectedUrl: null
        }
    }

    setFileListEnabledState(state) {
        this.setState({
            isFilesListEnabled: state
        });
    }

    render() {
        return <Container>
            <SelectButton onClick={this.setFileListEnabledState.bind(this, true)} selected={this.state.selectedUrl} />
            { this.state.isFilesListEnabled ? <FileListControl onClose={this.setFileListEnabledState.bind(this, false)} /> : null}
        </Container>
    }
}