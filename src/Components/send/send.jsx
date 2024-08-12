import * as React from 'react';
import S from './Send.module.scss'
import * as ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRequest} from "../../store/main/main.js";

export const Send = ({exit}) => {
    const node = document.querySelector("#modal");
    const isLoading = useSelector(state => state.main.sendLoad)
    const request = useSelector(state => state.main.request)
    const dispatch = useDispatch()
    console.log(request)
    return ReactDOM.createPortal(
        <div className={S.bodyShadow}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={S.body}>
                {isLoading ? <div className={S.bodyDots}>
                        <p>Отправка формы</p>
                        <div className={S.loadingDots}>
                            <div className={S.dot}></div>
                            <div className={S.dot}></div>
                            <div className={S.dot}></div>
                        </div>
                    </div> :
                    <div>
                        <div className={S.requestBlock}>{request.length >= 1 && Object.values(request[0])}</div>
                        <div>
                            <button onClick={() => {
                                exit(false)
                                dispatch(setRequest())
                            }}>закрыть
                            </button>
                        </div>
                    </div>}

            </div>

        </div>, node
    );
};