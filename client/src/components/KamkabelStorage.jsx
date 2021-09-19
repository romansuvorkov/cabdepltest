import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

function KamkabelStorage() {

    const [onStore, setOnStore] = useState([]);
    const [mostFast, setMostFast] = useState([]);
    const [mostWeight, setMostWeight] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('/kamkabelWarehouse')
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            // console.log('data');
            // console.log(data);
            // const arrData = JSON.parse(data.data);
            setOnStore(data.data.onStore);
            setMostFast(data.data.mostFast);
            setMostWeight(data.data.mostWeight);
        }
        fetchData();
    }, []);

// cert_id
// cert_blank
// applicant
// applicant_address
// applicant_contacts
// manufacturer
// manufacturer_address
// manufacturer_contacts
// product_name
// cert_date_begin
// cert_date_end
// cert_class
// cert_schema
// cert_organization
// cert_type
  return (
    <>
        <h2>5 партий проданных с 30.08.21 до 02.09.21</h2>
        <div className="intergascert_wrapper">
        {mostFast.length > 0 && mostFast.map((item) => (
                <div className="cert_card card" key={uuidv4()}>
                    <span className="company_card_title">{item.nomenclature}</span>
                    <span className="company_card_info">Город: {item.city}</span>
                    <span className="company_card_info">Дата появления в системе: {item.dateOfAppear}</span>
                    <span className="company_card_info">Дата исчезновения из системы: {item.dateOfDissapear}</span>
                    <span className="company_card_info">Еденицы измерения: {item.unitOfMeasure}</span>
                    <span className="company_card_info">Объем партии: {parseFloat(item.initialQuantity.toFixed(3))}</span>
                    <span className="company_card_info">Код партии: {item.batchCode}</span>
                </div>
            ))}
        </div>
        <h2>5 номенклатур с самым большим объемом реализации из наличия в период с 30.08.21 по 13.09.21</h2>
        <div className="intergascert_wrapper">
        {mostWeight.length > 0 && mostWeight.map((item) => (
                <div className="cert_card card" key={uuidv4()}>
                    <span className="company_card_title">{item.nomenclature}</span>
                    <span className="company_card_info">Объем реализцаии: {item.sold}</span>
                    <span className="company_card_info">Еденицы измерения: {item.unitOfMeasure}</span>
                </div>
            ))}
        </div>
        <h2>Наличие на складе на 13.09.21</h2>
        <div className="intergascert_wrapper">
            {onStore.length > 0 && onStore.map((item) => (
                <div className="cert_card card" key={item._id}>
                    <span className="company_card_title">{item.nomenclature}</span>
                    <span className="company_card_info">Город: {item.city}</span>
                    <span className="company_card_info">Еденицы измерения: {item.unitOfMeasure}</span>
                    <span className="company_card_info">Наличие: {parseFloat(item.initialQuantity.toFixed(3))}</span>
                    <span className="company_card_info">Код партии: {item.batchCode}</span>
                </div>
            ))}
        </div>
    </>
  );
}

export default KamkabelStorage;