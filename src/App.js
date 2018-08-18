import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import SynonymsGenerator from './SynonymsGenerator'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            synonyms: null,
            wordsList: null,
            activeWordId: null,
        }
    }

    getText = () => {
        getMockText().then(result => {
            const wordsList = result.split(" ").map((elem, key) => ({
                text: elem,
                id: key,
                style: {}
            }));

            this.setState({wordsList})
        });
    }

    componentDidMount(){
        this.getText();
    }

    doubleClickHandler = word => {
        const { text, id } = word;

        SynonymsGenerator.findSynonyms(text).then(synonyms => {
            this.setState({synonyms, activeWordId: id})
        });
    }

    changeTextStyle = style => {
        const { wordsList, activeWordId } = this.state;
        const styleType = Object.keys(style)[0];

        const updatedList = wordsList.map(elem => {
            if(elem.id === activeWordId){
                let newStyles;
                const styleObjKeys = Object.keys(elem.style);
                if(styleObjKeys.length > 0){
                    for(let i in elem.style){
                        if(i === styleType){
                            newStyles = styleObjKeys.reduce((obj, key) =>{
                                if(key !== styleType){
                                    obj[key] = elem.style[key]
                                }
                                return obj;
                            }, {});
                        } else {
                            newStyles = {...elem.style, ...style}
                        }
                    }
                } else {
                    newStyles = style;
                }
                elem.style = {...newStyles};
            }
            return elem;
        });

        this.setState({wordsList: updatedList});
    }

    replaceWord = word => {
        const { wordsList, activeWordId } = this.state;

        const updatedList = wordsList.map(elem => {
            if(elem.id === activeWordId){
                elem.text = word
            }
            return elem;
        });

        this.setState({wordsList: updatedList});
    }

    render() {
        const { wordsList, synonyms } = this.state;

        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        synonyms={synonyms}
                        replaceWord={this.replaceWord}
                        changeTextStyle={this.changeTextStyle}
                    />
                    {wordsList && <FileZone
                        wordsList={wordsList}
                        doubleClickHandler={this.doubleClickHandler}
                    />}
                </main>
            </div>
        );
    }
}

export default App;
