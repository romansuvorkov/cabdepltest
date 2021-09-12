import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function InterGasCert() {

    const [certs, setСerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('/gascert')
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            // console.log('data');
            // console.log(data);
            const arrData = data.data;
            console.log('arrData');
            console.log(arrData);
            setСerts(arrData);
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
        {certs.length > 0 && certs.map((item) => (
            <div className="cert_card card" key={item.cert_id}>
                <span className="company_card_title">{item.cert_id}</span>
                <span className="company_card_info">Заявитель: {item.applicant}</span>
                <span className="company_card_info">Изготовитель: {item.manufacturer}</span>
                <span className="company_card_info">Продукция: {item.product_name}</span>
            </div>
        ))}
    </div>
  );
}

export default InterGasCert;