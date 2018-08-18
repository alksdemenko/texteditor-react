import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
    createSynonymsList = synonyms => {
        const { replaceWord } = this.props;

        return synonyms.map((synonym, index) => (
            <li key={index}>
                <button className="format-action" type="button"
                        onClick={() => replaceWord(synonym.word)}>
                    {synonym.word}
                </button>
            </li>
        ));
    }

    render() {
        const { synonyms, changeTextStyle } = this.props;
        const synonymsList = synonyms ? this.createSynonymsList(synonyms) : null;

        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button className="format-action" type="button" onClick={() => changeTextStyle({fontWeight: 'bold'})}><b>B</b></button>
                    <button className="format-action" type="button" onClick={() => changeTextStyle({fontStyle: 'italic'})}><i>I</i></button>
                    <button className="format-action" type="button" onClick={() => changeTextStyle({textDecoration: 'underline'})}><u>U</u></button>
                </div>
                {synonymsList && <ul id="synonyms-list">{synonymsList}</ul>}
            </div>
        );
    }
}

export default ControlPanel;
