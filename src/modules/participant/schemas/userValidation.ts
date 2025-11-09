import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  userId: Yup.string().required('El usuario es requerido'),
  rol: Yup.string().required('El rol es requerido')
  
});