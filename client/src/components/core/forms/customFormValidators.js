import Joi from 'joi';
import { isBoolean, isEmpty, isNull as equalsNull, isNumber, isString, isUndefined, values } from 'lodash';

export const isDictEmpty = (val) => values(val).every(isEmpty)

export const isStr = isString;
export const isUndef = isUndefined;
export const isBool = isBoolean;
export const isNum = isNumber;
export const isNull = equalsNull;

export const validators = {
    getNameErr: (val, opt) => {
      const { required, requiredMsg } = opt || { required: true };
      if (!val && required) {
        return requiredMsg || 'Name is required';
      }
      if (val && val.length < 2) {
        return 'Name could not be shorter than two characters';
      }
      if (val && val.length > 35) {
        return 'Name could not be longer than 35 characters';
      }
      return undefined;
    },
    getPhoneNumberErr: (val, opt = {}) => {
      const { required, requiredMsg } = opt || { required: true };
      if (!val && required) {
        return requiredMsg || 'Phone number is required';
      }
      const { error } = Joi.string()
        .regex(/[+\d()-\s)]+/)
        .validate(val);
      return error ? 'Please enter a valid phone number' : undefined;
    },
    getEmailErr: (val, opt) => {
      const { required, requiredMsg } = opt || { required: true };
      if (!val && required) {
        return requiredMsg || 'Email is required';
      }
      const { error } = Joi.string()
        .email({ tlds: { allow: false } })
        .validate(val);
      return error ? 'Wrong email format' : undefined;
    },
    getTextAreaErr: (val, opt) => {
      const { required, requiredMsg } = opt || { required: true };
      if (!val && required) {
        return requiredMsg || '';
      }
      return undefined;
    },
    getPasswordErr: (val, opt) => {
      const { required, requiredMsg } = opt || { required: true };
      if (!val && required) {
        return requiredMsg || 'Password is required';
      }
      if (val && val.length > 100) {
        return 'Password is too long';
      }
      if (val && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,100}$/g.test(val)) {
        return 'Password should be 8 symbols long minimum and contains numbers, uppercase, and lowercase letters';
      }
      return undefined;
    },
  };
