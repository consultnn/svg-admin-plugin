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

        this.state = {
            isFilesListEnabled: false,
            selectedUrl: null,
            apiURL: null,
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
            isFilesListEnabled: state
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

    render() {
        return <Container>
            <SelectButton onClick={this.setFileListEnabledState.bind(this, true)} selected={this.state.selectedUrl} />
            { this.state.isFilesListEnabled ? <FileListControl onClose={this.setFileListEnabledState.bind(this, false)} changeUrl={this.onUrlCreated.bind(this)} /> : null}
        </Container>
    }
}