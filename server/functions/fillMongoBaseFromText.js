const fs = require('fs');

const fillMongoBaseFromText = async (pathToFile, database, collection, properties, isObject) => {
  // return new Promise((resolve, reject) => {
    const objectsArr = JSON.parse(fs.readFileSync(pathToFile), 'utf8');
    for (let data of objectsArr) {
      if (isObject) {
        const note = await database.collection(collection).insertOne(data);
        console.log('note.insertedId true');
        console.log(note.insertedId);
      } else {
        let item = {};
        for (let property of properties) {
          item[property] = data[property];
        }
        const note = await database.collection(collection).insertOne(item);
        console.log('note.insertedId');
        console.log(note.insertedId);
      }

      // const note = await database.db.collection("notes").insertOne({
      //  id_decl: data.id_decl,
      //  reg_number: data.reg_number,
      //  decl_status: data.decl_status,
      //  decl_type: data.decl_type,
      //  date_beginning: data.date_beginning,
      //  date_finish: data.date_finish,
      //  declaration_scheme: data.declaration_scheme,
      //  product_object_type_decl: data.product_object_type_decl,
      //  product_type: data.product_type,
      //  product_group: data.product_group,
      //  product_name: data.product_name,
      //  asproduct_info: data.asproduct_info,
      //  product_tech_reg: data.product_tech_reg,
      //  organ_to_certification_name: data.organ_to_certification_name,
      //  organ_to_certification_reg_number: data.organ_to_certification_reg_number,
      //  basis_for_decl: data.basis_for_decl,
      //  old_basis_for_decl: data.old_basis_for_decl,
      //  applicant_type: data.applicant_type,
      //  person_applicant_type: data.person_applicant_type,
      //  applicant_ogrn: data.applicant_ogrn,
      //  applicant_inn: data.applicant_inn,
      //  applicant_name: data.applicant_name,
      //  manufacturer_type: data.manufacturer_type,
      //  manufacturer_ogrn: data.manufacturer_ogrn,
      //  manufacturer_inn: data.manufacturer_inn,
      //  manufacturer_name: data.manufacturer_name
      // });
      // console.log('note.insertedId');
      // console.log(note.insertedId);
    }
  }
  //   resolve();
  // })

module.exports.fillMongoBaseFromText = fillMongoBaseFromText;
