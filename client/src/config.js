export const LOGIN_TITLE = 'Login';
export const LOGIN_TITLE_LOADING = 'Logging in...';
export const REGISTER_TITLE = 'Register';
export const REGISTER_TITLE_LOADING = 'Sending an email...';
export const REGISTER_COMPLETE_TITLE = 'Register Complete';
export const REGISTER_COMPLETE_TITLE_LOADING = 'Setting up password...';
export const FORGOT_PASSWORD_TITLE = 'Restore password';
export const FORGOT_PASSWORD_TITLE_LOADING = 'Sending an email...';
export const CHANGE_PASSWORD_TITLE = 'Change password';
export const CHANGE_PASSWORD_TITLE_LOADING = 'Saving new password...';
export const CREATE_CATEGORY_TITLE = 'Create Category';
export const CREATE_CATEGORY_TITLE_LOADING = 'Saving new category...';
export const EDIT_CATEGORY_TITLE = 'Edit Category';
export const EDIT_CATEGORY_TITLE_LOADING = 'Saving category...';
export const EDIT_SUBCATEGORY_TITLE = 'Edit Subcategory';
export const EDIT_SUBCATEGORY_TITLE_LOADING = 'Saving subcategory...';
export const CREATE_SUBCATEGORY_TITLE = 'Create Subcategory';
export const CREATE_SUBCATEGORY_TITLE_LOADING = 'Saving new subcategory...';
export const CREATE_PRODUCT_TITLE = 'Create Product';
export const CREATE_PRODUCT_TITLE_LOADING = 'Saving new product...';
export const shippingOptions = [
  {
    name: 'Yes',
    _id: 'Yes',
  },
  {
    name: 'No',
    _id: 'No',
  },
];
export const colorOptions = [
  {
    name: 'Black',
    _id: 'Black',
  },
  {
    name: 'Brown',
    _id: 'Brown',
  },
  {
    name: 'Silver',
    _id: 'Silver',
  },
  {
    name: 'White',
    _id: 'White',
  },
  {
    name: 'Blue',
    _id: 'Blue',
  },
];
export const brandsOptions = [
  {
    name: 'Apple',
    _id: 'Apple',
  },
  {
    name: 'Samsung',
    _id: 'Samsung',
  },
  {
    name: 'Microsoft',
    _id: 'Microsoft',
  },
  {
    name: 'Lenovo',
    _id: 'Lenovo',
  },
  {
    name: 'HP',
    _id: 'HP',
  },
  {
    name: 'ASUS',
    _id: 'ASUS',
  },
  {
    name: 'DELL',
    _id: 'DELL',
  },
  {
    name: 'MSI',
    _id: 'MSI',
  },
];
export const initialProductState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  quantity: '',
  images: [],
  shipping: '',
  color: '',
  brand: '',
};

