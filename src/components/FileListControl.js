import React, { Component } from 'react';
import Icon from './Icon';
import Loading from './Loading';
import Preview from './Preview';
import PreviewRender from './PreviewRender';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	background-color: white;
	box-shadow: 0 6px 18px 0 rgba(14,21,47,.13), 0 -2px 6px rgba(14,21,47,.03);
	border-radius: 8px;
	z-index: 1000;
`;

const HeaderButton = styled.button`
	display: inline-flex;
	background-color: transparent;
	cursor: pointer;
	border: none;
	padding: 12px;
	opacity: 0.8;
	align-items: center;
	height: 44px;
	&:focus {
		outline: none;
	}
	&:hover {
		opacity: 1;
	}

	&:disabled {
		cursor: default;
		opacity: 0.4;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const HeaderTitle = styled.div`
	font-weight: bold;
	font-size: 18px;
	padding: 8px 12px;
	flex: 1;
	user-select: none;
	text-align: center;
	white-space: nowrap;
	overflow-x: hidden;
`;

const SecondaryTitle = styled.span`
	color: gray;
`;

const File = styled.button`
	display: inline-flex;
	padding: 8px 12px;
	align-items: center;
	background-color: transparent;
	border: none;
	transition: background-color 0.15s ease;

	&:nth-child(even) {
		background-color: #fafafa;
	}
	&:focus, &:hover {
		outline: none;
		background-color: #D0E8FC;
	}
`;

const FilesList = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 5px;
	max-height: 500px;
	overflow-y: auto;
`;

const EmptyFolderMessage = styled.div`
	font-size: 13px;
	color: #212121;
	text-align: center;
	padding: 100px 50px;
`;

export default class FileListControl extends Component {
	constructor() {
		super();

		this.onBackClick = this.onBackClick.bind(this);
		this.onShowPlanClick = this.onShowPlanClick.bind(this);
		this.onRefreshClick = this.onRefreshClick.bind(this);

		this.titleRef = React.createRef();

		this.state = {
			currentPath: null,
			rootPath: null,
			files: [],
			flats: [],
			isLoading: false,
			isPreviewEnabled: false,
			currentFile: null,
			currentFolder: {},
			childrenFolders: []
		}
	}

	async componentDidMount() {
		this._domain = document.getElementById('svg-admin-list').dataset.appDomain || 'ru';
		const rootPath = await fetch(`https://svgcloud.${this._domain}/fs/root`).then(response => response.text());

		this.setState({
			currentPath: rootPath,
			rootPath: rootPath
		});

		if (this.props.currentFile) {
			const currentFile = this.props.currentFile;
			this.onFileClick(rootPath + currentFile);
		}

		this._getList(rootPath);
	}

	componentDidUpdate() {
		if (this.titleRef.current) {
			this.titleRef.current.scrollTo({ left: 999999, behavior: "smooth" });
		}
	}

	async _getList(path) {
		this.setState({
			isLoading: true
		});

		const promise = await fetch(`https://svgcloud.${this._domain}/fs/list?path=${path}`)
			.then(response => response.json())
			.then(result => {
				this.setState({
					isLoading: false,
					files: result.files,
					childrenFolders: result.directories,
					currentFolder: result.currentDirectory,
					currentPath: path
				})
			});
	}

	onFolderClick(newPath) {
		this.setState({
			currentState: newPath
		});

		this._getList(newPath);
	}

	async onFileClick(path) {
		this.setState({
			isLoading: true
		});

		await fetch(`https://svgcloud.${this._domain}/fs/flats?path=${path}`)
			.then(response => response.json())
			.then(result => {
				this.setState({
					isLoading: false,
					flats: result,
					currentFile: path.replace(this.state.rootPath, '')
				})
			});
	}

	onBackClick() {
		if (!this.state.currentFile) {
			this._getList(this.state.currentFolder.parent);
			return;
		}

		if (this.state.isPreviewEnabled) {
			this.setState({
				isPreviewEnabled: false
			})

			return;
		}

		this.setState({
			currentFile: null,
			flats: []
		});

		this._getList(this.state.currentFolder.path);
	}

	onRefreshClick() {
		if (!this.state.currentFile) {
			this._getList(this.state.currentFolder.path);
		}
	}

	onShowPlanClick() {
		this.setState({
			isPreviewEnabled: true
		});
	}

	onAllFloorClick() {
		this.props.changeUrl(this.state.currentFile.replace(this.state.rootPath, ''));
		this.props.onClose();
	}

	async onFlatClick(flatName) {
		this.props.changeUrl(this.state.currentFile.replace(this.state.rootPath, '') + '#' + flatName);

		const element = document.getElementById('svg-admin-list');
		const commonAreaSelector = element.dataset.commonSelector;
		const livingAreaSelector = element.dataset.livingSelector;
		const kitchenAreaSelector = element.dataset.kitchenSelector;

		console.log(commonAreaSelector, livingAreaSelector, kitchenAreaSelector);

		const fileContent = await fetch(`https://svgcloud.${this._domain}/render?path=${this.state.currentFile}&flat=${flatName}`)
			.then(response => response.text())
			.then(result => {
				const tempContainer = document.createElement('div');
				tempContainer.innerHTML = result;

				const flatGroup = tempContainer.querySelector('svg > g');

				const commonAreaField = document.body.querySelector(commonAreaSelector);
				const commonAreaValue = flatGroup.getAttribute('data-common');
				if (commonAreaField && commonAreaValue) {
					commonAreaField.value = commonAreaValue;
				}

				const livingAreaField = document.body.querySelector(livingAreaSelector);
				const livingAreaValue = flatGroup.getAttribute('data-living').split(';').reduce((summ, current) => parseFloat(summ) + parseFloat(current));
				if (livingAreaField && livingAreaValue) {
					livingAreaField.value = livingAreaValue;
				}

				const kitchenAreaField = document.body.querySelector(kitchenAreaSelector);
				const kitchenAreaValue = flatGroup.getAttribute('data-kitchen');
				if (kitchenAreaField && kitchenAreaValue) {
					kitchenAreaField.value = kitchenAreaValue;
				}

				this.setState({
					isLoading: false,
					flats: result,
					currentFile: path.replace(this.state.rootPath, '')
				})
			});

		this.props.onClose();
	}

	render() {
		let content = null;

		console.log(this.state.currentFile, this.state.isPreviewEnabled, this.props.isPreviewFileEnabled);

		if (this.state.isLoading) {
			content = <Loading />;
		} else if (this.state.currentFile && !this.state.isPreviewEnabled && !this.props.isPreviewFileEnabled) {
			const allFloor = <File type="button" title="Выбрать весь этаж" onClick={this.onAllFloorClick.bind(this)}><Icon i="floor" right={10} /> Выбрать весь этаж</File>;

			if (this.state.flats.length) {
				const selectInPreview = <File type="button" title="Выбрать на плане" onClick={this.onShowPlanClick}><Icon i="plan" right={10} /> Выбрать на плане</File>;

				content = <React.Fragment>
					{ allFloor }
					{ selectInPreview }
					{ this.state.flats.map((flat, flatIndex) => {
						return <File type="button" key={flatIndex} title={flat.name} onClick={this.onFlatClick.bind(this, flat.name)}><Icon i="flat" right={10} /> {flat.name}</File>
					})}
				</React.Fragment>
			} else {
				content = <React.Fragment>
					{ allFloor }
					<EmptyFolderMessage>Нет квартир</EmptyFolderMessage>
				</React.Fragment>
			}
		} else if (this.state.currentFile && this.state.isPreviewEnabled) {
			content = <Preview path={this.state.currentFile} onPreviewClick={this.onFlatClick.bind(this)}/>
		} else if (this.state.currentFile && this.props.isPreviewFileEnabled) {
			content = <PreviewRender path={this.state.currentFile} />
		} else {
			const folders = this.state.childrenFolders.map((folder, folderIndex) => {
				return <File type="button" key={folderIndex} title={folder.name} onClick={this.onFolderClick.bind(this, folder.path)}><Icon i="folder" right={10} /> {folder.name}</File>;
			});

			const files = this.state.files.map((file, fileIndex) => {
				return <File type="button" key={fileIndex} title={file.name} onClick={this.onFileClick.bind(this, file.path)}><Icon i="file" right={10} /> {file.name}</File>;
			});

			let emptyMessage = null;
			if (!folders.length && !files.length && !this.state.isLoading) {
				emptyMessage = <EmptyFolderMessage>Нет файлов</EmptyFolderMessage>
			}

			content = <React.Fragment>
				{folders}
				{files}
				{emptyMessage}
			</React.Fragment>
		}

		let title = 'Выберите файл';
		let secondaryTitle = null;
		if (this.state.currentFolder.path !== this.state.rootPath && this.state.currentFolder.path) {
			title = this.state.currentFolder.title;

			const pathWithoutRoot = this.state.currentFolder.path.replace(this.state.rootPath, '');
			if (pathWithoutRoot.length) {
				secondaryTitle = <SecondaryTitle>..{pathWithoutRoot.split('/').slice(0, -1).join('/')}/</SecondaryTitle>;
			}
		}

		if (this.state.currentFile) {
			title = this.state.currentFile.split('#')[0].split('/').slice(-1);
			secondaryTitle = null;
		}

		return <Container>
			<Header>
				<HeaderButton title="Вернуться назад" onClick={this.onBackClick} type="button" disabled={this.props.isPreviewFileEnabled || (this.state.currentFolder.path === this.state.rootPath && !this.state.currentFile)}><Icon i="back" top={4} /></HeaderButton>
				<HeaderButton title="Обновить список" onClick={this.onRefreshClick} type="button" disabled={this.props.isPreviewFileEnabled || this.state.isPreviewEnabled}><Icon i="refresh" /></HeaderButton>
				<HeaderTitle ref={this.titleRef}>{this.props.isPreviewFileEnabled ? "Предпросмотр файла" : [secondaryTitle, title]}</HeaderTitle>
				<HeaderButton title="Закрыть" onClick={this.props.onClose} type="button"><Icon i="close" /></HeaderButton>
			</Header>
			<FilesList>
				{ content }
			</FilesList>
		</Container>;
	}
}