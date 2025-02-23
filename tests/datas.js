export const loginData ={

    valid_data: {
      username: '100000',  
      password: '121212'  
      
    },
    invalid_user: {
       username: '13099', 
       password: ['1', '2', '1', '2', '1', '2'] 
     },
     invalid_psw: {
       username: '100000',  
       password:  ['1', '3', '1', '2', '1', '2'] 
     },
    invalid_data: {
       username: '15',  
       password:  ['1', '3', '1', '2', '1', '2'] 
     },
     short_psw:{
      username: '15',  
       password:  ['1', '3', '1', '2', '1'] 
       
     },
     empty_user:{
      username: '',  
     }
   
}

export const bénéficiaire ={
HorsSGA:{
  NomPrénom: "Yasmine LOUAKED",
  RIB: '008 16001 3160004869 69'
},
SGA:{
  NomPrénom: "OUSSAMA LAIDI",
  RIB: '021 00001 1030001525 21'
},
nouveau_benef:{
 NomPrénom: "OUSSAMA LAIDI",
  RIB: '021 00001 1030001525 21'
},
existe_deja:{
NomPrénom: "Yasmine LOUAKED",
RIB: '008 16001 3160004869 69',
newName: "Yasmeen"
},
invalid_rib:{
NomPrénom: "Yasmine LOUAKED",
RIB: '000 00000 0000000000 00'
},

exist_deja_fav:{
NomPrénom: " Madjda rezig",
RIB: '021 00001 1030002193 54'
}

};


export const OTP = '666000'