import React, { Component } from 'react';
import SelectButton from './SelectButton';
import FileListControl from './FileListControl';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
	width: 600px;
	font-family: PT Sans, sans-serif;
`;

export default class SVGAdmin extends Component {
    constructor(props) {
        super(props);

        this.onUrlCreated = this.onUrlCreated.bind(this);
        this.setFilePreviewState = this.setFilePreviewState.bind(this);

        this.state = {
            isFilesListEnabled: false,
            isPreviewFileEnabled: false,
            selectedUrl: null,
            apiURL: null
        }
    }

    componentDidMount() {
        if (this.props.inputSelector) {
            const input = document.body.querySelector(this.props.inputSelector);

            if (input.value) {
                this.setState({
                    selectedUrl: input.value
                })
            }
        }
    }

    setFileListEnabledState(state) {
        this.setState({
            isFilesListEnabled: state,
            isPreviewFileEnabled: false
        });
    }

    onUrlCreated(url) {
        this.setState({
            selectedUrl: url
        });

        if (this.props.inputSelector) {
            const input = document.body.querySelector(this.props.inputSelector);

            if (input) {
                input.value = url;
            }
        }
    }

    setFilePreviewState() {
        this.setState({
            isFilesListEnabled: true,
            isPreviewFileEnabled: true
        });
    }

    render() {
        return <Container>
            <SelectButton onClick={this.setFileListEnabledState.bind(this, true)} selected={this.state.selectedUrl} changeUrl={this.onUrlCreated} setFilePreviewState={this.setFilePreviewState} />
            { this.state.isFilesListEnabled ? <FileListControl onClose={this.setFileListEnabledState.bind(this, false)} changeUrl={this.onUrlCreated} onFilePreviewClick={this.setFilePreviewState} isPreviewFileEnabled={this.state.isPreviewFileEnabled} currentFile={this.state.selectedUrl} /> : null}
        </Container>
    }
}