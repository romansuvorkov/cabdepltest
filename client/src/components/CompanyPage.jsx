import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function CompanyPage({ match, history }) {

    const [products, setProducts] = useState([]);
    const [declarations, setDeclarations] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        console.log(match.params.id);
        const fetchData = async () => {
            const data = await axios.get(`/factories/${match.params.id}`)
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            // console.log('data');
            // console.log(data);
            // const arrData = JSON.parse(data.data);
            setProducts(data.data.products);
            setDeclarations(data.data.declarations);
            setCertificates(data.data.certificates);
            setCompany(data.data.company);
        }
        fetchData();
    }, [match.params.id]);


  return (
    <>
    <h2>{company.fullName}</h2>
    <div className="company_info_wrapper">
        <div className="product_list_wrapper">
            <span className="company_card_info"><span className="bold_text">Информация с сайта компании. Раздел каталог продукции</span></span>
            {products.length === 0 && <span className="company_card_info"><span className="bold_text">Пока нет инофрмации. Код для парсинга сайта еще не написан.</span></span>}
            {products.length > 0 && products.map((item) => (
                <div className="product_card card" key={uuidv4()}>
                    <span className="company_card_title underline">{item.modelName}</span>
                    <span className="company_card_info"><span className="bold_text">{item.gost}</span></span>
                    <span className="company_card_info"><span className="bold_text">Категория: </span>{item.category}</span>
                    <span className="company_card_info"><span className="bold_text">Элементы конструкции:</span></span>
                    <ol>
                    {item.structure.length > 0 && item.structure.map((structureItem) => (
                        <li key={uuidv4()}>{structureItem}</li>
                    ))}
                    </ol>

                </div>
            ))}            
        </div>
        <div className="declarations_list_wrapper">
            <span className="company_card_info"><span className="bold_text">Информация с сайта национальной системы аккредитации. Декларации соответствия</span></span>
            {declarations.length > 0 && declarations.map((item) => (
                <div className="product_card card" key={uuidv4()}>
                    <span className="company_card_title underline">{item.decl_type}</span>
                    <span className="company_card_info">Продукция: {item.product_group}</span>
                    <span className="company_card_info">Изделие: {item.asproduct_info}</span>
                </div>
            ))}            
        </div>
        <div className="sertificates_list_wrapper">
            <span className="company_card_info"><span className="bold_text">Информация с сайта национальной системы аккредитации. Сертификаты соответствия</span></span>
            {certificates.length > 0 && certificates.map((item) => (
                <div className="product_card card" key={uuidv4()}>
                    <span className="company_card_title underline">{item.cert_type}</span>
                    <span className="company_card_info">Продукция: {item.product_group}</span>
                    <span className="company_card_info">Изделие: {item.product_info}</span>
                    <span className="company_card_info">ID сертификата: {item.id_cert}</span>
                </div>
            ))}            
        </div>

    </div>
    </>
  );
}

export default CompanyPage;