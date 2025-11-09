import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  donorWalletUrl: Yup.string().required('La URL de la billetera del donante es requerida'),
  debitAmount: Yup.string().required('La cantidad a debitar es requerida'),
  
});