import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  name: Yup.object().shape({
    first: Yup.string().required('El nombre es requerido'),
    last: Yup.string().required('El apellido es requerido')
  }),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  phone: Yup.string().required('El número de teléfono es requerido'),
  wallet: Yup.object().shape({
    currency: Yup.string().default('MXN'),
    provider: Yup.string().default('InterledgerTestNet'),
    balance: Yup.string().default("0")
  })
});