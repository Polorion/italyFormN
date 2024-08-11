import * as React from 'react';
import S from './Popup.module.scss'
import {useState} from "react";
import * as ReactDOM from "react-dom";

export const Popup = ({title, elem, closed, choice, type}) => {
    const node = document.querySelector("#modal");
    const exit = (e) => {
        closed(prev => !prev)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
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
                    <input placeholder={'введите данные'} value={searchTerm} onChange={handleSearchChange} type="text"/>
                </div>
                <div className={S.find}>
                    {filteredItems.map(el => <div onClick={() => handleItemClick(el)} key={el}
                                                  className={`${S.elem} ${selectedItem === el && S.active}`}>{el}</div>)}
                </div>
                <div onClick={() => {
                }}>
                    {selectedItem && (
                        <div className={S.choiceBlock}>
                            <h3>Выбранный элемент:</h3>
                            <p>{selectedItem}</p>
                        </div>
                    )}

                </div>
                <div className={S.save} onClick={() => {
                    exit()
                    choice(type, selectedItem)
                }}>сохранить
                </div>
            </div>

        </div>,node
    );
};