import * as React from 'react';
import S from './PopupMore.module.scss'
import {useEffect, useState} from "react";
import * as ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllCityRedux, getAllContactRedux, getAllProductRedux} from "../../store/main/main.js";

export const PopupMore = ({title, elem, closed, type, choice, setError}) => {
    const isLoading = useSelector(state => state.main.isLoading)
    const [error, setErrorState] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'setAllCity') {
            dispatch(getAllCityRedux())
        } else {
            dispatch(getAllProductRedux())
        }
    }, [])
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

    return ReactDOM.createPortal(
        <div className={S.bodyShadow} onClick={exit}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={S.body}>
                <div onClick={exit} className={S.exit}></div>


                <h1 className={S.title}>{title}</h1>
                <div className={S.search}>
                    <input placeholder={'Поиск'} value={searchTerm}
                           onChange={handleSearchChange} type="text"/>
                </div>
                <div className={S.find}>
                    {isLoading ? <div className={S.bodiloading}>
                            <div className={S.loadingDots}>
                                <div className={S.dot}></div>
                                <div className={S.dot}></div>
                                <div className={S.dot}></div>
                            </div>
                        </div> :
                        filteredItems.map(el => <div onClick={() => handleItemClick(el)} key={el}
                                                     className={`${S.elem} ${S.findItem} ${selectedItems.includes(el) && S.active}`}>{el}</div>)
                    }

                </div>
                <div onClick={() => {
                }}>
                    {selectedItems.length > 0 && (
                        <div className={S.choiceBlock}>
                            <h3 className={S.choiceTitle}>Выбранные элементы:</h3>
                            <div className={S.ChoiceBlockItems}>
                                <ul>
                                    {selectedItems.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    )}

                </div>
                <div className={`${S.save} ${!error && S.error}`} onClick={() => {
                    if (selectedItems[0]) {
                        exit()
                        setError()
                    } else {
                        setErrorState(false)
                    }


                    choice(type, selectedItems)
                }}>сохранить
                </div>
            </div>

        </div>
        , node
    );
};

