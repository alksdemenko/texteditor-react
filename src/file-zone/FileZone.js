import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
    createText = words => {
        const { doubleClickHandler } = this.props;

        return words.map(elem => {
            return(
                <span style={elem.style} key={elem.id} onDoubleClick={() => doubleClickHandler(elem)}>
                    {`${elem.text} `}
                </span>
            )
        });
    }

    render() {
        const { wordsList} = this.props;
        const text = this.createText(wordsList);

        return (
            <div id="file-zone">
                <div id="file">
                    {text}
                </div>
            </div>
        );
    }
}

export default FileZone;
