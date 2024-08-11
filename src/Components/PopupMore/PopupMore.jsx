import * as React from 'react';
import S from './PopupMore.module.scss'
import {useState} from "react";
import * as ReactDOM from "react-dom";

export const PopupMore = ({title, elem, closed, type, choice}) => {
    const node = document.querySelector("#modal");
    const exit = (e) => {
        closed(prev => !prev)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleItemClick = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const filteredItems = elem.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ReactDOM.createPortal (
        <div className={S.bodyShadow} onClick={exit}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={S.body}>
                <div onClick={exit} className={S.exit}></div>


                <h1>{title}</h1>
                <div className={S.search}>
                    <input placeholder={'введите данные'} value={searchTerm}
                           onChange={handleSearchChange} type="text"/>
                </div>
                <div className={S.find}>
                    {filteredItems.map(el => <div onClick={() => handleItemClick(el)} key={el}
                                                  className={`${S.elem} ${selectedItems.includes(el) && S.active}`}>{el}</div>)}
                </div>
                <div onClick={() => {
                }}>
                    {selectedItems.length > 0 && (
                        <div className={S.choiceBlock}>
                            <h3>Выбранные элементы:</h3>
                            <ul>
                                {selectedItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
                <div className={S.save} onClick={() => {
                    exit()
                    choice(type, selectedItems)
                }}>сохранить
                </div>
            </div>

        </div>
        ,node
    );
};

