import * as React from 'react';
import S from './MainPage.module.scss'
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Popup} from "../Popup/Popup";
import {PopupMore} from "../PopupMore/PopupMore.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    setChoiceChoiceCityStore,
    setChoiceContractStore,
    setChoiceProductsStore,
    setMainCityStore
} from "../../store/main/main.js";

export const MainPage = () => {
    const mainCityData = useSelector(state => state.main.mainCity)
    const contractData = useSelector(state => state.main.contract)
    const productsData = useSelector(state => state.main.products)
    const choiceCityData = useSelector(state => state.main.choiceCity)

    const choiceCainCity = useSelector(state => state.main.choiceMainCity)
    const choiceContract = useSelector(state => state.main.choiceContract)
    const choiceProducts = useSelector(state => state.main.choiceProducts)
    const choiceChoiceCity = useSelector(state => state.main.choiceChoiceCity)
    const dispatch = useDispatch()
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
    const [mainCity, setMainCity] = useState(false)
    const [contract, setContract] = useState(false)
    const [product, setProduct] = useState(false)
    const [moreCity, setMoreCity] = useState(false)
    const {register, handleSubmit, formState} = useForm({
        mode: "onBlur"
    })
    const onSubmit = (data) => {
        console.log(formState.errors)
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
        <div className={`${S.body} ${mainCity&&S.block}`}>
            <form className={S.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <input className={formState.errors.inn && S.errorInput} {...register('inn', {
                        required: 'поле не должно быть пустым',
                    })} type="text"/>
                    <div className={S.error}> {formState.errors.inn && formState.errors.inn.message}</div>
                </div>
                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceCity}>выбрать основной город</button>
                    <div className={!choiceCainCity[0] && S.none}>
                        {choiceCainCity && choiceCainCity[0]}
                    </div>
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

                    {/*<div className={`${S.ownerFirstName} ${S.NFO} `}>*/}
                    {/*    <p> Фамилия </p>*/}
                    {/*    <input*/}
                    {/*        className={formState.errors.ownerFirstName && S.errorInput} {...register('ownerFirstName', {*/}
                    {/*        required: 'поле не должно быть пустым',*/}
                    {/*    })} type="text"/>*/}
                    {/*    <div*/}
                    {/*        className={S.error}> {formState.errors.ownerFirstName && formState.errors.ownerFirstName.message}</div>*/}
                    {/*</div>*/}

                    {/*<div className={`${S.ownerOt} ${S.NFO} `}>*/}
                    {/*    <p> Отчество </p>*/}
                    {/*    <input className={formState.errors.ownerOt && S.errorInput} {...register('ownerOt', {*/}
                    {/*        required: 'поле не должно быть пустым',*/}
                    {/*    })} type="text"/>*/}
                    {/*    <div className={S.error}> {formState.errors.ownerOt && formState.errors.ownerOt.message}</div>*/}
                    {/*</div>*/}
                </div>
                <div className={`${S.tell} ${S.inputBody}`}>
                    <p> Номер телефона
                    </p>
                    <input placeholder={'8965044040'}
                           className={formState.errors.tell && S.errorInput} {...register('tell', {
                        required: 'поле не должно быть пустым',

                    })} type="number"/>
                    <div className={S.error}> {formState.errors.tell && formState.errors.tell.message}</div>
                </div>

                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceContact}>Вид контракта</button>
                    <div className={!choiceContract[0] && S.none}>
                        {choiceContract && choiceContract[0]}
                    </div>
                </div>

                <div className={S.choiceBlock}>
                    <button className={S.button} onClick={choiceProduct}>Основные категории продуктов</button>
                    <div className={choiceProducts.length < 1 && S.none}>
                        {choiceProducts && choiceProducts.map(el => <p>{el}</p>)}
                    </div>
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
                    <div className={choiceChoiceCity.length < 1 && S.none}>
                        {choiceChoiceCity && choiceChoiceCity.map(el => <p>{el}</p>)}
                    </div>
                </div>


                {mainCity &&
                    <Popup title={'основной город'} elem={mainCityData} closed={setMainCity} type={'setMainCity'}
                           choice={choiceAll}/>}
                {contract && <Popup title={'Вид контракта'} elem={contractData} closed={setContract} type={'setContact'}
                                    choice={choiceAll}/>}
                {product && <PopupMore title={'Основные категории продуктов'} type={'setProduct'}
                                       choice={choiceAll} elem={productsData} closed={setProduct}/>}
                {moreCity &&
                    <PopupMore title={'В какие города возможны поставки'} type={'setAllCity'}
                               choice={choiceAll} elem={mainCityData} closed={setMoreCity}/>}
                <button className={S.send}>Отправить</button>


            </form>
        </div>
    );
};