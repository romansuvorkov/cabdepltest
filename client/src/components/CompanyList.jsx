import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function CompanyList() {

    const [factories, setFactories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('/factories')
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            // console.log('data');
            // console.log(data);
            // const arrData = JSON.parse(data.data);
            setFactories(data.data);
        }
        fetchData();
    }, []);


  return (
    <div className="company_list_wrapper">
        {factories.length > 0 && factories.map((item) => (
            <div className="company_card card" key={item.inn}>
                <span className="company_card_title">{item.fullName}</span>
                <span className="company_card_info">ИНН: {item.inn}</span>
                <span className="company_card_info">ОГРН: {item.ogrn}</span>
                <a className="company_card_info" href={`/company/${item.inn}`}>Посмотреть информацию о компании</a>
            </div>
        ))}
    </div>
  );
}

export default CompanyList;