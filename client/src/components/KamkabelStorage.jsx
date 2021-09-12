import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function KamkabelStorage() {

    const [data, setData] = useState([]);

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
            setData(data.data);
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
    <div className="intergascert_wrapper">
        {data.length > 0 && data.map((item) => (
            <div className="cert_card card" key={item._id}>
                <span className="company_card_title">{item.nomenclature}</span>
                <span className="company_card_info">Город: {item.city}</span>
                <span className="company_card_info">Еденицы измерения: {item.unit_of_measure}</span>
                <span className="company_card_info">Наличие: {item.quantity}</span>
                <span className="company_card_info">Код партии: {item.batch_code}</span>
            </div>
        ))}
    </div>
  );
}

export default KamkabelStorage;