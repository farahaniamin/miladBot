var axios = require('axios').default;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
let count = 0;
let dcount = 0;

var options = {
  method: 'POST',
  url: 'https://miladhospital.com/api/Timing/InfirmaryTiming/PostSearchInfirmaryTimingResult',
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
  },
  data: {
    infirmary: { id: 11, title: 'درمانگاه اسکوپی', code: '11', isScopy: true },
    doctors: [],
    reception: {
      receptionNo: '47859376',
      nationalCode: '0534461018',
      patientFirstName: 'عزت اله',
      patientLastName: 'حلت آبادي فراهاني',
      birthDate: '1338/09/20',
      receptionDate: '1402/06/04',
      fatherName: 'حسين',
      patientMobileNo: '09368441793',
      doctorName: null,
      doctorMedicalNo: '00084974',
      scooppyTypeDtos: [
        {
          code: 105,
          name: 'آندوسكوپي',
          type: 57,
          typeName: 'ScoopyType',
          docs: {},
        },
      ],
    },
    timingTypes: {
      code: 105,
      name: 'آندوسكوپي',
      type: 57,
      typeName: 'ScoopyType',
      docs: {},
    },
    nationalCode: '0534461018',
  },
};

var options2 = {
  method: 'POST',
  url: 'https://miladhospital.com/api/Timing/InfirmaryTiming/PostSearchInfirmaryTimingResult',
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
  },
  data: {
    infirmary: {
      title: 'درمانگاه داخلی و عفونی',
      code: '240',
      coverImage: '',
      hasBlog: true,
      expertises: [],
      id: 34,
    },
    doctors: [],
    nationalCode: '0534461018',
  },
};

var options3 = {
  method: 'POST',
  url: 'https://miladhospital.com/api/Timing/InfirmaryTiming/PostSearchInfirmaryTimingResult',
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
  },
  data: {
    infirmary: {
      title: 'درمانگاه ارتوپدی',
      code: '244',
      coverImage: '',
      hasBlog: true,
      expertises: [],
      id: 20,
    },
    doctors: [],
    nationalCode: '3309694070',
  },
};
function main() {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      // response.data.push(1);
      if (response.data.length !== 0) {
        axios
          .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: 51072330,
            text: response.data,
            parse_mode: 'markdown',
          })
          .catch((e) => console.log(`Telegram Sending Error : ${e}`));
      } else {
        console.log('Empty');
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  count = count + 1;
}

function dakheliFinder() {
  axios
    .request(options2)
    .then(function (response) {
      console.log(response.data);
      let doc = response.data.find(
        (d) => d.doctor.medicalNo == '00037479' || d.doctor.firstName == 'صدیقه'
      );
      if (response.data.length !== 0 && doc.length !== 0) {
        axios
          .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: 51072330,
            text: doc,
            parse_mode: 'markdown',
          })
          .catch((e) => console.log(`Telegram Sending Error : ${e}`));
      } else {
        console.log('Empty');
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  dcount = dcount + 1;
}
function OrtopetyFinder() {
  axios
    .request(options3)
    .then(function (response) {
      console.log(response.data);
      // let doc = response.data.find(
      //   (d) => d.doctor.medicalNo == '00037479' || d.doctor.firstName == 'صدیقه'
      // );
      if (response.data.length !== 0) {
        axios
          .post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: 51072330,
            text: doc,
            parse_mode: 'markdown',
          })
          .catch((e) => console.log(`Telegram Sending Error : ${e}`));
      } else {
        console.log('Empty');
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  dcount = dcount + 1;
}
app.get('/milad', (req, res) => {
  res.send(`running a task every one  minute - ${count} Times .`);
  main();
});

app.get('/dakheli', (req, res) => {
  res.send(`running a task every two  minute - ${dcount} Times .`);
  dakheliFinder();
});

app.get('/Ortopety', (req, res) => {
  res.send(`running a task every two  minute - ${dcount} Times .`);
  OrtopetyFinder();
});

app.get('/', (req, res) => res.send('Milad App Runing Well :)'));

app.listen(port, () => {});
console.log(`Milad app listening on port ${port}`);
