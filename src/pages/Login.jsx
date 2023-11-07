import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://api-carta-virtual.planta-de-la-vida.com/api/loginCliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Almacena los datos en localStorage
          await localStorage.setItem('userData', JSON.stringify(data));
          console.log('Datos del usuario:', data); // Agrega este console.log para mostrar los datos en la consola
          // Redirige a la página de perfil
          window.location.href = '/profile';
        } else {
          console.error('Error durante el inicio de sesión:', response.statusText);
          // Manejar errores de autenticación
        }
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        // Manejar errores de red u otros errores
      }
    };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Iniciar sesión</LoginButton>

      </LoginForm>
      {/* Utiliza Link para redirigir a la página de perfil */}
      <Link to="/profile">Ir al perfil</Link>
    </LoginContainer>
  );
};
