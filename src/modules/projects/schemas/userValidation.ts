import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  title: Yup.string().required('El título es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  budget: Yup.object().shape({
    total: Yup.string().required('El presupuesto total es requerido'),
    currency: Yup.string().required('La moneda es requerida')
  }),
});