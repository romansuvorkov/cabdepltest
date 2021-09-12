import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function InfoSourceList() {

    // const [factories, setFactories] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await axios.get('/factories')
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         });
    //         // console.log('data');
    //         // console.log(data);
    //         // const arrData = JSON.parse(data.data);
    //         setFactories(data.data);
    //     }
    //     fetchData();
    // }, []);


  return (
    <div className="info_source_wrapper">
        <h2 className="info_source_header">Источники информации о рынке</h2>
            <div className="info_source_list_wrapper">
                <div className="company_card card">
                    <span className="company_card_title">ИНТЕРГАЗСЕРТ</span>
                    <span className="company_card_info">Система добровольной сертификации ИНТЕРГАЗСЕРТ (далее – Система ИНТЕРГАЗСЕРТ) создана ПАО «Газпром» приказом от 24 ноября 2016 г. №751 и зарегистрирована в едином реестре систем добровольной сертификации Федерального Агентства по техническому регулированию и метрологии (Росстандарт) под номером РОСС RU.З1570.04ОГН0.</span>
                    <a className="company_card_info" href={`/interGasCert`}>Посмотреть сертифицированных производителей и продукцию</a>
                </div>
            </div>
            <div className="info_source_list_wrapper">
                <div className="company_card card">
                    <span className="company_card_title">Данные с сайта Камкабеля о свободном наличии на складе</span>
                    <span className="company_card_info">Данные можно систематизировать и отслеживать наличие каждой партии, т.к. Камкабель указывает код партии. Т.е. можно анализировать какую продукцию они кладут на склад и в какой срок они ее реализовывают</span>
                    <a className="company_card_info" href={`/kamkabelStorage`}>Посмотреть наличие на 30.08.21</a>
                </div>
            </div>
    </div>
  );
}

export default InfoSourceList;