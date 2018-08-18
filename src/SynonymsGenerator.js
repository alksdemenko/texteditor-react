import {apiURL, synonymsQuantity, wordTypePrefix} from './constants';
import axios from 'axios';

class SynonymsGenerator{
    constructor(apiURL, synonymsQuantity, wordTypePrefix){
        this.apiURL = apiURL;
        this.synonymsQuantity = synonymsQuantity;
        this.wordTypePrefix = wordTypePrefix;
    }

    async findSynonyms(word){
        return await this.fetchSynonyms(word);
    }

    fetchSynonyms(word){
        return axios.get(`${this.apiURL}?${this.wordTypePrefix}=${word}`)
            .then(response => {
                let synonymsArray = [];

                if(response.data.length > this.synonymsQuantity){
                    for(let i = 0; i < this.synonymsQuantity; i++){
                        synonymsArray.push(response.data[i]);
                    }
                } else{
                    synonymsArray = response.data;
                }

                return synonymsArray
            })
            .catch(err => {
                throw new Error(err);
            })
    }
}

export default new SynonymsGenerator(apiURL, synonymsQuantity, wordTypePrefix);