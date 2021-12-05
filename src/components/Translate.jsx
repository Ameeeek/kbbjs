import React, {useState, useEffect} from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";
export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [languageList, setLanguageList] = useState([])
    const [detectLanguageKey, setDetectedlanguageKey] = useState('')
    const [selectedLanguageKey, setLanguageKey] = useState('');
    const getLanguageSource = () =>{
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText

        })
        .then((response) =>{
            setDetectedlanguageKey(response.data[0].language)
        })
    }
    const translateText = () =>{
        setResultText(inputText)
        getLanguageSource()
        let data= {
            q : inputText,
            source:detectLanguageKey,
            target: selectedLanguageKey,


        }
        
        axios.post('https://libretranslate.de/translate', data)
        .then((response)=>{
            setResultText(response.data.translatedText)
        })
    }
    useEffect(() =>{
        axios.get('https://libretranslate.de/languages')
        .then((response) =>{
            setLanguageList(response.data)
        })
        getLanguageSource()
    }, [inputText])
    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }
    return (
        <div>
            <div className="app-header">
                <h2 className="header">amek translator</h2>
            </div>
            <div className="app-body">
                <div className="">
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder="Type Text to translate.."
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <select className="language-select" onChange={languageKey}>
                            <option>select your language</option>
                            {languageList.map((language) =>{
                                return(
                                    <option value={language.code}>{language.name}</option>
                                    )
                            })}
                        </select>
                        <Form.Field
                            control={TextArea}
                            placeholder="Your result Translation"
                            value={resultText}
                        />
                        <Button color="orange" size="large" onClick={translateText}><Icon name='translate' />Translate</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
