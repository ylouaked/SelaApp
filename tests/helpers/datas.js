export const loginData ={
    valid_data: {
      Nom: 'Yasmine LOUAKED',
      username: '100049',  
      password: '121212'  
    },
    invalid_user: {
       username: '13099', 
       password: '121212'
     },
     invalid_psw: {
       username: '100000',  
       password:  '121214' 
     },
    invalid_data: {
       username: '15',  
       password:  '121212' 
     },
     short_psw:{
      username: '15',  
       password:  '1212' 
       
     },
     empty_user:{
      username: '',  
     }
   
};

export const comptes = {
  courant: {
    nom: "COMPTE COURANT",
    numero: "1130000001",
    solde: "31 620,00 DZD"
  },
  epargne: {
    nom: "COMPTE EPARGNE",
    numero: "1130000537",
    solde: "31 620,00 DZD"
  },
  euro: {
    nom: "COMPTE EURO",
    numero: "1130000538",
    solde: "450 222,00 EUR"
  }
};

export const bénéficiaire ={
nouveau_benef:{
    NomPrénom: "OUSSAMA LAIDI",
    RIB: '021 00001 1030001525 21',
  //  NomPrénom: 'NAFISSA BENHEBBADJ', RIB: '00816001316000515681'
  //  NomPrénom: 'Yasmine LOUAKED', RIB: '00816001316000486969' 
  //  NomPrénom: 'SAMIA BOUBADJOU', RIB: '02100027115034970709' 
  //  NomPrénom: 'Khaled Sebti', RIB: '00500008008462181048' 
  //  NomPrénom: 'Madjda rezig', RIB: '02100001103000219354' 
  //  NomPrénom: 'Elmahdi AMRANE', RIB: '02100001103000020795' 
  //  NomPrénom: 'Haithem KARA', RIB: '02100001014000006070' 
  //  NomPrénom: 'Oussama MAMECHE', RIB: '03200001711862181034' 
  //  NomPrénom: 'Karim BELHADJ', RIB: '00200112112300000146' 
  //  NomPrénom: 'Sam Sam eurO', RIB: '02100001103000165907' 
  //  NomPrénom: 'KAHINA SASSI', RIB: '02100003113000112505' 
  //  NomPrénom: 'Amina BAGHDADI', RIB: '02100001103000194619' 
  //  NomPrénom: 'Mossaab BESSADOK', RIB: '02100022008462181027' 
  //  NomPrénom: 'Meriem Menous', RIB: '00100001125862181073' 
},
existe_deja:{
NomPrénom: "Yasmine LOUAKED",
RIB: '008 16001 3160004869 69',
newName: "Yasmeen"
},
beneficiaireDevise1: {
 NomPrénom: "SAMIA BOUBADJOU",
  RIB: '021 00027 1150349707 09'
},
beneficiaireDevise2: {
  NomPrénom: "Madjda rezig",
   RIB: '021 00001 1030002193 54'
 },
 beneficiaireDevise3: {
  NomPrénom: "Elmahdi AMRANE",
   RIB: '	021 00001 1030000207 95'
 },
 
beneficiaireDinars1: {
  NomPrénom: "Oussama MAMECHE",
   RIB: '032 00001 7118621810 34'
 },
 beneficiaireDinars2: {
  NomPrénom: "Khaled Sebti",
   RIB: '005 00008 0084621810 48'
 },
invalid_rib:{
NomPrénom: "Yasmine LOUAKED",
RIB: '000 00000 0000000000 00'
},


x:{
  NomPrénom: " x",
  },

};


export const virements = {
  
  simpleDinars: {
      beneficiaire: bénéficiaire.beneficiaireDinars1,
      montant: "1000",
      motif: "Loyer",
      compteADebiter: comptes.courant.nom,
      periodeValide: {
        dateDebut: '30 avril 2025',
        dateFin: '30 mai 2025',
    },},
    simpleDevise: {
      beneficiaire: bénéficiaire.beneficiaireDevise1,
      montant: "300",
      motif: "Abonnement",
      compteADebiter: comptes.euro.nom
    },
  
    multipleDinars: {
        compteADebiter: comptes.courant.nom,
        motif: "Paiement collectif",
        beneficiaires: [
          {
            beneficiaire: bénéficiaire.beneficiaireDinars1,
            montant: "500"
          },
          {
            beneficiaire: bénéficiaire.beneficiaireDinars2,
            montant: "800"
          }
        ]
      }
   
    
};



export async function enterPassword(page, password) {
  for (const number of password.split('')) {
    await page.locator(`button:has-text("${number}")`).click(); 
  }
}

export const OTP = '666000'

export async function otp(page, OTP) {

  let i = 0;

    for (const otp of OTP) {
       const otpIndex = `#otp${i}`;
       await page.locator(otpIndex).fill(otp); 
      i++;
      console.log('otp',i)

       }

}
