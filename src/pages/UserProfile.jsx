import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Inicializar como null en lugar de un array vacío

  useEffect(() => {
    // Obtén los datos de usuario del localStorage
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);
    if (storedUserData) {
      // Si hay datos en el localStorage, conviértelos a objeto y actualiza el estado
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  const handleLogout = () => {
    // Limpiar los datos de usuario del localStorage y redirigir a la página de inicio de sesión
    localStorage.removeItem('userData');
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  if (!userData) {
    // Si los datos de usuario no se han cargado, muestra un mensaje de carga
    return <div>Cargando datos de usuario...</div>;
  }

  // Si los datos de usuario están disponibles, muestra la información del perfil
  return (
     <ProfileContainer>
      <ProfileTitle>Perfil de Usuario</ProfileTitle>
      <UserInfo>Nombre y Apellidos: {userData.data.nombres} {userData.data.apellidos}</UserInfo>
      <UserInfo>Email: {userData.data.email}</UserInfo>
      <UserInfo>Fecha de Nacimiento: {userData.data.fecha_nacimiento}</UserInfo>
      <UserInfo>Teléfono: {userData.data.telefono}</UserInfo>
      <ProfileImage src={userData.data.foto_perfil} alt="Foto de Perfil" />
      <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>

    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  text-align: center;
  margin: 20px;
  
`;

const ProfileTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #3498db;
`;

const UserInfo = styled.p`
  font-size: 20px;
  margin: 5px 0;
  color: #2ecc71;
`;

const ProfileImage = styled.img`
  width: 400px;
  margin-top: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
const LogoutButton = styled.button`
  background-color: #e74c3c;
  width:100vw;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;