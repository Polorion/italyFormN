import * as React from 'react';
import S from './MainPage.module.scss'
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Popup} from "../Popup/Popup";
import {PopupMore} from "../PopupMore/PopupMore.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    setChoiceChoiceCityStore,
    setChoiceContractStore,
    setChoiceProductsStore, setData,
    setMainCityStore
} from "../../store/main/main.js";
import {Send} from "../send/send.jsx";

export const MainPage = () => {

    const node = document.querySelector(":root");
    const [mainCity, setMainCity] = useState(false)
    const [contract, setContract] = useState(false)
    const [product, setProduct] = useState(false)
    const [moreCity, setMoreCity] = useState(false)
    const [isSend, setIsSend] = useState(false)
    useEffect(() => {
        if (mainCity || contract || product || moreCity) {
            node.style.overflow = 'hidden'
        } else {
            node.style.overflow = 'auto'
        }

    }, [mainCity,
        contract,
        product,
        moreCity,

    ])
    const mainCityData = useSelector(state => state.main.mainCity)
    const contractData = useSelector(state => state.main.contract)
    const productsData = useSelector(state => state.main.products)
    const choiceCityData = useSelector(state => state.main.choiceCity)

    const choiceCainCity = useSelector(state => state.main.choiceMainCity)
    const choiceContract = useSelector(state => state.main.choiceContract)
    const choiceProducts = useSelector(state => state.main.choiceProducts)
    const choiceChoiceCity = useSelector(state => state.main.choiceChoiceCity)
    const dispatch = useDispatch()
    const [innValue, setInnValue] = useState('')
    const [tellValue, setTellValue] = useState('')
    const [tellValueGL, setTellValueGL] = useState('')
    const choiceAll = (name, data) => {
        switch (name) {
            case 'setMainCity':
                dispatch(setMainCityStore(data))
                return
            case 'setContact':
                dispatch(setChoiceContractStore(data))
                return;
            case 'setProduct':
                dispatch(setChoiceProductsStore(data))
                return;
            case 'setAllCity':
                dispatch(setChoiceChoiceCityStore(data))
                return;
        }
    }
    const {register, handleSubmit, formState, clearErrors} = useForm({
        mode: "onTouched"
    })
    const onSubmit = (data) => {

        setIsSend(true)
        const sedData = () => {

            return {
                dop_goroda: choiceChoiceCity,
                fact_name: data.name,
                gorod: choiceCainCity[0],
                inn: data.inn,
                contact_fio: data.ownerName,
                contact_phone: data.tell,
                contact_email: data.email,

                contact_type: choiceContract[0],
                cat_products: choiceProducts,
                usloviya_postavki: data.summary,
                ruk_fio: data.ownerNameGL,
                ruk_email: data.emailGL,
                ruk_phone: data.tellGL
            }
        }
        dispatch(setData(sedData()))
    }
    const choiceCity = (e) => {
        e.preventDefault()
        setMainCity(prevState => !prevState)
    }
    const choiceContact = (e) => {
        e.preventDefault()
        setContract(prevState => !prevState)
    }
    const choiceProduct = (e) => {
        e.preventDefault()
        setProduct(prevState => !prevState)
    }
    const choiceMoreCity = (e) => {
        e.preventDefault()
        setMoreCity(prevState => !prevState)
    }

    return (
        <div className={`${S.body} ${mainCity && S.block}`}>
            <form onClick={() => {
                console.log(formState.errors)
            }} className={S.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={`${S.name} ${S.inputBody} `}>
                    <p className={S.titleBlock}>Фактическое название
                    </p>
                    <input className={formState.errors.name && S.errorInput} {...register('name', {
                        required: 'поле не должно быть пустым',
                    })} type="text"/>
                    <div className={S.error}> {formState.errors.name && formState.errors.name.message}</div>
                </div>
                <div className={`${S.inn} ${S.inputBody}`}>
                    <p className={S.titleBlock}> ИНН</p>
                    <input value={innValue} onInput={(e) => {

                        if (e.target.value.length < 13) {
                            setInnValue(e.target.value)
                        }
                    }} className={formState.errors.inn && S.errorInput} {...register('inn', {
                        minLength: {value: 10, message: 'должно быть больше 10 цыфр'},
                        required: 'поле не должно быть пустым',
                    })} type="number"/>
                    <div className={S.error}> {formState.errors.inn && formState.errors.inn.message}</div>
                </div>
                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceCity}>выбрать основной город</button>
                    <div {...register('btn', {
                        validate: () => {
                            if (!choiceCainCity[0]) {
                                return false
                            } else {
                                return true
                            }
                        }

                    })} className={!choiceCainCity[0] && S.none}>
                        {choiceCainCity && choiceCainCity[0]}
                    </div>
                    <div className={S.error}>{formState.errors.btn && <div>выберите из списка</div>} </div>
                </div>
                <div className={`${S.owner} ${S.inputBody}`}>
                    <div className={`${S.ownerName} ${S.NFO} `}>
                        <p className={S.titleBlock}> Имя Фамилия Отчество </p>
                        <input className={formState.errors.ownerName && S.errorInput} {...register('ownerName', {
                            required: 'поле не должно быть пустым',
                        })} type="text"/>
                        <div
                            className={S.error}> {formState.errors.ownerName && formState.errors.ownerName.message}</div>
                    </div>
                </div>
                <div className={`${S.tell} ${S.inputBody}`}>
                    <p className={S.titleBlock}> Номер телефона
                    </p>
                    <input onFocus={() => {
                        if (tellValue === '') {

                            setTellValue(8)
                        }
                    }} value={tellValue} onInput={(e) => {

                        if (e.target.value.length < 12) {
                            setTellValue('8' + e.target.value.replace(/^8/, ''));
                        }
                    }} placeholder={'8965044040'}
                           className={formState.errors.tell && S.errorInput} {...register('tell', {
                        minLength: {value: 11, message: 'должно быть 11 цыфр'},
                        required: 'поле не должно быть пустым',

                    })} type="number"/>
                    <div className={S.error}> {formState.errors.tell && formState.errors.tell.message}</div>
                </div>
                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceContact}>Должность</button>
                    <div {...register('btn2', {
                        validate: () => {
                            if (!choiceContract[0]) {
                                return false
                            } else {
                                return true
                            }
                        }

                    })} className={!choiceContract[0] && S.none}>
                        {choiceContract && choiceContract[0]}
                    </div>
                    <div className={S.error}>{formState.errors.btn2 && <div>выберите из списка</div>} </div>
                </div>
                <div className={`${S.email} ${S.inputBody}`}>
                    <p className={S.titleBlock}> Email
                    </p>
                    <input
                        className={formState.errors.email && S.errorInput} {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9-а-яА-ЯёЁ._%+]+@[a-zA-Z0-9.-а-яА-ЯёЁ]+\.[a-zA-Zа-яА-ЯёЁ]{2,}$/,
                            message: 'это не емайл'
                        },
                        required: 'поле не должно быть пустым',

                    })} type="text"/>
                    <div className={S.error}> {formState.errors.email && formState.errors.email.message}</div>
                </div>
                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceProduct}>Основные категории продуктов</button>
                    <div  {...register('btn3', {

                            validate: () => {
                                if (!choiceProducts[0]) {
                                    return false
                                } else {
                                    return true
                                }
                            }

                        }
                    )} className={choiceProducts.length < 1 && S.none}>
                        {choiceProducts && choiceProducts.map(el => <p>{el}</p>)}
                    </div>
                    <div className={S.error}>{formState.errors.btn3 && <div>выберите из списка</div>} </div>
                </div>
                <div className={`${S.summary} ${S.inputBody}`}>
                    <p className={S.titleBlock}> Максимально подробное описание ваших условий заказа (время приемки
                        заказов и отгрузки,
                        минимальная сумма заказа и др.) </p>
                    <textarea className={formState.errors.summary && S.errorInput} {...register('summary', {
                        required: 'поле не должно быть пустым',

                    })} />
                    <div className={S.error}> {formState.errors.summary && formState.errors.summary.message}</div>
                </div>
                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceMoreCity}>В какие города возможны поставки</button>
                    <div  {...register('btn4', {
                        validate: () => {
                            if (!choiceChoiceCity[0]) {
                                return false
                            } else {
                                return true
                            }
                        }

                    })} className={choiceChoiceCity.length < 1 && S.none}>
                        {choiceChoiceCity && choiceChoiceCity.map(el => <p>{el}</p>)}
                    </div>
                    <div className={S.error}>{formState.errors.btn4 && <div>выберите из списка</div>} </div>
                </div>
                <div className={`${S.tell} ${S.inputBody}`}>
                    <p className={S.titleBlock}> телефон руководителя
                    </p>
                    <input onFocus={() => {
                        if (tellValueGL === '') {

                            setTellValueGL(8)
                        }
                    }} value={tellValueGL} onInput={(e) => {

                        if (e.target.value.length < 12) {
                            setTellValueGL('8' + e.target.value.replace(/^8/, ''));
                        }
                    }} placeholder={'8965044040'}
                           className={formState.errors.tellGL && S.errorInput} {...register('tellGL', {
                        minLength: {value: 11, message: 'должно быть 11 цыфр'},
                        required: 'поле не должно быть пустым',

                    })} type="number"/>
                    <div className={S.error}> {formState.errors.tellGL && formState.errors.tellGL.message}</div>
                </div>
                <div className={`${S.owner} ${S.inputBody}`}>
                    <div className={`${S.ownerName} ${S.NFO} `}>
                        <p className={S.titleBlock}> Имя Фамилия Отчество руководителя </p>
                        <input className={formState.errors.ownerNameGL && S.errorInput} {...register('ownerNameGL', {
                            required: 'поле не должно быть пустым',
                        })} type="text"/>
                        <div
                            className={S.error}> {formState.errors.ownerNameGL && formState.errors.ownerNameGL.message}</div>
                    </div>
                </div>
                <div className={`${S.email} ${S.inputBody}`}>
                    <p className={S.titleBlock}> email руководителя
                    </p>
                    <input
                        className={formState.errors.emailGL && S.errorInput} {...register('emailGL', {
                        pattern: {
                            value: /^[a-zA-Z0-9-а-яА-ЯёЁ._%+]+@[a-zA-Z0-9.-а-яА-ЯёЁ]+\.[a-zA-Zа-яА-ЯёЁ]{2,}$/,
                            message: 'это не емайл'
                        },
                        required: 'поле не должно быть пустым',

                    })} type="text"/>
                    <div className={S.error}> {formState.errors.emailGL && formState.errors.emailGL.message}</div>
                </div>
                <div className={S.mailSendA}>Пришлите свой актуальный прайс на почту <br/><a
                    href="mailto:restoranam.nado@gmail.com">restoranam.nado@gmail.com</a></div>
                {mainCity &&
                    <Popup setError={() => {
                        clearErrors('btn')
                    }} title={'основной город'} elem={mainCityData} closed={setMainCity} type={'setMainCity'}
                           choice={choiceAll}/>}
                {contract && <Popup setError={() => {
                    clearErrors('btn2')
                }} title={'Вид контракта'} elem={contractData} closed={setContract} type={'setContact'}
                                    choice={choiceAll}/>}
                {product && <PopupMore setError={() => {
                    clearErrors('btn3')
                }} title={'Основные категории продуктов'} type={'setProduct'}
                                       choice={choiceAll} elem={productsData} closed={setProduct}/>}
                {moreCity &&
                    <PopupMore setError={() => {
                        clearErrors('btn4')
                    }} title={'В какие города возможны поставки'} type={'setAllCity'}
                               choice={choiceAll} elem={mainCityData} closed={setMoreCity}/>}
                <button className={S.send}>Отправить</button>
                {isSend && <Send exit={setIsSend}/>}
            </form>
        </div>
    );
};
