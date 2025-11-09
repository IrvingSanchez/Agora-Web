import * as Yup from 'yup';

export const AuthValidationSchema = Yup.object().shape({
  receiverWalletAddress: Yup.string().required('La dirección de la billetera del receptor es requerida'),
  
});