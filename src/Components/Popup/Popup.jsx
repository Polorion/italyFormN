import * as React from 'react';
import S from './Popup.module.scss'
import {useEffect, useState} from "react";
import * as ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllCityRedux, getAllContactRedux} from "../../store/main/main.js";

export const Popup = ({title, elem, closed, choice, type, setError}) => {
    const isLoading = useSelector(state => state.main.isLoading)
    const [error, setErrorState] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        if (type === 'setMainCity') {
            dispatch(getAllCityRedux())
        } else {
            dispatch(getAllContactRedux())
        }
    }, [])
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
    return ReactDOM.createPortal(
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
                    {isLoading ? <div className={S.bodiloading}>
                            <div className={S.loadingDots}>
                                <div className={S.dot}></div>
                                <div className={S.dot}></div>
                                <div className={S.dot}></div>
                            </div>
                        </div> :
                        filteredItems.map(el => {
                            return <div onClick={() => {
                                handleItemClick(el)
                                setErrorState(true)
                            }} key={el}
                                        className={`${S.elem} ${S.findItem} ${selectedItem === el && S.active}`}>{el}</div>
                        })}


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
                <div className={`${S.save} ${!error && S.error}`} onClick={() => {
                    if (selectedItem) {
                        exit()
                        setError()
                    } else {
                        setErrorState(false)
                    }

                    choice(type, selectedItem)
                }}>сохранить
                </div>
            </div>

        </div>, node
    );
};