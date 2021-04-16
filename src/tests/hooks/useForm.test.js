import React from 'react';
import { act, renderHook } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe('Pruebas en useForm', () => {
   const initialForm = {
       name: 'Juan Ignacio',
       email: 'juani.scarafia@gmail.com'
   };

   test('debe regresar un formulario por defecto', () => {
       const { result } = renderHook(()=> useForm(initialForm));
       const [formValues, handleInputChange, reset] = result.current;

       expect(formValues).toEqual(initialForm);
       expect(typeof handleInputChange).toBe('function');
       expect(typeof reset).toBe('function');
   });
   
   test('debe cambiar el valor del formulario (cambiar name)', () => {
       const { result } = renderHook(()=> useForm(initialForm));
       const [, handleInputChange] = result.current;

       act(()=>{
           handleInputChange({
               target: {
                   name: 'name',
                   value: 'Fisionito'
               }
           });
       });

       const [formValues] = result.current;
       expect(formValues).toEqual({...initialForm, name: 'Fisionito'});
   });

   test('debe re-establecer el formulario con RESET', () => {
       const { result } = renderHook(()=> useForm(initialForm));
       const [, handleInputChange, reset] = result.current;

       act(()=>{
           handleInputChange({
               target: {
                   name: 'name',
                   value: 'Fisionito'
               }
           });
           reset();
       });

       const [formValues] = result.current;
       expect(formValues).toEqual(initialForm);
   });

});
